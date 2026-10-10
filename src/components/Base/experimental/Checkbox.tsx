import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface CheckboxProps {
	isChecked: boolean;
	onToggle: () => void;
	color: string;
}

const defaultProps: CheckboxProps = {
	isChecked: false,
	color: 'lightblue',
	onToggle: () => {},
};

const CheckboxComponent: React.FC<CheckboxProps> = (props) => {
	const { isChecked, color, onToggle } = props;

	const scale = useSharedValue(isChecked ? 1 : 0);

	const gestureHandler = useAnimatedGestureHandler({
		onEnd: () => {
			onToggle();
			scale.value = withSpring(isChecked ? 0 : 1);
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	return (
		<View style={styles.container}>
			<TapGestureHandler onHandlerStateChange={gestureHandler}>
				<Animated.View style={[styles.checkbox, { borderColor: color }, animatedStyle]}>
					{isChecked && <Text style={styles.check}>✓</Text>}
				</Animated.View>
			</TapGestureHandler>
		</View>
	);
};

CheckboxComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	check: {
		fontSize: 18,
	},
	checkbox: {
		alignItems: 'center',
		borderRadius: 15,
		borderWidth: 2,
		height: 30,
		justifyContent: 'center',
		width: 30,
	},
	container: {
		alignItems: 'center',
	},
});

export default CheckboxComponent;
