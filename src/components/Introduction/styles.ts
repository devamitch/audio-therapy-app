import { StyleSheet } from 'react-native';

import { Colors, responsive } from '@/styles';

export const introStyles = StyleSheet.create({
	container: {
		flex: 1,
		gap: responsive(20),
		justifyContent: 'flex-end',
		padding: responsive(10),
		paddingBottom: responsive(80),
		width: '100%',
	},
	title: {
		marginBottom: responsive(15),
	},
	titileText: {
		textShadowColor: 'rgba(27, 27, 27, 0.56)',
		textShadowOffset: { width: -0, height: 1 },
		textShadowRadius: 2,
		fontSize: responsive(32),
	},
	image: {
		height: responsive(480),
		position: 'absolute',
		right: responsive(30),
		top: responsive(90),
		width: responsive(320),
	},
	volButton: {
		borderRadius: responsive(35),
		padding: responsive(30),
		paddingVertical: responsive(20),
	},
} as const);

export const dataStyles = StyleSheet.create({
	whiteContainer: {
		flex: 1,
		flexDirection: 'row',
		maxHeight: responsive(80),
		borderRadius: responsive(40),
		justifyContent: 'space-around',
		paddingTop: responsive(20),
	},
	verticleLine: {
		height: '100%',
		width: 1,
		...Colors['bg-divider'],
	},
	dataContainer: {
		alignItems: 'center',
	},
} as const);
