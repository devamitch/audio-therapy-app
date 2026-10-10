import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import { Colors } from './colors';
import { Fonts, FontSizeWithColors, responsive } from './fonts';

export const BUTTON_NAMES = [
	'primary',
	'sm',
	'md',
	'primary-auth',
	'secondary',
	'ternary',
	'secondary-auth',
	'base',
	'chip',
	'selected-chip',
] as const;

export type BUTTON_NAMES_TYPES = (typeof BUTTON_NAMES)[number];

const BUTTON_BORDER_RADIUS = responsive(7);

export const BASIC_BUTTON = {
	alignItems: 'center',
	borderRadius: BUTTON_BORDER_RADIUS,
	borderStyle: 'solid',
	display: 'flex',
	flexDirection: 'row',
	paddingLeft: responsive(40),
	paddingRight: responsive(20),
	paddingVertical: responsive(16),
	shadowColor: '#171717',
	shadowOffset: { width: responsive(3), height: responsive(5) },
	shadowOpacity: 0.15,
	shadowRadius: 2.5,
	// elevation: 2.5,
	height: responsive(57),
	margin: 0,
} as const satisfies StyleProp<ViewStyle>;

export const BASIC_BUTTON_MD = {
	alignItems: 'center',
	borderRadius: 6,
	borderStyle: 'solid',
	display: 'flex',
	flexDirection: 'row',
	paddingLeft: responsive(16),
	paddingRight: responsive(16),
	paddingVertical: responsive(12),
	shadowColor: '#171717',
	shadowOffset: { width: responsive(2), height: responsive(2) },
	shadowOpacity: 0.15,
	shadowRadius: 1.5,
	// elevation: 1.5,
} as const satisfies StyleProp<ViewStyle>;

export const BASIC_BUTTON_SM = {
	alignItems: 'center',
	borderRadius: 4,
	borderStyle: 'solid',
	display: 'flex',
	flexDirection: 'row',
	paddingLeft: responsive(10),
	paddingRight: responsive(8),
	paddingVertical: responsive(5),
	shadowColor: '#171717',
	shadowOffset: { width: responsive(0), height: responsive(0) },
	shadowOpacity: 0.15,
	shadowRadius: 0,
	elevation: 0,
} as const satisfies StyleProp<ViewStyle>;

const primaryButton = {
	...BASIC_BUTTON,
	...Colors['bg-primary-button'],
} as const satisfies StyleProp<ViewStyle>;

const secondaryButton = {
	...BASIC_BUTTON,
	...Colors['bg-secondary'],
	...Colors['text-primary'],
	borderRadius: responsive(30),
} as const satisfies StyleProp<ViewStyle>;

export const BASE_BUTTON_TEXT_STYLE = {
	alignItems: 'center',
	...Fonts['montserrat-400'],
	fontSize: responsive(14),
	gap: responsive(8),
	justifyContent: 'center',
	textAlign: 'center',
} as const satisfies StyleProp<TextStyle>;

export const Buttons = {
	base: {
		...BASIC_BUTTON,
	},
	md: { ...BASIC_BUTTON_MD },
	sm: { ...BASIC_BUTTON_SM },
	chip: {
		...Colors['border-primary'],
		borderRadius: responsive(6),
		borderStyle: 'solid',
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: responsive(12),
		paddingVertical: responsive(7),
	},
	primary: {
		...FontSizeWithColors['montserrat-400-18-white'],
		...primaryButton,
	},
	'primary-auth': {
		...primaryButton,
		...FontSizeWithColors['montserrat-400-20-black'],
	},
	secondary: {
		...Fonts['montserrat-500'],
		...secondaryButton,
	},
	ternary: {
		...Fonts['montserrat-500'],
		...primaryButton,
		...Colors['bg-white'],
	},
	'secondary-auth': {
		...FontSizeWithColors['montserrat-400-20-white'],
		...secondaryButton,
	},
	'selected-chip': {
		...Colors['bg-error'],
		...Colors['border-primary'],
		...Colors['text-white'],
	},
} as const satisfies Record<BUTTON_NAMES_TYPES, StyleProp<ViewStyle>>;

export const ButtonTexts = {
	base: {
		...BASE_BUTTON_TEXT_STYLE,
	},
	chip: {
		...FontSizeWithColors['montserrat-500-12-error'],
	},
	primary: {
		...BASE_BUTTON_TEXT_STYLE,
		...FontSizeWithColors['montserrat-400-18-white'],
	},
	'primary-auth': {
		...FontSizeWithColors['montserrat-400-18-black'],
	},
	secondary: {
		...BASE_BUTTON_TEXT_STYLE,
		...Colors['text-primary'],
	},
	'secondary-auth': FontSizeWithColors['montserrat-400-18-white'],
	'selected-chip': {
		...FontSizeWithColors['montserrat-500-12-white'],
	},
	ternary: {
		...Fonts['montserrat-500'],
	},
	md: {
		fontSize: responsive(11),
		gap: responsive(8),
	},
	sm: {
		fontSize: responsive(8),
		gap: responsive(5),
	},
} as const satisfies Record<BUTTON_NAMES_TYPES, StyleProp<TextStyle>>;

export const ButtonStyle = StyleSheet.create(Buttons);

export const ButtonTextStyle = StyleSheet.create(ButtonTexts);
