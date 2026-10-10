import { forwardRef } from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import {
	Gesture,
	GestureDetector,
	RectButton,
	RectButtonProps,
} from 'react-native-gesture-handler';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

import {
	ALL_COLORS,
	ButtonStyle,
	ButtonTextStyle,
	ColorStyle,
	LayoutStyle,
	responsive,
} from '@/styles';

export type ButtonProps = RectButtonProps & {
	variant?: 'contained' | 'outlined' | 'text' | 'link';
	backgroundColor?: keyof typeof ALL_COLORS;
	color?: keyof typeof ALL_COLORS;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	labelStyle?: StyleProp<TextStyle>;
	isLoading?: boolean;
	loadingColor?: keyof typeof ALL_COLORS;
	outlineColor?: keyof typeof ALL_COLORS;
	center?: boolean;
	spread?: boolean;
	row?: boolean;
	rounded?: boolean;
	label?: React.ReactNode;
	size?: 'sm' | 'md' | 'lg';
	rippleColor?: keyof typeof ALL_COLORS;
	rippleEffect?: boolean;
	scaleEffect?: boolean;
	animate?: boolean;
};

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

const Button = forwardRef<RectButton, ButtonProps>(
	(
		{
			variant = 'contained',
			backgroundColor,
			startIcon,
			endIcon,
			isLoading,
			label,
			loadingColor,
			style,
			center,
			spread,
			row,
			size = 'lg',
			rounded,
			onPress,
			rippleColor = 'primary',
			rippleEffect = true,
			scaleEffect = true,
			outlineColor,
			animate = true,
			...props
		},
		ref
	) => {
		const isPressed = useSharedValue(false);

		const gestureHandler = Gesture.Tap()
			.maxDuration(1000)
			.numberOfTaps(2)
			.onBegin(() => {
				isPressed.value = true;
			})
			.onTouchesUp(() => {
				isPressed.value = false;
				// if (onPress) {
				// 	runOnJS(onPress)();
				// }

				// runOnUI((greeting) => {
				// 	onPress();
				// })('Howdy');
			})

			.onTouchesCancelled(() => {
				isPressed.value = false;
			})
			.onEnd(() => {
				isPressed.value = false;
			});

		const animatedStyle = useAnimatedStyle(() => {
			const scale = withSpring(isPressed.value ? 0.985 : 1, { stiffness: 100 });

			const opacity = withTiming(isPressed.value ? 0.8 : 1, {
				duration: 150,
				easing: Easing.linear,
			});

			return {
				transform: scaleEffect ? [{ scale }] : undefined,
				opacity,
			};
		});

		const buttonStyle =
			variant === 'contained'
				? styles.contained
				: variant === 'outlined'
					? outlineColor
						? { ...styles.outlined, borderColor: ALL_COLORS[outlineColor] }
						: styles.outlined
					: variant === 'text'
						? styles.text
						: variant === 'link'
							? styles.link
							: styles.contained;

		const textStyle =
			size === 'md'
				? ButtonTextStyle.md
				: size === 'sm'
					? ButtonTextStyle.sm
					: ButtonTextStyle.base;

		const labelStyle = !props?.labelStyle
			? textStyle
			: Array.isArray(props?.labelStyle)
				? [...props?.labelStyle, textStyle]
				: [textStyle, props?.labelStyle];

		return animate ? (
			<GestureDetector gesture={gestureHandler}>
				<AnimatedRectButton
					ref={ref}
					style={[
						backgroundColor && ColorStyle[`bg-${backgroundColor}`],
						center && LayoutStyle.center,
						spread && LayoutStyle.between,
						row && LayoutStyle.row,
						rounded && styles.rounded,
						rippleEffect && { overflow: 'hidden' },
						size === 'md'
							? ButtonStyle.md
							: size === 'sm'
								? ButtonStyle.sm
								: ButtonStyle.base,

						buttonStyle,
						styles.buttonGap,
						style,
					]}
					onPress={onPress}
					rippleColor={rippleEffect && rippleColor ? ALL_COLORS[rippleColor] : undefined}
					{...props}
				>
					{isLoading ? (
						<ActivityIndicator
							size="small"
							color={ALL_COLORS[loadingColor || 'primary']}
						/>
					) : (
						startIcon || null
					)}
					{label ? <Text style={StyleSheet.flatten(labelStyle)}>{label}</Text> : null}
					{props.children}
					{endIcon}
				</AnimatedRectButton>
			</GestureDetector>
		) : (
			<GestureDetector gesture={gestureHandler}>
				<AnimatedRectButton
					ref={ref}
					style={[
						backgroundColor && ColorStyle[`bg-${backgroundColor}`],
						center && LayoutStyle.center,
						spread && LayoutStyle.between,
						row && LayoutStyle.row,
						rounded && styles.rounded,
						rippleEffect && { overflow: 'hidden' },
						size === 'md'
							? ButtonStyle.md
							: size === 'sm'
								? ButtonStyle.sm
								: ButtonStyle.base,

						buttonStyle,
						styles.buttonGap,
						style,
						animatedStyle,
					]}
					onPress={onPress}
					rippleColor={rippleEffect && rippleColor ? ALL_COLORS[rippleColor] : undefined}
					{...props}
				>
					{isLoading ? (
						<ActivityIndicator
							size="small"
							color={ALL_COLORS[loadingColor || 'primary']}
						/>
					) : (
						startIcon || null
					)}
					{label ? <Text style={StyleSheet.flatten(labelStyle)}>{label}</Text> : null}
					{props.children}
					{endIcon}
				</AnimatedRectButton>
			</GestureDetector>
		);
		// return animate ? (
		// 	<AnimatedRectButton
		// 		ref={ref}
		// 		style={[
		// 			backgroundColor && ColorStyle[`bg-${backgroundColor}`],
		// 			center && LayoutStyle.center,
		// 			spread && LayoutStyle.between,
		// 			row && LayoutStyle.row,
		// 			rounded && styles.rounded,
		// 			rippleEffect && { overflow: 'hidden' },
		// 			size === 'md'
		// 				? ButtonStyle.md
		// 				: size === 'sm'
		// 					? ButtonStyle.sm
		// 					: ButtonStyle.base,

		// 			buttonStyle,
		// 			styles.buttonGap,
		// 			style,
		// 		]}
		// 		onPress={onPress}
		// 		rippleColor={rippleEffect && rippleColor ? ALL_COLORS[rippleColor] : undefined}
		// 		{...props}
		// 	>
		// 		{isLoading ? (
		// 			<ActivityIndicator size="small" color={ALL_COLORS[loadingColor || 'primary']} />
		// 		) : (
		// 			startIcon || null
		// 		)}
		// 		{label ? <Text style={StyleSheet.flatten(labelStyle)}>{label}</Text> : null}
		// 		{props.children}
		// 		{endIcon}
		// 	</AnimatedRectButton>
		// ) : (
		// 	<AnimatedRectButton
		// 		ref={ref}
		// 		style={[
		// 			backgroundColor && ColorStyle[`bg-${backgroundColor}`],
		// 			center && LayoutStyle.center,
		// 			spread && LayoutStyle.between,
		// 			row && LayoutStyle.row,
		// 			rounded && styles.rounded,
		// 			rippleEffect && { overflow: 'hidden' },
		// 			size === 'md'
		// 				? ButtonStyle.md
		// 				: size === 'sm'
		// 					? ButtonStyle.sm
		// 					: ButtonStyle.base,

		// 			buttonStyle,
		// 			styles.buttonGap,
		// 			style,
		// 			animatedStyle,
		// 		]}
		// 		onPress={onPress}
		// 		rippleColor={rippleEffect && rippleColor ? ALL_COLORS[rippleColor] : undefined}
		// 		{...props}
		// 	>
		// 		{isLoading ? (
		// 			<ActivityIndicator size="small" color={ALL_COLORS[loadingColor || 'primary']} />
		// 		) : (
		// 			startIcon || null
		// 		)}
		// 		{label ? <Text style={StyleSheet.flatten(labelStyle)}>{label}</Text> : null}
		// 		{props.children}
		// 		{endIcon}
		// 	</AnimatedRectButton>
		// );
	}
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
	buttonGap: {
		gap: responsive(5),
	},
	contained: {
		// Add styles for contained variant
		borderWidth: 0,
	},
	link: {
		// Add styles for link variant
		// backgroundColor: 'transparent',
		borderWidth: 0,
		padding: 0,
	},
	outlined: {
		// Add styles for outlined variant
		borderWidth: 1,
	},
	rounded: {
		borderRadius: 100,
	},
	text: {
		// Add styles for text variant
		// backgroundColor: 'transparent',
		borderWidth: 0,
	},
});

export default Button;
