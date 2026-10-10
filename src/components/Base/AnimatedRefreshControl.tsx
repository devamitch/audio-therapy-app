import { RefreshControl } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	FadeIn,
	FadeOut,
	SharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

import { JSONS } from '@/assets';
import { windowWidth } from '@/lib/utils';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const AnimatedControl = Animated.createAnimatedComponent(RefreshControl);

const RefreshIndicator = ({ loading }: { loading?: boolean }) => {
	const refreshStyle = useAnimatedStyle(
		() => ({
			height: withTiming(loading ? windowWidth / 2 : 0, {
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			}),
			width: withTiming(loading ? windowWidth / 2 : 0, {
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			}),
			flex: 1,
			opacity: withTiming(loading ? 1 : 0, {
				duration: 500,
				easing: Easing.linear,
			}),
		}),
		[loading]
	);

	return (
		<AnimatedLottieView
			source={JSONS.refresh}
			autoPlay
			loop
			style={refreshStyle}
			// duration={1000}
			entering={FadeIn.delay(500)}
			exiting={FadeOut.delay(500)}
		/>
	);
};

const AnimatedRefreshControl = ({
	loading,
	onRefresh,
}: {
	loading: boolean | SharedValue<boolean>;
	onRefresh?: (() => void) | SharedValue<(() => void) | undefined> | undefined;
}) => {
	const refreshStyle = useAnimatedStyle(
		() => ({
			minHeight: withTiming(loading ? windowWidth / 2 : 0, {
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			}),
			minWidth: withTiming(loading ? windowWidth : 0, {
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			}),
			alignItems: 'center',
			justifyContent: 'center',
			flex: 1,
			opacity: withTiming(loading ? 1 : 0, {
				duration: 500,
				easing: Easing.linear,
			}),
		}),
		[loading]
	);

	return (
		<AnimatedControl
			refreshing={loading}
			onRefresh={onRefresh}
			colors={['transparent']}
			tintColor="transparent"
			style={refreshStyle}
			progressViewOffset={-10}
			entering={FadeIn.delay(500)}
			exiting={FadeOut.delay(500)}
		>
			<Animated.View
				style={refreshStyle}
				entering={FadeIn.delay(500)}
				exiting={FadeOut.delay(500)}
			>
				<RefreshIndicator loading={!!loading} />
			</Animated.View>
		</AnimatedControl>
	);
};

export default AnimatedRefreshControl;
