import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableWithoutFeedback, ViewStyle } from 'react-native';

import { responsive } from '@/styles/fonts';

export interface ButtonProps {
	title: string;
	onPress: () => void;
	type?: keyof typeof styles;
	style?: ViewStyle | TextStyle;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, type = 'primary', style }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<Text
				style={{
					...styles[type],
					...style,
				}}
			>
				{title}
			</Text>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	primary: {
		color: '#FFD479',
		fontSize: responsive(16),
		fontWeight: '600',
		padding: responsive(20),
	},
	secondary: {
		color: '#FFD479',
		fontSize: responsive(14),
		padding: responsive(22),
	},
});
