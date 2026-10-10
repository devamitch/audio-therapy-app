import React from 'react';
import { ScrollView } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { Button } from '../Base';

import { Spacer } from './Spacer';

import { FontSizeColorStyle } from '@/styles';

const onUpdateNotificationMetadata = async () => {
	const randomTitle = Math.random().toString(36).substring(7);

	await TrackPlayer.updateNowPlayingMetadata({
		title: `Random: ${randomTitle}`,
		artwork: `https://random.imagecdn.app/800/800?dummy=${Date.now()}`,
	});
};

const onUpdateCurrentTrackMetadata = async () => {
	const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();

	if (currentTrackIndex !== undefined) {
		const randomTitle = Math.random().toString(36).substring(7);

		await TrackPlayer.updateMetadataForTrack(currentTrackIndex, {
			title: `Random: ${randomTitle}`,
			artwork: `https://random.imagecdn.app/800/800?dummy=${Date.now()}`,
			duration: Math.floor(Math.random()),
		});
	}
};

const onReset = async () => {
	await TrackPlayer.reset();
};

export const ActionSheet: React.FC = () => {
	return (
		<ScrollView>
			<Spacer />
			<Button
				label={'Update Notification Metadata Randomly'}
				labelStyle={FontSizeColorStyle['lato-600-12-light-dddddd']}
				onPress={onUpdateNotificationMetadata}
			/>
			<Button
				label={'Update Current Track Metadata Randomly'}
				onPress={onUpdateCurrentTrackMetadata}
				labelStyle={FontSizeColorStyle['lato-600-12-light-dddddd']}
			/>
			<Button
				label={'Reset'}
				onPress={onReset}
				labelStyle={FontSizeColorStyle['lato-600-12-light-dddddd']}
			/>
		</ScrollView>
	);
};
