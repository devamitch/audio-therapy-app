import React from 'react';
import { ImageBackground } from 'react-native';
import Animated, { AnimatedRef, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg from 'react-native-svg';
import { useHeaderHeight } from '@react-navigation/elements';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import { SingersResponse } from '@/lib/server/artists';
import { windowHeight, windowWidth } from '@/lib/utils';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

const width = windowWidth;

const height = windowHeight;

interface Singer {
	icon: string;
	name: string;
}

interface SingerCardProps {
	index: number;
	image: string;
	name: string;
	translateX: Animated.SharedValue<number>;
	length: number;
}

const WIDTH = 180;

const CARD_WIDTH = 160;

const SPACING = 10;

const ITEM_SIZE = width * 0.72;

const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const BACKDROP_HEIGHT = height * 0.65;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const SingerBgCard: React.FC<SingerCardProps> = ({
	index,
	image,
	name,
	translateX: scrollX,
	length,
}) => {
	const top = useHeaderHeight();

	const { bottom } = useSafeAreaInsets();

	const height2 = windowHeight - (top + bottom);

	const animatedStyle = useAnimatedStyle(() => {
		const translateX = -((scrollX.value / WIDTH) * width);

		return { backgroundColor: 'transparent', transform: [{ translateX }] };
	}, [height2]);

	const animatedImageStyle = useAnimatedStyle(() => {
		const translateX = (scrollX.value / WIDTH - 1) * width;

		console.log({ translateX, val: scrollX.value });

		return { height: '100%', width };
	}, [height2]);

	return (
		<Animated.View style={[{ flex: 1, height: height2, width: windowWidth }, animatedStyle]}>
			<AnimatedBlurView style={{ flex: 1, height: '100%', width: '100%' }} tint="dark">
				<AnimatedImageBackground
					source={{
						uri: image,
					}}
					style={animatedImageStyle}
					resizeMode="cover"
					blurRadius={1.4}
				/>
			</AnimatedBlurView>
		</Animated.View>
	);
};

const SingeerBackdrop = ({
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
				width,
				position: 'absolute',
				// position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				flex: 1,
			}}
			renderToHardwareTextureAndroid
		>
			<Animated.ScrollView
				ref={animtedref2}
				horizontal
				showsHorizontalScrollIndicator={false}
				decelerationRate="fast"
				snapToInterval={windowWidth}
				scrollEventThrottle={16}
				removeClippedSubviews={false}
				scrollEnabled={false}
				renderToHardwareTextureAndroid
				style={{ flex: 1 }}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				{data?.map((item, index) => (
					<SingerBgCard
						image={item?.icon}
						name={item?.name}
						index={index}
						translateX={translateX}
					/>
				))}
			</Animated.ScrollView>
			<LinearGradient
				colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.75)', 'rgba(0,0,0,1)', 'rgba(0,0,0,1)']}
				style={{
					bottom: 0,
					height: '100%',
					left: 0,
					position: 'absolute',
					right: 0,
					flex: 1,
				}}
			/>
		</Animated.View>
	);
};

export default SingeerBackdrop;
