import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface TextInputProps {
	value: string;
	onChangeText: (text: string) => void;
	color: string;
}

const defaultProps: TextInputProps = {
	value: '',
	color: 'gray',
	onChangeText: () => {},
};

const GestureTextInput: React.FC<TextInputProps> = (props) => {
	const { value, color, onChangeText } = props;

	const scale = useSharedValue(1);

	const gestureHandler = useAnimatedGestureHandler({
		onStart: () => {
			scale.value = withSpring(0.95);
		},
		onEnd: () => {
			scale.value = withSpring(1);
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	return (
		// @ts-ignore
		<TapGestureHandler onHandlerStateChange={gestureHandler}>
			<Animated.View style={[styles.input, { borderColor: color }, animatedStyle]}>
				<TextInput
					style={styles.text}
					value={value}
					onChangeText={onChangeText}
					placeholder="Type here"
					clearButtonMode={'unless-editing'}
				/>
			</Animated.View>
		</TapGestureHandler>
	);
};

GestureTextInput.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	input: {
		borderRadius: 8,
		borderWidth: 1,
		height: 40,
		paddingHorizontal: 10,
		width: 200,
	},
	text: {
		flex: 1,
	},
});

export default GestureTextInput;
