import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface NotificationBadgeProps {
	count: number;
	color: string;
	onBadgePress: () => void;
}

const defaultProps: NotificationBadgeProps = {
	count: 0,
	color: 'red',
	onBadgePress: () => {},
};

const NotificationBadgeComponent: React.FC<NotificationBadgeProps> = (props) => {
	const { count, color, onBadgePress } = props;

	const badgeWidth = 30;

	const badgeCount = useSharedValue(count);

	const toggleBadge = () => {
		badgeCount.value = withSpring(0);
		runOnJS(onBadgePress)();
	};

	const gestureHandler = useAnimatedGestureHandler({
		onEnd: () => {
			runOnJS(toggleBadge)();
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: badgeCount.value * badgeWidth }],
		};
	});

	return (
		<View style={styles.container}>
			<TapGestureHandler onHandlerStateChange={gestureHandler}>
				<Animated.View style={[styles.badge, animatedStyle, { backgroundColor: color }]}>
					<Text style={styles.badgeText}>{count}</Text>
				</Animated.View>
			</TapGestureHandler>
		</View>
	);
};

NotificationBadgeComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	badge: {
		alignItems: 'center',
		borderRadius: 15,
		height: 30,
		justifyContent: 'center',
		width: 30,
	},
	badgeText: {
		color: 'white',
		fontSize: 16,
	},
	container: {
		alignItems: 'center',
	},
});

export default NotificationBadgeComponent;
