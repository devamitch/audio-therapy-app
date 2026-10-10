import type React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { RectButtonProps } from 'react-native-gesture-handler';
import { RectButton } from 'react-native-gesture-handler';

import { ColorStyle, FontSizeColorStyle, LayoutStyle } from '@/styles';

export type CreatorHeaderProps = {
	title?: string;
	header?: string;
	onPress?: RectButtonProps['onPress'];
	buttonTitle?: string;
};

const Header: React.FC<CreatorHeaderProps> = ({
	title = 'News Center',
	header = 'Creating News',
	onPress,
	buttonTitle = 'View',
}) => (
	<>
		<Text style={FontSizeColorStyle['montserrat-300-12-black']}>{title}</Text>
		<View style={[LayoutStyle.row, LayoutStyle.between]}>
			<Text style={FontSizeColorStyle['montserrat-500-18-black']}>{header}</Text>
			<RectButton style={[styles.button, ColorStyle['bg-primary']]} onPress={onPress}>
				<Text style={FontSizeColorStyle['montserrat-600-12-white']}> {buttonTitle}</Text>
			</RectButton>
		</View>
	</>
);

export default Header;

const styles = StyleSheet.create({
	button: {
		borderRadius: 4,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
});
