import { StyleSheet } from 'react-native';
import { GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	FadeIn,
	FadeOut,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import { useQuery } from '@tanstack/react-query';
import { BlurView as ExpoBlur } from 'expo-blur';
import Lottie from 'lottie-react-native';

import { JSONS } from '@/assets';
import { SingeerBackdrop, SingerCarousel, SingerMusicPlayerList } from '@/components/Singer';
import { getArtists, SingersResponse } from '@/lib/server/artists';
import { isAndroid, windowHeight, windowWidth } from '@/lib/utils';
import { FontSizeColorStyle, responsive } from '@/styles';

const BlurView = Animated.createAnimatedComponent(ExpoBlur);

const LottieView = Animated.createAnimatedComponent(Lottie);

const width = windowWidth;

const WIDTH = 180;

const SingersScreen: React.FC = () => {
	const ref = useAnimatedRef<Animated.FlatList<SingersResponse>>();

	const ref2 = useAnimatedRef<Animated.ScrollView>();

	const translationX = useSharedValue(0);

	const scrollX = useSharedValue(0);

	const top = useHeaderHeight();

	const { bottom } = useSafeAreaInsets();

	const height2 = windowHeight - (top + bottom);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			translationX.value = event.contentOffset.x;
			scrollX.value = event.contentOffset.x;
			const sIndex = Math.floor(event.contentOffset.x / WIDTH);

			const translateY = -((event.contentOffset.x / WIDTH) * height2);

			const offset = sIndex * width;

			ref?.current?.scrollToIndex({
				index: sIndex,
				animated: true,
			});
			ref2?.current?.scrollTo({ y: translateY, animated: true });
		},
	});

	const {
		data = [],
		isFetching,
		isLoading,
		refetch,
	} = useQuery({
		queryFn: getArtists,
		queryKey: ['getArtists2'],
	});

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

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SingeerBackdrop
				data={[...data, {}, {}]}
				translateX={translationX}
				animtedref={ref}
				animtedref2={ref2}
			/>
			<Animated.ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'center',
					overflow: 'hidden',
					paddingHorizontal: 25,
					paddingTop: 150,
					paddingBottom: 120,
				}}
				refreshControl={
					<RefreshControl
						onRefresh={async () => {
							await refetch();
						}}
						tintColor={'transparent'}
						titleColor={'transparent'}
						colors={['transparent']}
						refreshing={false}
					/>
				}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				scrollToOverflowEnabled={false}
			>
				<SingerCarousel
					data={[...data, {}]}
					scrollHandler={scrollHandler}
					translateX={translationX}
					scrollX={scrollX}
				/>
				{isAndroid ? null : (
					<SingerMusicPlayerList
						data={[...data, {}, {}]}
						translateX={translationX}
						animtedref={ref}
						animtedref2={ref2}
					/>
				)}
			</Animated.ScrollView>
			{isFetching ? (
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

export default SingersScreen;

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
