import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface ListItem {
	id: number;
	text: string;
}

interface SwipeableListProps {
	items: ListItem[];
	onItemDelete: (id: number) => void;
}

const SwipeableListComponent: React.FC<SwipeableListProps> = ({ items, onItemDelete }) => {
	const swipeX = useSharedValue(0);

	const swipeItem = (id: number) => {
		swipeX.value = withSpring(100, undefined, (isFinished) => {
			if (isFinished) {
				runOnJS(onItemDelete)(id);
			}
		});
	};

	const itemStyles = items.map((item) => {
		const itemSwipeX = useSharedValue(0);

		const onSwipeItem = (id: number) => {
			itemSwipeX.value = withSpring(100, undefined, (isFinished) => {
				if (isFinished) {
					runOnJS(onItemDelete)(id);
				}
			});
		};

		return {
			id: item.id,
			text: item.text,
			swipeX: itemSwipeX,
			onSwipeItem,
		};
	});

	return (
		<View style={styles.container}>
			{itemStyles.map((item) => (
				<SwipeableListItem
					key={item.id}
					item={item}
					swipeX={item.swipeX}
					onSwipeItem={item.onSwipeItem}
				/>
			))}
		</View>
	);
};

const SwipeableListItem: React.FC<{
	item: {
		id: number;
		text: string;
		swipeX: Animated.SharedValue<number>;
		onSwipeItem: (id: number) => void;
	};
	swipeX: Animated.SharedValue<number>;
	onSwipeItem: (id: number) => void;
}> = ({ item, swipeX, onSwipeItem }) => {
	const itemStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: swipeX.value }],
		};
	});

	return (
		<View style={styles.item}>
			<PanGestureHandler
				onGestureEvent={(event) => {
					swipeX.value = event.translationX;
				}}
				onHandlerStateChange={(event) => {
					if (event.nativeEvent.state === 5) {
						// The gesture has ended
						if (event.translationX > 50) {
							// Swipe right to reveal the action
							onSwipeItem(item.id);
						} else {
							swipeX.value = withSpring(0);
						}
					}
				}}
			>
				<Animated.View style={[styles.itemContainer, itemStyles]}>
					<Text>{item.text}</Text>
					<TouchableOpacity onPress={() => (swipeX.value = withSpring(0))}>
						<Text style={styles.actionText}>Close</Text>
					</TouchableOpacity>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

const styles = StyleSheet.create({
	actionText: {
		color: 'red',
	},
	container: {
		flex: 1,
	},
	item: {
		backgroundColor: 'lightgray',
		marginVertical: 5,
	},
	itemContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 16,
	},
});

export default SwipeableListComponent;
