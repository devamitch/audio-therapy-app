import { useEffect } from 'react';
import { Dimensions, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient as ExpoLinear } from 'expo-linear-gradient';

import { GameSvg } from './Svgs';
import TabItem from './TabarItem';

import { PrimaryButton } from '@/components';

const { width: windowWidth } = Dimensions.get('window');

type AnimatedTabBarProps = BottomTabBarProps & {
	activeColor: string;
	margin?: number;
	moverPadding?: number;
	hideIndex?: number;
	moverStyle?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
	itemLabelStyle?: StyleProp<TextStyle>;
};

const AnimatedTab = Animated.createAnimatedComponent(ExpoLinear);

const AnimatedTabBar: React.FC<AnimatedTabBarProps> = ({
	state,
	navigation,
	descriptors,
	activeColor,
	margin = 0,
	moverPadding = 0,
	hideIndex = 2,
	moverStyle = {
		backgroundColor: 'rgba(0,0,0,0.02)',
		borderRadius: 10,
	},
	contentContainerStyle = {
		elevation: 3,
	},
	itemLabelStyle,
}) => {
	const thing = useSharedValue(0);

	const hide = useSharedValue(false);

	const bottomTabWidth = windowWidth - (margin + 20) * 2;

	const itemWidth = bottomTabWidth / state.routes.length;

	const onToggle = () => {
		if (state?.index === hideIndex) {
			hide.value = !hide.value;
		}
	};

	const panGestureHandler = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		{ startX: number }
	>({
		onStart: (_, ctx) => {
			ctx.startX = thing.value;
		},
		onActive: (event, ctx) => {
			thing.value = ctx.startX + event.translationX;
		},
		onEnd: () => {
			// Implement any additional logic you need on gesture end
		},
	});

	const sz = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: withSpring(thing.value, {
					stiffness: 80,
					damping: 20,
					mass: 0.2,
				}),
			},
		],
	}));

	const onTabPress = (route: BottomTabBarProps['state']['routes'][number], index: number) => {
		const isFocused = state.index === index;

		if (!isFocused) {
			navigation.navigate(route.name);
			thing.value = bottomTabWidth * (index / state.routes.length);
		}
	};

	const onTabLongPress = (route: BottomTabBarProps['state']['routes'][number]) => {
		navigation.emit({
			type: 'tabLongPress',
			target: route.key,
		});
	};

	const tabsStyle = useAnimatedStyle(() => {
		const width = withTiming(
			state?.index === hideIndex
				? hide?.value
					? 50
					: windowWidth - (margin + 20) * 2
				: windowWidth,
			{
				duration: 500,
				easing: Easing.ease,
			}
		);

		const height = withTiming(state?.index === hideIndex ? (hide?.value ? 50 : 50) : 60, {
			duration: 500,
			easing: Easing.ease,
		});

		return {
			position: withTiming(state?.index === hideIndex ? 'absolute' : 'relative', {
				duration: 500,
				easing: Easing.ease,
			}),
			bottom: withTiming(state?.index === hideIndex ? 20 : 0, {
				duration: 500,
				easing: Easing.ease,
			}),
			left: withTiming(
				state?.index === hideIndex
					? hide?.value
						? windowWidth - (50 + (margin + 10) * 2)
						: 20
					: 0,
				{
					duration: 500,
					easing: Easing.ease,
				}
			),
			right: withTiming(state?.index === hideIndex ? 20 : 0, {
				duration: 500,
				easing: Easing.ease,
			}),
			borderRadius: withTiming(state?.index === hideIndex ? 12 : 0, {
				duration: 500,
				easing: Easing.ease,
			}),
			width,
			margin,
			alignItems: 'center',
			justifyContent: withTiming('flex-end', { duration: 500, easing: Easing.ease }),
			height,
		};
	});

	const containerStyle = useAnimatedStyle(() => {
		return {
			flex: withTiming(state?.index === hideIndex && hide?.value ? 0 : hideIndex, {
				duration: 500,
				easing: Easing.ease,
			}),
			flexDirection: 'row',
			justifyContent: 'space-between',
			display: withTiming(state?.index === hideIndex && hide?.value ? 'none' : 'flex', {
				duration: 500,
				easing: Easing.ease,
			}),
			width: withTiming(state?.index === hideIndex && hide?.value ? 0 : '100%', {
				duration: 500,
				easing: Easing.ease,
			}),
			height: withTiming(state?.index === hideIndex && hide?.value ? 0 : 50, {
				duration: 500,
				easing: Easing.ease,
			}),
		};
	});

	const tabItemStyle = useAnimatedStyle(() => {
		const width = withTiming(hide.value ? 0 : itemWidth, {
			duration: 500,
			easing: Easing.ease,
		});

		return {
			width,
			borderRadius: 12,
			display: withTiming(hide.value ? 'none' : 'flex', {
				duration: 500,
				easing: Easing.ease,
			}),
		};
	});

	useEffect(() => {
		if (state?.index === hideIndex) {
			hide.value = true;
		}
	}, [hide, hideIndex, state?.index]);

	return (
		<>
			<AnimatedTab
				style={[contentContainerStyle, s.tabContainer, tabsStyle]}
				colors={['#125B6F', '#052F3B', '#00212A']}
				location={[0.25, 0.65, hideIndex]}
				start={[0, hideIndex]}
				end={[0.75, hideIndex]}
			>
				<PanGestureHandler onGestureEvent={panGestureHandler}>
					<Animated.View style={[s.mover, { width: itemWidth }, sz]}>
						<View
							style={[moverStyle, { width: '100%', flex: hideIndex, height: '100%' }]}
						/>
					</Animated.View>
				</PanGestureHandler>

				<Animated.View style={containerStyle}>
					{state.routes.map((route, index: number) => (
						<TabItem
							activeColor={activeColor}
							key={route.key}
							route={route}
							index={index}
							state={hide?.value ? undefined : state}
							descriptors={descriptors}
							onTabPress={onTabPress}
							onTabLongPress={onTabLongPress}
							itemLabelStyle={itemLabelStyle}
							containerStyle={tabItemStyle}
							hide={hide}
						/>
					))}
				</Animated.View>

				{state?.index === 1 ? (
					<PrimaryButton
						endIcon={<GameSvg />}
						onPress={onToggle}
						colors={
							hide?.value
								? ['#125B6F', '#052F3B', '#00212A']
								: ['transparent', 'transparent', 'transparent']
						}
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							padding: 0,
							paddingLeft: 0,
							paddingRight: 0,
							paddingHorizontal: 0,
							height: 50,
							width: 50,
							zIndex: hideIndex,
						}}
					/>
				) : null}
			</AnimatedTab>
		</>
	);
};

const s = StyleSheet.create({
	mover: {
		alignItems: 'center',
		height: '100%',
		justifyContent: 'center',
		left: 0,
		position: 'absolute',
		top: 0,
	},
	tabContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		shadowColor: '#052F3B',
		shadowOpacity: 0.5,
		shadowOffset: {
			height: 0,
			width: 0,
		},
		shadowRadius: 3,
		elevation: 3,
		borderRadius: 12,
		overflow: 'hidden',
	},
} as const);

export default AnimatedTabBar;
