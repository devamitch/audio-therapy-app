import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface ProgressIndicatorProps {
	progress: number;
	color: string;
}

const defaultProps: ProgressIndicatorProps = {
	progress: 0,
	color: 'lightblue',
};

const ProgressIndicatorComponent: React.FC<ProgressIndicatorProps> = (props) => {
	const { progress, color } = props;

	const width = useSharedValue(0);

	width.value = withTiming(progress * 200);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: width.value,
			backgroundColor: color,
		};
	});

	return (
		<View style={styles.container}>
			<View style={styles.progressBar}>
				<Animated.View style={[styles.progress, animatedStyle]} />
			</View>
		</View>
	);
};

ProgressIndicatorComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	progress: {
		height: '100%',
	},
	progressBar: {
		backgroundColor: 'lightgray',
		height: 20,
		width: 200,
	},
});

export default ProgressIndicatorComponent;
