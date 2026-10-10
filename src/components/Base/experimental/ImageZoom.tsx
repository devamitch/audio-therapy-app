import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface ImageZoomProps {
	source: string;
}

const defaultProps: ImageZoomProps = {
	source: '',
};

const ImageZoomComponent: React.FC<ImageZoomProps> = (props) => {
	const { source } = props;

	const scale = useSharedValue(1);

	const gestureHandler = useAnimatedGestureHandler({
		onStart: () => {
			scale.value = withSpring(scale.value, { damping: 2, stiffness: 80 });
		},
		onActive: (event) => {
			scale.value = withSpring(event.scale * scale.value, { damping: 2, stiffness: 80 });
		},
		onEnd: (event) => {
			if (scale.value < 1) {
				runOnJS((scale.value = 1))();
			}
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	return (
		<View style={styles.container}>
			<PinchGestureHandler
				onGestureEvent={gestureHandler}
				onHandlerStateChange={gestureHandler}
			>
				<Animated.View style={styles.imageContainer}>
					<Image source={{ uri: source }} style={styles.image} />
				</Animated.View>
			</PinchGestureHandler>
		</View>
	);
};

ImageZoomComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	image: {
		flex: 1,
		height: undefined,
		width: undefined,
	},
	imageContainer: {
		borderWidth: 2,
		height: 300,
		overflow: 'hidden',
		width: 300,
	},
});

export default ImageZoomComponent;
