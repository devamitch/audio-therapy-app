import { StyleSheet, View } from 'react-native';

export interface MenuDividerProps {
	color?: string;
}

export function MenuDivider({ color = 'rgba(238, 226, 226, 0.83)' }: MenuDividerProps) {
	return <View style={[styles.divider, { borderBottomColor: color }]} />;
}

const styles = StyleSheet.create({
	divider: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 1,
	},
});

export default MenuDivider;
