import axios2 from 'axios';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import type { ImagePickerAsset } from 'expo-image-picker';

import { BASEURL } from '../../constants/urls';
import { handleError } from '../utils/error';

import { useAppStore } from '@/core/store';

export type DocumentResult = {
	/**
	 * Field indicating that the document pick has been successful.
	 */
	type: 'success' | 'cancel';
	/**
	 * Document original name.¯ß
	name: string;
	/**
	 * Document size in bytes.
	 */
	size?: number;
	/**
	 * An URI to the local document file.
	 */
	uri: string;
	/**
	 * Document MIME type.
	 */
	mimeType?: string;
	/**
	 * Timestamp of last document modification.
	 */
	lastModified?: number;
	/**
	 * `File` object for the parity with web File API.
	 * @platform web
	 */
	/**
	 * `FileList` object for the parity with web File API.
	 * @platform web
	 */
};

export const fileUpload = async (file1: ImagePickerAsset) => {
	try {
		const url = `/upload/icon` as const;

		const localUri1 = file1.uri;

		const file = await manipulateAsync(localUri1, [], {
			compress: 1,
			format: SaveFormat.PNG,
		});

		const localUri = file.uri;

		const filename = localUri.split('/').pop() || '';

		const accessToken = useAppStore?.getState()?.accessToken || '';

		// Infer the type of the image
		const match = /\.(\w+)$/.exec(filename);

		const type = match ? `image/${match[1]}` : `image`;

		const extension = filename?.split('.').pop() || '';

		if (!['jpg', 'png', 'jpeg', 'gif'].includes(extension.toLowerCase())) {
			throw new Error(filename || '' + 'Not Valid File' + extension);
		}

		const data = new FormData();

		data.append('icon', { uri: localUri, name: filename, type });

		const options = {
			baseURL: BASEURL,
			data,
			headers: {
				Accept: 'application/json',
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'multipart/form-data',
				'Content-type': 'multipart/form-data',
				...(accessToken
					? { Authorization: `Bearer ${accessToken}`, token: `Bearer ${accessToken}` }
					: {}),
			},
			method: 'POST',
			url,
		};

		return (
			await axios2<{
				success?: boolean;
				message?: string;
				data?: {
					url?: string;
					key?: string;
				};
			}>(options)
		).data?.data;
	} catch (error) {
		handleError(error, false);
	}
};
