import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

interface BottomSheetProps {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const defaultProps: BottomSheetProps = {
	isOpen: false,
	onOpen: () => {},
	onClose: () => {},
};

const BottomSheetComponent: React.FC<BottomSheetProps> = (props) => {
	const { isOpen, onOpen, onClose } = props;

	const translateY = useSharedValue(0);

	const gestureHandler = useRef(null);

	translateY.value = withTiming(isOpen ? 0 : 300, {
		duration: 300,
		easing: Easing.inOut(Easing.ease),
	});

	return (
		<PanGestureHandler
			ref={gestureHandler}
			onGestureEvent={() => {}}
			onHandlerStateChange={({ nativeEvent }) => {
				if (nativeEvent.oldState === 4) {
					const shouldOpen = translateY.value > -150;

					translateY.value = withSpring(shouldOpen ? 0 : 300);
					if (shouldOpen) {
						onOpen();
					} else {
						onClose();
					}
				}
			}}
		>
			<Animated.View
				style={[
					styles.container,
					useAnimatedStyle(() => {
						return { transform: [{ translateY: translateY.value }] };
					}),
				]}
			>
				<View style={styles.handle} />
				<Text style={styles.content}>Bottom Sheet Content</Text>
			</Animated.View>
		</PanGestureHandler>
	);
};

BottomSheetComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		bottom: 0,
		elevation: 5,
		height: 300,
		left: 0,
		position: 'absolute',
		right: 0,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	content: {
		padding: 20,
	},
	handle: {
		alignSelf: 'center',
		backgroundColor: 'gray',
		borderRadius: 3,
		height: 6,
		margin: 10,
		width: 40,
	},
});

export default BottomSheetComponent;
