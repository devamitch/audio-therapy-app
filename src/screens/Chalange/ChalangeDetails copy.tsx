import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';
import WebView from 'react-native-webview';
// import { RouteProp,  useRoute } from '@react-navigation/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, ResizeMode, Video } from 'expo-av';
import { BlurView } from 'expo-blur';
import { shallow } from 'zustand/shallow';

import PlayerChalange from './PlayerChalange';

import { ScrollLayout } from '@/components';
import GradientText, { GradientIcon } from '@/components/Base/GradientText';
import { customTransition } from '@/components/Dashboard/RandomPlayers';
import { useAppStore } from '@/core/store';
import { addChallangeVote, ChalangesResponse, getChallange } from '@/lib/server/challange';
import { handleError, isAndroid, toast, windowHeight } from '@/lib/utils';
import { MainStackRouteType } from '@/navigation/main/MainStack';
import { ALL_COLORS, FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

Audio.setAudioModeAsync({
	interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
	interruptionModeIOS: InterruptionModeIOS.DuckOthers,
	playThroughEarpieceAndroid: true,
	playsInSilentModeIOS: true,
	shouldDuckAndroid: true,
});

const videoSource =
	'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const ChalangeDetails = () => {
	const { challangeId, status, tag } =
		useRoute<RouteProp<MainStackRouteType, 'ChalangeDetails'>>()?.params;

	const user = useAppStore((state) => state?.user, shallow);

	const navigation = useNavigation<MainStackRouteType<'ChalangeDetails'>['navigation']>();

	const { playing, bufferingDuringPlay } = useIsPlaying();

	const queryClient = useQueryClient();

	const pastdata = queryClient.getQueryData<ChalangesResponse[]>(['recentContests', status]);

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryFn: async () => getChallange({ challangeId, status }),
		queryKey: ['getChallange', status, challangeId],
		initialData: () => {
			return pastdata?.find((d) => d._id === challangeId);
		},
		refetchOnMount: true,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true,
	});

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

	useEffect(() => {
		// Use `setOptions` to update the button that we previously specified
		// Now the button includes an `onPress` handler to update the count

		if (data?.artist1Detail?.artist?.name && data?.artist2Detail?.artist?.name) {
			navigation.setOptions({
				headerShown: true,
				title: `${data?.artist1Detail?.artist?.name?.split(' ')?.[0]} Vs ${data?.artist2Detail?.artist?.name?.split(' ')?.[0]}`,

				headerTitle: (props) => (
					<GradientText
						style={[
							FontSizeColorStyle['montserrat-700-18-primary-text'],
							{ fontFamily: 'Moonwalk' },
						]}
					>
						{`${data?.artist1Detail?.artist?.name?.split(' ')?.[0]} Vs ${data?.artist2Detail?.artist?.name?.split(' ')?.[0]}`}
					</GradientText>
				),
				headerLeft: (props) => (
					<RectButton
						style={{
							flexDirection: 'row',
							gap: responsive(3),
							alignItems: 'center',
						}}
						onPress={() => navigation?.goBack()}
					>
						<GradientIcon name="chevron-back" size={responsive(30)} />
					</RectButton>
				),
				headerRight: (props) => (
					<RectButton
						style={{
							flexDirection: 'row',
							gap: responsive(3),
							alignItems: 'center',
						}}
						onPress={() => navigation?.goBack()}
					>
						<GradientIcon name="ios-notifications" size={responsive(24)} />
					</RectButton>
				),
			});
		}
	}, [data?.artist1Detail?.artist?.name, data?.artist2Detail?.artist?.name, navigation]);

	const [music, setMusic] = useState<string>();

	const onPlayClick = async (id?: string) => {
		if (!id) return undefined;

		const artist = data?.artist1 === id ? data?.artist1Detail : data?.artist2Detail;

		const song = artist?.song;

		const url = song?.media;

		if (!url) return undefined;

		const regex = /(?:\.([^.]+))?$/;

		const ext = regex?.exec(url)?.[1];

		if (ext === 'mp3') {
			try {
				// const stat = await soundObject.getStatusAsync();
				console.log({ url });
				// await TrackPlayer.setupPlayer();

				// await TrackPlayer.stop();

				if (playing) {
					await TrackPlayer.pause();

					return;
				}

				const queue = await TrackPlayer.getQueue();

				if (queue.length >= 0) {
					console.log({ queue });

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
				// const { sound: playbackObject2 } = await soundObject.loadAsync(
				// 	{ uri: url },
				// 	{
				// 		shouldPlay: true,
				// 	}
				// );

				// await playbackObject2.playAsync();

				const soundObject = new Audio.Sound();

				// soundObject.i
				await soundObject.loadAsync(
					{ uri: 'https://rntp.dev/example/Soul%20Searching.mp3' },
					{ shouldPlay: true }
				);

				soundObject.stopAsync();
				// console.log({ playbackObject });

				// await soundObject.playAsync();
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
		<ScrollLayout
			refreshing={isFetching || isLoading}
			onRefresh={async () => refetch()}
			contentContainerStyle={{ paddingHorizontal: 0 }}
		>
			<StatusBar animated showHideTransition="slide" />
			<Animated.View
				style={[LayoutStyle.fill, styles.wrapper]}
				sharedTransitionTag={tag}
				sharedTransitionStyle={customTransition}
			>
				{/* <PlayerChalangeTop /> */}
				<PlayerChalange
					onBet={onBet}
					onPlay={onPlayClick}
					chalangeId={data?._id}
					createdOn={new Date(data?.publishedOn || '')}
					totatBets={data?.totalVotes}
					avatars={data?.users?.map((i) => i?.icon || '') || []}
					shouldShowBet={false}
					{...data}
				/>
			</Animated.View>
			{/* {music ? (
				<Animated.View style={styles.container}>
					<StatusBar hidden />
					<RectButton
						underlayColor="#3333"
						style={styles.setMusic}
						onPress={() => setMusic(undefined)}
					>
						<AntDesign name="closecircleo" size={responsive(24)} color="#e1e1e1" />
					</RectButton>
					<WebView style={styles.webView} source={resourse} originWhitelist={['*']} />
				</Animated.View>
			) : null} */}
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
							{ paddingTop: StatusBar.currentHeight || 0 + 40 },
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
											borderRadius: 4,
											// transform: [{ rotate: '90deg' }],
										}}
									>
										<Video
											source={{ uri: videoSource }}
											style={{
												flex: 1,
												height: '100%',
												width: '100%',
												borderRadius: 10,
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
		</ScrollLayout>
	);
};

export default ChalangeDetails;

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
		backgroundColor: ALL_COLORS.black,
		borderRadius: responsive(12),
		flex: 1,
	},
	wrapper: {
		height: windowHeight - responsive(152 + 50),
		overflow: 'hidden',
		position: 'relative',
	},
});
