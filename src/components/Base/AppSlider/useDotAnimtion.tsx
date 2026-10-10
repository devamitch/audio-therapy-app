import {
	clamp,
	Extrapolation,
	interpolate,
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import { DOT_SIZE } from '@/constants/env';
import { screenWidth } from '@/lib/utils';

const useDotAnimation = (scrollX: SharedValue<number>, index: number) => {
	const currentIndex = scrollX?.value <= 0 ? 0 : index;

	const isActive = useSharedValue(false);

	isActive.value = Math.floor(scrollX.value / screenWidth) === currentIndex;

	const animatedStyle = useAnimatedStyle(() => {
		const val = (scrollX.value / screenWidth) * DOT_SIZE * 2;

		const inputRange = [
			currentIndex * screenWidth - screenWidth / 2,
			currentIndex * screenWidth,
			currentIndex * screenWidth + screenWidth / 2,
		];

		const expand = interpolate(
			scrollX.value,
			inputRange,
			[DOT_SIZE * 2, DOT_SIZE, DOT_SIZE * 2],
			Extrapolation.CLAMP
		);

		const width = withSpring(clamp(expand, DOT_SIZE, DOT_SIZE * 2));

		return {
			transform: [{ translateX: withSpring(val) }],
			width,
			backgroundColor: isActive.value ? '#D9D9D9' : '#E0E0E0',
		};
	});

	return animatedStyle;
};

export default useDotAnimation;
