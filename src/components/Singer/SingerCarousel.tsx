import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { AnimatedRef, ScrollHandlerProcessed } from 'react-native-reanimated';

import SingerCard from './SingerCard';

import { SingersResponse } from '@/lib/server/artists';

const WIDTH = 180;

const height = 260;

const SingerCarousel: React.FC<{
	data: SingersResponse[];
	scrollHandler: ScrollHandlerProcessed<Record<string, unknown>>;
	translateX: Animated.SharedValue<number>;
	scrollX: Animated.SharedValue<number>;
	ref: AnimatedRef<Animated.ScrollView>;
}> = ({ data, scrollHandler, translateX, ref, scrollX }) => (
	<GestureHandlerRootView style={{ flex: 1, height }}>
		<Animated.ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			decelerationRate="fast"
			snapToInterval={WIDTH}
			scrollEventThrottle={16}
			onScrollEndDrag={(event) => {
				scrollX.value = event.nativeEvent.contentOffset.x;
			}}
			onMomentumScrollEnd={(event) => {
				scrollX.value = event.nativeEvent.contentOffset.x;
			}}
			onScroll={scrollHandler}
			style={{ flex: 1 }}
			pagingEnabled
			contentContainerStyle={styles.contentContainer}
			// ref={ref}
		>
			{data?.map((singer, index) => (
				<SingerCard
					key={index}
					index={index}
					image={singer?.icon}
					name={singer?.name}
					translateX={translateX}
					length={data?.length - 1}
				/>
			))}
		</Animated.ScrollView>
	</GestureHandlerRootView>
);

export default SingerCarousel;

const styles = StyleSheet.create({
	contentContainer: {
		// alignItems: 'center',
		// flexDirection: 'row',
		flexGrow: 1,
		// justifyContent: 'center',
		// overflow: 'hidden',
		// paddingHorizontal: 25,
		// paddingTop: 150,
	},
});
