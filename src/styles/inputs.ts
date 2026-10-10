import type { StyleProp, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import { Colors } from './colors';

import { isAndroid } from '@/lib/utils';

const _INPUTS = ['primary'] as const;

type _INPUT_TYPE = (typeof _INPUTS)[number];

export const Inputs = {
	primary: {
		...(isAndroid ? Colors['shadow-rgba(0, 0, 0, 0.1)'] : Colors['shadow-rgba(0, 0, 0, 0.02)']),
		borderRadius: 7,
		// elevation: 1,
		height: 57,
		maxWidth: '100%',
		paddingHorizontal: 20,
		// shadowOffset: {
		// 	height: 1,
		// 	width: 0,
		// },
		// shadowOpacity: 0.7,
		// shadowRadius: 1,
		width: '100%',
	},
} as const satisfies Record<_INPUT_TYPE, StyleProp<TextStyle>>;

export const InputStyle = StyleSheet.create(Inputs);
