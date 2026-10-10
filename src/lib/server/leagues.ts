import { URLS } from '@/constants';
import axios from '@/core/service/axios';

export type LeagueListResponse = {
	_id?: string;
	user?: User;
	league?: League;
	team?: string;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
	userData?: UserData;
	leagueData?: LeagueData;
};

export type League =
	| '65967a8b39353ad1dfd2777a'
	| '6597c79f46bbd13098a4810f'
	| '6597c77346bbd13098a4810b'
	| '6597c79546bbd13098a4810d';

export type LeagueData = {
	_id?: League;
	leagueStart?: number;
	leagueEnd?: number;
	reward?: Reward;
	title?: Title;
	entryFee?: number;
	currency?: Currency;
	creditPoints?: number;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
	status?: number;
};

export type TransactionResponse = {
	readonly _id?: string;
	readonly challange?: null;
	readonly transactionType?: string;
	readonly type?: string;
	readonly user?: string;
	readonly league?: string;
	readonly __v?: number;
	readonly amount?: number;
	readonly createdAt?: Date;
	readonly description?: string;
	readonly updatedAt?: Date;
};

export type Currency = 'INR';

export type Reward = {
	amount?: number;
	currency?: Currency;
};

export type Title = 'Global FREE' | 'Global 10' | 'Delhi FREE' | 'Delhi 10';

export type User =
	| '656074ba882208bb45f9e3fc'
	| '65e09b173db53a58b359400a'
	| '65e09b3e3db53a58b3594010';

export type UserData = {
	_id?: User;
	name?: Name;
	email?: Email;
	password?: string;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
	icon?: string;
	currentBalance?: number;
};

export type Email =
	| 'kartik@yahoo.com'
	| 'amit.chakraborty@nonceblox.com'
	| 'kartik.kalia@nonceblox.com';

export type Name = 'test kartik' | 'Amit Chakraborty' | 'Kartik Kalia';

export type LegueResponse = {
	_id?: string;
	leagueStart?: number;
	leagueEnd?: number;
	reward?: Reward;
	title?: string;
	banner?: string;
	currency?: string;
	creditPoints?: number;
	status?: number;
	teams?: JoinedTeam;
	joinedTeam?: JoinedTeam;
	isJoined?: 0 | 1;
	joinedUsers?: number;
	isActive?: boolean;
	entryFee?: number;
	users?: {
		user?: string;
		name?: string;
	}[];
};

export type JoinedTeam = {
	headliners?: Headliner2[];
	risingStars?: Headliner2[];
	testStars?: Headliner2[];
};

export type Headliner2 = {
	_id?: string;
	popularity?: number;
	credit?: number;
	name?: string;
	point?: number;
	icon?: string;
};

export type Reward2 = {
	amount?: number;
	currency?: string;
};

export const getLeagueDetails = async (
	params: {
		status?: 0 | 1 | 2 | 3;
		leagueId?: string;
		isJoined?: 0 | 1;
	} = { status: 1 }
) => (await axios.get<LegueResponse>(URLS.joinedLeagues, { params })).data;

export const getAllLeagues = async (
	params: {
		status?: 0 | 1 | 2 | 3;
		isJoined?: 0 | 1;
	} = { status: 1 }
) => (await axios.get<LegueResponse[]>(URLS.joinedLeagues, { params })).data;

export type LegueRankResponse = {
	_id?: string;
	leagueStart?: number;
	leagueEnd?: number;
	reward?: Reward3;
	title?: string;
	entryFee?: number;
	currency?: string;
	creditPoints?: number;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
	status?: number;
	banner?: string;
	description?: string;
	joins?: Join[];
	winners?: Join[];
};

export type Join = {
	_id?: string;
	user?: User2;
	league?: string;
	team?: string[];
	points?: number;
	winAmount?: number;
	rank?: number;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
};

export type User2 = {
	_id?: string;
	name?: string;
	email?: string;
	icon?: string;
};

export type Reward3 = {
	amount?: number;
	currency?: string;
};

export const getAllLeagueRanks = async (params: { league?: string }) => {
	const data = (
		await axios.get<LegueRankResponse[] | LegueRankResponse>(URLS.leagueRank, { params })
	).data;

	return Array.isArray(data) ? (data as LegueRankResponse[])?.[0] : (data as LegueRankResponse);
};

export const getAllTransaction = async (params: { user?: string }) =>
	(await axios.get<TransactionResponse[]>(URLS.transaction, { params })).data;

export type RewardResponse = {
	readonly _id?: string;
	readonly type?: string;
	readonly league?: League4;
	readonly challange?: Challange4;
	readonly user?: string;
	readonly rewardAmount?: number;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
	readonly __v?: number;
};

export type Challange4 = {
	readonly _id?: string;
	readonly artistIds?: ArtistID4[];
	readonly id?: string;
};

export type ArtistID4 = {
	readonly _id?: string;
	readonly name?: string;
	readonly icon?: string;
};

export type League4 = {
	readonly _id?: string;
	readonly title?: string;
};

export const getAllRewards = async (params: { user?: string }) =>
	(await axios.get<RewardResponse[]>(URLS.rewards, { params })).data;
