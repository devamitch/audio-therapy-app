import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { STARTING_STACK_GROUP_OPTIONS } from '../navigation';

import CompetitionStack from './CompetitionStack';

import MatchScreen from '@/screens/Match';
import MenuScreen from '@/screens/MenuScreen';

export type PlayerScreenParamType = {
	Players: undefined;
	Competions: undefined;
	Matches: undefined;
	AccountCenter: undefined;
	Settings: undefined;
	Rewards: undefined;
	Menu: undefined;
	Premium: undefined;
};

export const MenusNav = createNativeStackNavigator<PlayerScreenParamType>();

const MenuStack = () => (
	<MenusNav.Navigator screenOptions={STARTING_STACK_GROUP_OPTIONS} initialRouteName="Menu">
		<MenusNav.Screen name="Menu" component={MenuScreen} />
		<MenusNav.Screen name="Players" component={MenuStack} />
		<MenusNav.Screen name="Competions" component={CompetitionStack} />
		<MenusNav.Screen name="Matches" component={MatchScreen} />
		<MenusNav.Screen name="AccountCenter" component={MatchScreen} />
		<MenusNav.Screen name="Settings" component={MatchScreen} />
		<MenusNav.Screen name="Rewards" component={MatchScreen} />
		<MenusNav.Screen name="Premium" component={MatchScreen} />
	</MenusNav.Navigator>
);

export default MenuStack;
