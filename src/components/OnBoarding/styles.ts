import { StyleSheet } from 'react-native';

import { responsive } from '@/styles';

export const OnboardStyles = StyleSheet.create({
	buttonContainer: {
		gap: responsive(7),
		paddingTop: responsive(20),
	},
	buttons: {
		borderRadius: responsive(4),
		flex: 1,
		height: responsive(180),
	},
	form: {
		flex: 1,
		gap: responsive(20),
		justifyContent: 'center',
		padding: responsive(25),
	},
	image: {
		height: responsive(100),
		width: responsive(130),
	},
	logo: {
		height: responsive(150),
		width: responsive(200),
	},
} as const);
