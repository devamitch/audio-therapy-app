import { useLayoutEffect, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
	Easing,
	Extrapolation,
	interpolate,
	runOnJS,
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import DotContainer from './DotsContainer';

import { screenWidth } from '@/lib/utils';
import { responsive } from '@/styles';

const Button = Animated.createAnimatedComponent(Pressable);

const MaterialIconsIcon = Animated.createAnimatedComponent(MaterialIcons);

const LinearGradientContent = Animated.createAnimatedComponent(LinearGradient);

interface ActionContainerProps {
	currentIndex: number;
	introScreensLength: number;
	handleNext: () => void;
	handleSkip: () => void;
	dotStyle: ViewStyle;
	scrollX: SharedValue<number>;
}

const width = 100 as const;

const ActionContainer: React.FC<ActionContainerProps> = ({
	introScreensLength,
	handleNext,
	handleSkip,
	dotStyle,
	scrollX,
	currentIndex,
}) => {
	const cond = useSharedValue(currentIndex);

	const isPressed = useSharedValue(false);

	const [iconsSize, setIconSize] = useState(19);

	const [text, setText] = useState('Keep sliding ...');

	useLayoutEffect(() => {
		cond.value = withTiming(currentIndex, {
			duration: 500,
			easing: Easing.inOut(Easing.ease),
		});
		// iconsSize.value = withTiming(currentIndex === introScreensLength ? 30 : 19, {
		// 	duration: 500,
		// 	easing: Easing.inOut(Easing.ease),
		// });
		withTiming(runOnJS(setIconSize)(currentIndex === introScreensLength - 1 ? 30 : 19), {
			duration: 1000,
			easing: Easing.inOut(Easing.ease),
		});
		withTiming(
			runOnJS(setText)(
				currentIndex === introScreensLength - 1
					? 'Start Your Journey'
					: currentIndex === 0
						? 'Keep sliding ...'
						: 'Keep sliding'
			),
			{
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			}
		);
	}, [cond, currentIndex, iconsSize, introScreensLength, scrollX?.value]);

	const animateTextStyle = useAnimatedStyle(() => {
		const currentIndex2 = Math.round(scrollX?.value / screenWidth);

		const inputRange = [
			currentIndex2 * screenWidth - screenWidth / 2,
			currentIndex2 * screenWidth,
			currentIndex2 * screenWidth + screenWidth / 2,
		];

		const width2 = interpolate(
			scrollX.value,
			inputRange,
			[
				scrollX.value === 0 ? 30 : currentIndex2 === introScreensLength - 1 ? 80 : 0,
				scrollX.value === 0 ? 70 : currentIndex2 === introScreensLength - 1 ? 150 : 0,
				scrollX.value === 0 ? 30 : currentIndex2 === introScreensLength - 1 ? 80 : 0,
			],
			Extrapolation.CLAMP
		);

		const fontSize = interpolate(
			scrollX.value,
			inputRange,
			[0, currentIndex2 === 0 ? 11 : currentIndex2 === introScreensLength - 1 ? 16 : 0, 0],
			Extrapolation.CLAMP
		);

		const fontFamily1 = interpolate(
			scrollX.value,
			inputRange,
			[0, currentIndex2 === 0 ? 11 : currentIndex2 === introScreensLength - 1 ? 16 : 0, 0],
			Extrapolation.CLAMP
		);

		return {
			width: width2,
			fontSize,
			fontFamily: fontFamily1 === 0 ? 'Heebo-Medium' : 'Poppins-ExtraBold',
			color: 'white',
		};
	}, [cond]);

	const animatedButtonStyle = useAnimatedStyle(() => {
		const currentIndex3 = scrollX?.value / screenWidth;

		const currentIndex2 = Math.round(currentIndex3);

		const inputRange = [
			currentIndex2 * screenWidth - screenWidth / 2,
			currentIndex2 * screenWidth,
			currentIndex2 * screenWidth + screenWidth / 2,
		];

		const borderRadius = interpolate(
			scrollX.value,
			inputRange,
			[
				100,
				currentIndex2 === 0 ? 5 : currentIndex2 === introScreensLength - 1 ? 10 : 100,
				100,
			],
			Extrapolation.CLAMP
		);

		const width2 = interpolate(
			scrollX.value,
			inputRange,
			[
				31,
				currentIndex2 === 0
					? 120
					: currentIndex2 === introScreensLength - 1
						? screenWidth - 80
						: 31,
				31,
			],
			Extrapolation.CLAMP
		);

		const height = interpolate(
			scrollX.value,
			inputRange,
			[31, currentIndex2 === 0 ? 31 : currentIndex2 === introScreensLength - 1 ? 47 : 31, 31],
			Extrapolation.CLAMP
		);

		const translateY = interpolate(
			scrollX.value,
			inputRange,
			[0, currentIndex2 === introScreensLength - 1 ? -50 : 0, 0],
			Extrapolation.CLAMP
		);

		const translateX = interpolate(
			scrollX.value,
			inputRange,
			[0, currentIndex2 === introScreensLength - 1 ? -70 : 0, 0],
			Extrapolation.CLAMP
		);

		return {
			overflow: 'hidden',
			borderRadius,
			height,
			width: width2,
			opacity: withTiming(isPressed.value ? 0.9 : 1, {
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			}),
			backgroundColor: 'white',
			transform: [
				{
					translateY,
				},
				{
					translateX,
				},
				{
					scale: withTiming(isPressed.value ? 0.9 : 1, {
						duration: 500,
						easing: Easing.inOut(Easing.ease),
					}),
				},
			],
		};
	}, [cond]);

	const animatedGradientStyle = useAnimatedStyle(() => {
		const currentIndex3 = scrollX?.value / screenWidth;

		const currentIndex2 = Math.round(currentIndex3);

		const inputRange = [
			currentIndex2 * screenWidth - screenWidth / 2,
			currentIndex2 * screenWidth,
			currentIndex2 * screenWidth + screenWidth / 2,
		];

		const gap = interpolate(
			scrollX.value,
			inputRange,
			[0, currentIndex2 === 0 ? 5 : currentIndex2 === introScreensLength - 1 ? 10 : 0, 0],
			Extrapolation.CLAMP
		);

		const paddingHorizontal = interpolate(
			scrollX.value,
			inputRange,
			[0, currentIndex2 === 0 ? 12 : currentIndex2 === introScreensLength - 1 ? 25 : 0, 0],
			Extrapolation.CLAMP
		);

		const paddingVertical = interpolate(
			scrollX.value,
			inputRange,
			[0, cond.value === 0 ? 6 : cond.value === introScreensLength - 1 ? 12 : 0, 0],
			Extrapolation.CLAMP
		);

		const justifyContent = interpolate(
			scrollX.value,
			inputRange,
			[0, currentIndex2 === 0 || currentIndex2 === introScreensLength - 1 ? 1 : 0, 0],
			Extrapolation.EXTEND
		);

		return {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: justifyContent ? 'space-between' : 'center',
			flex: 1,
			width: '100%',
			gap,
			paddingHorizontal,
			paddingVertical,
			overflow: 'hidden',
		};
	}, [cond]);

	return (
		<Animated.View style={styles.actionContainer}>
			<View style={styles.dotContainer}>
				<DotContainer numDots={introScreensLength} dotStyle={dotStyle} />
			</View>
			<Button
				style={animatedButtonStyle}
				onPress={handleNext}
				onPressIn={() => (isPressed.value = true)}
				onPressOut={() => (isPressed.value = false)}
			>
				<LinearGradientContent
					colors={['#006284', '#001E29']}
					start={{ x: 0, y: 0.2 }}
					end={{ x: 0.7, y: 1 }}
					style={animatedGradientStyle}
				>
					<Animated.Text numberOfLines={1} adjustsFontSizeToFit style={animateTextStyle}>
						{text}
					</Animated.Text>
					<MaterialIconsIcon
						name="navigate-next"
						size={responsive(iconsSize)}
						color="white"
					/>
				</LinearGradientContent>
			</Button>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	actionContainer: {
		alignItems: 'center',
		bottom: responsive(20),
		flexDirection: 'row',
		justifyContent: 'space-between',
		left: 0,
		paddingHorizontal: responsive(40),
		paddingVertical: responsive(20),
		position: 'absolute',
		right: 0,
	},
	dotContainer: {
		alignItems: 'center',
		// flex: 1,
	},
});

export default ActionContainer;
