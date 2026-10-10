import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	FadeIn,
	FadeOut,
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
	withTiming,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/core';
import { useQueries } from '@tanstack/react-query';
import { BlurView as ExpoBlur } from 'expo-blur';
import Lottie from 'lottie-react-native';
import { shallow } from 'zustand/shallow';

import { IMAGES, JSONS } from '@/assets';
import {
	DashboardAccountDetails,
	DashboardBalanceCard,
	DashboardMenuList,
	DashboardSingerContainer,
	DashboardTopPlayers,
	DashoardDipositContainer,
} from '@/components/Dashboard';
import DasboardTab from '@/components/Dashboard/DasboardTab';
import { useAppStore } from '@/core/store';
import { getLeagueArtists } from '@/lib/server/artists';
import { getHome } from '@/lib/server/home';
import { handleError, windowHeight, windowWidth } from '@/lib/utils';
import { navigateAndSimpleReset } from '@/navigation/navigation';
import { LayoutStyle, responsive } from '@/styles';

const HEADER_HEIGHT = responsive(182);

const ACUNT = responsive(220);

const paddingHorizontal = responsive(20);

const paddingVertical = responsive(40);

const flex = 1;

const BlurView = Animated.createAnimatedComponent(ExpoBlur);

const LottieView = Animated.createAnimatedComponent(Lottie);

const DashBoard = () => {
	const user = useAppStore((state) => state?.user, shallow);

	const deleted = useAppStore((state) => state?.deletedSettingClosed, shallow);

	// const showTo useToastStore((state) => state.hideToast);
	const [
		{ data, isLoading, isFetching, refetch },
		{ data: singerData = [], refetch: signerRefetch, isLoading: isSingerFetching },
	] = useQueries({
		queries: [
			{
				queryFn: getHome,
				queryKey: ['getHome'],
				refetchOnMount: true,
			},
			{
				queryFn: getLeagueArtists,
				queryKey: ['getArtists'],
				refetchOnMount: true,
			},
		],
	});

	const scrollRef = useAnimatedRef<Animated.ScrollView>();

	const scrollOffset = useScrollViewOffset(scrollRef);

	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[1.2, 1, 1]
					),
				},
			],
		};
	});

	const contentAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY:
						scrollOffset.value > HEADER_HEIGHT ? scrollOffset.value - HEADER_HEIGHT : 0,
				},
			],
		};
	});

	const innerContentAnimatedStyle = useAnimatedStyle(() => {
		const h = 308;

		const y3 = scrollOffset.value > HEADER_HEIGHT ? -scrollOffset.value + HEADER_HEIGHT : 0;

		const y = withTiming(y3, { duration: 20 });

		return {
			transform: [
				{
					translateY: y,
				},
			],
			// position: 'absolute',
			// width: windowWidth,
			overflow: 'hidden',
			borderRadius: 30,
			flex: 1,
			top: 0,
			bottom: 0,
			left: 2,
			right: 1,
		};
	}, [scrollOffset.value]);

	const refreshStyle = useAnimatedStyle(
		() => ({
			height: withTiming(isFetching || isLoading ? windowHeight : 0, {
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			}),
			width: withTiming(isFetching || isLoading ? windowWidth : 0, {
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			}),
			// flex: 1,
			opacity: withTiming(isFetching || isLoading ? 1 : 0, {
				duration: 500,
				easing: Easing.linear,
			}),

			position: 'absolute',
			bottom: 0,
			zIndex: isFetching || isLoading ? 1 : 0,
			backgroundColor: 'rgba(0,0,0,0.4)',
			alignItems: 'center',
			justifyContent: 'center',
		}),
		[isFetching, isLoading]
	);

	const signOut = useCallback(async () => {
		try {
			if (!user?._id) {
				await useAppStore.setState({
					_hydrate: true,
					fcmToken: '',
					hasWallet: false,
					showOnboarding: false,
					takeTour: false,
					showIntro: false,
					_status: 'idle',
					skipped: false,
					user: undefined,
					tempUser: undefined,
					accessToken: undefined,
					wallet: undefined,
					userType: undefined,
					isSocialAuth: undefined,
					isCompleteAuth: undefined,
					deleted: undefined,
					deletedSettingClosed: undefined,
				});
				// await useAppStore?.persist?.clearStorage();
				// navigation?.goBack();

				await navigateAndSimpleReset('SignIn');
			}
		} catch (error) {
			handleError(error);
		}
	}, [user?._id]);

	useFocusEffect(() => {
		signOut();
	});

	return (
		<GestureHandlerRootView style={LayoutStyle.fill}>
			<FastImage source={IMAGES.blurRound} style={styles.image} />

			<Animated.ScrollView
				refreshControl={
					<RefreshControl
						onRefresh={async () => {
							await refetch();
							await signerRefetch();
						}}
						tintColor={'transparent'}
						titleColor={'transparent'}
						colors={['transparent']}
						refreshing={false}
					/>
				}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				ref={scrollRef}
				scrollEventThrottle={16}
				contentContainerStyle={styles.scroll}
			>
				<Animated.View style={[styles.header, headerAnimatedStyle]}>
					<DashboardTopPlayers
						singerData={singerData}
						refreshing={isSingerFetching || isLoading}
					/>
				</Animated.View>

				<Animated.View style={[LayoutStyle.fill, styles.main, contentAnimatedStyle]}>
					<BlurView
						style={[
							LayoutStyle.fill,
							styles.container,
							LayoutStyle.screenLayout,
							{ paddingHorizontal: 0, gap: 0 },
						]}
						tint={'dark'}
						experimentalBlurMethod={'dimezisBlurView'}
					>
						<Animated.View style={[styles.gap15, { paddingHorizontal, height: ACUNT }]}>
							<DashboardAccountDetails
								name={data?.user?.name || user?.name}
								icon={data?.user?.icon || user?.icon}
								email={data?.user?.email || user?.email}
								id={data?.user?._id || user?._id}
								level={'Level 12'}
							/>
							<DashboardBalanceCard currentBalance={data?.user?.currentBalance} />
						</Animated.View>
						<Animated.View style={innerContentAnimatedStyle}>
							<BlurView
								style={{
									flex: 1,
									paddingTop: responsive(40),
									gap: responsive(10),
									paddingHorizontal,
									paddingBottom: paddingVertical,
								}}
								intensity={10}
								tint="dark"
								experimentalBlurMethod={'dimezisBlurView'}
							>
								<DashoardDipositContainer />
								<DashboardSingerContainer
									images={data?.singerData?.singer?.map(
										(item) => item?.icon || ''
									)}
									singers={data?.singerData?.count}
									contests={data?.contestDetails}
									leagues={data?.leagues}
								/>

								<DashboardMenuList />
							</BlurView>
						</Animated.View>
					</BlurView>
				</Animated.View>
			</Animated.ScrollView>
			<DasboardTab />
			{isFetching || isSingerFetching ? (
				<BlurView
					style={refreshStyle}
					entering={FadeIn.delay(500)}
					exiting={FadeOut.delay(500)}
					tint="dark"
					experimentalBlurMethod={'dimezisBlurView'}
					intensity={10}
				>
					<LottieView
						source={JSONS.refresh}
						autoPlay
						loop
						style={{ flex: 1, width: 320, height: 320 }}
						entering={FadeIn.delay(250)}
						exiting={FadeOut.delay(100)}
					/>
				</BlurView>
			) : null}
		</GestureHandlerRootView>
	);
};

export default DashBoard;

const styles = StyleSheet.create({
	imageBG: {
		flex: 1,
		gap: responsive(20),
		paddingTop: responsive(25),
		paddingHorizontal: responsive(27),
		paddingBottom: 0,
	},
	gap15: {
		gap: responsive(15),
		paddingHorizontal: responsive(2),
		paddingTop: responsive(5),
		flex: 1,
	},
	main: {
		position: 'relative',
		borderRadius: responsive(40),
		// borderBottomEndRadius: 0,
		// borderBottomLeftRadius: 0,
		overflow: 'hidden',
		borderColor: '#0A7593',
		borderLeftWidth: responsive(1),
		borderTopWidth: responsive(1),
		elevation: responsive(25),
		shadowRadius: responsive(50),
		shadowColor: '#000',
		shadowOffset: {
			width: responsive(0),
			height: responsive(4),
		},
	},
	container: {
		// paddingTop: responsive(40),
		gap: responsive(5),
		// position: 'relative',
		overflow: 'hidden',
		position: 'relative',
		borderRadius: responsive(40),
		// borderBottomEndRadius: 0,
		// borderBottomLeftRadius: 0,
		// overflow: 'hidden',
		borderColor: '#0A7593',
		// borderLeftWidth: responsive(1),
		// borderTopWidth: responsive(1),
		elevation: responsive(25),
		shadowRadius: responsive(50),
		shadowColor: '#000',
		shadowOffset: {
			width: responsive(0),
			height: responsive(4),
		},
	},
	image: {
		position: 'absolute',
		right: 0,
		top: responsive(100),
		height: responsive(400),
		width: responsive(200),
		// backgroundColor: 'white',
	},
	scroll: { paddingHorizontal: 0, paddingVertical: 0, flex: 0 },
	scroll2: { paddingHorizontal: 0, paddingVertical: 0, flex: 0, flexGrow: 1 },
	header: {
		height: HEADER_HEIGHT,
		overflow: 'hidden',
		// backgroundColor: '#fff',
		// justifyContent: 'center',
	},
} as const);
