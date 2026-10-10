import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface RadialMenuProps {
	items: string[];
	onSelectItem: (item: string) => void;
	color: string;
}

const defaultProps: RadialMenuProps = {
	items: [],
	color: 'lightblue',
	onSelectItem: () => {},
};

const RadialMenuComponent: React.FC<RadialMenuProps> = (props) => {
	const { items, color, onSelectItem } = props;

	const itemRadius = 100;

	const centerRadius = 50;

	const totalItems = items.length;

	const angleStep = (2 * Math.PI) / totalItems;

	const selectedAngle = useSharedValue(0);

	const selectItem = (itemIndex: number) => {
		const newAngle = itemIndex * angleStep;

		selectedAngle.value = withSpring(newAngle);
		onSelectItem(items[itemIndex]);
	};

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, context) => {
			context.startAngle = selectedAngle.value;
		},
		onActive: (event, context) => {
			const angleDelta = event.translationX / itemRadius;

			selectedAngle.value = context.startAngle + angleDelta;
		},
		onEnd: () => {
			const selectedItemIndex = Math.round(selectedAngle.value / angleStep);

			runOnJS(selectItem)(selectedItemIndex);
		},
	});

	const itemsView = items.map((item, index) => {
		const angle = index * angleStep;

		const itemX = centerRadius + itemRadius * Math.cos(angle);

		const itemY = centerRadius + itemRadius * Math.sin(angle);

		return (
			<TouchableOpacity key={index} onPress={() => selectItem(index)}>
				<View
					style={[
						styles.item,
						{
							backgroundColor: color,
							left: itemX - 20, // Adjust for item width
							top: itemY - 20, // Adjust for item height
						},
					]}
				>
					<Text style={styles.itemText}>{item}</Text>
				</View>
			</TouchableOpacity>
		);
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: selectedAngle.value + 'rad' }],
		};
	});

	return (
		<View style={styles.container}>
			<PanGestureHandler
				onGestureEvent={gestureHandler}
				onHandlerStateChange={gestureHandler}
			>
				<Animated.View style={[styles.menu, animatedStyle]}>{itemsView}</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

RadialMenuComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	item: {
		alignItems: 'center',
		borderRadius: 20,
		height: 40,
		justifyContent: 'center',
		position: 'absolute',
		width: 40,
	},
	itemText: {
		color: 'white',
	},
	menu: {
		borderRadius: centerRadius,
		height: 2 * centerRadius,
		overflow: 'hidden',
		width: 2 * centerRadius,
	},
});

export default RadialMenuComponent;
