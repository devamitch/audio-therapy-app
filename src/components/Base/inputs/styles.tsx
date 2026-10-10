import { StyleSheet } from 'react-native';

import { Colors, responsive } from '@/styles';

export const inputStyles = StyleSheet.create({
	container: {
		alignContent: 'center',
		borderRadius: responsive(12),
		borderWidth: responsive(2),
		...Colors['text-grey-797979'],
		flexDirection: 'row',
		justifyContent: 'center',
		paddingBottom: responsive(10),
		paddingHorizontal: responsive(11),
		paddingTop: responsive(10),
	},
	countdown: {
		bottom: 0,
		...Colors['text-grey-797979'],
		fontSize: responsive(10),
		position: 'absolute',
		right: responsive(11),
	},
	img: {
		alignSelf: 'center',
		height: responsive(25),
		width: responsive(25),
	},
	input: {
		...Colors['text-grey-797979'],
		flex: 1,
		minHeight: responsive(28),
		paddingVertical: 0,
		zIndex: 10,
	},
	toggleButton: {
		alignSelf: 'center',
		justifyContent: 'flex-end',
		zIndex: 11,
	},
});
