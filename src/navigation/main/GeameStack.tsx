import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

import ContestStack from './ContestStack';
import LeagueStack from './LeagueStack';

import GameScreen from '@/screens/Profile/GameScreen';
import { FontSizeColorStyle } from '@/styles';

export type GameStackParamType = {
	Leagues?: undefined;

	Contests: undefined;
	MainGame: undefined;
};
export type GameStackNavigationType = StackNavigationProp<GameStackParamType>;

export type GameStackRouteType<T extends keyof GameStackParamType> = {
	route: RouteProp<GameStackParamType, T>;
	navigation: GameStackNavigationType;
};

export const GameNav = createNativeStackNavigator<GameStackParamType>();

const GeameStack = () => (
	<GameNav.Navigator
		screenOptions={{
			// headerTintColor: 'rgb(229, 229, 231)',
			headerBackVisible: false,
			headerLargeTitleShadowVisible: true,
			headerLargeStyle: { backgroundColor: 'rgba(0,0,0,0.01)' },
			headerBackTitleVisible: false,

			// headerShown: false,
			headerTitle: (props) => (
				<Text
					style={[
						FontSizeColorStyle['montserrat-700-16-white'],
						{ color: props?.tintColor },
					]}
				>
					{props.children}
				</Text>
			),
		}}
		initialRouteName="MainGame"
	>
		<GameNav.Screen
			name="MainGame"
			component={GameScreen}
			options={(props) => ({
				title: 'Game Mode',

				headerTitle: () => <></>,
				headerLargeTitle: true,
				headerBackVisible: false,
				headerLargeTitleShadowVisible: false,
				headerTitleAlign: 'left',
			})}
		/>
		<GameNav.Screen
			name="Leagues"
			component={LeagueStack}
			options={(props) => ({
				headerShown: false,
				// presentation: 'formSheet',
			})}
		/>
		<GameNav.Screen
			name="Contests"
			component={ContestStack}
			options={(props) => ({
				headerShown: false,
				// presentation: 'formSheet',
			})}
		/>
	</GameNav.Navigator>
);

export default GeameStack;
