import type React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import type { IntroScreenProp } from './types';

import { windowHeight, windowWidth } from '@/lib/utils';
import { ColorStyle } from '@/styles';

export interface IntroScreenProps {
	content: IntroScreenProp;
	animatedStyle?: ViewStyle;
	active?: boolean;
	transparent?: boolean;
}

const IntroScreen: React.FC<IntroScreenProps> = ({
	content: Content,
	active,
	animatedStyle,
	transparent = false,
}) => {
	return (
		<Animated.View
			style={[styles.screen, animatedStyle, transparent ? {} : ColorStyle['bg-black']]}
		>
			<Content active={active} />
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		height: windowHeight,
		width: windowWidth,
	},
});

export default IntroScreen;
