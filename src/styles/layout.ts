import type { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from './colors';
import { responsive } from './fonts';

import { isAndroid } from '@/lib/utils';

const height = Dimensions.get('window').height;

const width = Dimensions.get('window').width;

export const Layouts = {
	absoluteDarkFill: {
		flex: 1,
		height,
		width,
		...StyleSheet.absoluteFillObject,
		...Colors['bg-black'],
	},
	absoluteFill: {
		flex: 1,
		height,
		width,
		...StyleSheet.absoluteFillObject,
	},
	absoluteWhiteFill: {
		flex: 1,
		height,
		width,
		...StyleSheet.absoluteFillObject,
		...Colors['bg-white'],
	},
	between: {
		alignItems: 'center',
		display: 'flex',
		gap: responsive(10),
		justifyContent: 'space-between',
	},
	center: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		position: 'relative',
	},
	flexStart: {
		alignSelf: 'flex-start',
	},
	flexEnd: {
		alignItems: 'flex-end',
		display: 'flex',

		position: 'relative',
	},
	flexGrow: {
		flex: 1,
		flexGrow: 1,
	},
	centerH: {
		justifyContent: 'center',
		display: 'flex',
		position: 'relative',
	},
	centerV: {
		alignItems: 'center',
		display: 'flex',
		position: 'relative',
	},
	fill: {
		flex: 1,
	},
	fillBlack: {
		flex: 1,
		...Colors['bg-black'],
	},
	fillLoginBG: {
		flex: 1,
		...Colors['bg-loginbg'],
	},
	fillWhite: {
		flex: 1,
		...Colors['bg-white'],
	},
	screenLayout: {
		display: 'flex',
		gap: responsive(10),
		paddingHorizontal: responsive(20),
		paddingVertical: responsive(40),
		position: 'relative',
		...(isAndroid && {
			paddingBottom: responsive(40),
		}),
	},
	rowGrow: { flexDirection: 'row', flexGrow: 1 },
	row: { display: 'flex', flexDirection: 'row' },
	card: {
		display: 'flex',
		// flexDirection: 'row',
		...Colors['bg-white'],
		...Colors['shadow-light-ebebeb'],
		shadowOffset: { width: responsive(1), height: responsive(1) },
		shadowOpacity: 0.1,
		shadowRadius: 1,
		elevation: 1,
		// paddingHorizontal: responsive(30),
		// paddingTop: responsive(20),
		// paddingBottom: responsive(30),
		borderRadius: 4,
		shadowColor: 'black',
		backgroundColor: '#ffffff',
		padding: 10,
	},
	fullWidth: {
		width: '100%',
	},
	fullHeight: {
		height: '100%',
	},
} as const satisfies Record<string, StyleProp<ViewStyle & ImageStyle>>;

export const LayoutStyle = StyleSheet.create(Layouts);
