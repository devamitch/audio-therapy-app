import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface UserAvatar {
	id: number;
	name: string;
	image: string;
}

interface AvatarGroupProps {
	avatars: UserAvatar[];
	color: string;
}

const defaultProps: AvatarGroupProps = {
	avatars: [],
	color: 'lightblue',
};

const AvatarGroupComponent: React.FC<AvatarGroupProps> = (props) => {
	const { avatars, color } = props;

	const avatarSize = 50;

	const avatarSpacing = 10;

	const avatarXPositions = avatars.map((_, index) => index * (avatarSize + avatarSpacing));

	const translateX = useSharedValue(0);

	const panGestureHandler = () => {
		const gestureHandler = (event: any) => {
			translateX.value = event.nativeEvent.translationX;
		};

		const gestureStateHandler = (event: any) => {
			if (event.nativeEvent.state === State.END) {
				// Determine if the user wants to move to the next or previous group of avatars
				const velocity = event.nativeEvent.velocityX;

				if (velocity < -500 && translateX.value < 0) {
					// Swipe right
					translateX.value = withSpring(translateX.value - (avatarSize + avatarSpacing), {
						damping: 2,
						stiffness: 50,
					});
				} else if (
					velocity > 500 &&
					translateX.value > -avatarXPositions[avatarXPositions.length - 1]
				) {
					// Swipe left
					translateX.value = withSpring(translateX.value + (avatarSize + avatarSpacing), {
						damping: 2,
						stiffness: 50,
					});
				} else {
					// Snap back to the closest icon group
					translateX.value = withSpring(
						avatarXPositions.reduce((prev, curr) =>
							Math.abs(curr + translateX.value) < Math.abs(prev + translateX.value)
								? curr
								: prev
						),
						{
							damping: 2,
							stiffness: 50,
						}
					);
				}
			}
		};

		return (
			<PanGestureHandler
				onGestureEvent={gestureHandler}
				onHandlerStateChange={gestureStateHandler}
			>
				<Animated.View
					style={[
						styles.avatarGroup,
						useAnimatedStyle(() => {
							return {
								transform: [{ translateX: translateX.value }],
							};
						}),
					]}
				>
					{avatars.map((icon, index) => (
						<View key={icon.id} style={[styles.icon, { backgroundColor: color }]}>
							<Text>{icon.name}</Text>
						</View>
					))}
				</Animated.View>
			</PanGestureHandler>
		);
	};

	return <View style={styles.container}>{panGestureHandler()}</View>;
};

AvatarGroupComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	avatarGroup: {
		flexDirection: 'row',
	},
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	icon: {
		alignItems: 'center',
		borderRadius: 25,
		height: 50,
		justifyContent: 'center',
		margin: 5,
		width: 50,
	},
});

export default AvatarGroupComponent;
