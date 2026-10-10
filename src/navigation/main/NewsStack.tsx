import { NewzNav, STARTING_STACK_GROUP_OPTIONS } from '../navigation';

import CreateChallengePage from '@/screens/Chalange/ChallengeCreate';
import Home from '@/screens/Chalange/Home';
import PlayerDetailsScreen from '@/screens/PlayerDetailsScreen';
import PlayerMultipleChalanges from '@/screens/PlayerMultipleChalanges';

const NewsStack = () => (
	<NewzNav.Navigator screenOptions={STARTING_STACK_GROUP_OPTIONS} initialRouteName="Newz">
		<NewzNav.Screen name="Newz" component={Home} />
		<NewzNav.Screen name="Create" component={CreateChallengePage} />
		<NewzNav.Screen name="Chalange" component={PlayerMultipleChalanges} />
		<NewzNav.Screen name="Player" component={PlayerDetailsScreen} />
	</NewzNav.Navigator>
);

export default NewsStack;
