import { URLS } from '@/constants';
import axios from '@/core/service/axios';

export type EventsResponse = {
	success?: boolean;
	message?: string;
	data?: EventsData;
};

type EventsData = {
	pastEvents?: DataEvent[];
	upcomingEvents?: DataEvent[];
};

type Host = {
	_id?: string;
	name?: string;
	email?: string;
	phone_number?: string;
	icon?: string;
};

export type DataEvent = {
	_id?: string;
	occurrence_id?: string;
	event_id?: string;
	post_id?: string;
	start_date?: string;
	start_date_utc?: string;
	end_date?: string;
	end_date_utc?: string;
	duration?: number;
	hash?: string;
	updated_at?: string;
	ID?: string;
	post_author?: number;
	post_date?: string;
	post_date_gmt?: string;
	post_content?: string;
	post_title?: string;
	post_excerpt?: string;
	post_status?: string;
	comment_status?: string;
	ping_status?: string;
	post_password?: string;
	post_name?: string;
	to_ping?: string;
	pinged?: string;
	post_modified?: string;
	post_modified_gmt?: string;
	post_content_filtered?: string;
	post_parent?: number;
	guid?: string;
	menu_order?: number;
	post_type?: string;
	post_mime_type?: string;
	comment_count?: number;
	image?: string;
	__v?: number;
	host_id?: string;
	participants?: number;
	host?: Host;
	isLiked?: 0 | 1;
	isParticipated: 0 | 1;
};

export type UserDetailResponse = {
	success?: boolean;
	message?: string;
	data: {
		_id?: string;
		name?: string;
		email?: string;
		location?: string;
		phone_number?: string;
		icon?: string;
		karmaPoints?: number;
		createdAt?: string;
		updatedAt?: string;
		__v?: number;
	};
};

export type ParticipantsResponse = {
	success?: boolean;
	message?: string;
	data?: ParicipantsData[];
};

export type ParicipantsData = {
	_id?: string;
	user_id?: ParticipantUser;
	event_id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
};

export type ParticipantUser = {
	_id?: string;
	name?: string;
	icon?: string;
};

export const fetchUserDetails = async () =>
	(await axios.get<UserDetailResponse>('/user/get'))?.data?.data;

export const filterEvents = async () =>
	(await axios.get<EventsResponse>(URLS.filterEvents))?.data?.data;

export const eventLike = async (eventId: string) =>
	(await axios.put<EventsResponse>(URLS.getLike, {}, { params: { eventId, event_id: eventId } }))
		?.data?.data;

export const eventJoin = async (eventId: string) =>
	(
		await axios.put<EventsResponse>(
			URLS.eventJoin,
			{ event_id: eventId },
			{ params: { eventId, event_id: eventId } }
		)
	)?.data?.data;

export const eventParticipants = async (eventId: string) =>
	(
		await axios.get<ParticipantsResponse>(URLS.getevent, {
			params: { eventId, event_id: eventId },
		})
	)?.data?.data;
