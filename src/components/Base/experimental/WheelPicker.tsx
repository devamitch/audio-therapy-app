import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
	Extrapolate,
	interpolate,
	useDerivedValue,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface WheelPickerProps {
	options: string[];
	onValueChange: (selectedValue: string) => void;
	initialIndex: number;
	color: string;
}

const defaultProps: WheelPickerProps = {
	options: [],
	onValueChange: () => {},
	initialIndex: 0,
	color: 'lightblue',
};

const WheelPickerComponent: React.FC<WheelPickerProps> = (props) => {
	const { options, onValueChange, initialIndex, color } = props;

	const scrollY = useSharedValue(0);

	const snapPoints = options.map((_, index) => -index * 40);

	const currentSnapPoint = useDerivedValue(() => {
		return snapPoints.reduce((acc, point) => {
			return Math.abs(scrollY.value - point) < Math.abs(scrollY.value - acc) ? point : acc;
		}, snapPoints[0]);
	});

	const panGestureHandler = useRef(null);

	const itemStyles = options.map((option, index) => {
		return {
			translateY: interpolate(
				scrollY.value,
				snapPoints,
				snapPoints.map((_, i) => (index - i) * 40),
				Extrapolate.CLAMP
			),
		};
	});

	const selectedValue = useDerivedValue(() => {
		const selectedIndex = options.findIndex((_, index) => {
			return scrollY.value === currentSnapPoint.value - index * 40;
		});

		return options[selectedIndex];
	});

	return (
		<View style={styles.container}>
			<View style={styles.mask} />
			<PanGestureHandler
				ref={panGestureHandler}
				onGestureEvent={(event) => {
					scrollY.value = event.nativeEvent.translationY;
				}}
				onHandlerStateChange={(event) => {
					if (event.nativeEvent.state === State.END) {
						scrollY.value = withSpring(currentSnapPoint.value, {
							damping: 2,
							stiffness: 50,
						});
						onValueChange(selectedValue.value);
					}
				}}
			>
				<Animated.View style={styles.scrollContainer}>
					<Animated.View style={styles.options}>
						{itemStyles.map((style, index) => (
							<Animated.View
								key={index}
								style={[
									styles.option,
									{
										transform: [{ translateY: style.translateY }],
										backgroundColor: color,
									},
								]}
							>
								<Text style={styles.optionText}>{options[index]}</Text>
							</Animated.View>
						))}
					</Animated.View>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

WheelPickerComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	mask: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		bottom: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
	},
	option: {
		alignItems: 'center',
		height: 40,
		justifyContent: 'center',
	},
	optionText: {
		color: 'white',
		fontSize: 20,
	},
	options: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	scrollContainer: {
		height: 200,
	},
});

export default WheelPickerComponent;
