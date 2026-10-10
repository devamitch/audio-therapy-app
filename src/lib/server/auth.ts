import type { ImagePickerAsset } from 'expo-image-picker';

import { URLS } from '../../constants/urls';
import axios from '../../core/service/axios';

import { filesUpload, fileUpload } from './file';

import type { RegisterParams } from '@/constants';

export type CategoryType = {
	_id: string;
	label: string;
	selected?: boolean;
};
export type CategoryResponse = CategoryType[];

export type LoginParams = {
	email?: string;
	phone_number?: string;
	password?: string;
};

export type SocialParams = RegisterParams & {
	icon?: string;
	authType?: 'google' | 'facebook';
	gender?: string;
	twitterUsername?: string;
	instagramUsername?: string;
	facebookUsername?: string;
	spotifyUsername?: string;
	youtubeUsername?: string;
	type?: 'user' | 'artist';
	socialtoken?: string;
	soccialLoginType?: 'gmail';
};

export type LoginResponse = {
	data: {
		data?: {
			name: string;
			email: string;
			icon: string;
			_id: string;
			id: string;
			accessToken?: string;
			access_token?: string;
			refreshToken: string;
			authToken?: string;
			location?: string;
			phone_number?: string;
			deletion_time?: string;
		};
	};
	message: string;
	success: boolean;
};

export type UpdateUserParams = {
	_id: string;
	name?: string;
	icon?: string | undefined;
	location?: string;
	phone_number?: string;
};

export type UpdateResponseParams = {
	message: string;
	success: boolean;
	data?: {
		_id?: string | undefined;
		name?: string;
		email?: string;
		location?: string;
		password?: string;
		phone_number?: string;
		icon?: string;
		karmaPoints?: number;
	};
};

export type SocialLoginParams = {
	email?: string | null;
	familyName?: string | null;
	givenName?: string | null;
	id?: string | null;
	name?: string | null;
	icon?: string | null;
	token?: string | null;
	twitterUsername?: string;
	instagramUsername?: string;
	facebookUsername?: string;
	spotifyUsername?: string;
	youtubeUsername?: string;
	type?: 'user' | 'artist';
	socialtoken?: string;
	soccialLoginType?: 'gmail' | 'twitter' | 'facebook' | 'apple';
};

export const signin = async (data: RegisterParams & { image?: ImagePickerAsset }) => {
	if (!data?.image) {
		const { data: res } = await axios.post<
			RegisterParams & { icon?: string | undefined },
			LoginResponse
		>(URLS.register, data);

		return res?.data ?? res;
	}

	const icon = (await filesUpload([data.image]))?.[0]?.location;

	const newData = {
		name: data.name,
		icon,
		email: data?.email,
		phone_number: data?.phone_number,
		password: data?.password,
		location: data?.location,
	};

	const { data: res } = await axios.post<
		RegisterParams & { icon?: string | undefined },
		LoginResponse['data']
	>(URLS.register, newData);

	return { ...res, icon };
};

export const completeArtist = async (
	data: RegisterParams & {
		image?: ImagePickerAsset;
		twitterUsername?: string;
		instagramUsername?: string;
		facebookUsername?: string;
		spotifyUsername?: string;
		youtubeUsername?: string;
	}
) => {
	if (!data?.image) {
		const newData = {
			...data,
			name: data.name,

			email: data?.email,
			phone_number: data?.phone_number,
			password: data?.password,
			location: data?.location,
		};

		const { data: res } = await axios.post<
			RegisterParams & { icon?: string | undefined },
			LoginResponse['data']
		>(URLS.artist, newData);

		return { ...newData, ...res };
	}

	const iconData = await fileUpload(data.image);

	const icon = iconData?.location || iconData?.url;

	const newData = {
		...data,
		name: data.name,
		icon,
		email: data?.email,
		phone_number: data?.phone_number,
		password: data?.password,
		location: data?.location,
	};

	const { data: res } = await axios.post<
		RegisterParams & { icon?: string | undefined },
		LoginResponse['data']
	>(URLS.artist, newData);

	return { ...newData, ...res };
};

export const updateuser = async (args: UpdateUserParams & { image?: ImagePickerAsset }) => {
	if (!args?.image) {
		const { data: res } = (
			await axios.put<UpdateUserParams, { data: UpdateResponseParams }>(URLS.userupdate, args)
		)?.data;

		return res;
	}

	const iconData = await fileUpload(args.image);

	const icon = iconData?.location || iconData?.url;
	// const icon = (await fileUpload(args.image))?.url;

	const data = {
		name: args.name,
		icon,
		phone_number: args?.phone_number,
		location: args?.location,
	};

	const { data: res } = await axios.put<UpdateUserParams, { data: UpdateResponseParams['data'] }>(
		URLS.userupdate,
		data
	);

	return res;
};

export const login = async (data: LoginParams) =>
	(await axios.post<LoginParams, LoginResponse['data']>(URLS.login, data)).data;

export const getAppleUser = async (params: { tokenId: string }) =>
	(await axios.get<{ email: string }, LoginResponse['data']>(URLS.register, { params })).data;

export const checkUser = async (params: { email: string }) =>
	(await axios.get<{ email: string }, LoginResponse['data']>(URLS.exists, { params })).data;

export const socialLogin = async (data: SocialLoginParams) =>
	(await axios.post<SocialLoginParams, LoginResponse['data']>(URLS.sociallogin, data)).data;

export const updateUser = async (data: SocialLoginParams) =>
	(await axios.put<SocialLoginParams, LoginResponse['data']>(URLS.register, data)).data;

export const deleteUser = async (data: { userId?: string; reason?: string }) =>
	(
		await axios.post<{ userId?: string; reason?: string }, LoginResponse['data']>(
			URLS.delete,
			data
		)
	).data;

export const cancelDeleteUser = async (data: { userId?: string }) =>
	(await axios.post<{ userId?: string }, LoginResponse['data']>(URLS.cencelDelete, data)).data;
