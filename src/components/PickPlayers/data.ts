/* eslint-disable no-warning-comments */
/* eslint-disable no-loops/no-loops */
import { faker } from '@faker-js/faker';

import { PlayerProps } from './Player';

import { SearchPlayerParam } from '@/navigation/types';

export const generateRandomPlayerData = (
	literal: SearchPlayerParam | undefined = 'headliner',
	numberOfData: number | undefined = 4
): PlayerProps[] => {
	const data: PlayerProps[] = [];

	// Use a default value for `literal` if it's undefined
	literal = literal || 'headliner';

	for (let i = 0; i < numberOfData; ++i) {
		data.push({
			name: faker?.person?.fullName(),
			firstName: faker?.person?.firstName(),
			lastName: faker?.person?.firstName(),
			description: faker?.lorem?.paragraph(),
			followers: faker?.number?.int()?.toString(),
			level: faker?.finance?.currencySymbol() || '', // Use a default value for level if faker is undefined
			id: `${literal}_${faker?.phone?.imei()}`, // Use a default value for id if faker is undefined
			followers: faker?.finance?.amount() || '0', // Use a default value for credit if faker is undefined
			point: faker?.number?.int()?.toString() || '0', // Use a default value for point if faker is undefined
			price: faker?.finance?.amount() || '0', // Use a default value for price if faker is undefined
			image: faker?.image?.avatar() || '', // Use a default value for image if faker is undefined
			genre: faker?.music?.genre() || '', // Use a default value for image if faker is undefined
			selected: false,
		});
	}

	return data;
};

export const generateRandomChalangeData = (numberOfData: number | undefined = 10) => {
	const data: {
		player1: PlayerProps;
		player2: PlayerProps;

		numOfTokenBet?: string | number;
		description?: string;
		writerImage?: string;
		avatars?: string[];
		writerName?: string;
		totatBets?: number | string;
		bottomTexts?: string[];
		createdOn?: string;
	}[] = [];

	for (let i = 0; i < numberOfData; ++i) {
		data.push({
			player1: {
				name: faker?.person?.fullName(),
				firstName: faker?.person?.firstName(),
				lastName: faker?.person?.firstName(),
				description: faker?.lorem?.paragraph(),
				followers: faker?.number?.int()?.toString(),
				level: faker?.finance?.currencySymbol() || '',
				id: faker?.phone?.imei(),
				followers:
					`${faker?.finance?.amount()} ${faker?.finance?.currency()?.symbol}` || '0',
				point: faker?.number?.int()?.toString() || '0',
				price: `${faker?.finance?.amount()} ${faker?.finance?.currency()?.symbol}` || '0',
				bet: `${faker?.finance?.amount()} ${faker?.finance?.currency()?.symbol}` || '0',
				amount: `${faker?.finance?.amount()} ${faker?.finance?.currency()?.symbol}` || '0',
				image: faker?.image?.avatar() || '',
				genre: faker?.music?.genre() || '',
				selected: false,
			},
			player2: {
				name: faker?.person?.fullName(),
				firstName: faker?.person?.firstName(),
				lastName: faker?.person?.firstName(),
				description: faker?.lorem?.paragraph(),
				followers: faker?.number?.int()?.toString(),
				level: faker?.finance?.currencySymbol() || '',
				id: faker?.phone?.imei(),
				followers: faker?.finance?.amount() || '0',
				bet: `${faker?.finance?.amount()} ${faker?.finance?.currency()?.symbol}` || '0',
				amount: `${faker?.finance?.amount()} ${faker?.finance?.currency()?.symbol}` || '0',
				point: faker?.number?.int()?.toString() || '0',
				price: `${faker?.finance?.amount()} ${faker?.finance?.currency()?.symbol}` || '0',
				image: faker?.image?.avatar() || '',
				genre: faker?.music?.genre() || '',
				selected: false,
			},
			numOfTokenBet: faker?.finance?.amount() || '0',
			description: faker?.lorem?.paragraphs(),
			writerImage: faker?.image?.avatar(),
			avatars: [
				faker?.image?.avatar(),
				faker?.image?.avatar(),
				faker?.image?.avatar(),
				faker?.image?.avatar(),
				faker?.image?.avatar(),
			],
			writerName: faker?.person?.fullName(),
			totatBets: faker?.finance?.amount(),
			bottomTexts: [faker?.lorem?.sentence(), faker?.lorem?.sentence()],
			createdOn: faker?.date?.soon()?.getTime()?.toString() || '',
		});
	}

	return data;
};

export interface Musician {
	name: string;
	firstName: string;
	lastName: string;
	description: string;
	followers: string;
	level: string;
	id: string;
	point: string;
	price: string;
	bet: string;
	amount: string;
	image: string;
	genre: string;
	selected: boolean;
}

export interface CompetitionData {
	participant1: Musician;
	participant2: Musician;
	numOfTokenBet: string;
	description: string;
	writerImage: string;
	avatars: string[];
	writerName: string;
	totalBets: string;
	bottomTexts: string[];
	createdOn: string;
	winner: string;
	claimAmount: string;
}

export const generateRandomCompetitionData = (numberOfData: number = 10): CompetitionData[] => {
	const data: CompetitionData[] = [];

	for (let i = 0; i < numberOfData; ++i) {
		const generateMusician = (): Musician => ({
			name: faker.person.fullName(),
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			description: faker.lorem.paragraph(),
			followers: faker.number.int().toString(),
			level: faker.finance.currencySymbol() || '',
			id: faker.phone.imei(),
			point: faker.number.int().toString() || '0',
			price: `${faker.finance.amount()} ${faker.finance.currency()?.symbol}` || '0',
			bet: `${faker.finance.amount()} ${faker.finance.currency()?.symbol}` || '0',
			amount: `${faker.finance.amount()} ${faker.finance.currency()?.symbol}` || '0',
			image: faker.image.avatar() || '',
			genre: faker.music.genre() || '',
			selected: false,
		});

		const participant1 = generateMusician();

		const participant2 = generateMusician();

		const winnerIndex = Math.random() < 0.5 ? 0 : 1;

		const winner = winnerIndex === 0 ? 'Participant 1' : 'Participant 2';

		const competition: CompetitionData = {
			participant1,
			participant2,
			numOfTokenBet: faker.finance.amount(),
			description: faker.lorem.paragraphs(),
			writerImage: faker.image.avatar(),
			avatars: Array.from({ length: 5 }, () => faker.image.avatar()),
			writerName: faker.person.fullName(),
			totalBets: faker.finance.amount(),
			bottomTexts: [faker.lorem.sentence(), faker.lorem.sentence()],
			createdOn: faker.date.soon().getTime().toString(),
			winner,
			claimAmount: `${faker.finance.amount()} ${faker.finance.currency()?.symbol}` || '0',
		};

		data.push(competition);
	}

	return data;
};

export interface Winner {
	name: string;
	firstName: string;
	lastName: string;

	level: string;
	id: string;

	image: string;
	claim: string;
	rank: number;
}

export const generateRandomWinnerData = (numberOfData: number = 10): Winner[] => {
	const data: Winner[] = [];

	for (let i = 0; i < numberOfData; ++i) {
		const generateWinner = (): Winner => ({
			name: faker.person.fullName(),
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),

			level: faker.finance.currencySymbol() || '',
			id: faker.datatype.uuid(),
			image: faker.image.avatar() || '',
			claim: faker.finance.amount(),
			rank: faker.datatype.number(),
		});

		const winner = generateWinner();

		data.push(winner);
	}

	return data;
};
