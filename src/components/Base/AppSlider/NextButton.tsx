import type React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PrimaryButton } from '../buttons';

import { responsive } from '@/styles';

interface NextButtonProps {
	onPress: () => void;
	disabled?: boolean;
	text?: React.ReactNode;
	icon?: 'next' | 'done' | 'skip' | 'start';
}

export const ICONS = {
	next: 'ios-play-forward',
	done: 'chevron-forward',
	skip: 'play-skip-back-outline',
	start: 'ios-arrow-forward',
} as const;

export const ICON_SIZE = responsive(19);

const NextButton: React.FC<NextButtonProps> = ({ onPress, disabled, icon = 'next' }) => {
	return (
		<PrimaryButton
			onPress={onPress}
			outlineStyle={[styles.button, disabled && styles.disabled]}
			style={styles.button}
			colors={['#125B6F', '#00212A']}
			start={[0, 0]}
			end={[1, 1]}
			startIcon={<Ionicons name={ICONS[icon]} size={ICON_SIZE} color="white" />}
			size="sm"
			rounded
		/>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		borderRadius: responsive(15),
		height: responsive(31),
		justifyContent: 'center',
		padding: 0,
		paddingHorizontal: 0,
		paddingVertical: 0,
		width: responsive(31),
	},

	disabled: {
		opacity: 0.4,
	},
});

export default NextButton;
