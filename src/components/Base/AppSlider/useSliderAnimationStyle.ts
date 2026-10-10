import { Dimensions } from 'react-native';
import type Animated from 'react-native-reanimated';
import {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

const useSliderAnimationStyle = (scrollX: Animated.SharedValue<number>, index: number) => {
	const isActive = useSharedValue(false);

	isActive.value = Math.floor(scrollX.value / screenWidth) === index;

	const animatedStyle = useAnimatedStyle(() => {
		const scale = interpolate(
			scrollX.value,
			[(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
			[0.999, 1, 0.999]
		);

		const opacity = interpolate(
			scrollX.value,
			[(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
			[0.5, 1, 0.5]
		);

		const translateY = interpolate(
			scrollX.value,
			[(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
			[1, 0, 1]
		);

		return {
			transform: [{ scale }, { translateY }],
			opacity: withTiming(isActive.value ? 1 : opacity, {
				duration: 300,
				easing: Easing.ease,
			}),
		};
	});

	return animatedStyle;
};

export default useSliderAnimationStyle;
