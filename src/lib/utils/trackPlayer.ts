import TrackPlayer from 'react-native-track-player';

export const start = async () => {
	// Set up the player
	await TrackPlayer.setupPlayer();

	// Add a track to the queue
	await TrackPlayer.add({
		id: 'trackId',
		url: 'https://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/soundtrack.ogg',
		title: 'Track Title',
		artist: 'Track Artist',
		artwork:
			'https://c.pxhere.com/photos/c4/86/apple_fruit_bite_healthy_delicious_food_fruits-753091.jpg',
	});

	// Start playing it
	await TrackPlayer.play();
};
