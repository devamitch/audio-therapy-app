import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withSpring,
} from 'react-native-reanimated';

interface SpinnerProps {
	color: string;
}

const defaultProps: SpinnerProps = {
	color: 'lightblue',
};

const SpinnerComponent: React.FC<SpinnerProps> = (props) => {
	const { color } = props;

	const rotate = useSharedValue(0);

	const gestureHandler = useAnimatedGestureHandler({
		onEnd: () => {
			rotate.value = withRepeat(
				withSequence(withSpring(360), withSpring(0, { damping: 2, stiffness: 80 })),
				-1,
				false
			);
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${rotate.value}deg` }],
		};
	});

	return (
		<View style={styles.container}>
			<PanGestureHandler onHandlerStateChange={gestureHandler}>
				<Animated.View style={[styles.spinner, { backgroundColor: color }, animatedStyle]}>
					<Text style={styles.text}>🔄</Text>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

SpinnerComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	spinner: {
		alignItems: 'center',
		borderRadius: 40,
		height: 80,
		justifyContent: 'center',
		width: 80,
	},
	text: {
		fontSize: 24,
	},
});

export default SpinnerComponent;
