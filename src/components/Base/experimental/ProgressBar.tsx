import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface ProgressBarProps {
	progress: number;
	color: string;
}

const defaultProps: ProgressBarProps = {
	progress: 0,
	color: 'lightblue',
};

const ProgressBarComponent: React.FC<ProgressBarProps> = (props) => {
	const { progress, color } = props;

	const width = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: `${withTiming(progress * 100, { duration: 1000 })}%`,
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

ProgressBarComponent.defaultProps = defaultProps;

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

export default ProgressBarComponent;
