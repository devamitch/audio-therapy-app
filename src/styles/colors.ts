import type { ColorsType } from './types';

export const COLOR_PARAMS = {
	bg: 'backgroundColor',
	border: 'borderColor',
	shadow: 'shadowColor',
	text: 'color',
} as const;

export const LIGHT_COLORS = {
	'light-b4b4b4': '#b4b4b4',
	'light-c4c4c4': '#c4c4c4',
	'light-e0e0e0': '#E0E0E0',
	'light-e7e7e7': '#E7E7E7',
	'light-ebebeb': '#EBEBEB',
	'light-f7f7f7': '#f7f7f7',
	'light-fafafa': '#FAFAFA',
	'light-fbf6ef': '#FBF6EF',
	'light-ffd9cc': '#ffd9cc',
	'light-fff3e9': '#FFF3E9',
	'light-google': '#EDEDED',
	'light-cream': '#FEF1E9',
	white: '#ffffff',
	'light-f1f1f1': '#F1F1F1',
	'light-cream2': '#fbf1ea',
	'light-cccccc': '#cccccc',
	'light-cbcbcb': '#cbcbcb',
	'light-dddddd': '#dddddd',
	'light-c9c9c9': '#C9C9C9',
} as const;

export const GREY_COLORS = {
	'grey-616161': '#616161',
	'grey-6b6b6b': '#6B6B6B',
	'grey-6c6c6c': '#6C6C6C',
	'grey-797979': '#797979',
	'grey-858585': '#858585',
	'grey-868686': '#868686',
	'grey-8e8e8e': '#8E8E8E',
	'grey-a7a7a7': '#A7A7A7',
	'grey-aeaeae': '#AEAEAE',
	'grey-b6b6b6': '#B6B6B6',
	'grey-bfbfbf': '#bfbfbf',
	'grey-686868': '#686868',
	'grey-696262': '#696262',
} as const;

export const DARK_COLORS = {
	black: '#000000',
	'dark-00181f': '#00181F',
	'dark-1e1e1e': '#1E1E1E',
	'dark-232323': '#232323',
	'dark-313131': '#313131',
	'dark-343434': '#343434',
	'dark-383838': '#383838',
	'dark-4a4a4a': '#4A4A4A',
	'dark-595959': '#595959',
	'dark-717171': '#717171',
	'dark-696262': '#696262',
	'dark-3f3f3f': '#3F3F3F',
	'dark-5b5b5b': '#5B5B5B',
	'dark-929292': '#929292',
	'dark-202020': '#202020',
} as const;

export const PRIMARY_COLORS = {
	primary: '#125B6F',
	'primary-text': '#00BCFD',
	'primary-light': '#7CD0E8',
	'primary-006582': '#006582',
	'primary-00252f': '#00252F',
} as const;

export const RGBA_COLORS = {
	'rgba(0,0,0,0.20)': 'rgba(0,0,0,0.20)',
	'rgba(0,0,0,0.25)': 'rgba(0,0,0,0.25)',
	'rgba(0, 0, 0, 0.50)': 'rgba(0, 0, 0, 0.50)',
	'rgba(225, 225, 225, 0.00)': 'rgba(225, 225, 225, 0.00)',
} as const;

export const ALL_COLORS = {
	...LIGHT_COLORS,
	...GREY_COLORS,
	...DARK_COLORS,
	...PRIMARY_COLORS,
	...RGBA_COLORS,

	error: '#dc143c',
	facebook: '#3b5998',
	twitter: '#59b3e3cc',
	// twitter: '#55A6D3',
	transparent: 'transparent',
	warning: '#ff7b00',

	success: '#2DBC6F',
	'dark-success': '#00A34B',
	'darker-success': '#09691c',
	'primary-button': '#052F3B',
	'primary-button2': '#00212A',
	secondary: '#FFD6AF',
	'cream-dark': '#E4AF7E',
	'yellow-e09b3d': '#E09B3D',
	loginbg: '#978d71',
	orange: '#FF5A49',
	divider: '#C2EBFF',
} as const;

export type UiLibColorsType = {
	[key in keyof typeof ALL_COLORS]: `${Lowercase<(typeof ALL_COLORS)[key]>}`;
};

// @ts-ignore
export const UiLibColors: UiLibColorsType = Object.entries(ALL_COLORS).reduce(
	(acc, [key, value]) => ({
		...acc,
		[key]: `${value}`,
	}),
	{}
);

// @ts-ignore
const Colors1: ColorsType = Object.entries(ALL_COLORS).reduce((acc, [key, value]) => {
	const array = Object.entries(COLOR_PARAMS).reduce(
		(ac2, [key2, value2]) => ({
			...ac2,
			[`${key2.toLowerCase()}-${key.toLowerCase()}`]: {
				[value2]: `${value}`,
			},
		}),
		{}
	);

	return {
		...acc,
		...array,
	};
}, {});

export const ShadowRBGAColors = {
	'bg-rgba(27, 27, 27, 0.7)': {
		backgroundColor: 'rgba(27, 27, 27, 0.7)',
	},
	'bg-tranparent': {
		backgroundColor: 'tranparent',
	},
	'shadow-rgba(0, 0, 0, 0.02)': {
		shadowColor: 'rgba(0, 0, 0, 0.25)',
	},
	'shadow-rgba(0, 0, 0, 0.05)': {
		shadowColor: 'rgba(0, 0, 0, 0.5)',
	},
	'shadow-rgba(0, 0, 0, 0.1)': {
		shadowColor: 'rgba(0, 0, 0, 1)',
	},
	'shadow-rgba(201, 201, 201, 0.1)': {
		shadowColor: 'rgba(201, 201, 201, 0.1)',
	},
} as const;

export const Colors: ColorsType = {
	...Colors1,
	...ShadowRBGAColors,
};
