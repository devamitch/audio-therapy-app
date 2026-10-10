import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

import { GradientIcon } from '../Base/GradientText';

import { PlaybackError } from './PlaybackError';
import { PlayPauseButton } from './PlayPauseButton';

import { responsive } from '@/styles';

const performSkipToNext = async () => TrackPlayer.skipToNext();

const performSkipToPrevious = async () => TrackPlayer.skipToPrevious();

export const PlayerControls: React.FC = () => {
	const playback = usePlaybackState();

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<BorderlessButton onPress={performSkipToPrevious} style={styles.btn}>
					<GradientIcon name={'play-skip-back'} size={responsive(30)} color={'white'} />
				</BorderlessButton>
				<PlayPauseButton />
				<BorderlessButton onPress={performSkipToNext} style={styles.btn}>
					<GradientIcon
						name={'play-skip-forward'}
						size={responsive(30)}
						color={'white'}
					/>
				</BorderlessButton>
			</View>
			<PlaybackError error={'error' in playback ? playback.error.message : undefined} />
		</View>
	);
};

const styles = StyleSheet.create({
	btn: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: responsive(100),
		height: responsive(40),
		justifyContent: 'center',
		width: responsive(40),
	},
	container: {
		width: '100%',
	},
	row: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: responsive(20),
		justifyContent: 'space-evenly',
	},
});
