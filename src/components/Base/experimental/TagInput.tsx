import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface TagInputProps {
	tags: string[];
	onTagAdded: (tag: string) => void;
	color: string;
}

const defaultProps: TagInputProps = {
	tags: [],
	color: 'lightblue',
	onTagAdded: () => {},
};

const TagInputComponent: React.FC<TagInputProps> = (props) => {
	const { tags, color, onTagAdded } = props;

	const [newTag, setNewTag] = useState('');

	const addTag = () => {
		if (newTag.trim() !== '') {
			onTagAdded(newTag);
			setNewTag('');
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.tagsContainer}>
				{tags.map((tag, index) => (
					<View key={index} style={[styles.tag, { backgroundColor: color }]}>
						<Text style={styles.tagText}>{tag}</Text>
					</View>
				))}
			</View>
			<TextInput
				style={styles.input}
				placeholder="Add a tag"
				value={newTag}
				onChangeText={(text) => setNewTag(text)}
				onSubmitEditing={addTag}
			/>
			<TouchableOpacity onPress={addTag}>
				<View style={[styles.addButton, { backgroundColor: color }]}>
					<Text style={styles.buttonText}>Add</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

TagInputComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	addButton: {
		alignItems: 'center',
		borderRadius: 20,
		height: 40,
		justifyContent: 'center',
		width: 60,
	},
	buttonText: {
		color: 'white',
	},
	container: {
		alignItems: 'center',
	},
	input: {
		borderColor: 'lightgray',
		borderRadius: 20,
		borderWidth: 1,
		height: 40,
		marginBottom: 10,
		paddingLeft: 10,
		width: 200,
	},
	tag: {
		backgroundColor: 'lightblue',
		borderRadius: 20,
		margin: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	tagText: {
		color: 'white',
	},
	tagsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 10,
	},
});

export default TagInputComponent;

interface TagInputProps {
	tags: string[];
	onTagAdded: (tag: string) => void;
	color: string;
}

const defaultProps: TagInputProps = {
	tags: [],
	color: 'lightblue',
	onTagAdded: () => {},
};

const TagInputComponent: React.FC<TagInputProps> = (props) => {
	const { tags, color, onTagAdded } = props;

	const [newTag, setNewTag] = useState('');

	const addTag = () => {
		if (newTag.trim() !== '') {
			onTagAdded(newTag);
			setNewTag('');
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.tagsContainer}>
				{tags.map((tag, index) => (
					<View key={index} style={[styles.tag, { backgroundColor: color }]}>
						<Text style={styles.tagText}>{tag}</Text>
					</View>
				))}
			</View>
			<TextInput
				style={styles.input}
				placeholder="Add a tag"
				value={newTag}
				onChangeText={(text) => setNewTag(text)}
				onSubmitEditing={addTag}
			/>
			<TouchableOpacity onPress={addTag}>
				<View style={[styles.addButton, { backgroundColor: color }]}>
					<Text style={styles.buttonText}>Add</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

TagInputComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	addButton: {
		alignItems: 'center',
		borderRadius: 20,
		height: 40,
		justifyContent: 'center',
		width: 60,
	},
	buttonText: {
		color: 'white',
	},
	container: {
		alignItems: 'center',
	},
	input: {
		borderColor: 'lightgray',
		borderRadius: 20,
		borderWidth: 1,
		height: 40,
		marginBottom: 10,
		paddingLeft: 10,
		width: 200,
	},
	tag: {
		backgroundColor: 'lightblue',
		borderRadius: 20,
		margin: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	tagText: {
		color: 'white',
	},
	tagsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 10,
	},
});

export default TagInputComponent;
