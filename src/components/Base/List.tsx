// eslint-disable-next-line no-warning-comments
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefreshControl, StyleSheet } from 'react-native';
import Animated, {
	Easing,
	FadeIn,
	FadeOut,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import type { FlashListProps } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import { BlurView as ExpoBlur } from 'expo-blur';
import Lottie from 'lottie-react-native';
import { Skeleton } from 'moti/skeleton';

import { JSONS } from '@/assets';
import { windowHeight, windowWidth } from '@/lib/utils';
import { responsive } from '@/styles';
type Listrops<T> = FlashListProps<T> & {
	isRefetching?: boolean;
	refetch?: any;
};

const BlurView = Animated.createAnimatedComponent(ExpoBlur);

const LottieView = Animated.createAnimatedComponent(Lottie);

const List = <T,>({ isRefetching, refetch, ...props }: Listrops<T>) => {
	const refreshStyle = useAnimatedStyle(
		() => ({
			height: withTiming(isRefetching ? windowHeight : 0, {
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			}),
			width: withTiming(isRefetching ? windowWidth : 0, {
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			}),
			// flex: 1,
			opacity: withTiming(isRefetching ? 1 : 0, {
				duration: 500,
				easing: Easing.linear,
			}),

			position: 'absolute',
			bottom: 0,
			zIndex: isRefetching ? 1 : 0,
			backgroundColor: 'rgba(0,0,0,0.4)',
			alignItems: 'center',
			justifyContent: 'center',
		}),
		[isRefetching]
	);

	return (
		<>
			<FlashList
				// refreshControl={<AnimatedRefreshControl loading={isRefetching} onRefresh={refetch} />}
				refreshControl={
					<RefreshControl
						refreshing={!!isRefetching}
						onRefresh={refetch}
						// colors={[`transparent`]}
						// tintColor={'transparent'}
						// progressBackgroundColor="transparent"
					/>
				}
				scrollEnabled
				showsVerticalScrollIndicator={false}
				overScrollMode="never"
				// @ts-ignore
				// initialNumToRender={10}
				removeClippedSubviews
				estimatedItemSize={200}
				// @ts-ignore
				windowSize={20}
				decelerationRate="normal"
				// snapToAlignment="center"
				scrollEventThrottle={16}
				ListFooterComponent={
					<Skeleton
						colorMode="dark"
						width={'100%'}
						height={responsive(90)}
						radius={responsive(7)}
					/>
				}
				ListFooterComponentStyle={styles.mt10}
				nestedScrollEnabled
				scrollsToTop
				onEndReachedThreshold={0.2}
				updateCellsBatchingPeriod={30}
				{...props}
			/>
			{isRefetching ? (
				<BlurView
					style={refreshStyle}
					entering={FadeIn.delay(500)}
					exiting={FadeOut.delay(500)}
					tint="dark"
					intensity={10}
					experimentalBlurMethod={'dimezisBlurView'}
				>
					<LottieView
						source={JSONS.refresh}
						autoPlay
						loop
						style={{ flex: 1, width: 320, height: 320 }}
						entering={FadeIn.delay(250)}
						exiting={FadeOut.delay(100)}
					/>
				</BlurView>
			) : null}
		</>
	);
};

export default List;

const styles = StyleSheet.create({ mt10: { marginTop: 10 } });
