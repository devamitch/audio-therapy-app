import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { RouteProp } from '@react-navigation/native';

import { DrawerContent } from '../Drawer';
import { AccountIcon, CompetitonIcon, HistoryIcon, HomeIcon, ProfileIcon } from '../Drawer/Icons';
import { getDraweOption, getDrawerScreenOptions } from '../navigation';

import CompetitionStack from './CompetitionStack';
import NewsStack from './NewsStack';
import PlayersStack from './PlayerSack';

import MatchScreen from '@/screens/Match';
import Profile from '@/screens/Profile';

export type MainParamListType = {
	NewzScreen: {
		params: {
			id?: string;
			type?: string;
		};
	};
	Competition: undefined;
	Discover: undefined;
	Creator: undefined;
	// VideoCenter: undefined;
	ProfileScreen: undefined;
	Category: undefined;
	Player: undefined;
	Chalange: undefined;
};

export const MainDrawer = createDrawerNavigator<MainParamListType>();

// Volunteer Nav
export type MainNavigationProps = DrawerNavigationProp<MainParamListType>;

export type MainRoute<T extends keyof MainParamListType> = RouteProp<MainParamListType, T>;

const MainNav = () => {
	return (
		<MainDrawer.Navigator
			initialRouteName="NewzScreen"
			drawerContent={DrawerContent}
			screenOptions={getDrawerScreenOptions}
		>
			<MainDrawer.Screen
				name="NewzScreen"
				options={({ route, navigation }) =>
					getDraweOption({
						route,
						navigation,
						drawerIcon: HomeIcon,
						drawerLabel: 'Home',
						compareRoute: ['Newz', 'Chalange'],
						shouldHideBack: false,
					})
				}
				component={NewsStack}
			/>
			<MainDrawer.Screen
				name="Competition"
				component={CompetitionStack}
				options={{ drawerLabel: 'Competitions', drawerIcon: CompetitonIcon }}
			/>

			<MainDrawer.Screen
				name="Creator"
				component={PlayersStack}
				options={{ drawerLabel: 'Players', drawerIcon: AccountIcon }}
			/>

			<MainDrawer.Screen
				name="Category"
				component={MatchScreen}
				options={{ drawerLabel: 'Matches', drawerIcon: HistoryIcon }}
			/>

			<MainDrawer.Screen
				name="ProfileScreen"
				component={Profile}
				options={{
					drawerLabel: 'Profile',
					headerTransparent: true,
					drawerIcon: ProfileIcon,
				}}
			/>
		</MainDrawer.Navigator>
	);
};

// MainNav.navigationOptions = {
// 	headerTitleAlign: 'center', // Center the header title
// };

export default MainNav;
