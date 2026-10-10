import { URLS } from '@/constants';
import axios from '@/core/service/axios';

export type ArtistsResponse = {
	_id?: string;
	name?: string;
	username?: string;
	icon?: string;
	twitterUsername?: string;
	spotifyUsername?: string;
	youtubeUsername?: string;
	currentBalance?: number;
	instagramUsername?: string;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
};

export type Image = {
	height?: number;
	url?: string;
	width?: number;
};

export type ArtistDetailResponse = {
	_id?: string;
	name?: string;
	username?: string;
	bio?: string;
	icon?: string;
	twitterUsername?: string;
	spotifyUsername?: string;
	youtubeUsername?: string;
	currentBalance?: number;
	instagramUsername?: string;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
	tracks?: Track[];
	follow?: number;
};

export type Track = {
	_id?: string;
	type?: string;
	artist?: string;
	media?: string;
	title?: string;
	duration?: number;
	banner?: string;
	__v?: number;
};

export const getLeagueArtists = async (
	params?: {
		limit?: number;
		paginate?: boolean;
		name?: string;
	} = { paginate: true }
) => (await axios.get<ArtistsResponse[]>(URLS.dashboardArtists, { params })).data;

export const getArtistDetail = async (params: { artistId?: string }) => {
	const data = (
		await axios.get<ArtistDetailResponse[] | ArtistDetailResponse>(URLS.artistDetail, {
			params,
		})
	).data;

	return Array.isArray(data) ? data?.[0] : data;
};

export type SingersResponse = {
	_id?: string;
	name?: string;
	username?: string;
	icon?: string;
	bio?: string;
	twitterUsername?: string;
	spotifyUsername?: string;
	youtubeUsername?: string;
	currentBalance?: number;
	instagramUsername?: string;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
	tracks?: Track2[];
	follow?: number;
};

export type Track2 = {
	_id?: string;
	type?: Type;
	artist?: string;
	media?: string;
	title?: string;
	duration?: number;
	banner?: string;
	__v?: number;
};

export type Type = 'mp3';

export const getArtists = async () =>
	(await axios.get<SingersResponse[]>(URLS.getArtists, {})).data;
