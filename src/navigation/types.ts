import type { RouteProp } from '@react-navigation/core';
// import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import type { StackNavigationProp } from '@react-navigation/stack';

export const SEARCH_TITLE = {
	headliners: 'Pick 3 Headliner ',
	testStars: '5 Music x Stars',
	risingStars: 'Pick 3 Playback Singers',
} as const;

export type SearchPlayerParam = keyof typeof SEARCH_TITLE;

export type HOME_PARAMLIST_TYPE = {
	Discover: undefined;
	Follow?: { id?: string };
	Followers?: { id?: string };
	Category: undefined;
};

export type AuthStackParamList = {
	Login: undefined;
	SignIn: undefined;
	Category: undefined;
};

export type NewzTabScreenParamType = {
	Player?: { id?: string };
	Followers?: { id?: string };
	Relevency: undefined;
	Newz: undefined;
	Join: undefined;
	Chalange?: { id?: string };
	Create?: undefined;
};

export type ProfileScreenParamType = {
	Dashboard: undefined;
	Player?: { id?: string; image?: string; name?: string };
	Rewards: undefined;
	Leagues: undefined;
	Winners: { id?: string; status?: 0 | 1 | 2 | 3 };
	Settings: undefined;
	Notification: undefined;
	InviteFriends: undefined;
	JoinedContests: undefined;
	PlayerMultipleChalanges: undefined;
	ChalangeDetails: { challangeId?: string; status?: 0 | 1 | 2 | 3; tag?: string };
};

export type RootTabScreenParamType = {
	Main: undefined;
	Tutorial: undefined;
	TutorialSliders: undefined;
	Login: undefined;
	SignIn: undefined;
	PickPlayers: undefined;
	Competition: undefined;
	MusicScreen: undefined;
	SearchPlayer?: {
		search?: SearchPlayerParam;
	};
	CompleteProfile: undefined;
	AddSocial: undefined;
	Demo1: undefined;
	Players: undefined;
};

export type AppTabScreenParamType = {
	Discover: undefined;
	Feed?: undefined;
};

export type RootStackNavigationType = StackNavigationProp<RootTabScreenParamType>;
export type RootStackRouteType<T extends keyof RootTabScreenParamType> = RouteProp<
	RootTabScreenParamType,
	T
>;

export type AuthStackNavigationType = StackNavigationProp<AuthStackParamList>;
export type NewzStackNavigationType = StackNavigationProp<NewzTabScreenParamType>;

export type ProfileStackNavigationType = StackNavigationProp<ProfileScreenParamType>;

export type PROFILE_NAV_PROPS_TYPES<T extends keyof ProfileScreenParamType> = {
	route: RouteProp<ProfileScreenParamType, T>;
	navigation: ProfileStackNavigationType;
};

export type AUTH_NAV_PROPS_TYPES<T extends keyof AuthStackParamList> = {
	route: RouteProp<AuthStackParamList, T>;
	navigation: AuthStackNavigationType;
};
export type NEWZ_NAV_PROPS_TYPES<T extends keyof NewzTabScreenParamType> = {
	route: RouteProp<NewzTabScreenParamType, T>;
	navigation: NewzStackNavigationType;
};

export type HomeStackNavigationProps = StackNavigationProp<HOME_PARAMLIST_TYPE>;

export type AppStackNavigationProps = MaterialTopTabNavigationProp<AppTabScreenParamType>;

export type HomeStackRoute<T extends keyof HOME_PARAMLIST_TYPE> = RouteProp<HOME_PARAMLIST_TYPE, T>;

export type AppStackRoute<T extends keyof AppTabScreenParamType> = RouteProp<
	AppTabScreenParamType,
	T
>;
export type RootStackRoute<T extends keyof RootTabScreenParamType> = RouteProp<
	RootTabScreenParamType,
	T
>;
