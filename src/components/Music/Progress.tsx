import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { measure, runOnJS, useAnimatedRef, useDerivedValue } from 'react-native-reanimated';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import Slider from '@react-native-community/slider';

// import Slider from '@react-native-community/slider';
// import { GradientSlider } from '../Base/GradientText';
import { Spacer } from './Spacer';

import { ALL_COLORS, FontSizeColorStyle, responsive } from '@/styles';

export const Progress: React.FC<{ live?: boolean }> = ({ live }) => {
	const { position, duration } = useProgress();

	const [width, setWidth] = useState(0);

	const aref = useAnimatedRef();

	useDerivedValue(() => {
		const measured = measure(aref);

		if (measured !== null) {
			const { width: _width } = measured;

			runOnJS(setWidth)(_width);
		} else {
			console.warn('measure: could not measure view');
		}
	});
	// This is a workaround since the slider component only takes absolute widths
	// const progressBarWidth = Dimensions.get('window').width * 0.92;

	return (
		<View style={styles.container} ref={aref}>
			{live || duration === Infinity ? (
				<Text style={[styles.liveText, FontSizeColorStyle['lato-700-12-light-dddddd']]}>
					Live Stream
				</Text>
			) : (
				<View style={{ width: '90%' }}>
					<Slider
						style={{ ...styles.slider }}
						value={position}
						minimumValue={0}
						maximumValue={duration}
						thumbTintColor={ALL_COLORS['primary-text']}
						minimumTrackTintColor={ALL_COLORS.primary}
						maximumTrackTintColor={ALL_COLORS['primary-00252f']}
						onSlidingComplete={TrackPlayer.seekTo}
					/>
					<View style={styles.labelContainer}>
						<Text
							style={[
								styles.labelText,
								FontSizeColorStyle['lato-700-12-light-dddddd'],
							]}
						>
							{formatSeconds(position)}
						</Text>
						<Spacer mode={'expand'} />
						<Text
							style={[
								styles.labelText,
								FontSizeColorStyle['lato-700-12-light-dddddd'],
							]}
						>
							{formatSeconds(Math.max(0, duration - position))}
						</Text>
					</View>
				</View>
			)}
		</View>
	);
};

const formatSeconds = (time: number) => new Date(time * 1000).toISOString().slice(14, 19);

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		// backgroundColor: 'blue',
		height: responsive(80),
		justifyContent: 'center',
		width: '100%',
	},
	labelContainer: {
		flexDirection: 'row',
	},
	labelText: {
		color: 'white',
		fontVariant: ['tabular-nums'],
	},
	liveText: {
		alignSelf: 'center',
	},
	slider: {
		flexDirection: 'row',
		height: responsive(40),
		marginTop: responsive(25),
	},
});
