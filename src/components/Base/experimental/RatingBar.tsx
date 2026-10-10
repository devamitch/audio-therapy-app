import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface RatingBarProps {
	totalStars: number;
	rating: number;
	color: string;
	onRatingChange: (rating: number) => void;
}

const defaultProps: RatingBarProps = {
	totalStars: 5,
	rating: 0,
	color: 'lightblue',
	onRatingChange: () => {},
};

const RatingBarComponent: React.FC<RatingBarProps> = (props) => {
	const { totalStars, rating, color, onRatingChange } = props;

	const starWidth = 40;

	const ratingValue = useSharedValue(rating);

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, context) => {
			context.startX = ratingValue.value;
		},
		onActive: (event, context) => {
			ratingValue.value = context.startX + event.translationX / starWidth;
		},
		onEnd: () => {
			ratingValue.value = withSpring(Math.min(totalStars, Math.max(0, ratingValue.value)));
			onRatingChange(ratingValue.value);
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: ratingValue.value * starWidth }],
		};
	});

	return (
		<View style={styles.container}>
			<PanGestureHandler
				onGestureEvent={gestureHandler}
				onHandlerStateChange={gestureHandler}
			>
				<Animated.View style={[styles.ratingBar, animatedStyle]}>
					{Array.from({ length: totalStars }).map((_, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => onRatingChange(index + 1)}
							style={styles.star}
						>
							<Text
								style={[
									styles.starText,
									{ color: index < rating ? color : 'gray' },
								]}
							>
								★
							</Text>
						</TouchableOpacity>
					))}
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

RatingBarComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	ratingBar: {
		flexDirection: 'row',
	},
	star: {
		alignItems: 'center',
		height: 40,
		justifyContent: 'center',
		width: 40,
	},
	starText: {
		fontSize: 20,
	},
});

export default RatingBarComponent;
