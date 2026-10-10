// import { ImageManipulator } from 'expo-image-manipulator';
import { windowWidth } from '@utils';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const kb = 1024;

const mb_1 = kb * kb;

export const compressImage = async (
	imageUri: string,
	size = 1024,
	format: SaveFormat = SaveFormat.PNG
): Promise<string> => {
	try {
		let compress = 1;

		if (size < kb * 200) {
			return imageUri;
		}

		if (size >= mb_1 * 0.5 && size < mb_1) {
			compress = 0.5;
		}
		if (size >= mb_1 && size < mb_1 * 1.5) {
			compress = 0.8;
		}
		if (size >= 1.5) {
			compress = 1;
		}

		const compressedImage = await manipulateAsync(
			imageUri,
			[{ resize: { width: windowWidth > 786 ? 786 : windowWidth } }],
			{
				compress,
				format,
			}
		);

		return compressedImage.uri;
	} catch (error) {
		console.error('Error compressing image:', error);

		return imageUri;
	}
};
