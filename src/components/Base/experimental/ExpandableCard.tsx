import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface ExpandableCardProps {
	title: string;
	content: string;
}

const defaultProps: ExpandableCardProps = {
	title: 'Title',
	content: 'Content goes here',
};

const ExpandableCardComponent: React.FC<ExpandableCardProps> = (props) => {
	const { title, content } = props;

	const expanded = useSharedValue(false);

	const toggleCard = () => {
		expanded.value = !expanded.value;
	};

	const cardStyle = useAnimatedStyle(() => {
		return {
			height: withSpring(expanded.value ? 200 : 100),
		};
	});

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={toggleCard}>
				<View style={styles.header}>
					<Text style={styles.title}>{title}</Text>
				</View>
			</TouchableOpacity>
			<Animated.View style={[styles.content, cardStyle]}>
				<Text>{content}</Text>
			</Animated.View>
		</View>
	);
};

ExpandableCardComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		borderRadius: 10,
		elevation: 3,
		margin: 10,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
	},
	content: {
		overflow: 'hidden',
		padding: 10,
	},
	header: {
		padding: 10,
	},
	title: {
		fontSize: 20,
	},
});

export default ExpandableCardComponent;
