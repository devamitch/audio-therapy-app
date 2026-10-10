/* eslint-disable react-native/no-color-literals */
import type React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import { DOT_SIZE } from '@/constants/env';

interface ActiveDotProps {
	dotStyle: ViewStyle;
}

export const BasicDot = ({ dotColor = '#125B6F' }: { dotColor?: string }) => {
	return <TouchableOpacity style={[styles.dot, { backgroundColor: dotColor }]} />;
};

export const ActiveDot: React.FC<ActiveDotProps> = ({ dotStyle }) => {
	return <Animated.View style={[styles.activeDot, dotStyle]} />;
};

const styles = StyleSheet.create({
	activeDot: {
		borderRadius: DOT_SIZE / 2,
		bottom: 0,
		height: DOT_SIZE,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
		width: DOT_SIZE,
	},
	dot: {
		backgroundColor: '#928e8e',
		borderRadius: DOT_SIZE / 2,
		height: DOT_SIZE,
		// marginHorizontal: 6,
		width: DOT_SIZE,
	},
});
