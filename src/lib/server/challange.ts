import { URLS } from '@/constants';
import axios from '@/core/service/axios';

export type Vote = {
	_id?: string;
	challange?: string;
	artist?: string;
	by?: string;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
	user?: User[];
	status?: number;
	winAmount?: number;
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
};

export type ChalangesResponse = {
	_id?: string;
	description?: string;
	artist1?: string;
	artist2?: string;
	artistIds?: string[];
	genre?: string[];
	bidAmount?: number;
	isResult?: boolean;
	status?: number;
	publishedOn?: number;
	endOn?: number;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
	matchNumber?: number;
	round?: string;
	artist1Detail?: ArtistDetail;
	artist2Detail?: ArtistDetail;
	votes?: Vote[];
	totalVotes?: number;
	users?: User[];
	flag1?: string;
	country1?: string;
	flag2?: string;
	country2?: string;
};

export type ArtistDetail = {
	_id?: string;
	artist?: Artist;
	link?: string;
	votesCount?: number;
	isVoted?: number;
	icon?: string;
	country?: { flag?: string } | string;
	flag?: string;
	song?: {
		media: string;
		title: string;
		duration: number;
		banner: string;
	};
};

export type Artist = {
	name?: string;
	email?: string;
	icon?: string;
	country?: { flag?: string } | string;
	flag?: string;
};

export type CreateChalengeArgs = {
	artist?: string;
	link?: string;
	title?: string;
	description?: string;
	genre?: string[];
};

export const getChallanges = async (
	params: { userId?: string; status?: 0 | 1 | 2 | 3 } = { status: 1 }
) => (await axios.get<ChalangesResponse[]>(URLS.challange, { params })).data;

export const getChallange = async (params: { challangeId?: string; status?: 0 | 1 | 2 | 3 }) =>
	(
		await axios.get<ChalangesResponse>(URLS.challange, {
			params,
		})
	).data;

export const createChallange = async (data?: CreateChalengeArgs) =>
	(await axios.post<ChalangesResponse[]>(URLS.challange, data)).data;

export const addChallangeVote = async (data?: {
	challange?: string;
	artist?: string;
	by?: string;
}) => (await axios.patch<{ message: string }>(URLS.challangeVote, data)).data;

export type ArtistType = {
	_id?: string;
	artistId?: string;
	__v?: number;
	createdAt?: Date;
	externalUrl?: string;
	followers?: number;
	images?: Image[];
	lastupdated?: number;
	popularity?: number;
	updatedAt?: Date;
	name?: string;
	icon?: string;
	point?: number;
	credit?: number;
};

export type Image = {
	height?: number;
	url?: string;
	width?: number;
};

export const getArtists = async (params: {
	type?: 'risingStars' | 'testStars' | 'headliners';
	leagueId?: string;
}) =>
	(
		await axios.get<ArtistType[]>(URLS.leagueListType, {
			params,
		})
	).data;

export type SearchResponse = {
	artists?: SeasrchedArtists;
};

export type SeasrchedArtists = {
	href?: string;
	items?: SearchedArtistItemType[];
	limit?: number;
	next?: string;
	offset?: number;
	previous?: null;
	total?: number;
};

export type SearchedArtistItemType = {
	external_urls?: ExternalUrls;
	followers?: Followers;
	genres?: string[];
	href?: string;
	id?: string;
	images?: Image[];
	name?: string;
	popularity?: number;
	type?: ArtistGenreType;
	uri?: string;
};

export type ExternalUrls = {
	spotify?: string;
};

export type Followers = {
	href?: string | null;
	total?: number;
};

export type ArtistGenreType = 'artist' | 'singer' | string;

export const searchArtists = async (name?: string) =>
	(
		await axios.get<SearchResponse>(URLS.leagueSearch, {
			params: { name },
		})
	).data;

export type LeagueType = {
	_id?: string;
	leagueStart?: number;
	leagueEnd?: number;
	description?: number;
	reward?: Reward;
	title?: string;
	banner?: string;
	isActive?: boolean;
	entryFee?: number;
	currency?: string;
	creditPoints?: number;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
};

export type Reward = {
	amount?: number;
	currency?: string;
};

export const getLeagues = async () => (await axios.get<LeagueType[]>(URLS.league)).data;

export type ParticipantsResponse = {
	items?: ParticipantUser[];
	total?: number;
	winnersCount?: number;
	participantsCount?: number;
};

export type ParticipantUser = {
	_id?: string;
	name?: string;
	icon?: string;
	winAmount?: number;
};

export const getChallangeParticipants = async (
	params: { challangeId?: string; type?: 'winners' | 'participants' } = { type: 'winners' }
) => (await axios.get<ParticipantsResponse>(URLS.challangeParticipants, { params })).data;

export type SceduleResponse = {
	name?: string;
	matches?: Match[];
};

export type Match = {
	_id?: string;
	round?: Round;
	winner?: Winner | null;
	startDate?: number;
	endDate?: number;
	status?: number;
	matchNumber?: number;
	teamA?: string;
	teamB?: string;
	flagA?: string;
	flagB?: string;
};

export type Round = 'Round 1';

export type Winner = {
	country?: string;
	flag?: string;
};

export const getSchedules = async () =>
	(await axios.get<SceduleResponse[]>(URLS.scheduleLeagues)).data;

export const createTeam = async (data: {
	leagues: string;
	league: string;
	team: string[];
	user: string;
}) => (await axios.put<LeagueType[]>(URLS.leagueTeam, data)).data;

export const updateTeam = async (data: {
	leagues: string;
	league: string;
	team: string[];
	user: string;
}) => (await axios.put<LeagueType[]>(URLS.updateLeagueTeam, data)).data;
