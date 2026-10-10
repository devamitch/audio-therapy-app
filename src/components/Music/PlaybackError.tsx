import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FontSizeColorStyle, responsive } from '@/styles';

export const PlaybackError: React.FC<{
	error?: string;
}> = ({ error }) => {
	return (
		<View style={styles.container}>
			<Text style={FontSizeColorStyle['lato-700-12-error']}>{error}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: responsive(40),
	},
});
