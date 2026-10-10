import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface RangeSliderProps {
	min: number;
	max: number;
	lowerValue: number;
	upperValue: number;
	onValuesChange: (lowerValue: number, upperValue: number) => void;
	color: string;
}

const defaultProps: RangeSliderProps = {
	min: 0,
	max: 100,
	lowerValue: 20,
	upperValue: 80,
	color: 'lightblue',
	onValuesChange: () => {},
};

const RangeSliderComponent: React.FC<RangeSliderProps> = (props) => {
	const { min, max, lowerValue, upperValue, color, onValuesChange } = props;

	const trackWidth = 200;

	const trackHeight = 10;

	const lowerThumb = useSharedValue(((lowerValue - min) / (max - min)) * trackWidth);

	const upperThumb = useSharedValue(((upperValue - min) / (max - min)) * trackWidth);

	const adjustValues = (newX: number) => {
		const newLowerValue = (newX / trackWidth) * (max - min) + min;

		const newUpperValue = (newX / trackWidth) * (max - min) + min;

		lowerThumb.value = withSpring(Math.min(max, Math.max(min, newLowerValue)));
		upperThumb.value = withSpring(Math.min(max, Math.max(min, newUpperValue)));
		onValuesChange(lowerThumb.value, upperThumb.value);
	};

	const gestureHandler = useAnimatedGestureHandler({
		onActive: (event) => {
			runOnJS(adjustValues)(event.translationX);
		},
	});

	const lowerThumbStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: lowerThumb.value }],
			backgroundColor: color,
		};
	});

	const upperThumbStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: upperThumb.value }],
			backgroundColor: color,
		};
	});

	return (
		<View style={styles.container}>
			<View style={styles.track}>
				<PanGestureHandler onGestureEvent={gestureHandler}>
					<Animated.View style={styles.progressBar}>
						<Animated.View style={[styles.lowerThumb, lowerThumbStyle]}>
							<Text style={styles.thumbText}>{lowerValue}</Text>
						</Animated.View>
						<Animated.View style={[styles.upperThumb, upperThumbStyle]}>
							<Text style={styles.thumbText}>{upperValue}</Text>
						</Animated.View>
					</Animated.View>
				</PanGestureHandler>
			</View>
		</View>
	);
};

RangeSliderComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	lowerThumb: {
		alignItems: 'center',
		borderRadius: 10,
		height: 20,
		justifyContent: 'center',
		width: 20,
	},
	progressBar: {
		flexDirection: 'row',
	},
	thumbText: {
		color: 'white',
		fontSize: 12,
	},
	track: {
		backgroundColor: 'lightgray',
		height: 10,
		width: 200,
	},
	upperThumb: {
		alignItems: 'center',
		borderRadius: 10,
		height: 20,
		justifyContent: 'center',
		width: 20,
	},
});

export default RangeSliderComponent;
