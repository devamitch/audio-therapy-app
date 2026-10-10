import type { PressableProps, TextStyle, ViewStyle } from 'react-native';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { FontSizeColorStyle, responsive } from '@/styles';

export type MenuItemProps = {
	children: React.ReactNode;
	disabled?: boolean;
	disabledTextColor?: string;
	pressColor?: string;
	style?: ViewStyle;
	textStyle?: TextStyle;
} & PressableProps;

export function MenuItem({
	children,
	disabled = false,
	disabledTextColor = '#d1beb8',
	onPress,
	pressColor = '#af7035',
	style,
	textStyle,
	...props
}: MenuItemProps) {
	return (
		<Pressable
			disabled={disabled}
			style={({ pressed }) => ({
				backgroundColor: Platform.OS !== 'android' && pressed ? pressColor : undefined,
			})}
			android_ripple={{ color: pressColor }}
			onPress={onPress}
			{...props}
		>
			<View style={[styles.container, style]}>
				<Text
					numberOfLines={1}
					style={[
						FontSizeColorStyle['montserrat-600-12-secondary'],
						styles.title,
						disabled && { color: disabledTextColor },
						textStyle,
					]}
				>
					{children}
				</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		height: responsive(48),
		justifyContent: 'center',
		maxWidth: responsive(248),
		minWidth: responsive(124),
	},
	title: {
		paddingHorizontal: responsive(16),
	},
});

export default MenuItem;
