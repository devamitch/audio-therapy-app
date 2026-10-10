import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TimerProps {
	initialTime: number; // in seconds
	color: string;
}

const defaultProps: TimerProps = {
	initialTime: 60,
	color: 'lightblue',
};

const TimerComponent: React.FC<TimerProps> = (props) => {
	const { initialTime, color } = props;

	const [time, setTime] = useState(initialTime);

	useEffect(() => {
		const timer = setInterval(() => {
			if (time > 0) {
				setTime(time - 1);
			}
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [time]);

	return (
		<View style={styles.container}>
			<View style={[styles.timer, { backgroundColor: color }]}>
				<Text style={styles.timerText}>{time} seconds</Text>
			</View>
		</View>
	);
};

TimerComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	timer: {
		alignItems: 'center',
		borderRadius: 20,
		height: 40,
		justifyContent: 'center',
		width: 120,
	},
	timerText: {
		color: 'white',
		fontSize: 16,
	},
});

export default TimerComponent;
