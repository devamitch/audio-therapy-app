import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { Track } from 'react-native-track-player';

import { FontSizeColorStyle, responsive } from '@/styles';

export const TrackInfo: React.FC<{
	track?: Track;
}> = ({ track }) => {
	// TODO: properly fix type

	// @ts-ignore
	const imageUri = track?.artwork?.uri || track?.artwork;

	return (
		<View style={styles.container}>
			<Image style={styles.artwork} source={{ uri: imageUri }} />
			<Text style={FontSizeColorStyle['lato-700-18-white']}>{track?.title}</Text>
			<Text style={FontSizeColorStyle['lato-400-12-grey-b6b6b6']}>{track?.artist}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	artistText: {
		color: 'white',
		fontSize: responsive(16),
		fontWeight: '200',
	},
	artwork: {
		aspectRatio: 1,
		backgroundColor: 'grey',
		borderRadius: responsive(4),
		marginVertical: responsive(40),
		width: responsive(320),
	},
	container: {
		alignItems: 'center',
		gap: responsive(10),
	},
	titleText: {
		color: 'white',
		fontSize: responsive(18),
		fontWeight: '600',
		marginTop: responsive(30),
	},
});
