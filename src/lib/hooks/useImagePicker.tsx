import { useState } from 'react';
import {
	type ImagePickerAsset,
	ImagePickerOptions,
	launchCameraAsync,
	launchImageLibraryAsync,
	MediaTypeOptions,
	useCameraPermissions,
	useMediaLibraryPermissions,
} from 'expo-image-picker';

import { handleError, toast } from '../utils';

const useImagePicker = ({
	multiple = false,
	allowsEditing = true,
	...props
}: Partial<ImagePickerOptions> & {
	multiple?: boolean;
}) => {
	const [image, setImage] = useState<ImagePickerAsset>();

	const [images, setImages] = useState<ImagePickerAsset[]>();

	const cameraPermission = useCameraPermissions();

	const mediaPermission = useMediaLibraryPermissions();

	const openCamera = async () => {
		try {
			if (!cameraPermission[0]?.granted) {
				cameraPermission[1]();
			}
			const result = await launchCameraAsync({
				allowsEditing: allowsEditing,
				quality: 1,
				aspect: [4, 3],
				mediaTypes: MediaTypeOptions.Images,
				allowsMultipleSelection: multiple,
				...props,
			});

			if (result.canceled) {
				toast.error('cancelled');
				setImage(undefined);

				return;
			}
			setImage(result?.assets[0]);
			setImages(result?.assets);
		} catch (error) {
			handleError(error);

			setImage(undefined);
		}
	};

	const openLibrary = async () => {
		try {
			if (!mediaPermission[0]?.granted) {
				mediaPermission[1]();
			}
			const result = await launchImageLibraryAsync({
				allowsEditing: allowsEditing,
				quality: 1,
				aspect: [4, 3],
				mediaTypes: MediaTypeOptions.Images,
				allowsMultipleSelection: multiple,
				...props,
			});

			if (result.canceled) {
				toast.error('cancelled');
				setImage(undefined);

				return;
			}

			setImage(result?.assets[0]);
			setImages(result?.assets);
		} catch (error) {
			handleError(error);

			setImage(undefined);
		}
	};

	return { image, images, openCamera, openLibrary };
};

export default useImagePicker;
