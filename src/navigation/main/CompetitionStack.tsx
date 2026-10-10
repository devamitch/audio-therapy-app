import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { STARTING_STACK_GROUP_OPTIONS } from '../navigation';

import CompletionDetailScreen from '@/screens/Auth/CompetetionDetails';
import CompetitionScreen from '@/screens/Competition';

export type PlayerScreenParamType = {
	Competitions: undefined;
	Competiton?: { id?: string };
};

export const CompetitionsNav = createNativeStackNavigator<PlayerScreenParamType>();

const CompetitionStack = () => (
	<CompetitionsNav.Navigator
		screenOptions={STARTING_STACK_GROUP_OPTIONS}
		initialRouteName="Competitions"
	>
		<CompetitionsNav.Screen name="Competitions" component={CompetitionScreen} />
		<CompetitionsNav.Screen name="Competiton" component={CompletionDetailScreen} />
	</CompetitionsNav.Navigator>
);

export default CompetitionStack;
