import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface CarouselProps {
	items: string[];
	color: string;
}

const defaultProps: CarouselProps = {
	items: [],
	color: 'lightblue',
};

const CarouselComponent: React.FC<CarouselProps> = (props) => {
	const { items, color } = props;

	const scrollRef = useRef<ScrollView>(null);

	const translateX = useSharedValue(0);

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, context) => {
			context.startX = translateX.value;
		},
		onActive: (event, context) => {
			translateX.value = context.startX + event.translationX;
		},
		onEnd: (event) => {
			const snapTo = Math.round(translateX.value / 200);

			translateX.value = withSpring(snapTo * 200);
			if (scrollRef.current) {
				scrollRef.current.scrollTo({ x: snapTo * 200 });
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
				<Animated.View style={[styles.carousel, { borderColor: color }, animatedStyle]}>
					<ScrollView
						ref={scrollRef}
						horizontal
						showsHorizontalScrollIndicator={false}
						snapToInterval={200}
					>
						{items.map((item, index) => (
							<View
								key={index}
								style={[styles.carouselItem, { backgroundColor: color }]}
							>
								<Text style={styles.carouselText}>{item}</Text>
							</View>
						))}
					</ScrollView>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

CarouselComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	carousel: {
		borderWidth: 2,
		height: 150,
		overflow: 'hidden',
		width: 200,
	},
	carouselItem: {
		alignItems: 'center',
		height: 150,
		justifyContent: 'center',
		width: 200,
	},
	carouselText: {
		fontSize: 18,
	},
	container: {
		alignItems: 'center',
	},
});

export default CarouselComponent;
