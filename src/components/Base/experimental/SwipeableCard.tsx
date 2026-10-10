import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withDecay,
} from 'react-native-reanimated';

interface SwipeableCardProps {
	content: string;
	color: string;
	onSwipe: () => void;
}

const defaultProps: SwipeableCardProps = {
	content: '',
	color: 'lightblue',
	onSwipe: () => {},
};

const SwipeableCardComponent: React.FC<SwipeableCardProps> = (props) => {
	const { content, color, onSwipe } = props;

	const translateX = useSharedValue(0);

	const gestureHandler = useAnimatedGestureHandler({
		onStart: () => {
			translateX.value = 0;
		},
		onActive: (event) => {
			translateX.value = event.translationX;
		},
		onEnd: (event) => {
			if (event.translationX > 100) {
				runOnJS(onSwipe)();
			} else {
				translateX.value = withDecay({ velocity: event.velocityX });
			}
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
				<Animated.View style={[styles.card, { backgroundColor: color }, animatedStyle]}>
					<Text style={styles.cardText}>{content}</Text>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

SwipeableCardComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	card: {
		borderRadius: 8,
		height: 150,
		justifyContent: 'center',
		padding: 20,
		width: 300,
	},
	cardText: {
		fontSize: 18,
	},
	container: {
		alignItems: 'center',
	},
});

export default SwipeableCardComponent;
