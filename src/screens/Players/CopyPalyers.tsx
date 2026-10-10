import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, FlatListProps, ImageSourcePropType, StyleSheet, View } from 'react-native';

import TinderItem from './DemoPlayers';

import { windowHeight } from '@/lib/utils';

export type TinderType = {
	img?: ImageSourcePropType;
	name?: string;
	distance?: string;
	city?: string;
	occupation?: string;
	id?: string | number;
};

const PlayersList: React.FC<Partial<FlatListProps<TinderType>>> = React.memo(
	({ data, ...props }) => {
		const flatListRef = useRef<FlatList | null>(null);

		const [selected, setSelected] = useState<number[]>([]);

		const filteredData = useMemo(() => {
			return data?.filter((_, index) => !selected.includes(index)) ?? [];
		}, [data, selected]);

		const handleSwipe = useCallback(
			(direction: 'left' | 'right' | 'top' | 'bottom', index: number) => {
				try {
					if (flatListRef.current) {
						const newIndex = direction === 'right' ? index + 1 : index - 1;

						const clampedIndex = Math.max(
							0,
							Math.min(filteredData.length - 1, newIndex)
						);

						flatListRef.current.scrollToIndex({ index: clampedIndex });
						setSelected((prev) => [...prev, index]);
					}
				} catch (err) {
					console.error(err);
				}
			},
			[filteredData]
		);

		const renderItem = useCallback(
			({ item, index }: { item: TinderType; index: number }) => (
				<TinderItem
					handleSwipe={(direction: 'left' | 'right' | 'top' | 'bottom') =>
						handleSwipe(direction, index)
					}
					{...item}
					index={index}
				/>
			),
			[handleSwipe]
		);

		const getItemLayout = useCallback(
			(_, index) => ({
				length: windowHeight * 0.8,
				offset: windowHeight * 0.8 * index,
				index,
			}),
			[]
		);

		return (
			<View style={styles.container}>
				<FlatList
					ref={(ref) => (flatListRef.current = ref)}
					data={filteredData}
					renderItem={renderItem}
					keyExtractor={(_, index) => index.toString()}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					shouldRasterizeIOS
					showsVerticalScrollIndicator={false}
					// Convert to string if id is not always a number
					initialNumToRender={10} // Adjust based on your needs
					maxToRenderPerBatch={10} // Adjust based on your needs
					updateCellsBatchingPeriod={50} // Adjust based on your needs
					getItemLayout={getItemLayout}
					windowSize={10} // Adjust based on your needs
					{...props}
				/>
			</View>
		);
	}
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
	},
});

export default PlayersList;
