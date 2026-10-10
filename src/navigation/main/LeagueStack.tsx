import { RouteProp } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'react-native';

// import GradientText from '@/components/Base/GradientText';
import { ChalangeDetails } from '@/screens';
import RecentContests from '@/screens/Contests/RecentContests';
import AllLeagues from '@/screens/Leagues/AllLeagues';
import ConfirmLeague from '@/screens/Leagues/ConfirmLeague';
import League from '@/screens/Leagues/League';
import LeagueDetails from '@/screens/Leagues/LeagueDetails';
import { FontSizeColorStyle } from '@/styles';

export type LeagueScreenParamType = {
	League?: { id?: string; name?: string; edit?: boolean };
	ConfirmLeague?: { id?: string; name?: string; edit?: boolean };
	LeagueDetail?: { id?: string; name?: string; image?: string };
	Recent: undefined;
	AllLeagues: undefined;
	ChalangeDetails: { challangeId?: string; status?: 0 | 1 | 2 | 3 };
};
export type LeagueStackNavigationType = StackNavigationProp<LeagueScreenParamType>;

export type LeagueStackRouteType<T extends keyof LeagueScreenParamType> = {
	route: RouteProp<LeagueScreenParamType, T>;
	navigation: LeagueStackNavigationType;
};

export const LeagueNav = createNativeStackNavigator<LeagueScreenParamType>();

const LeagueStack = () => (
	<LeagueNav.Navigator
		screenOptions={{
			headerTintColor: '#00BCFD',
			// headerTintColor: 'rgb(229, 229, 231)',
			headerLargeTitle: true,
			headerBackVisible: false,
			headerLargeTitleShadowVisible: true,
			headerLargeStyle: { backgroundColor: 'rgba(0,0,0,0.01)' },
			headerTitleAlign: 'left',
			headerBackTitleVisible: false,
			headerBackButtonMenuEnabled: false,
			headerTransparent: false,

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
		initialRouteName="AllLeagues"
	>
		<LeagueNav.Screen
			name="League"
			component={League}
			options={(props) => ({
				title: props?.route?.params?.name || 'League',
				headerTitle: props?.route?.params?.name,

				headerTransparent: false,
				headerShown: true,
				// headerLargeTitle: true,
				headerBackVisible: false,
				headerLargeTitleShadowVisible: false,
				headerTitleAlign: 'left',
			})}
		/>
		<LeagueNav.Screen
			name="ConfirmLeague"
			component={ConfirmLeague}
			options={(props) => ({
				headerTransparent: false,

				title: props?.route?.params?.name || 'test',
				headerTitle: props?.route?.params?.name || 'test',
				// headerTitle: () => (
				// 	<GradientText
				// 		style={FontSizeColorStyle['lato-700-24-primary-text']}
				// 		colors={['#00BCFD', '#007097']}
				// 		start={{ x: 0.4, y: 0 }}
				// 		end={{ x: 1, y: 1 }}
				// 	>
				// 		{props?.route?.params?.name}
				// 	</GradientText>
				// ),
			})}
		/>
		<LeagueNav.Screen
			name="LeagueDetail"
			component={LeagueDetails}
			options={(props) => ({
				headerTitle: '',
				headerBackTitleVisible: false,
				headerShown: true,
				headerTransparent: true,
			})}
		/>
		<LeagueNav.Screen name="Recent" component={RecentContests} />
		<LeagueNav.Screen
			name="AllLeagues"
			component={AllLeagues}
			options={{ headerTitle: 'Leagues' }}
		/>
		<LeagueNav.Screen
			name="ChalangeDetails"
			component={ChalangeDetails}
			options={(props) => ({
				headerTitle: 'Chalange Details',
				headerShown: true,
				// headerTransparent: true,
			})}
		/>
	</LeagueNav.Navigator>
);

export default LeagueStack;
