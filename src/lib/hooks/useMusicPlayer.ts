import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

interface MusicPlayerHook {
	sound: Audio.Sound | null;
	isPlaying: boolean;
	position: number;
	duration: number;
	playPauseHandler: () => Promise<void>;
	onSliderValueChange: (value: number) => void;
}

const useMusicPlayer = (audioUri: string): MusicPlayerHook => {
	const [music, setSound] = useState<Audio.Sound | null>(null);

	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	const [position, setPosition] = useState<number>(0);

	const [duration, setDuration] = useState<number>(0);

	const onPlaybackStatusUpdate = (status: any) => {
		if (status.isLoaded) {
			setPosition(status.positionMillis || 0);
			setDuration(status.durationMillis || 0);
			setIsPlaying(status.isPlaying || false);
		}
	};

	const playPauseHandler = async () => {
		if (music) {
			if (isPlaying) {
				await music.pauseAsync();
			} else {
				await music.playAsync();
			}
		}
	};

	const onSliderValueChange = (value: number) => {
		if (music) {
			music.setPositionAsync(value);
			setPosition(value);
		}
	};

	useEffect(() => {
		(async () => {
			const { sound } = await Audio.Sound.createAsync(
				{ uri: audioUri },
				{ shouldPlay: false },
				onPlaybackStatusUpdate
			);

			setSound(sound);
		})();

		return () => {
			if (music) {
				music.unloadAsync();
			}
		};
	}, [audioUri]);

	return { sound: music, isPlaying, position, duration, playPauseHandler, onSliderValueChange };
};

export default useMusicPlayer;
