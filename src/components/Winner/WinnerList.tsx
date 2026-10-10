import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	SlideInDown,
	SlideOutDown,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import { FlashList } from '@shopify/flash-list';

import BlurCard from './BlurCard';
import WinnerItem from './WinnerItem';
import WinnerTopSection from './WinnerTopSection';

import { isAndroid } from '@/lib/utils';
import { FontSizeColorStyle, responsive } from '@/styles';

export const HEIGHT = 220;
export const OVERDRAG = 20;

type WinnerItemProps<T extends string> = Partial<
	Record<'image' | 'name' | 'amount' | 'date' | 'points', T>
>;

const WinnerList = <T extends string>({
	data: rankData = [],
	type = 'winner',
}: {
	data?: WinnerItemProps<T> & { flag?: string; country?: { flag?: string } }[];
	type?: 'winner' | 'participants';
}) => {
	const { height } = useWindowDimensions();

	const headerHeight = useHeaderHeight();

	const { bottom } = useSafeAreaInsets();

	const offset = useSharedValue(type === 'winner' ? 15 : bottom + 60);

	const currentChange = useSharedValue(type === 'winner' ? 15 : bottom + 60);

	const pan = Gesture.Pan()
		.onChange((event) => {
			currentChange.value = event.changeY;
			const offsetDelta = event.changeY + offset.value;

			const clamp = Math.max(-headerHeight, offsetDelta);

			offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
		})
		.onFinalize(() => {
			if (currentChange.value < 0) {
				const bottom1 = bottom + 60;

				offset.value = withSpring(type === 'winner' ? 15 : bottom1);
			} else {
				const minHeight =
					height -
					(2 * headerHeight +
						bottom +
						(type === 'winner' ? (isAndroid ? 180 : 150) : isAndroid ? 120 : 80));

				offset.value = withSpring(minHeight);
			}
		});

	const translateY = useAnimatedStyle(() => {
		const winnerInActive = type === 'participants' && offset.value === 30;

		return {
			transform: [
				{ translateY: offset.value },
				{ scale: withTiming(winnerInActive ? 0.99 : 1) },
			],
			height,
			left: 0,
			right: 0,
		};
	});

	const topUsers = useMemo(() => {
		return {
			first: {
				image: rankData?.[0]?.image,
				name: rankData?.[0]?.name,
				amount: rankData?.[0]?.amount,
				points: rankData?.[0]?.points,
				date: rankData?.[0]?.date,
			},
			second: {
				image: rankData?.[1]?.image,
				name: rankData?.[1]?.name,
				amount: rankData?.[1]?.amount,
				points: rankData?.[1]?.points,
				date: rankData?.[1]?.date,
			},
			third: {
				image: rankData?.[2]?.image,
				name: rankData?.[2]?.name,
				amount: rankData?.[2]?.amount,
				points: rankData?.[2]?.points,
				date: rankData?.[2]?.date,
			},
		};
	}, [rankData]);

	return (
		<GestureDetector gesture={pan}>
			<Animated.View
				style={[styles.sheet, translateY]}
				entering={SlideInDown.springify().damping(15)}
				exiting={SlideOutDown}
			>
				<BlurCard type={type}>
					<Animated.View
						style={{
							width: '100%',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Animated.Text style={FontSizeColorStyle['poppins-400-20-white']}>
							{type === 'winner' ? 'Tournament Winner' : 'Participants'}
						</Animated.Text>
						<Animated.Text style={FontSizeColorStyle['poppins-700-12-primary-text']}>
							{`${rankData?.length} ${type === 'winner' ? 'Winners' : 'Participants'}`}
						</Animated.Text>
					</Animated.View>

					{type === 'winner' ? <WinnerTopSection topUsers={topUsers} /> : null}
					<FlashList
						data={rankData}
						renderItem={({ item }) => <WinnerItem {...item} />}
						contentContainerStyle={{ gap: 10 }}
						style={{ flex: 1 }}
					/>
				</BlurCard>
			</Animated.View>
		</GestureDetector>
	);
};


export default WinnerList;
