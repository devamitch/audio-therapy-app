import TrackPlayer, { Track } from 'react-native-track-player';

import playlistData from '../../../assets/jsons/playlist.json';

export const QueueInitialTracksService = async (): Promise<void> => {
	await TrackPlayer.add([
		...(playlistData as Track[]),
		{
			url: 'https://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/soundtrack.ogg',
			title: 'Pure (Demo)',
			artist: 'David Chavez',
			artwork:
				'https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=600&h=400',
			duration: 28,
		},
	]);
};
