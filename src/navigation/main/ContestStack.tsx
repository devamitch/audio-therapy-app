import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

import { ChalangeDetails } from '@/screens';
import PlayerMultipleChalanges from '@/screens/Contests/PlayerMultipleChalanges';
import RecentContest from '@/screens/Contests/RecentContests';
import Winners from '@/screens/Contests/Winners';
import PlayersScreen from '@/screens/Players/PlayersScreen';
import { FontSizeColorStyle } from '@/styles';

export type ContestScreenParamType = {
	LiveContests: undefined;
	AllContests: undefined;
	Player?: { id?: string; image?: string; name?: string };
	ChalangeDetails: { challangeId?: string; status?: 0 | 1 | 2 | 3 };
	Winners: { id?: string; status?: 0 | 1 | 2 | 3 };
};
export type ContestStackNavigationType = StackNavigationProp<ContestScreenParamType>;

export const ContestNav = createNativeStackNavigator<ContestScreenParamType>();

const ContestStack = () => (
	<ContestNav.Navigator
		screenOptions={{
			headerTintColor: 'rgb(229, 229, 231)',

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
		initialRouteName="AllContests"
	>
		<ContestNav.Screen
			name="AllContests"
			component={RecentContest}
			options={{
				headerTitle: 'Contests',
			}}
		/>

		<ContestNav.Screen
			name="LiveContests"
			component={PlayerMultipleChalanges}
			options={{ headerShown: false }}
		/>

		<ContestNav.Screen
			name="Player"
			component={PlayersScreen}
			options={{ headerTitle: 'Player', headerBackTitle: '24 Hour Contest' }}
		/>
		<ContestNav.Screen
			name="ChalangeDetails"
			component={ChalangeDetails}
			options={(props) => ({
				headerTitle: 'Chalange Details',
				headerShown: true,
				// headerTransparent: true,
			})}
		/>
		<ContestNav.Screen
			name="Winners"
			component={Winners}
			options={{ headerTitle: 'Entrant', headerBackTitle: 'Contests' }}
		/>
	</ContestNav.Navigator>
);

export default ContestStack;
