import { ImagePickerAsset } from 'expo-image-picker';

import { DeepPartial } from '@/declarations';
import type { UserDetailResponse } from '@/lib/server';

export type UserDataType = DeepPartial<
	UserDetailResponse['data'] & {
		email?: string;
		gender?: string;
		id?: string;
		link?: string;
		name?: string;
		icon?: string;
		location?: string;
		phone_number?: string;
		verified?: boolean;
		password?: string;
		username?: string;
		// social media handler
		twitterUsername?: string;
		instagramUsername?: string;
		facebookUsername?: string;
		spotifyUsername?: string;
		youtubeUsername?: string;
		tokenId?: string;

		image?: ImagePickerAsset | undefined;
	}
>;

export type WalletDataType = {
	address?: string;
	privateKey?: string;
	phrase?: string;
};

export type UserSliceState = {
	wallet?: WalletDataType;
	user?: UserDataType;
	tempUser?: UserDataType;
	isCompleteAuth?: boolean;
	isSocialAuth?: boolean;
	_status?: 'idle' | 'loading' | 'sucess' | 'fail' | 'completed';
	accessToken?: string;
	userType?: 'artist' | 'user';
};

export type UerSliceActions = {
	setUserType: (userType?: UserSliceState['userType']) => void;
	setUser: (user?: UserDataType) => void;
	setTempUser: (tempUser?: UserDataType) => void;
	setWallet: (wallet?: WalletDataType) => void;
	setAccessToken: (accessToken?: string) => void;
	clearDonorAmount: () => void;
	setCompleteAuth: (isCompleteAuth?: boolean) => void;
	setIsSocialAuth: (isSocialAuth?: boolean) => void;
};

export type UserSliceType = UserSliceState & UerSliceActions;
