import { StyleSheet, ViewProps } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { LinearGradient, LinearGradientPoint } from 'expo-linear-gradient';

import type { ButtonProps } from '../experimental/Button';
import Button from '../experimental/Button';

import { FontSizeColorStyle } from '@/styles';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

type PrimaryButtonProps = ButtonProps & {
	outlineStyle?: ViewProps['style'];
	colors?: string[];
	location?: number[];
	start?: LinearGradientPoint;
	end?: LinearGradientPoint;
	gradientType?: 'type1' | 'type2' | 'type3' | 'type4';
};

export const PrimaryButton = ({
	labelStyle,
	style,
	outlineStyle,
	gradientType = 'type1',
	colors = gradientType === 'type1'
		? ['#125B6F', '#052F3B', '#00212A']
		: gradientType === 'type2'
			? ['#00495E', '#00BCFD']
			: gradientType === 'type3'
				? ['#003F3B', '#00667C']
				: ['#00BCFD', '#007097'],
	location = gradientType === 'type1' ? [0.25, 0.65, 1] : [0.3129, 1.4591],
	start = gradientType === 'type1' ? [0, 1] : [0, 0],
	end = gradientType === 'type1' ? [0.75, 1] : [1, 1],
	...props
}: PrimaryButtonProps) => {
	const isPressed = useSharedValue(false);

	const gestureHandler = Gesture.Tap()
		.onBegin(() => {
			isPressed.value = true;
		})
		.onFinalize(() => {
			isPressed.value = false;
		});

	const animatedStyle = useAnimatedStyle(() => {
		const scale = withSpring(isPressed.value ? 0.85 : 1, { stiffness: 100 });

		const opacity = withTiming(isPressed.value ? 0.7 : 1, {
			duration: 150,
			easing: Easing.linear,
		});

		return {
			transform: [{ scale }],
			opacity,
		};
	});

	const flattenStyle = labelStyle
		? Array.isArray(labelStyle)
			? {
					...FontSizeColorStyle['montserrat-500-16-white'],
					...(gradientType === 'type1'
						? styles.font
						: FontSizeColorStyle['poppins-400-18-white']),
					...StyleSheet.flatten([labelStyle]),
				}
			: {
					...FontSizeColorStyle['montserrat-500-16-white'],
					...(gradientType === 'type1'
						? styles.font
						: FontSizeColorStyle['poppins-400-18-white']),
					...labelStyle,
				}
		: {
				...FontSizeColorStyle['montserrat-500-16-white'],
				...(gradientType === 'type1'
					? styles.font
					: FontSizeColorStyle['poppins-400-18-white']),
				...labelStyle,
			};

	// return (
	// 	<GestureDetector gesture={gestureHandler}>
	// 		<AnimatedGradient
	// 			style={[styles?.outline, outlineStyle, animatedStyle]}
	// 			colors={colors}
	// 			start={start}
	// 			end={end}
	// 			// @ts-ignore
	// 			location={location}
	// 		>
	// 			<Button
	// 				style={style}
	// 				labelStyle={flattenStyle}
	// 				loadingColor={'white'}
	// 				outlineColor={'white'}
	// 				animate={false}
	// 				{...props}
	// 			/>
	// 		</AnimatedGradient>
	// 	</GestureDetector>
	// );
	return (
		<AnimatedGradient
			style={[styles?.outline, outlineStyle, animatedStyle]}
			colors={colors}
			start={start}
			end={end}
			// @ts-ignore
			location={location}
		>
			<Button
				style={style}
				labelStyle={flattenStyle}
				loadingColor={'white'}
				outlineColor={'white'}
				animate={false}
				{...props}
			/>
		</AnimatedGradient>
	);
};

const styles = StyleSheet.create({
	font: { fontFamily: 'DigifaceWide' },
	outline: { borderRadius: 7, maxHeight: 57, padding: 0, paddingVertical: 0 },
} as const);

export default PrimaryButton;
