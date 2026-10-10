import React from 'react';
import { Dimensions, FlatList, Platform, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { PlayerProps } from '@/components/PickPlayers/Player';

const { width } = Dimensions.get('window');

const ITEM_SIZE = 160;

interface PlayerItemProps {
	item: PlayerProps;
	index: number;
	scrollX: Animated.SharedValue<number>;
}

const PlayerItem: React.FC<PlayerItemProps> = ({ item, index, scrollX }) => {
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
				<Animated.Image style={styles.posterImage} source={{ uri: item?.image }} />
			</Animated.View>
		</View>
	);
};

interface PlayeraReelProps {
	movies: PlayerProps[];
	scrollX: Animated.SharedValue<number>;
	flatList: React.RefObject<FlatList<PlayerProps> | null>;
}

const PlayeraReel: React.FC<PlayeraReelProps> = ({ movies, scrollX, flatList }) => {
	const renderItem = ({ item, index }: { item: PlayerProps; index: number }) => {
		return <PlayerItem item={item} index={index} scrollX={scrollX} />;
	};

	return (
		<FlatList
			showsHorizontalScrollIndicator={false}
			data={movies}
			ref={flatList}
			keyExtractor={(_, index) => index.toString()}
			horizontal
			bounces={false}
			decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
			renderToHardwareTextureAndroid
			snapToInterval={ITEM_SIZE}
			snapToAlignment="start"
			onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
				useNativeDriver: false,
			})}
			contentContainerStyle={{ height: 300 }}
			scrollEventThrottle={16}
			renderItem={renderItem}
		/>
	);
};

const styles = StyleSheet.create({
	posterImage: {
		borderRadius: 5,
		height: 240,
		margin: 0,
		resizeMode: 'cover',
		width: ITEM_SIZE,
	},
});

export default PlayeraReel;
