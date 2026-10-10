/* eslint-disable no-warning-comments */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-unused-styles */
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type CardProps = TouchableOpacityProps & {
	title?: React.ReactNode;
	titleStyle?: TextStyle;
	descriptionStyle?: TextStyle;
	description?: React.ReactNode;
	isDarkTheme?: boolean;
};

const Card = ({
	title,
	description,
	isDarkTheme,
	style,
	titleStyle,
	descriptionStyle,
	children,
}: CardProps) => {
	const cardStyles = isDarkTheme ? darkStyles : lightStyles;

	return (
		<TouchableOpacity style={[cardStyles.card, style]}>
			<Text style={[cardStyles.title, titleStyle]}>{title}</Text>
			<Text style={[cardStyles.description, descriptionStyle]}>{description}</Text>
			{children}
		</TouchableOpacity>
	);
};

const lightStyles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
	},
	description: {
		color: '#666',
		fontSize: 14,
	},
	title: {
		color: '#333',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
});

const darkStyles = StyleSheet.create({
	card: {
		backgroundColor: '#333',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
	},
	description: {
		color: '#ccc',
		fontSize: 14,
	},
	title: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
});

export default Card;
