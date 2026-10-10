import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withDecay,
} from 'react-native-reanimated';

interface CardProps {
	title: string;
	color: string;
}

const defaultProps: CardProps = {
	title: 'Card Title',
	color: 'lightblue',
};

const GestureCard: React.FC<CardProps> = (props) => {
	const { title, color } = props;

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
					<Text style={styles.title}>{title}</Text>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

GestureCard.defaultProps = defaultProps;

const styles = StyleSheet.create({
	card: {
		borderRadius: 8,
		height: 150,
		justifyContent: 'center',
		padding: 10,
		width: 200,
	},
	container: {
		alignItems: 'center',
	},
	title: {
		fontSize: 18,
	},
});

export default GestureCard;
