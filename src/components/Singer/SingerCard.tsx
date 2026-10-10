import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

import { responsive } from '@/styles';

interface SingerCardProps {
	index: number;
	image: string;
	name: string;
	translateX: Animated.SharedValue<number>;
	length: number;
}

const WIDTH = 180;

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const SingerCard: React.FC<SingerCardProps> = ({ index, image, name, translateX, length }) => {
	const animatedStyle = useAnimatedStyle(() => {
		const inputRange = [
			(index - 2) * WIDTH,
			(index - 1) * WIDTH,
			index * WIDTH,
			(index + 1) * WIDTH,
			(index + 2) * WIDTH,
		];

		const translateXValue = interpolate(
			translateX.value,
			inputRange,
			[-120, -10, 100, 210, 320],
			Extrapolate.CLAMP
		);

		const scale = interpolate(
			translateX.value,
			inputRange,
			[0.7, 0.9, 1.1, 0.9, 0.7],
			Extrapolate.CLAMP
		);

		const zIndex = interpolate(
			translateX.value,
			inputRange,
			[-5, -3, 1, -1, -5],
			Extrapolate.CLAMP
		);

		const translateY = interpolate(
			translateX.value,
			inputRange,
			[30, 20, 0, 20, 30],
			Extrapolate.CLAMP
		);

		const opacity = interpolate(
			translateX.value,
			inputRange,
			[0.97, 0.99, 1, 0.99, 0.97],
			Extrapolate.CLAMP
		);

		const height = interpolate(
			translateX.value,
			inputRange,
			[160, 200, 260, 200, 160],
			Extrapolate.CLAMP
		);

		return {
			transform: [{ translateX: translateXValue }, { scale }, { translateY }],
			opacity,
			zIndex,
			borderRadius: 6,
			height,
			overflow: 'hidden',
			backgroundColor: image ? '#818181' : 'transparent',
			width: WIDTH,
		};
	}, [image]);

	return (
		<Animated.Image
			style={[styles.card, animatedStyle]}
			source={{
				uri: image,
			}}
			resizeMode={'cover'}
		/>
	);
};

export default SingerCard;

const styles = StyleSheet.create({
	card: {
		borderRadius: responsive(20),
		elevation: WIDTH,
		// overflow: 'hidden',
		shadowColor: '#121212',
		shadowOffset: { height: 0, width: 0 },
		shadowOpacity: 1,
		shadowRadius: WIDTH,
		width: WIDTH,
		zIndex: 1,
		// backgroundColor: '#000000',
	},
});
