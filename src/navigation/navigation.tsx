import type { NavigationContainerRef, RouteProp } from '@react-navigation/core';
import { CommonActions } from '@react-navigation/core';
import type { DrawerNavigationOptions } from '@react-navigation/drawer';
import { createRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

import { BackIcon, DrawerRightIcon } from './Drawer/Icons';
import type { MainNavigationProps, MainParamListType } from './main/MainNav';
import type {
    AppTabScreenParamType,
    NewzTabScreenParamType,
    ProfileScreenParamType,
    RootTabScreenParamType,
} from './types';

import { DRAWER_BG, DRAWER_TEXT_COLOR } from '@/constants/env';
import { TAB_BAR_HEIGHT } from '@/lib/utils';
import { ALL_COLORS, FontSizeColorStyle, responsive } from '@/styles';

export const NewzNav = createNativeStackNavigator<NewzTabScreenParamType>();
export const ProfileNav = createNativeStackNavigator<ProfileScreenParamType>();
export const RootNavigation = createNativeStackNavigator<RootTabScreenParamType>();

export const navigationRef = createRef<NavigationContainerRef<RootTabScreenParamType>>();

export function navigate(
	name: keyof RootTabScreenParamType
	// params: RootTabScreenParamType[keyof RootTabScreenParamType]
) {
	if (navigationRef.current?.isReady) {
		navigationRef.current.navigate(name);
	}
}

export function navigateAndSimpleReset(name: keyof RootTabScreenParamType, index = 0) {
	if (navigationRef.current?.isReady) {
		navigationRef.current.dispatch(
			CommonActions.reset({
				index,
				routes: [
					{
						name,
					},
				],
			})
		);
	}
}

export const AppTabNavigation = createMaterialTopTabNavigator<AppTabScreenParamType>();

export const COMMON_OPTIONS = {
	drawerActiveBackgroundColor: 'rgba(225, 225, 225, 0.11)',
	drawerActiveTintColor: ALL_COLORS['light-f5f5f5'],
	headerPressOpacity: 0.7,
	swipeEnabled: false,
	swipeMinDistance: 20,
} as const satisfies DrawerNavigationOptions;

export const getDrawerScreenOptions = ({
	navigation,
}: {
	navigation: MainNavigationProps;
	route: RouteProp<MainParamListType, keyof MainParamListType>;
}) => {
	return {
		contentStyle: navStyles.drawer,
		headerBlurEffect: 'systemUltraThinMaterialDark',
		headerTitleAlign: 'center',
		headerRight: ({ tintColor }) => (
			<TouchableOpacity
				onPress={() => navigation.openDrawer()}
				style={[navStyles.headerRight, { backgroundColor: DRAWER_BG }]}
			>
				<DrawerRightIcon color={tintColor} size={17} />
			</TouchableOpacity>
		),

		headerLeft: () => null,

		headerStyle: { backgroundColor: DRAWER_BG },
		headerSearchBarOptions: {
			autoCapitalize: 'words',
		},
		headerShown: true,

		statusBarAnimation: 'fade',
		title: 'test',
		headerTitle: ({ tintColor: color = DRAWER_TEXT_COLOR, children }) => (
			<View style={[navStyles.headerTitle, { backgroundColor: DRAWER_BG }]}>
				<FastImage
					source={{
						uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYWOSaWNzutK5JQJHc9EKEh-_rRBh2ZMLh3g&usqp=CAU',
					}}
					style={navStyles.logo}
				/>
				<Text style={[FontSizeColorStyle['montserrat-600-14-green-9aebbf'], { color }]}>
					{children}
				</Text>
			</View>
		),
	} as const satisfies NativeStackNavigationOptions;
};

export function getDraweOption<T extends keyof MainParamListType>({
	route,
	compareRoute,
	navigation,
	shouldHideBack = true,
	...addedprops
}: DrawerNavigationOptions & {
	route: RouteProp<MainParamListType, T>;
	navigation: any;
	compareRoute?: string[];
	shouldHideBack?: boolean;
}): DrawerNavigationOptions {
	const isActive =
		getFocusedRouteNameFromRoute(route) === undefined ||
		(compareRoute || [])?.includes(getFocusedRouteNameFromRoute(route));

	return {
		...COMMON_OPTIONS,
		drawerAllowFontScaling: true,
		headerTransparent: isActive ? true : false,
		headerLeft: () => {
			return shouldHideBack ? null : isActive ? null : (
				<TouchableOpacity
					style={[navStyles.headerLeft, { backgroundColor: DRAWER_BG }]}
					onPress={() => navigation.goBack()}
				>
					<BackIcon />
				</TouchableOpacity>
			);
		},
		...addedprops,
	} as const satisfies DrawerNavigationOptions;
}

export const STARTING_STACK_GROUP_OPTIONS = {
	cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
	detachPreviousScreen: true,
	headerShown: false,
	headerTransparent: true,
};

export const AppTabScreenOption = {
	animationEnabled: true,
	lazy: true,
	swipeEnabled: true,
	tabBarActiveTintColor: ALL_COLORS.primary,
	tabBarAllowFontScaling: true,
	tabBarContentContainerStyle: {
		borderRadius: 2,
		height: TAB_BAR_HEIGHT,
	},
	tabBarInactiveTintColor: '#858585',
	tabBarIndicatorStyle: {
		backgroundColor: ALL_COLORS.green,
	},
	tabBarItemStyle: {
		width: 100,
	},
	tabBarScrollEnabled: true,
	tabBarStyle: {
		backgroundColor: '#ffffff',
		borderBottomColor: '#c4c4c4',
		borderBottomWidth: 1,
		shadowColor: 'transparent',
	},
} as const;

export const navStyles = StyleSheet.create({
	drawer: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		paddingHorizontal: responsive(20),
		paddingVertical: responsive(20),
	},
	headerLeft: {
		borderRadius: responsive(10),
		marginLeft: responsive(10),
		padding: responsive(6),
	},
	headerRight: {
		borderRadius: responsive(10),
		marginRight: responsive(10),
		padding: responsive(6),
	},
	headerTitle: {
		alignItems: 'center',
		borderRadius: responsive(10),
		flexDirection: 'row',
		gap: responsive(5),
		paddingHorizontal: responsive(10),
		paddingVertical: responsive(5),
	},
	logo: {
		height: responsive(25),
		width: responsive(30),
	},
});
