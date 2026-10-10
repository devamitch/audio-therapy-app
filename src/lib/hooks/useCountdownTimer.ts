import { useCallback, useEffect, useState } from 'react';

type CountdownTimer = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

type CountdownTimerHook = (targetDate?: Date) => CountdownTimer;

const useCountdownTimer: CountdownTimerHook = (targetDate = new Date()) => {
	const calculateTimeLeft = useCallback(() => {
		const nextDay = new Date(targetDate);

		nextDay.setDate(targetDate.getDate() + 1);
		const nextDayTime = nextDay.getTime();

		const timeDifference = Math.max(nextDayTime - Date.now(), 0);

		return {
			days: Math.floor(timeDifference / 86400000),
			hours: Math.floor((timeDifference % 86400000) / 3600000),
			minutes: Math.floor((timeDifference % 3600000) / 60000),
			seconds: Math.floor((timeDifference % 60000) / 1000),
		};
	}, [targetDate]);

	const [timeLeft, setTimeLeft] = useState<CountdownTimer>(calculateTimeLeft);

	useEffect(() => {
		const timerInterval = setInterval(() => {
			setTimeLeft((prevTimeLeft) => calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timerInterval);
	}, [calculateTimeLeft]);

	return timeLeft;
};

export default useCountdownTimer;
