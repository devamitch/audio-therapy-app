import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';
import { useHeaderHeight } from '@react-navigation/elements';
import { LinearGradient } from 'expo-linear-gradient';

import { Progress } from '../Music';

import GradientText, { GradientIcon } from '@/components/Base/GradientText';
import { SingersResponse } from '@/lib/server/artists';
import { handleError, windowHeight } from '@/lib/utils';
import { FontSizeColorStyle, responsive } from '@/styles';

type SingerCardProps = SingersResponse & {
	index: number;
	translateX: Animated.SharedValue<number>;
	length: number;
};

const CARD_WIDTH = 180 as const;

const WIDTH = 293 as const;

const performSkipToNext = async () => TrackPlayer.skipToNext();

const performSkipToPrevious = async () => TrackPlayer.skipToPrevious();

const SingerMusics: React.FC<SingerCardProps> = ({
	index,
	image,
	name,
	translateX: scrollX,
	length,
	tracks: allTracks,
	bio,
	follow,
}) => {
	const top = useHeaderHeight();

	const { bottom } = useSafeAreaInsets();

	const height2 = windowHeight - (top + bottom);

	const animatedStyle = useAnimatedStyle(() => {
		const translateX = -((scrollX.value / CARD_WIDTH) * WIDTH);

		return {
			transform: [{ translateX }],
			// backgroundColor: 'red',
			// margin: 10,
		};
	}, [height2]);

	const { playing, bufferingDuringPlay } = useIsPlaying();

	const [isPlaying, setIsPlaying] = useState<boolean>();

	const [isBuffering, setIsBuffering] = useState<boolean>();

	const [currentTrack, setCurrentTrack] = useState<string>();

	const tracks = useMemo(
		() =>
			allTracks
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
					artist: name,
				})) || [],
		[allTracks, name]
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

	return false ? (
		<Animated.View
			style={[animatedStyle, { width: WIDTH, paddingBottom: bottom, flexGrow: 1 }]}
		/>
	) : (
		<Animated.View
			style={[
				animatedStyle,
				{ width: WIDTH, paddingBottom: bottom, overflow: 'hidden', flex: 1 },
			]}
		>
			<Animated.FlatList
				contentContainerStyle={styles.scrollContent}
				data={tracks}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				ListHeaderComponentStyle={{ marginBottom: 40 }}
				ListHeaderComponent={
					name ? (
						<>
							<View style={styles.playerContainer}>
								{name ? (
									<GradientText
										style={styles.playerName}
										numberOfLines={1}
										adjustsFontSizeToFit
									>
										{name}
									</GradientText>
								) : null}

								<View style={styles.followersContainer}>
									<LinearGradient
										colors={['#000000', '#00212A', '#00212A']}
										style={styles.followersBtn}
										start={[0, 1]}
										end={[0.75, 1]}
									>
										<Text
											style={styles.followersText}
											numberOfLines={1}
											adjustsFontSizeToFit
										>
											{`${follow ?? 0} Followers`}
										</Text>
									</LinearGradient>
									{tracks ? (
										<LinearGradient
											colors={['#000000', '#00212A', '#00212A']}
											style={styles.followersBtn}
											start={[0, 1]}
											end={[0.75, 1]}
										>
											<Text
												style={styles.followersText}
												numberOfLines={1}
												adjustsFontSizeToFit
											>
												{`${(tracks || [])?.length} tracks`}
											</Text>
										</LinearGradient>
									) : null}
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
											<RectButton style={styles.playBtn2} onPress={onPlay}>
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
					) : (
						<></>
					)
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
		</Animated.View>
	);
};

export default SingerMusics;

const styles = StyleSheet.create({
	backgroundImage: {
		display: 'flex',
		flex: 1,
		height: '100%',
		width: '100%',
	},
	backgroundImageStyle: {
		backfaceVisibility: 'hidden',
		borderRadius: responsive(20),
		opacity: 0.5,
	},
	button: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: responsive(7),
		flexDirection: 'row',
		gap: responsive(10),
		justifyContent: 'space-between',
		paddingHorizontal: responsive(12),
		paddingVertical: responsive(6),
	},
	buttonText: {
		...FontSizeColorStyle['montserrat-400-12-grey-8e8e8e'],
	},
	buttonsContainer: {
		gap: responsive(10),
		marginTop: responsive(30),
		paddingHorizontal: responsive(20),
	},
	container: {
		flex: 1,
		paddingHorizontal: responsive(40),
		paddingTop: responsive(40),
	},
	contestText: {
		...FontSizeColorStyle['montserrat-700-16-white'],
		fontFamily: 'DigifaceWide-Italic',
	},
	followersBtn: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 0,
		gap: responsive(10),
		justifyContent: 'center',
		paddingHorizontal: responsive(12),
		paddingVertical: responsive(6),
		transform: [{ skewX: '-5deg' }],
		width: responsive(127),
	},
	followersBtn2: {
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 0,
		gap: responsive(10),
		justifyContent: 'center',
		paddingHorizontal: responsive(10),
		paddingVertical: responsive(6),
		transform: [{ skewX: '-5deg' }],
		// width: '100%',
	},
	followersContainer: {
		flexDirection: 'row',
		flex: 1,
		gap: responsive(5),
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
		marginLeft: responsive(20),
		marginTop: responsive(20),
		opacity: 0,
		padding: responsive(10),
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
	playBtn2: {
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
		gap: responsive(20),
		marginTop: responsive(10),
		width: '100%',
	},
	playerDescription: {
		...FontSizeColorStyle['lato-300-13-white'],
		textAlign: 'center',
		width: responsive(278),
	},
	playerImage: {
		height: responsive(240),
		width: responsive(160),
	},
	playerName: {
		...FontSizeColorStyle['montserrat-700-24-primary-text'],
		fontFamily: 'Moonwalk',
		textTransform: 'capitalize',
	},
	scrollContent: {
		gap: responsive(10),
		padding: responsive(10),
		paddingTop: 0,
		// overflow: 'hidden',
		// flexGrow: 1,
		// width: WIDTH,
	},
	titleText: {
		...FontSizeColorStyle['montserrat-700-24-primary-text'],
		fontFamily: 'Moonwalk',
	},
} as const);
