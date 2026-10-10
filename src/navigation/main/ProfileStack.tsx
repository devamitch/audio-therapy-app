/* eslint-disable react/no-unstable-nested-components */
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { ProfileNav } from '../navigation';

import { ChalangeDetails } from '@/screens';
import PlayerMultipleChalanges from '@/screens/Contests/PlayerMultipleChalanges';
import RecentContests from '@/screens/Contests/RecentContests';
import Winners from '@/screens/Contests/Winners';
import AllLeagues from '@/screens/Leagues/AllLeagues';
import PlayersScreen from '@/screens/Players/PlayersScreen';
import DashBoard from '@/screens/Profile/DashBoard';
import { FontSizeColorStyle, responsive } from '@/styles';

const ProfileStack = () => {
	return (
		<>
			<ProfileNav.Navigator
				screenOptions={(mainprops) => ({
					headerTintColor: 'rgb(229, 229, 231)',
					headerTitleAlign: 'center',

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
					// headerBackTitle: () => (
					// 	<Text
					// 		style={[
					// 			FontSizeColorStyle['montserrat-700-16-white'],
					// 			{ color: props?.tintColor },
					// 		]}
					// 	>
					// 		{props.children}
					// 	</Text>
					// ),
					headerBackTitleStyle: FontSizeColorStyle['montserrat-600-14-white'],
					headerBackButtonMenuEnabled: true,
					headerLeft: (props) =>
						props?.canGoBack && props?.label ? (
							<RectButton
								style={{
									flexDirection: 'row',
									gap: responsive(0),
									alignItems: 'center',
								}}
								onPress={() => mainprops?.navigation?.goBack()}
							>
								<Ionicons
									// name="ios-notifications"
									name="chevron-back"
									size={responsive(24)}
									color={props?.tintColor || 'white'}
								/>
								<Text
									style={[
										FontSizeColorStyle['montserrat-500-13-white'],
										{ color: props?.tintColor || 'white' },
									]}
								>
									{props?.label}
								</Text>
							</RectButton>
						) : null,

					headerRight: (props) => (
						<RectButton>
							<Ionicons
								name="ios-notifications"
								// name="chevron-back"
								size={responsive(24)}
								color={props?.tintColor || 'white'}
							/>
						</RectButton>
					),
				})}
				initialRouteName="Dashboard"
			>
				<ProfileNav.Screen name="Dashboard" component={DashBoard} />
				<ProfileNav.Screen
					name="PlayerMultipleChalanges"
					component={PlayerMultipleChalanges}
					options={{ headerShown: false }}
				/>
				<ProfileNav.Screen
					name="JoinedContests"
					component={RecentContests}
					options={{ headerTitle: 'Contests', headerBackTitle: 'Dashboard' }}
				/>
				<ProfileNav.Screen
					name="Player"
					component={PlayersScreen}
					options={{ headerTitle: 'Player', headerBackTitle: 'Dashboard' }}
				/>

				<ProfileNav.Screen
					name="Leagues"
					component={AllLeagues}
					options={{ headerTitle: 'My Leagues', headerBackTitle: 'Dashboard' }}
				/>
				<ProfileNav.Screen
					name="Winners"
					component={Winners}
					options={{ headerTitle: 'Entrant', headerBackTitle: 'Contests' }}
				/>
				<ProfileNav.Screen
					name="ChalangeDetails"
					component={ChalangeDetails}
					options={(mainprops) => ({
						headerTitle: 'Chalange',
						headerBackVisible: false,
					})}
				/>
			</ProfileNav.Navigator>
		</>
	);
};

export default ProfileStack;
