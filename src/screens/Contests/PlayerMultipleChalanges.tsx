/* eslint-disable no-warning-comments */
/* eslint-disable no-inline-styles/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { useMutation, useQuery } from '@tanstack/react-query';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, ResizeMode, Video } from 'expo-av';
import { BlurView } from 'expo-blur';
import { useMemo, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';
import WebView from 'react-native-webview';

import PlayerChalange from '../Chalange/PlayerChalange';

import { List } from '@/components';
import { GradientIcon } from '@/components/Base/GradientText';
import PlayerChalangeTop from '@/components/Chalange/PlayerChalangeTop';
import { useAppStore } from '@/core/store';
import { addChallangeVote, getChallanges } from '@/lib/server/challange';
import { handleError, isAndroid, toast, windowHeight } from '@/lib/utils';
import { ALL_COLORS, LayoutStyle, responsive } from '@/styles';

Audio.setAudioModeAsync({
	interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
	interruptionModeIOS: InterruptionModeIOS.DuckOthers,
	playThroughEarpieceAndroid: true,
	playsInSilentModeIOS: true,
	shouldDuckAndroid: true,
});

const videoSource =
	'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const PlayerMultipleChalanges = () => {
	const user = useAppStore((state) => state?.user);

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryFn: async () => getChallanges(),
		queryKey: ['getChallanges'],
	});

	const { playing, bufferingDuringPlay } = useIsPlaying();

	const [music, setMusic] = useState<string>();

	const onPlayClick = async (id?: string) => {
		console.log({ id });

		if (!id) return undefined;

		const data1 = data?.find((item) =>
			item?.artist1Detail?._id === id ? item?.artist1Detail : item?.artist2Detail
		);

		const artist = data1?.artist1 === id ? data1?.artist1Detail : data1?.artist2Detail;

		console.log({ artist });

		const song = artist?.song;

		const url = song?.media;

		if (!url) return undefined;

		const regex = /(?:\.([^.]+))?$/;

		const ext = regex?.exec(url)?.[1];

		if (ext === 'mp3') {
			try {
				if (playing) {
					await TrackPlayer.pause();

					return;
				}

				const queue = await TrackPlayer.getQueue();

				if (queue.length >= 0) {
					if (queue?.[0]?.url !== url) {
						await TrackPlayer.remove(
							Array.from({ length: queue?.length }, (_, index) => index)
						);
					}
				}

				await TrackPlayer.add({
					url,
					title: song?.title ?? 'Soul Searching (Demo)',
					artist: artist?.artist?.name ?? 'David Chavez',
					artwork: song?.banner ?? 'https://rntp.dev/example/Soul%20Searching.jpeg',
					duration: song?.duration ?? 77,
				});

				await TrackPlayer.play();

				const soundObject = new Audio.Sound();

				await soundObject.loadAsync(
					{ uri: 'https://rntp.dev/example/Soul%20Searching.mp3' },
					{ shouldPlay: true }
				);

				soundObject.stopAsync();
			} catch (err) {
				console.log(err);
			}

			// await soundObject.loadAsync(
			// 	{ uri: url },
			// 	{
			// 		shouldPlay: true,
			// 	}
			// );
			// await soundObject.setPositionAsync(0);
			// await soundObject.playAsync();

			return;
		} else if (ext === 'mp4') {
			// return { video: music } as const;
			return;
		}

		return setMusic(url);
	};

	const { mutate } = useMutation({
		mutationKey: [user?._id || user?.id],
		mutationFn: addChallangeVote,
		onError: (error) => {
			handleError(error);
		},
		onSuccess({ message }) {
			toast.success(message || 'Sucessfully voted');
			refetch();
		},
	});

	const onBet = (_id?: string, chalangeId?: string) => {
		mutate({
			by: user?._id || user?.id,
			artist: _id,
			challange: chalangeId,
		});
	};

	const resourse = useMemo(() => {
		if (!music) return undefined;
		const regex = /(?:\.([^.]+))?$/;

		const ext = regex?.exec(music)?.[1];

		if (music?.includes('https://www.youtube.com/watch?v=')) {
			return { url: music } as const;
		} else if (music?.includes('https://www.youtube.com/embed/')) {
			return {
				html: `<iframe src="${music}?utm_source=generator" width="100%" height="100%" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
			} as const;
		} else if (music?.includes('https://open.spotify.com/embed/track/')) {
			return {
				html: `<iframe src="${music}?utm_source=generator" width="100%" height="100%" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
			} as const;
		} else if (music?.includes('spotify:track:')) {
			const parsedSpotifyId = music?.split('spotify:track:')[1];

			return {
				html: `<!DOCTYPE html><html><body><iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${parsedSpotifyId}?utm_source=generator" width="100%" height="500" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></body></html>`,
			} as const;
		} else if (ext === 'mp3') {
			return { song: music } as const;
		} else if (ext === 'mp4') {
			return { video: music } as const;
		}

		return undefined;
	}, [music]);

	const playMusic = async () => {
		try {
			if (playing) {
				await TrackPlayer.pause();

				return;
			}

			const queue = await TrackPlayer.getQueue();

			if (queue.length >= 0) {
				if (queue?.[0]?.url !== 'https://rntp.dev/example/Soul%20Searching.mp3') {
					await TrackPlayer.remove(
						Array.from({ length: queue?.length }, (_, index) => index)
					);
				}
			}

			await TrackPlayer.add({
				// url,
				url: 'https://dev-om.s3.amazonaws.com/testsongs/Kurta-Pajama-Gopii-Sandhu-Sargi-Maan.mp3',
				title: 'Soul Searching (Demo)',
				artist: 'David Chavez',
				artwork: 'https://rntp.dev/example/Soul%20Searching.jpeg',
				duration: 77,
			});

			await TrackPlayer.play();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<StatusBar hidden />
			<View
				style={[
					LayoutStyle.fill,
					{
						position: 'relative',
						overflow: 'hidden',
						height: windowHeight - responsive(152),
					},
				]}
			>
				<PlayerChalangeTop />
				<List
					data={data}
					renderItem={({ item }) => (
						<PlayerChalange
							onBet={onBet}
							onPlay={onPlayClick}
							chalangeId={item?._id}
							createdOn={new Date(item?.publishedOn || '')}
							totatBets={item?.totalVotes}
							avatars={item?.users?.map((i) => i?.icon || '') || []}
							{...item}
						/>
					)}
					pagingEnabled
					// bounces={false}
					ListFooterComponent={() => null}
					style={{
						// height: windowHeight,
						// c
						backgroundColor: 'blue',
						height: windowHeight - responsive(152),
						position: 'relative',
						// overflow: 'hidden',
						// borderColor: 'green',
						// borderBottomWidth: 1,
						// padding: 20,
					}}
					contentContainerStyle={
						{
							// backgroundColor: '#818181',
						}
					}
					isRefetching={isFetching || isLoading}
					refetch={async () => {
						await refetch();
					}}
				/>
			</View>
			<ReactNativeModal
				isVisible={!!music}
				onBackdropPress={() => setMusic(undefined)}
				swipeDirection={['right', 'left', 'up', 'down']}
				onSwipeComplete={() => setMusic(undefined)}
				onBackButtonPress={() => setMusic(undefined)}
				onDismiss={() => setMusic(undefined)}
				backdropOpacity={0.8}
				// animationIn="shake"
				animationIn="fadeInDownBig"
				animationOut="fadeOutUpBig"
				coverScreen
				// presentationStyle="formSheet"
				hasBackdrop
				onModalHide={() => setMusic(undefined)}
				backdropTransitionOutTiming={500}
				useNativeDriver={isAndroid ? true : false}
				useNativeDriverForBackdrop={isAndroid ? true : false}
				avoidKeyboard={true}
			>
				<BlurView style={LayoutStyle.fill} tint="dark">
					<SafeAreaView
						style={[
							LayoutStyle.fill,
							{ paddingTop: StatusBar.currentHeight || 0 + responsive(40) },
						]}
					>
						{resourse?.url ? (
							<WebView
								style={styles.webView}
								source={{ uri: resourse?.url, url: resourse?.url }}
								originWhitelist={['*']}
							/>
						) : resourse?.html ? (
							<WebView
								style={styles.webView}
								source={resourse}
								originWhitelist={['*']}
							/>
						) : (
							<GestureHandlerRootView
								style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
							>
								{resourse?.song ? (
									<RectButton style={styles.containerInner} onPress={playMusic}>
										{false ? (
											<ActivityIndicator color={'#00BCFD'} />
										) : (
											<View
												style={{
													flex: 1,
													overflow: 'hidden',
													alignItems: 'center',
													justifyContent: 'center',
												}}
											>
												<GradientIcon
													name={'play'}
													name={playing ? 'pause' : 'play'}
													size={responsive(48)}
													color={'white'}
												/>
											</View>
										)}
									</RectButton>
								) : (
									<Animated.View
										style={{
											flex: 1,
											borderRadius: responsive(4),
											// transform: [{ rotate: '90deg' }],
										}}
									>
										<Video
											source={{ uri: videoSource }}
											style={{
												flex: 1,
												height: '100%',
												width: '100%',
												borderRadius: responsive(10),
											}}
											useNativeControls
											resizeMode={ResizeMode.CONTAIN}
											isLooping={false}
											shouldPlay
										/>
									</Animated.View>
								)}
							</GestureHandlerRootView>
						)}
					</SafeAreaView>
				</BlurView>
			</ReactNativeModal>
		</>
	);
};

export default PlayerMultipleChalanges;

const styles = StyleSheet.create({
	container: {
		backgroundColor: ALL_COLORS.black,
		borderRadius: responsive(12),
		bottom: 0,
		gap: responsive(5),
		height: responsive(300),
		left: 0,
		position: 'absolute',
		right: 0,
	},
	container2: {
		backgroundColor: 'black',
		borderRadius: responsive(12),
		bottom: 0,
		gap: responsive(5),
		height: responsive(300),
		left: 0,
		position: 'absolute',
		right: 0,

		// top: 0,
	},
	containerInner: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.1)',
		borderColor: '#7CD0E8',
		borderLeftWidth: 1,
		borderRadius: responsive(100),
		height: responsive(100),
		justifyContent: 'center',
		// overflow: 'hidden',
		width: responsive(100),
	},
	setMusic: {
		alignSelf: 'flex-end',
		borderRadius: responsive(12),
		right: responsive(5),
		top: responsive(5),
	},
	webView: {
		backgroundColor: 'black',
		borderRadius: responsive(12),
		flex: 1,
	},

	wrapper: {
		height: windowHeight - responsive(152 + 50),
		overflow: 'hidden',
		position: 'relative',
	},
});
