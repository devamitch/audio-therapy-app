import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withDecay,
} from 'react-native-reanimated';

interface SliderProps {
	value: number;
	onValueChange: (value: number) => void;
	color: string;
}

const defaultProps: SliderProps = {
	value: 50,
	color: 'lightblue',
	onValueChange: () => {},
};

const SliderComponent: React.FC<SliderProps> = (props) => {
	const { value, color, onValueChange } = props;

	const translateX = useSharedValue(0);

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, context) => {
			context.startX = translateX.value;
		},
		onActive: (event, context) => {
			translateX.value = context.startX + event.translationX;
		},
		onEnd: (event) => {
			translateX.value = withDecay({ velocity: event.velocityX });
			const newValue = (translateX.value / 200) * 100; // Adjust this according to your slider range

			onValueChange(newValue);
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		};
	});

	return (
		<View style={styles.container}>
			<PanGestureHandler
				onGestureEvent={gestureHandler}
				onHandlerStateChange={gestureHandler}
			>
				<Animated.View style={[styles.slider, { backgroundColor: color }, animatedStyle]}>
					<Text style={styles.value}>{Math.round(value)}</Text>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

SliderComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	slider: {
		alignItems: 'center',
		borderRadius: 20,
		height: 40,
		justifyContent: 'center',
		width: 200,
	},
	value: {
		color: 'white',
		fontSize: 18,
	},
});

export default SliderComponent;

interface SliderProps {
	value: number;
	onValueChange: (value: number) => void;
	color: string;
}

const defaultProps: SliderProps = {
	value: 50,
	color: 'lightblue',
	onValueChange: () => {},
};

const SliderComponent: React.FC<SliderProps> = (props) => {
	const { value, color, onValueChange } = props;

	const translateX = useSharedValue(0);

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, context) => {
			context.startX = translateX.value;
		},
		onActive: (event, context) => {
			translateX.value = context.startX + event.translationX;
		},
		onEnd: (event) => {
			translateX.value = withDecay({ velocity: event.velocityX });
			const newValue = (translateX.value / 200) * 100; // Adjust this according to your slider range

			onValueChange(newValue);
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		};
	});

	return (
		<View style={styles.container}>
			<PanGestureHandler
				onGestureEvent={gestureHandler}
				onHandlerStateChange={gestureHandler}
			>
				<Animated.View style={[styles.slider, { backgroundColor: color }, animatedStyle]}>
					<Text style={styles.value}>{Math.round(value)}</Text>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

SliderComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	slider: {
		alignItems: 'center',
		borderRadius: 20,
		height: 40,
		justifyContent: 'center',
		width: 200,
	},
	value: {
		color: 'white',
		fontSize: 18,
	},
});

export default SliderComponent;
