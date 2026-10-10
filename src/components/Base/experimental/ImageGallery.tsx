import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ImageGalleryProps {
	images: string[];
	color: string;
}

const defaultProps: ImageGalleryProps = {
	images: [],
	color: 'lightblue',
};

const ImageGalleryComponent: React.FC<ImageGalleryProps> = (props) => {
	const { images, color } = props;

	const [selectedImage, setSelectedImage] = useState(0);

	const prevImage = () => {
		setSelectedImage(selectedImage - 1 >= 0 ? selectedImage - 1 : images.length - 1);
	};

	const nextImage = () => {
		setSelectedImage(selectedImage + 1 < images.length ? selectedImage + 1 : 0);
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image source={{ uri: images[selectedImage] }} style={styles.image} />
			</View>
			<View style={styles.navigation}>
				<TouchableOpacity onPress={prevImage}>
					<Text style={styles.navigationText}>{'<'}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={nextImage}>
					<Text style={styles.navigationText}>{'>'}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

ImageGalleryComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	image: {
		height: '100%',
		width: '100%',
	},
	imageContainer: {
		height: 200,
		marginBottom: 10,
		overflow: 'hidden',
		width: 300,
	},
	navigation: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 150,
	},
	navigationText: {
		color: 'black',
		fontSize: 24,
	},
});

export default ImageGalleryComponent;
