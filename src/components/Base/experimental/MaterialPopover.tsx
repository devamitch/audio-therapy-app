import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface MaterialPopoverProps {
	content: React.ReactElement;
	color: string;
}

const defaultProps: MaterialPopoverProps = {
	content: <Text>Popover Content</Text>,
	color: 'lightblue',
};

const MaterialPopoverComponent: React.FC<MaterialPopoverProps> = (props) => {
	const { content, color } = props;

	const translateY = useSharedValue(400);

	const isOpen = useSharedValue(false);

	const openPopover = () => {
		translateY.value = withSpring(0, { damping: 2, stiffness: 50 });
		isOpen.value = true;
	};

	const closePopover = () => {
		translateY.value = withSpring(400, { damping: 2, stiffness: 50 });
		isOpen.value = false;
	};

	const panGestureHandler = useRef(null);

	const contentStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		};
	});

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={isOpen.value ? closePopover : openPopover}>
				<View style={[styles.trigger, { backgroundColor: color }]}>
					<Text>{isOpen.value ? 'Close' : 'Open'}</Text>
				</View>
			</TouchableOpacity>
			<PanGestureHandler ref={panGestureHandler}>
				<Animated.View style={[styles.popover, contentStyle]}>{content}</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

MaterialPopoverComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	popover: {
		backgroundColor: 'white',
		borderRadius: 10,
		bottom: 10,
		elevation: 5,
		left: 10,
		padding: 10,
		position: 'absolute',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		width: 200,
	},
	trigger: {
		alignItems: 'center',
		borderRadius: 10,
		height: 50,
		justifyContent: 'center',
		width: 150,
	},
});

export default MaterialPopoverComponent;
