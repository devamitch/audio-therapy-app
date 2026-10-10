import { URLS } from '@/constants';
import axios from '@/core/service/axios';

export type HomeResponse = {
	user?: User;
	leagues?: number;
	singerData?: SingerDatum;
	contestDetails?: number;
};

export type SingerDatum = {
	singer?: Singer[];
	count?: number;
};

export type Singer = {
	_id?: string;
	name?: string;
	icon?: string;
};

export type User = {
	_id?: string;
	name?: string;
	email?: string;
	icon?: string;
	currentBalance?: number;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
	id?: string;
};

export type NotificationResponse = {
	_id?: string;
	userId?: string;
	body?: string;
	data?: string;
	title?: string;
	subtitle?: string;
	__v?: number;
};

export const getHome = async (params: { userId?: string | number }) =>
	(await axios.get<HomeResponse>(URLS.dashboard, { params })).data;

export const getNotifications = async (params: { userId?: string | number }) =>
	(await axios.get<NotificationResponse[]>(URLS.notifications, { params })).data;
