import { Audio } from 'expo-av';
import type { SpeechOptions } from 'expo-speech';
import * as Speech from 'expo-speech';

import { toast } from './toast';

import { SOUNDS } from '@/assets';

// export const startSound = new Sound('start.mp3', Sound.MAIN_BUNDLE, (error: Error) => {
// 	if (error) {
// 		toast.error(`Failed to load the sound ${error.message}`);

// 		return;
// 	}

// 	// Play the sound with an onEnd callback
// 	isAndroid ? startSound.setVolume(0.85).play() : startSound.setVolume(0.85).play();
// });

export async function iosPlaySound() {
	try {
		const soundObject = new Audio.Sound();

		await Audio.setAudioModeAsync({
			playThroughEarpieceAndroid: true,
			playsInSilentModeIOS: true,
		});
		await soundObject.loadAsync(SOUNDS.start, {
			shouldPlay: true,
		});
		await soundObject.setPositionAsync(0);
		await soundObject.playAsync();
	} catch (error) {
		toast.error((error as Error)?.message);
	}
}

export async function playSound() {
	try {
		await iosPlaySound();
	} catch {
		toast.error('Coluld not play sound');
	}

	return;
}

export function speak(text: string) {
	try {
		Speech.getAvailableVoicesAsync()
			.then(() => {
				Speech.speak(text);
			})
			.catch((error: Error) => toast.error(error?.message));
	} catch (error) {
		toast.error((error as Error)?.message);
	}
}
export function speakCallBack({
	text,
	...props
}: SpeechOptions & {
	text: string;
}) {
	try {
		Speech.speak(text, {
			...props,
		});
	} catch (error) {
		toast.error((error as Error)?.message);
	}
}
export async function isSpeaking() {
	try {
		return await Speech.isSpeakingAsync();
	} catch (error) {
		toast.error((error as Error)?.message);

		return false;
	}
}

export async function resumeSpeak() {
	try {
		return await Speech.resume();
	} catch (error) {
		toast.error((error as Error)?.message);
	}
}
export async function pauseSpeak() {
	try {
		return await Speech.pause();
	} catch (error) {
		toast.error((error as Error)?.message);
	}
}
export async function stopSpeak() {
	try {
		return await Speech.stop();
	} catch (error) {
		toast.error((error as Error)?.message);
	}
}
