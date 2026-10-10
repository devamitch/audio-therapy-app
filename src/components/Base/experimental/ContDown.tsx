import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

interface CountdownTimerProps {
	targetTime: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
	const calculateTimeRemaining = useCallback((): {
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	} => {
		const now = new Date().getTime();

		const difference = targetTime.getTime() - now;

		const days = Math.floor(difference / (1000 * 60 * 60 * 24));

		const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

		const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

		const seconds = Math.floor((difference % (1000 * 60)) / 1000);

		return { days, hours, minutes, seconds };
	}, [targetTime]);

	const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

	const fadeOut = useSharedValue(1);

	fadeOut.value = withTiming(0, { duration: 500, easing: Easing.ease });

	useEffect(() => {
		const timer = setInterval(() => {
			const newTimeRemaining = calculateTimeRemaining();

			fadeOut.value = withTiming(1, { duration: 500, easing: Easing.ease });
			setTimeRemaining(newTimeRemaining);
		}, 1000);

		return () => clearInterval(timer);
	}, [targetTime]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: fadeOut.value,
		};
	});

	return (
		<View style={styles.container}>
			<Animated.Text style={[styles.timerText, animatedStyle]}>
				{timeRemaining.days} days
			</Animated.Text>
			<Animated.Text style={[styles.timerText, animatedStyle]}>
				{timeRemaining.hours} hours
			</Animated.Text>
			<Animated.Text style={[styles.timerText, animatedStyle]}>
				{timeRemaining.minutes} minutes
			</Animated.Text>
			<Animated.Text style={[styles.timerText, animatedStyle]}>
				{timeRemaining.seconds} seconds
			</Animated.Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	timerText: {
		fontSize: 20,
		marginVertical: 5,
	},
});

export default CountdownTimer;
