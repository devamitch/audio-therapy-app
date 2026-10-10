import {
	Dimensions,
	GestureResponderEvent,
	StyleProp,
	StyleSheet,
	TextStyle,
	ViewStyle,
} from 'react-native';
import {
	RectButton,
	TapGestureHandler,
	TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	Easing,
	runOnJS,
	SharedValue,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { View } from 'moti';

import { FontSizeColorStyle } from '@/styles';

const { width } = Dimensions.get('window');

type TabItemProps<T extends StyleProp<ViewStyle> | undefined> = {
	onTabPress: (route: any, index: number) => void;
	route: any;
	index: number;
	state: any;
	activeColor?: string;
	itemLabelStyle?: StyleProp<TextStyle>;
	itemWidth: number;
	descriptors: any;
	onTabLongPress: (route: any) => void;
	containerStyle?: T;
	iconStyle?: T;
	hide?: SharedValue<boolean>;
};

type GestureHandlerProps = {
	onHandlerStateChange: (event: GestureResponderEvent) => void;
};

const AnimatedButton = Animated.createAnimatedComponent(RectButton);

const TabItem = <T extends StyleProp<ViewStyle> | undefined>({
	onTabPress,
	route,
	index = 0,
	state,
	activeColor = 'white',
	itemLabelStyle,
	itemWidth,
	descriptors,
	onTabLongPress,
	containerStyle,
	iconStyle,
	hide,
}: TabItemProps<T>) => {
	const isActive = index === state?.index;

	const { options } = descriptors[route.key];

	const iconScale = useSharedValue(hide?.value ? 0 : 1);

	const isHidden = false;

	const tapGestureHandler = useAnimatedGestureHandler<
		TapGestureHandlerGestureEvent,
		GestureHandlerProps
	>({
		onStart: () => {},
		onActive: () => {
			runOnJS(onTabPress)(route, index);
		},
		onEnd: () => {
			runOnJS(onTabLongPress)(route);
		},
	});

	const textZ = useAnimatedStyle(() => ({
		color: withTiming(isActive ? '#fff' : '#00BCFD', {
			duration: 300,
			easing: Easing.ease,
		}),
	}));

	const containerBtn = useAnimatedStyle(() => {
		return {
			width: withTiming(isHidden || hide?.value === true ? 0 : itemWidth, {
				duration: 300,
				easing: Easing.ease,
			}),
			alignItems: 'center',
			justifyContent: 'center',
			display: withTiming(isHidden || hide?.value === true ? 'none' : 'flex', {
				duration: 300,
				easing: Easing.ease,
			}),
			flex: 1,
			position: 'relative',
			flexDirection: 'row',
			// flexDirection: index === 0 ? 'row' : 'column',
			gap: index === 0 ? 5 : 2,
		};
	}, [isHidden]);

	const iconZ = useAnimatedStyle(
		() => ({
			transform: [
				{
					scale: withTiming(hide?.value ? 0 : iconScale.value, {
						duration: 300,
					}),
				},
			],
			display: withTiming(hide?.value ? 'none' : 'flex', {
				duration: 300,
				easing: Easing.ease,
			}),
		}),
		[]
	);

	const textStyle = useAnimatedStyle(
		() => ({
			transform: [
				{
					scale: withTiming(hide?.value ? 0 : iconScale.value, {
						duration: 300,
					}),
				},
			],
			display: withTiming(hide?.value ? 'none' : 'flex', {
				duration: 300,
				easing: Easing.ease,
			}),
		}),
		[]
	);

	const RenderIcon = () => (options.tabBarIcon ? options.tabBarIcon() : <></>);

	return isHidden ? null : (
		<>
			<TapGestureHandler onHandlerStateChange={tapGestureHandler}>
				<AnimatedButton
					style={[
						containerStyle,
						containerBtn,
						// index === 0 ? { flexDirection: 'row', gap: 5 } : {},
					]}
				>
					<Animated.View style={[iconStyle, iconZ]}>
						<RenderIcon />
					</Animated.View>
					{(options?.tabBarLabel || route?.name || '').length > 0 ? (
						<View style={{ gap: 0 }}>
							<Animated.Text
								numberOfLines={1}
								style={[
									FontSizeColorStyle['montserrat-600-xxs-white'],
									itemLabelStyle,
									textZ,
									textStyle,
								]}
							>
								{options?.tabBarLabel ?? route?.name}
							</Animated.Text>
							{index === 0 ? (
								<Animated.Text
									numberOfLines={1}
									style={FontSizeColorStyle['montserrat-400-xxs-white']}
								>
									{'Pro Level'}
								</Animated.Text>
							) : null}
						</View>
					) : null}
				</AnimatedButton>
			</TapGestureHandler>
		</>
	);
};

const s = StyleSheet.create({
	icon: {
		position: 'absolute',
	},
	tabItem: {
		alignItems: 'center',
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		position: 'relative',
		// padding: 14,
	},
});

export default TabItem;
