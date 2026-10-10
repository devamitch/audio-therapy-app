import axios2 from 'axios';
import { SaveFormat } from 'expo-image-manipulator';
import type { ImagePickerAsset } from 'expo-image-picker';

import { compressImage } from '../utils/compress';
import { handleError } from '../utils/error';

import { BASEURL } from '@/constants';
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

export const fileUpload = async (file: ImagePickerAsset) => {
	try {
		const url = `/files` as const;

		const localUri = file.uri;

		const filename = localUri.split('/').pop() || '';

		const accessToken = useAppStore?.getState()?.accessToken;

		// Infer the type of the image
		const match = /\.(\w+)$/.exec(filename);

		const type = match ? `image/${match[1]}` : `image`;

		const extension = filename?.split('.').pop() || '';

		if (!['jpg', 'png', 'jpeg', 'gif'].includes(extension.toLowerCase())) {
			throw new Error(filename || '' + 'Not Valid File' + extension);
		}

		const data = new FormData();

		data.append('file', { uri: localUri, name: filename, type });

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

		const res = await axios2<
			| {
					success?: boolean;
					message?: string;
					data?: {
						url?: string;
						location?: string;
						key?: string;
					};
					url?: string;
					location?: string;
					key?: string;
			  }
			| {
					url?: string;
					location?: string;
					key?: string;
			  }[]
		>(options);

		console.log({ res });

		return Array.isArray(res?.data)
			? { location: res?.data?.[0]?.location }
			: res?.data?.data || res?.data?.location
				? { location: res?.data?.location }
				: { url: res?.data?.url };
	} catch (error) {
		console.log({ error });
		handleError(error, false);
	}
};

export const filesUpload = async (files: ImagePickerAsset[]) => {
	try {
		const url = `/files` as const;

		const accessToken = useAppStore?.getState()?.accessToken;

		// const fileData = { uri: localUri, name: filename, type };

		const data = new FormData();

		files?.forEach((file, index) => {
			const localUri = file.uri;

			const filename = localUri.split('/').pop() || '';

			// Infer the type of the image
			const match = /\.(\w+)$/.exec(filename);

			const type = match ? `image/${match[1]}` : `image`;

			const extension = filename?.split('.').pop() || '';

			if (!['jpg', 'png', 'jpeg', 'gif'].includes(extension.toLowerCase())) {
				throw new Error(filename || '' + 'Not Valid File' + extension);
			}

			const fileData = { uri: localUri, name: filename, type };

			data.append(`files[${index}]`, fileData);
		});

		// const data = new FormData();

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
			await axios2<
				{
					location?: string;
					key?: string;
				}[]
			>(options)
		).data;
	} catch (error) {
		console.log({ error });
		handleError(error, false);
	}
};

export const singleFileUpload = async (
	file?: ImagePickerAsset,
	setProgress?: (val: number) => void
) => {
	try {
		// Create a request interceptor

		const url = `/files` as const;

		const accessToken = useAppStore?.getState()?.accessToken;

		if (!file) {
			throw new Error('Please Choose File');
		}
		//@ts-ignore
		console.log('Single File Upload file', {
			fileSize: file?.fileSize,
		});
		const localUri = file.uri;

		const filename = localUri.split('/').pop() || '';

		// Infer the type of the image
		const match = /\.(\w+)$/.exec(filename);

		const type = match ? `image/${match[1]}` : `image`;

		const extension: SaveFormat = (filename?.split('.').pop() || '') as SaveFormat;

		console.log('Single File Upload Before Extension check', {
			uri: localUri,
			name: filename,
			type,
			extension,
		});

		if (
			![SaveFormat.JPEG, SaveFormat.PNG, 'jpg'].includes(
				extension.toLowerCase() as SaveFormat
			)
		) {
			throw new Error('Not Valid File' + ' ' + filename || '' + 'Not Valid File' + extension);
		}

		const data = new FormData();

		const compressedUri = await compressImage(localUri, file?.fileSize);

		//@ts-ignore

		data.append('file', { uri: compressedUri, name: filename, type });
		//@ts-ignore
		data.append('files', { uri: compressedUri, name: filename, type });

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

		const res = (
			await axios2<
				| {
						location?: string;
						key?: string;
				  }
				| {
						location?: string;
						key?: string;
				  }[]
			>({
				...options,
				onUploadProgress: (progressEventUpload) => {
					const uploadPercentage = Math.round(
						(progressEventUpload.loaded / (progressEventUpload?.total || 1)) * 100
					);

					if (setProgress) setProgress(uploadPercentage);
				},
				onDownloadProgress: (progressEvent) => {
					const uploadPercentage = Math.round(
						(progressEvent.loaded / (progressEvent?.total || 1)) * 100
					);

					if (setProgress) setProgress(uploadPercentage);
				},
			})
		)?.data;

		if (Array.isArray(res)) {
			const loc = (res || [])?.find((item) => item.location);

			return loc?.location;
		}

		return res?.location;
	} catch (error) {
		console.log('Single File Upload Error', JSON.stringify(error));
		handleError(error, false);

		throw error;
	}
};

export const multipleFileUpload = async (
	files?: ImagePickerAsset[],
	setProgress?: (val: number) => void
) => {
	try {
		const url = '/files' as const; // Endpoint URL

		if (!files) {
			throw new Error('Please Choose File');
		}

		const formData = new FormData(); // Create FormData for multiple files

		const compressedFiles = await Promise.all(
			files.map(async (file) => ({
				...file,
				uri: await compressImage(file.uri, file.fileSize),
			}))
		);

		compressedFiles?.forEach((file) => {
			const localUri = file.uri;

			const filename = localUri.split('/').pop() || '';

			const match = /\.(\w+)$/.exec(filename);

			const type = match ? `image/${match[1]}` : 'image';

			const extension: SaveFormat = (filename?.split('.').pop() || '') as SaveFormat;

			if (
				![SaveFormat.JPEG, SaveFormat.PNG, 'jpg'].includes(
					extension.toLowerCase() as SaveFormat
				)
			) {
				throw new Error('Not Valid File ' + filename || '' + 'Not Valid File' + extension);
			}

			// @ts-ignore
			formData.append('files', { uri: localUri, name: filename, type }); // Append each file data to FormData
		});

		const options = {
			data: formData,

			method: 'POST',
			url,
		};

		const res = (
			await axios2<
				{
					location?: string;
					key?: string;
				}[]
			>({
				...options,
				onUploadProgress: (progressEventUpload) => {
					const uploadPercentage = Math.round(
						(progressEventUpload.loaded / (progressEventUpload?.total || 1)) * 100
					);

					if (setProgress) setProgress(uploadPercentage);
				},
				onDownloadProgress: (progressEvent) => {
					const uploadPercentage = Math.round(
						(progressEvent.loaded / (progressEvent?.total || 1)) * 100
					);

					if (setProgress) setProgress(uploadPercentage);
				},
				beforeRedirect(options, responseDetails) {},
				lookup(hostname, options, cb) {},
			})
		)?.data;

		return res?.map((item) => item?.location) || []; // Return upload response
	} catch (error) {
		handleError(error, false); // Handle error
		throw error;
	}
};
