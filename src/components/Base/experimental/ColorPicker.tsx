import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface ColorPickerProps {
	colors: string[];
	selectedColor: string;
	onColorChange: (color: string) => void;
}

const defaultProps: ColorPickerProps = {
	colors: [],
	selectedColor: 'lightblue',
	onColorChange: () => {},
};

const ColorPickerComponent: React.FC<ColorPickerProps> = (props) => {
	const { colors, selectedColor, onColorChange } = props;

	const translateX = useSharedValue(0);

	const gestureHandler = useAnimatedGestureHandler({
		onEnd: (event) => {
			const newIndex = Math.round(event.translationX / 40);

			const newColor = colors[newIndex];

			translateX.value = withSpring(newIndex * 40);
			onColorChange(newColor);
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		};
	});

	return (
		<View style={styles.container}>
			<TapGestureHandler onHandlerStateChange={gestureHandler}>
				<Animated.View style={[styles.colorPicker, animatedStyle]}>
					{colors.map((color, index) => (
						<TouchableOpacity key={index} onPress={() => onColorChange(color)}>
							<View style={[styles.color, { backgroundColor: color }]} />
						</TouchableOpacity>
					))}
				</Animated.View>
			</TapGestureHandler>
		</View>
	);
};

ColorPickerComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	color: {
		height: 40,
		width: 40,
	},
	colorPicker: {
		flexDirection: 'row',
		height: 40,
		width: 200,
	},
	container: {
		alignItems: 'center',
	},
});

export default ColorPickerComponent;
