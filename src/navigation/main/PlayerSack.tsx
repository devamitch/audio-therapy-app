import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { STARTING_STACK_GROUP_OPTIONS } from '../navigation';

import PlayerListScreen from '@/screens/Player';
import PlayerDetailsScreen from '@/screens/PlayerDetailsScreen';

export type PlayerScreenParamType = {
	Players: undefined;
	Player?: { id?: string };
};

export const PlayersNav = createNativeStackNavigator<PlayerScreenParamType>();

const PlayersStack = () => (
	<PlayersNav.Navigator screenOptions={STARTING_STACK_GROUP_OPTIONS} initialRouteName="Players">
		<PlayersNav.Screen name="Players" component={PlayerListScreen} />
		<PlayersNav.Screen name="Player" component={PlayerDetailsScreen} />
	</PlayersNav.Navigator>
);

export default PlayersStack;
