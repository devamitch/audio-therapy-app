import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

interface StepperProps {
	value: number;
	minValue: number;
	maxValue: number;
	step: number;
	color: string;
	onValueChange: (value: number) => void;
}

const defaultProps: StepperProps = {
	value: 0,
	minValue: 0,
	maxValue: 100,
	step: 1,
	color: 'lightblue',
	onValueChange: () => {},
};

const StepperComponent: React.FC<StepperProps> = (props) => {
	const { value, minValue, maxValue, step, color, onValueChange } = props;

	const stepperValue = useSharedValue(value);

	const incrementValue = () => {
		const newValue = Math.min(maxValue, stepperValue.value + step);

		stepperValue.value = withSpring(newValue);
		onValueChange(newValue);
	};

	const decrementValue = () => {
		const newValue = Math.max(minValue, stepperValue.value - step);

		stepperValue.value = withSpring(newValue);
		onValueChange(newValue);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={decrementValue}>
				<Text style={styles.button}>-</Text>
			</TouchableOpacity>
			<PanGestureHandler>
				<Animated.View style={[styles.stepper, { borderColor: color }]}>
					<Text style={styles.stepperText}>{stepperValue.value}</Text>
				</Animated.View>
			</PanGestureHandler>
			<TouchableOpacity onPress={incrementValue}>
				<Text style={styles.button}>+</Text>
			</TouchableOpacity>
		</View>
	);
};

StepperComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	button: {
		fontSize: 24,
	},
	container: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	stepper: {
		alignItems: 'center',
		borderWidth: 2,
		height: 40,
		justifyContent: 'center',
		width: 60,
	},
	stepperText: {
		fontSize: 20,
	},
});

export default StepperComponent;
