import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const ITEM_SIZE = 160;

const PlayerItem = ({ item, index, scrollX }) => {
	const translateX = useSharedValue(0);

	translateX.value = withSpring(scrollX.value - index * ITEM_SIZE, {
		damping: 10,
		stiffness: 100,
		overshootClamping: false,
	});

	const animatedStyle = useAnimatedStyle(() => {
		const scale = 0.6 + 0.4 * (1 - Math.abs(translateX.value) / ITEM_SIZE);

		const zIndex = 100 - Math.abs(translateX.value) / ITEM_SIZE;

		const position = translateX.value === 0 ? 'relative' : 'absolute';

		return {
			transform: [{ scale }, { translateX: translateX.value }],
			zIndex,
			elevation: zIndex,
			position,
			top: 0,
			left: 0,
			right: 0,
		};
	});

	return (
		<View style={{ width: ITEM_SIZE }}>
			<Animated.View style={animatedStyle}>
				<Image style={styles.posterImage} source={{ uri: item?.image }} />
				<View style={styles.detailsContainer}>
					<Text style={styles.playerName}>{item?.name}</Text>
					<Text style={styles.playerPosition}>{item?.position}</Text>
					<Text style={styles.playerTeam}>{item?.team}</Text>
				</View>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	detailsContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		bottom: 0,
		left: 0,
		padding: 8,
		position: 'absolute',
		right: 0,
	},
	playerName: {
		color: 'white',
		fontSize: 14,
		fontWeight: 'bold',
	},
	playerPosition: {
		color: 'white',
		fontSize: 12,
	},
	playerTeam: {
		color: 'white',
		fontSize: 12,
	},
	posterImage: {
		borderRadius: 5,
		height: 240,
		margin: 0,
		resizeMode: 'cover',
		width: 160,
	},
});

export default PlayerItem;
