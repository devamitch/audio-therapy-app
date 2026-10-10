import { useEffect, useMemo, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { BorderlessButton, GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Animated, { SharedTransition, withTiming } from 'react-native-reanimated';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';

import GradientText, { GradientIcon } from '@/components/Base/GradientText';
import { Progress } from '@/components/Music';
import { getArtistDetail } from '@/lib/server/artists';
import { handleError } from '@/lib/utils';
import { ProfileScreenParamType } from '@/navigation/types';
import { FontSizeColorStyle, responsive } from '@/styles';

const performSkipToNext = async () => TrackPlayer.skipToNext();

const performSkipToPrevious = async () => TrackPlayer.skipToPrevious();

const customTransition = SharedTransition.custom((values) => {
	'worklet';

	// return {
	// 	height: withSpring(values.targetHeight),
	// 	width: withSpring(values.targetWidth),
	// 	originX: withSpring(values.targetOriginX),
	// 	originY: withSpring(values.targetOriginY),
	// 	borderRadius: withTiming(40),
	// };
	return {
		height: withTiming(values.targetHeight),
		width: withTiming(values.targetWidth),
		originX: withTiming(values.targetOriginX),
		originY: withTiming(values.targetOriginY),
		// borderRadius: withTiming(40),
	};
});

const GestView = Animated.createAnimatedComponent(ImageBackground);

const PlayersScreen = () => {
	const props = useRoute<RouteProp<ProfileScreenParamType, 'Player'>>()?.params;

	const navigation = useNavigation();

	const { data } = useQuery({
		queryFn: async () => getArtistDetail({ artistId: props?.id }),
		queryKey: ['getArtistDetail', props?.id],
	});

	const { playing, bufferingDuringPlay } = useIsPlaying();

	const [isPlaying, setIsPlaying] = useState<boolean>();

	const [isBuffering, setIsBuffering] = useState<boolean>();

	const [currentTrack, setCurrentTrack] = useState<string>();

	const tracks = useMemo(
		() =>
			data?.tracks
				?.filter((item) => {
					if (!item?.media) {
						return false;
					}
					const regex = /(?:\.([^.]+))?$/;

					const ext = regex?.exec(item?.media)?.[1];

					return item?.media && item?.media?.startsWith('https://') && ext === 'mp3';
				})
				?.map((item) => ({
					...item,
					url: item?.media,
					artwork: item?.banner,
					artist: data?.name,
				})) || [],
		[data]
	);

	useEffect(() => {
		(async () => {
			const song = await TrackPlayer.getActiveTrack();

			const allUrls = tracks?.map((item) => item?.url);

			if (song?.url || song?.media) {
				setCurrentTrack(song?.url || song?.media);

				if (allUrls?.includes(song?.url || song?.media)) {
					setIsPlaying(playing);
					setIsBuffering(bufferingDuringPlay);
				}
			}
		})();
	}, [bufferingDuringPlay, playing, setIsBuffering, setIsPlaying, tracks]);

	const onPlay = async () => {
		try {
			if (tracks?.length === 0) {
				return;
			}
			const songs = await TrackPlayer.getQueue();

			const song = await TrackPlayer.getActiveTrack();

			const allUrls = tracks?.map((item) => item?.url);

			if (song?.url || song?.media) {
				if (allUrls?.includes(song?.url || song?.media)) {
					if (isPlaying) {
						setIsPlaying(false);

						return await TrackPlayer?.pause();
					}
					if (bufferingDuringPlay) {
						setIsBuffering(bufferingDuringPlay);
						setIsPlaying(true);

						return await TrackPlayer?.play();
					}
					setIsPlaying(true);

					return await TrackPlayer?.play();
				}
			}

			await TrackPlayer?.pause();
			await TrackPlayer.setQueue(tracks);
			await TrackPlayer.play();
			setIsPlaying(true);
			// navigation.navigate('MusicScreen');
		} catch (error) {
			handleError(error);
		}
	};

	// const onPlay = async () => {
	// 	try {
	// 		const queue = await TrackPlayer.getQueue();

	// 		const tracks: AddTrack[] =
	// 			data?.tracks
	// 				?.filter((item) => {
	// 					if (!item?.media) {
	// 						return false;
	// 					}
	// 					const regex = /(?:\.([^.]+))?$/;

	// 					const ext = regex?.exec(item?.media)?.[1];

	// 					return item?.media && item?.media?.startsWith('https://') && ext === 'mp3';
	// 				})
	// 				?.map((item) => ({
	// 					...item,
	// 					url: item?.media,
	// 					artwork: item?.banner,
	// 					artist: data?.name,
	// 				})) || [];

	// 		if (tracks?.length === 0) {
	// 			return;
	// 		}
	// 		if (queue.length >= 0) {
	// 			await TrackPlayer.remove(
	// 				Array.from({ length: queue?.length }, (_, index) => index)
	// 			);
	// 		}

	// 		await TrackPlayer.add(tracks);
	// 		await TrackPlayer.play();
	// 		navigation.navigate('MusicScreen');
	// 	} catch (error) {
	// 		handleError(error);
	// 	}
	// };

	return (
		<GestureHandlerRootView style={styles.container}>
			<GestView
				resizeMode="cover"
				source={{
					uri:
						data?.icon ||
						props?.image ||
						'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
				}}
				style={styles.backgroundImage}
				blurRadius={5}
				imageStyle={styles.backgroundImageStyle}
				// entering={FadeInDown.delay(100)}
				// exiting={FadeOutUp.delay(100)}
			>
				<LinearGradient
					colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)', 'rgba(0,0,0,1)']}
					style={styles.overlayGradient}
				/>
				<FlatList
					contentContainerStyle={styles.scrollContent}
					data={data?.tracks}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					ListHeaderComponentStyle={{ marginBottom: 40 }}
					ListHeaderComponent={
						<>
							<View style={styles.infoContainer}>
								<GradientText style={styles.contestText}>
									24 Hr contest
								</GradientText>
								<GradientText style={styles.titleText} numberOfLines={1}>
									TREND SETTER
								</GradientText>
							</View>
							<View style={styles.playerContainer}>
								<Animated.Image
									source={{
										uri: props?.image,
									}}
									sharedTransitionTag={props?.id}
									style={styles.playerImage}
								/>
								<GradientText style={styles.playerName} numberOfLines={1}>
									{data?.name || props?.name}
								</GradientText>

								<View style={styles.followersContainer}>
									<LinearGradient
										colors={['#000000', '#00212A', '#00212A']}
										style={styles.followersBtn}
										start={[0, 1]}
										end={[0.75, 1]}
									>
										<Text style={styles.followersText}>
											{`${data?.follow || 0} Followers`}
										</Text>
									</LinearGradient>
									<LinearGradient
										colors={['#000000', '#00212A', '#00212A']}
										style={styles.followersBtn}
										start={[0, 1]}
										end={[0.75, 1]}
									>
										<Text style={styles.followersText}>
											{`${(data?.tracks || [])?.length} tracks`}
										</Text>
									</LinearGradient>
								</View>
								<Progress />
								<View
									style={{
										flex: 1,
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<BorderlessButton
										onPress={performSkipToPrevious}
										style={styles.playBtn}
									>
										<GradientIcon
											name={'play-skip-back'}
											size={responsive(30)}
											color={'white'}
										/>
									</BorderlessButton>
									<BorderlessButton onPress={onPlay}>
										<LinearGradient
											colors={[
												'rgba(0,188,253,0.8)',
												'rgba(0,188,253,0.5)',
												'transparent',
											]}
											style={styles.playBtnOutline}
										>
											<RectButton style={styles.playBt2} onPress={onPlay}>
												{isBuffering ? (
													<ActivityIndicator color={'#00BCFD'} />
												) : (
													<GradientIcon
														name={isPlaying ? 'pause' : 'play'}
														size={responsive(25)}
														color={'white'}
													/>
												)}
											</RectButton>
										</LinearGradient>
									</BorderlessButton>
									<BorderlessButton
										onPress={performSkipToNext}
										style={styles.playBtn}
									>
										<GradientIcon
											name={'play-skip-forward'}
											size={responsive(30)}
											color={'white'}
										/>
									</BorderlessButton>
								</View>
							</View>
						</>
					}
					renderItem={({ item }) => (
						<View
							style={styles.button}
							// onPress={() => navigation.navigate('MusicScreen')}
						>
							<View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
								<Image
									style={{ height: 50, width: 50, borderRadius: 3 }}
									source={{ uri: item?.banner }}
									resizeMode="contain"
								/>
								<Text
									style={[
										FontSizeColorStyle[
											`montserrat-600-12-${currentTrack === item?.media ? 'primary-text' : 'white'}`
										],
										{ textTransform: 'capitalize' },
									]}
									numberOfLines={1}
									adjustsFontSizeToFit
								>
									{item?.title}
								</Text>
							</View>

							<View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
								<Text
									style={
										FontSizeColorStyle[
											`montserrat-400-xs-${currentTrack === item?.media ? 'primary-text' : 'light-dddddd'}`
										]
									}
									numberOfLines={1}
									adjustsFontSizeToFit
								>
									{`${item?.duration || 0} sec`}
								</Text>
							</View>
						</View>
					)}
				/>

				{/* */}
			</GestView>
		</GestureHandlerRootView>
	);
};

export default PlayersScreen;

const styles = StyleSheet.create({
	backgroundImage: {
		display: 'flex',
		flex: 1,
		height: '100%',
		width: '100%',
	},
	backgroundImageStyle: {
		backfaceVisibility: 'hidden',
		borderRadius: 20,
		opacity: 0.5,
	},
	button: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 7,
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'space-between',
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	buttonText: {
		...FontSizeColorStyle['montserrat-400-12-grey-8e8e8e'],
	},
	buttonsContainer: {
		gap: 10,
		marginTop: 30,
		paddingHorizontal: 20,
	},
	container: {
		flex: 1,
		paddingHorizontal: 40,
		paddingTop: 40,
	},
	contestText: {
		...FontSizeColorStyle['montserrat-700-16-white'],
		fontFamily: 'DigifaceWide-Italic',
	},
	followersBtn: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 0,
		gap: 10,
		justifyContent: 'center',
		paddingHorizontal: 12,
		paddingVertical: 6,
		transform: [{ skewX: '-5deg' }],
		width: 127,
	},
	followersBtn2: {
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 0,
		gap: 10,
		justifyContent: 'center',
		paddingHorizontal: 10,
		paddingVertical: 6,
		transform: [{ skewX: '-5deg' }],
		// width: '100%',
	},
	followersContainer: {
		flexDirection: 'row',
		flex: 1,
		gap: 5,
		justifyContent: 'center',
		position: 'relative',
	},
	followersText: {
		...FontSizeColorStyle['heebo-500-xxs-primary-text'],
		transform: [{ skewX: '5deg' }],
	},
	infoContainer: {
		alignSelf: 'flex-start',
		backgroundColor: 'rgba(0,0,0,0.7)',
		marginLeft: 20,
		marginTop: 20,
		opacity: 0,
		padding: 10,
		flex: 1,
		position: 'relative',
	},
	overlayGradient: {
		bottom: 0,
		height: '70%',
		left: 0,
		position: 'absolute',
		right: 0,
	},
	playBtn: {
		alignItems: 'center',
		// backgroundColor: 'rgba(0, 0, 0, 0.7)',
		borderRadius: responsive(25),

		flex: 1,
		justifyContent: 'center',
	},
	playBt2: {
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		borderRadius: responsive(25),

		flex: 1,
		justifyContent: 'center',
	},
	playBtnOutline: {
		alignSelf: 'center',
		borderRadius: responsive(25),
		height: responsive(50),
		padding: responsive(1),
		// position: 'absolute',
		// top: '48%',
		width: responsive(50),
	},
	playerContainer: {
		alignItems: 'center',
		gap: 20,
		marginTop: 10,
		width: '100%',
	},
	playerDescription: {
		...FontSizeColorStyle['lato-300-13-white'],
		textAlign: 'center',
		width: 278,
	},
	playerImage: {
		height: 240,
		width: 160,
	},
	playerName: {
		...FontSizeColorStyle['montserrat-700-24-primary-text'],
		fontFamily: 'Moonwalk',
	},
	scrollContent: {
		gap: 10,
		paddingBottom: 100,
		paddingHorizontal: 10,
		paddingTop: 0,
		zIndex: 1,
	},
	titleText: {
		...FontSizeColorStyle['montserrat-700-24-primary-text'],
		fontFamily: 'Moonwalk',
	},
} as const);
