import { StyleSheet, Text } from 'react-native';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useQueryClient } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';

import { HomeResponse } from '@/lib/server/home';
import { windowWidth } from '@/lib/utils';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const SingersCarousel = () => {
	const queryClient = useQueryClient();

	const pastData = queryClient.getQueryData<HomeResponse>(['getHome']);

	const data =
		pastData?.singerData?.singer?.map((item) => ({
			...item,
			image: item?.icon,
		})) || [];

	const translationX = useSharedValue(0);

	const isScrolling = useSharedValue(false);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			translationX.value = event.contentOffset.x;
			// translationX.value = Math.round(event.contentOffset.x);
		},
		onBeginDrag: (e) => {
			isScrolling.value = true;
		},
		onEndDrag: (e) => {
			isScrolling.value = false;
		},
	});

	return (
		<Animated.ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			decelerationRate="fast"
			snapToInterval={280}
			// snapToAlignment="center"
			scrollEventThrottle={16}
			onScroll={scrollHandler}
			style={{ flex: 1 }}
			overScrollMode={'never'}
			pagingEnabled
			contentContainerStyle={styles.contentContainer}
		>
			{data?.map((item, index) => (
				<SingerCard
					key={index}
					{...item}
					index={index}
					translateX={translationX}
					length={data?.length}
				/>
			))}
		</Animated.ScrollView>
	);
};

const SingerCard = ({ index, image, name, translateX, length = 0 }) => {
	const animatedStyle = useAnimatedStyle(() => {
		const inputRange = [(index - 1) * 240, index * 240, (index + 1) * 280];

		const scale = interpolate(translateX.value, inputRange, [0.7, 1.2, 0.7], Extrapolate.CLAMP);

		const zIndex = interpolate(translateX.value, inputRange, [-1, 1, 0], Extrapolate.CLAMP);

		const translateY = interpolate(
			translateX.value,
			inputRange,
			[50, 0, 50],
			Extrapolate.CLAMP
		);

		const left = (windowWidth - 240) / 32;

		const marginLeft = withTiming(index === 0 ? 50 : index === length ? -50 : 0);

		const translateX1 = interpolate(
			translateX.value,
			inputRange,
			[-190, 0, 190],
			Extrapolate.CLAMP
		);

		// const position = interpolateColor(translateX.value, inputRange, [
		// 	'flex',
		// 	'absolute',
		// 	'flex',
		// ]);

		const opacity = interpolate(translateX.value, inputRange, [0.5, 1, 0.9], Extrapolate.CLAMP);

		const height = interpolate(
			translateX.value,
			inputRange,
			[320, 400, 320],
			Extrapolate.CLAMP
		);

		const width = interpolate(translateX.value, inputRange, [240, 240, 240], Extrapolate.CLAMP);

		return {
			transform: [{ scale }, { translateY }, { translateX: translateX1 }],
			opacity,
			marginLeft,
			zIndex,
			borderRadius: 6,
			height,
			overflow: 'hidden',
			width,
		};
	}, [index, translateX]);

	const animatedImageStyle = useAnimatedStyle(() => {
		const inputRange = [(index - 1) * 240, index * 240, (index + 1) * 240];

		const borderRadius = interpolate(
			translateX.value,
			inputRange,
			[200, 0, 200],
			Extrapolate.CLAMP
		);

		const opacity = interpolate(translateX.value, inputRange, [0.7, 1, 0.2], Extrapolate.CLAMP);

		const height = interpolate(
			translateX.value,
			inputRange,
			[200, 300, 200],
			Extrapolate.CLAMP
		);

		const width = interpolate(translateX.value, inputRange, [200, 240, 200], Extrapolate.CLAMP);

		return {
			// borderRadius: 100,
			height,
			marginBottom: 10,
			width,
			opacity,
			borderRadius,
		};
	}, [index, translateX]);

	const animatedCardStyle = useAnimatedStyle(() => {
		const inputRange = [(index - 1) * 240, index * 240, (index + 1) * 240];

		// const padding = interpolate(translateX.value, inputRange, [20, 0, 30], Extrapolate.CLAMP);

		const val = Math.round(translateX.value);

		console.log({ val, indexVal: index * 240, index });

		return {
			flex: 1,
			// padding,
		};
	}, [index, translateX]);

	return (
		<Animated.View style={[styles.card, animatedStyle]}>
			<AnimatedBlurView
				style={animatedCardStyle}
				intensity={100}
				tint="dark"
				experimentalBlurMethod={'dimezisBlurView'}
			>
				<Animated.Image
					source={{ uri: image }}
					style={[styles.image, animatedImageStyle]}
					resizeMode={'cover'}
				/>
				<Animated.View style={{ padding: 20 }}>
					<Text style={styles.name}>{name ?? 'Name'}</Text>
				</Animated.View>
			</AnimatedBlurView>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	card: {
		borderRadius: 6,
		height: 320,
		overflow: 'hidden',
		width: 240,
	},
	card1: {
		// alignItems: 'center',
		flex: 1,
		// justifyContent: 'center',
	},
	contentContainer: {
		// alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center',
		overflow: 'hidden',
		paddingHorizontal: 40,
		paddingTop: 100,

		// paddingRight: 40,
	},
	image: {
		borderRadius: 100,
		height: 200,
		marginBottom: 10,
		width: 200,
	},
	name: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default SingersCarousel;
