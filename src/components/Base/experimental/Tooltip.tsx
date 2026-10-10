import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface TooltipProps {
	content: string;
	color: string;
}

const defaultProps: TooltipProps = {
	content: '',
	color: 'lightblue',
};

const TooltipComponent: React.FC<TooltipProps> = (props) => {
	const { content, color } = props;

	const isTooltipVisible = useSharedValue(false);

	const toggleTooltip = () => {
		isTooltipVisible.value = !isTooltipVisible.value;
	};

	const gestureHandler = useAnimatedGestureHandler({
		onLongPress: () => {
			runOnJS(toggleTooltip)();
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: withSpring(isTooltipVisible.value ? 1 : 0),
		};
	});

	return (
		<View style={styles.container}>
			<LongPressGestureHandler onHandlerStateChange={gestureHandler}>
				<Animated.View style={[styles.tooltip, { backgroundColor: color }]}>
					<Text style={styles.tooltipText}>{content}</Text>
				</Animated.View>
			</LongPressGestureHandler>
		</View>
	);
};

TooltipComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	tooltip: {
		borderRadius: 8,
		padding: 10,
		position: 'absolute',
	},
	tooltipText: {
		color: 'white',
	},
});

export default TooltipComponent;
