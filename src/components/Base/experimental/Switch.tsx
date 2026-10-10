import React from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import { FontSizeColorStyle } from '@/styles';

interface SwitchProps {
	value: boolean;
	onValueChange: (value: boolean) => void;
	label: string;
}

const defaultProps: SwitchProps = {
	value: false,
	label: 'lightblue',
	onValueChange: () => {},
};

const SwitchComponent: React.FC<SwitchProps> = (props) => {
	const { value, label, onValueChange } = props;

	const translateX = useSharedValue(value ? 30 : 7);

	const gestureHandler = Gesture.Tap()
		.onTouchesUp(() => runOnJS(onValueChange)(!value))
		.onBegin(() => {
			translateX.value = withSpring(value ? 7 : 35);
		});
	// 	.onStart: () => {},
	// 	onActive: () => {
	// 		translateX.value = withSpring(value ? 7 : 35);
	// 	},
	// 	onEnd: () => {
	// 		runOnJS(onValueChange)(!value);
	// 	},
	// });

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		};
	});

	return (
		<GestureDetector gesture={gestureHandler}>
			<Animated.View style={styles.container}>
				<Animated.Text
					allowFontScaling
					style={FontSizeColorStyle['montserrat-400-14-white']}
				>
					{label}
				</Animated.Text>
				<Animated.View style={[styles.switch, { backgroundColor: '#7CD0E8' }]}>
					<Animated.View style={[styles.knob, animatedStyle]} />
				</Animated.View>
			</Animated.View>
		</GestureDetector>
	);
};

SwitchComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	circle: {
		backgroundColor: 'white',
		borderRadius: 15,
		height: 30,
		width: 30,
	},
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	knob: {
		backgroundColor: '#006582',
		borderRadius: 10,
		height: 20,
		width: 20,
	},
	switch: {
		alignItems: 'center',
		borderRadius: 15,
		flexDirection: 'row',
		height: 30,
		width: 60,
	},
});

export default SwitchComponent;
