import { StyleSheet } from 'react-native';

import { ALL_COLORS } from '@/styles';

export const wheelStyles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 1,
		flexGrow: 1,
	},
	option: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		zIndex: 100,
	},
	scrollView: {
		flex: 1,
		flexGrow: 1,
		zIndex: 10,
		overflow: 'hidden',
	},
	selectedIndicator: {
		// backgroundColor: ALL_COLORS['dark-1e1e1e'],
		borderColor: ALL_COLORS['dark-343434'],
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderRadius: 5,
		position: 'absolute',
		top: '59%',
		width: '100%',
		left: 0,
		right: 0,
	},
} as const);

export default wheelStyles;
