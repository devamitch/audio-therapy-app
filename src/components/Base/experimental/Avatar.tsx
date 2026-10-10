import { StyleSheet, Text, TouchableHighlightProps } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { LayoutStyle } from '@/styles';

type AvatarProps = TouchableHighlightProps & {
	text?: string;
	imageUri?: string;
	isDarkTheme?: boolean;
	size?: number;
	imageStyle?: ImageStyle;
	textStyle?: ImageStyle;
};

const Avatar: React.FC<AvatarProps> = ({
	text = '',
	imageUri,
	isDarkTheme = false,
	size = 60,
	imageStyle,
	style,
	textStyle,
}) => {
	const containerStyle = isDarkTheme ? styles.containerDark : styles.containerLight;

	const labelStyle = isDarkTheme ? styles.textDark : styles.textLight;

	return (
		<TouchableHighlight
			style={[styles.icon, containerStyle, { width: size, height: size }, style]}
		>
			{imageUri ? (
				<FastImage
					source={{ uri: imageUri }}
					style={[
						LayoutStyle.fullWidth,
						LayoutStyle.fullHeight,
						styles.image,
						imageStyle,
					]}
				/>
			) : (
				<Text style={[styles.text, textStyle, labelStyle]}>{text}</Text>
			)}
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	icon: {
		alignItems: 'center',
		borderRadius: 999,
		justifyContent: 'center',
	},
	image: {
		borderRadius: 999,
	},
	containerDark: {
		backgroundColor: '#333',
	},
	containerLight: {
		backgroundColor: '#3F51B5',
	},
	text: {
		color: '#fff',
		fontSize: 24,
	},
	textDark: {
		color: '#333',
	},
	textLight: {
		color: '#fff',
	},
} as const);

export default Avatar;
