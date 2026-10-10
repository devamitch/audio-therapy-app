import Animated, { AnimatedRef, SharedValue } from 'react-native-reanimated';

import SingerMusics from './SingerMusics';

import { SingersResponse } from '@/lib/server/artists';
import { windowWidth } from '@/lib/utils';

const width = windowWidth;

const WIDTH = 293 as const;

const SingerMusicPlayerList = ({
	data = [],
	translateX,
	animtedref,
	animtedref2,
}: {
	translateX: SharedValue<number>;
	data?: SingersResponse[];
	animtedref: AnimatedRef<Animated.FlatList<SingersResponse>>;
	animtedref2: AnimatedRef<Animated.ScrollView>;
}) => {
	return (
		<Animated.View
			style={{
				height: '100%',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				flex: 1,
				overflow: 'hidden',

				// backgroundColor: '#818181',
			}}
			renderToHardwareTextureAndroid
		>
			<Animated.ScrollView
				ref={animtedref2}
				removeClippedSubviews={false}
				renderToHardwareTextureAndroid
				horizontal
				scrollEnabled={false}
				showsHorizontalScrollIndicator={false}
				decelerationRate="fast"
				snapToInterval={WIDTH}
				scrollEventThrottle={16}
				style={{ flex: 1, width: WIDTH, overflow: 'hidden' }}
				contentContainerStyle={{
					flexGrow: 1,
					paddingTop: 20,
					// overflow: 'hidden',
					// flex: 1,
					// backgroundColor: '#818181',
				}}
			>
				{data?.map((item, index) => (
					<SingerMusics
						length={data?.length}
						{...item}
						name={item?.name}
						index={index}
						translateX={translateX}
					/>
				))}
			</Animated.ScrollView>
		</Animated.View>
	);
};

export default SingerMusicPlayerList;
