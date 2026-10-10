import React from 'react';
import { ColorValue, StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { responsive } from '@/lib/utils/responsive';
import { FontSizeColorStyle } from '@/styles';

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

const Chip: React.FC<{
	text?: React.ReactNode;
	outlined?: boolean;
	colors?: ColorValue[];
	color?: ColorValue;
}> = ({ text, outlined = false, colors = ['#00D1FF', '#006582'], color = '#121212' }) => {
	const isPressed = useSharedValue(false);

	const gestureHandler = useAnimatedGestureHandler({
		onStart: () => {
			isPressed.value = true;
		},
		onEnd: () => {
			isPressed.value = false;
		},
		onActive: () => {
			isPressed.value = true;
		},
		onFail() {
			isPressed.value = false;
		},
		onFinish() {
			isPressed.value = false;
		},
		onCancel() {
			isPressed.value = false;
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		const scale = withSpring(isPressed.value ? 0.98 : 1, { stiffness: 100 });

		const opacity = withTiming(isPressed.value ? 0.7 : 1, {
			duration: 150,
			easing: Easing.linear,
		});

		return {
			transform: [{ scale }],
			opacity,
			backgroundColor: 'white',
		};
	});

	return (
		<AnimatedRectButton
			style={[styles.button, animatedStyle]}
			onBegan={() => {
				isPressed.value = true;
			}}
			onActivated={() => {
				isPressed.value = true;
			}}
			onFailed={() => {
				isPressed.value = true;
			}}
			onCancelled={() => {
				isPressed.value = true;
			}}
			onEnded={() => {
				isPressed.value = false;
			}}
			onLongPress={() => {
				isPressed.value = false;
			}}
		>
			<LinearGradient
				colors={colors}
				style={outlined ? styles.chipContainerOutline : styles.chipContainer}
				start={[0, 0.5]}
				end={[0.5, 1]}
			>
				{!outlined ? (
					<Text
						style={[
							FontSizeColorStyle['montserrat-600-sm-black'],
							styles.text,
							{ color, textShadowColor: color },
						]}
					>
						{text}
					</Text>
				) : (
					<Animated.View style={styles.view}>
						<Text
							style={[
								FontSizeColorStyle['montserrat-600-sm-primary-text'],
								styles.text,
							]}
						>
							{text}
						</Text>
					</Animated.View>
				)}
			</LinearGradient>
		</AnimatedRectButton>
	);
};

export default Chip;

const styles = StyleSheet.create({
	chipContainer: {
		borderRadius: responsive(6),
		paddingHorizontal: responsive(11),
		paddingVertical: responsive(6),
		width: 'auto',
		alignSelf: 'flex-start',
		alignItems: 'center',
		justifyContent: 'center',
		// flex: 1,
		overflow: 'hidden',
	},
	chipContainerOutline: {
		borderRadius: responsive(4),
		padding: responsive(1.6),
		overflow: 'hidden',

		width: 'auto',
		alignSelf: 'flex-start',
		flex: 1,
	},
	view: {
		borderRadius: responsive(5),
		width: 'auto',
		flex: 1,
		backgroundColor: 'black',
		paddingHorizontal: responsive(11),
		paddingVertical: responsive(2),
		borderWidth: 2,
		borderColor: 'transparent',
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		borderRadius: responsive(6),
		overflow: 'hidden',
		width: 'auto',
		alignSelf: 'flex-start',
	},
	text: {
		textAlign: 'center',
		textAlignVertical: 'center',
		textShadowColor: 'balck',
		textShadowOffset: { width: 0, height: 0 }, // Shadow offset
		textShadowRadius: 0.5,
	},
} as const);
