import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface ToggleProps {
	options: string[];
	selectedOption: string;
	onOptionChange: (option: string) => void;
	color: string;
}

const defaultProps: ToggleProps = {
	options: [],
	selectedOption: '',
	color: 'lightblue',
	onOptionChange: () => {},
};

const ToggleComponent: React.FC<ToggleProps> = (props) => {
	const { options, selectedOption, color, onOptionChange } = props;

	const optionWidth = 80;

	const selectedIndex = options.indexOf(selectedOption);

	const translateX = useSharedValue(selectedIndex * optionWidth);

	const switchOption = (optionIndex: number) => {
		translateX.value = withSpring(optionIndex * optionWidth);
		onOptionChange(options[optionIndex]);
	};

	const gestureHandler = useAnimatedGestureHandler({
		onEnd: (event) => {
			const newIndex = Math.min(
				options.length - 1,
				Math.max(0, Math.floor(event.x / optionWidth))
			);

			runOnJS(switchOption)(newIndex);
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
				<Animated.View style={styles.toggle}>
					{options.map((option, index) => (
						<TouchableOpacity key={index} onPress={() => switchOption(index)}>
							<View style={styles.option}>
								<Text
									style={[
										styles.optionText,
										{ color: option === selectedOption ? 'white' : 'black' },
									]}
								>
									{option}
								</Text>
							</View>
						</TouchableOpacity>
					))}
					<Animated.View
						style={[
							styles.selectedIndicator,
							{ backgroundColor: color },
							animatedStyle,
						]}
					/>
				</Animated.View>
			</TapGestureHandler>
		</View>
	);
};

ToggleComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	option: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	optionText: {
		fontSize: 16,
	},
	selectedIndicator: {
		bottom: 0,
		height: 2,
		position: 'absolute',
	},
	toggle: {
		flexDirection: 'row',
		height: 40,
	},
});

export default ToggleComponent;
