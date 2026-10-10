import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

// Define the props interface
type ButtonProps = RectButtonProps & {
	children?: React.ReactNode;
	gradientStyle?: StyleProp<ViewStyle>;
	btnStyle?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
	colors?: (string | number)[];

	label: string;
	onPress: () => void;
	color: string;
};

// Default props
const defaultProps: ButtonProps = {
	label: 'Button',
	color: 'blue',
	onPress: () => {},
};

// const GesureButton: React.FC<ButtonProps> = (props) => {
// 	const { label, color, onPress } = props;

// 	// Shared value for button scale
// 	const scale = useSharedValue(1);

// 	// Animated gesture handler
// 	const gestureHandler = useAnimatedGestureHandler({
// 		onActive: () => {
// 			scale.value = withSpring(0.9);
// 		},
// 		onEnd: () => {
// 			scale.value = withSpring(1);
// 			runOnJS(onPress)(); // Run the onPress function on the JS thread
// 		},
// 	});

// 	// Animated style for button
// 	const animatedStyle = useAnimatedStyle(() => {
// 		return {
// 			transform: [{ scale: scale.value }],
// 		};
// 	});

// 	return (
// 		//@ts-ignore
// 		<TapGestureHandler onHandlerStateChange={gestureHandler}>
// 			<Animated.View style={[styles.button, { backgroundColor: color }, animatedStyle]}>
// 				<Text style={styles.label}>{label}</Text>
// 			</Animated.View>
// 		</TapGestureHandler>
// 	);
// };
const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

export const GestureButton: React.FC<ButtonProps> = ({
	children,
	gradientStyle,
	btnStyle,
	colors = ['rgba(21, 113, 139, 0.20)', 'rgba(65, 169, 199, 0.20)'],
	...props
}) => {
	const isPressed = useSharedValue(false);

	const animatedStyle = useAnimatedStyle(() => {
		const scale = withSpring(isPressed.value ? 0.9 : 1, { stiffness: 100 });

		const opacity = withTiming(isPressed.value ? 0.8 : 1, {
			duration: 150,
			easing: Easing.linear,
		});

		return {
			transform: [{ scale }],
			opacity,
			overflow: 'hidden',
			borderRadius: 20,
			flex: 1,
		};
	});

	return (
		<Animated.View style={[animatedStyle, btnStyle]}>
			<AnimatedRectButton
				style={{ flex: 1, overflow: 'hidden' }}
				onBegan={() => {
					isPressed.value = true;
				}}
				onActivated={() => {
					isPressed.value = true;
				}}
				onFailed={() => {
					isPressed.value = false;
				}}
				onCancelled={() => {
					isPressed.value = false;
				}}
				onEnded={() => {
					isPressed.value = false;
				}}
				onLongPress={() => {
					isPressed.value = false;
				}}
				{...props}
			>
				<BlurView
					style={{ overflow: 'hidden', flex: 1 }}
					tint="dark"
					experimentalBlurMethod={'dimezisBlurView'}
				>
					<LinearGradient colors={colors} style={gradientStyle}>
						{children}
					</LinearGradient>
				</BlurView>
			</AnimatedRectButton>
		</Animated.View>
	);
	// return (
	// 	<AnimatedRectButton style={[animatedStyle, btnStyle]} activeOpacity={0.2} {...props}>
	// 		<LinearGradient colors={colors} style={gradientStyle}>
	// 			{children}
	// 		</LinearGradient>
	// 	</AnimatedRectButton>
	// );
};

GestureButton.defaultProps = defaultProps;

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		borderRadius: 8,
		height: 50,
		justifyContent: 'center',
		width: 150,
	},

	label: {
		fontSize: 16,
	},
});

export default GestureButton;
