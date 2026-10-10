import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { BlurView as ExpoBlur } from 'expo-blur';
import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { isAndroid } from '@/lib/utils';
import ChalangeDetails from '@/screens/Chalange/ChalangeDetails';
import PlayerMultipleChalanges from '@/screens/Contests/PlayerMultipleChalanges';
import RecentContests from '@/screens/Contests/RecentContests';
import Winners from '@/screens/Contests/Winners';
import WorldCupPreview from '@/screens/Contests/WorldCupPreview';
import AllLeagues from '@/screens/Leagues/AllLeagues';
import ConfirmLeague from '@/screens/Leagues/ConfirmLeague';
import League from '@/screens/Leagues/League';
import LeagueDetails from '@/screens/Leagues/LeagueDetails';
import Participants from '@/screens/Leagues/Participants';
import MusicScreen from '@/screens/MusicScreen';
import PlayersScreen from '@/screens/Players/PlayersScreen';
import WithdrawalsScreen from '@/screens/Profile/ WithdrawalsScreen';
import DashBoard from '@/screens/Profile/DashBoard';
import DeleteScreen from '@/screens/Profile/DeleteScreen';
import DipositScreen from '@/screens/Profile/DipositScreen';
import NotificationList from '@/screens/Profile/Notification';
import ProfilePictureScreen from '@/screens/Profile/ProfilePictureScreen';
import SettingScreen from '@/screens/Profile/SettingScreen';
import SingersScreen from '@/screens/Profile/SingersScreen';
import Transaction from '@/screens/Profile/Transaction';
import UpdateUserScreen from '@/screens/Profile/UpdateUserScreen';
import Rewards from '@/screens/Rewards';
import { FontSizeColorStyle, responsive } from '@/styles';

const BlurView = Animated.createAnimatedComponent(ExpoBlur);

export type MainScreenParamType = {
	League?: { id?: string; name?: string; edit?: boolean };
	ConfirmLeague?: { id?: string; name?: string; edit?: boolean };
	LeagueDetail?: { id?: string; name?: string; image?: string };
	Dashboard: undefined;
	Player?: { id?: string; image?: string; name?: string };
	Rewards: undefined;
	Leagues: undefined;
	Winners: { id?: string; status?: 0 | 1 | 2 | 3 };
	Settings?: { id?: string; image?: string; name?: string };
	Notification: undefined;
	InviteFriends: undefined;
	MusicScreen: undefined;
	SingersScreen: undefined;
	WorldCupPreview: undefined;
	PlayerMultipleChalanges: undefined;
	ChalangeDetails: { challangeId?: string; status?: 0 | 1 | 2 | 3; tag?: string };
	LiveContests: undefined;
	AllContests: undefined;
	Transaction: undefined;
	Diposit: undefined;
	Withdraw: undefined;
	Edit: undefined;
	Delete: undefined;
	ProfilePicture: undefined;
	Participants: {
		id?: string;
		name?: string;
		image?: string;
	};
};
export type MainStackNavigationType = StackNavigationProp<MainScreenParamType>;

export type MainStackRouteType<T extends keyof MainScreenParamType> = {
	route: RouteProp<MainScreenParamType, T>;
	navigation: MainStackNavigationType;
};

export const MainNav = createNativeStackNavigator<MainScreenParamType>();

const MainStack = () => {
	return (
		<>
			<MainNav.Navigator
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
					headerBackVisible: false,
					headerBackButtonMenuEnabled: false,
					headerLeft: (props) =>
						props?.canGoBack ? (
							<RectButton
								style={{
									flexDirection: 'row',
									gap: responsive(0),
									alignItems: 'center',
								}}
								onPress={() => mainprops?.navigation?.goBack()}
							>
								<BlurView
									style={{
										padding: 2,
										borderRadius: 10,
										// borderWidth: 0.9,
										borderColor: '#f1f1f1',
										overflow: 'hidden',
									}}
									intensity={60}
									tint="dark"
									experimentalBlurMethod={'dimezisBlurView'}
								>
									<Ionicons
										// name="ios-notifications"
										name="chevron-back"
										size={responsive(24)}
										color={props?.tintColor || 'white'}
									/>
									{props?.label ? (
										<Text
											style={[
												FontSizeColorStyle['montserrat-500-13-white'],
												{ color: props?.tintColor || 'white' },
											]}
										>
											{props?.label}
										</Text>
									) : null}
								</BlurView>
							</RectButton>
						) : null,

					headerRight: (props) => (
						<RectButton
							onPress={() => {
								mainprops?.navigation?.navigate('Notification');
							}}
						>
							<BlurView
								style={{
									padding: 2,
									borderRadius: 30,
									// borderWidth: 0.9,
									borderColor: '#f1f1f1',
									overflow: 'hidden',
								}}
								intensity={60}
								tint="dark"
								experimentalBlurMethod={'dimezisBlurView'}
							>
								<Ionicons
									name="notifications"
									// name="chevron-back"
									size={responsive(20)}
									color={props?.tintColor || 'white'}
								/>
							</BlurView>
						</RectButton>
					),
				})}
				initialRouteName="Dashboard"
			>
				<MainNav.Screen name="Dashboard" component={DashBoard} />
				<MainNav.Screen
					name="PlayerMultipleChalanges"
					component={PlayerMultipleChalanges}
					options={{ headerShown: false }}
				/>
				{/* <MainNav.Screen
					name="JoinedContests"
					component={RecentContests}
					options={{ title: 'Contests', headerBackTitle: 'Dashboard' }}
				/> */}
				{/* <MainNav.Screen
				name="Player"
				component={PlayersScreen}
				options={{ headerTitle: 'Player', headerBackTitle: 'Dashboard' }}
			/> */}
				<MainNav.Screen
					name="Leagues"
					component={AllLeagues}
					options={{
						title: 'Leagues',
						headerTitle: 'Leagues',
						headerBackButtonMenuEnabled: true,
						headerBackTitleVisible: false,
						headerBackVisible: false,
					}}
				/>
				<MainNav.Screen
					name="Winners"
					component={Winners}
					options={{ title: 'Entrant', headerBackTitle: 'Contests' }}
				/>
				<MainNav.Screen
					name="AllContests"
					component={RecentContests}
					options={{
						title: 'Contests',
					}}
				/>
				<MainNav.Screen
					name="LiveContests"
					component={PlayerMultipleChalanges}
					options={{ headerShown: false }}
				/>
				<MainNav.Screen name="Transaction" component={Transaction} />
				<MainNav.Screen
					name="Player"
					component={PlayersScreen}
					options={{ title: 'Player' }}
				/>
				<MainNav.Screen
					name="ChalangeDetails"
					component={ChalangeDetails}
					options={(props) => ({
						title: 'Chalange Details',
						headerTitle: 'Chalange Details',
						headerShown: true,
						// headerTransparent: true,
					})}
				/>
				{/* <MainNav.Screen
				name="Winners"
				component={Winners}
				options={{ headerTitle: 'Entrant', headerBackTitle: 'Contests' }}
			/> */}
				<MainNav.Screen
					name="League"
					component={League}
					options={(props) => ({
						title: props?.route?.params?.name || 'League',
						headerTitle: props?.route?.params?.name,

						headerTransparent: false,
						headerShown: true,
						// headerLargeTitle: true,
						// headerBackVisible: false,
						headerLargeTitleShadowVisible: false,
						headerTitleAlign: 'left',
					})}
				/>
				<MainNav.Screen
					name="ConfirmLeague"
					component={ConfirmLeague}
					options={(props) => ({
						headerTransparent: false,

						title: props?.route?.params?.name || 'test',
						headerTitle: props?.route?.params?.name || 'test',
						headerBackTitleVisible: false,
						headerLargeTitle: true,
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
				<MainNav.Screen
					name="WorldCupPreview"
					component={WorldCupPreview}
					options={(props) => ({
						headerTransparent: false,

						title: props?.route?.params?.name || 'World Cup Contests',
						headerTitle: props?.route?.params?.name || 'World Cup Contests',
						headerBackTitleVisible: false,
						headerLargeTitle: true,
						presentation: isAndroid ? 'transparentModal' : 'formSheet',
						orientation: 'portrait',
						headerShown: false,
						animation: 'slide_from_bottom',
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
				<MainNav.Screen
					name="LeagueDetail"
					component={LeagueDetails}
					options={(props) => ({
						headerTitle: '',
						headerBackTitleVisible: false,
						headerShown: true,
						headerTransparent: true,
					})}
				/>
				{/* <MainNav.Screen name="Recent" component={RecentContests} /> */}
				<MainNav.Screen
					name="Notification"
					component={NotificationList}
					options={{ headerTitle: 'Notification', title: 'Notification' }}
				/>

				<MainNav.Screen
					name="Rewards"
					component={Rewards}
					options={{ headerTitle: 'Rewards', title: 'Rewards' }}
				/>
				<MainNav.Screen
					name="Participants"
					component={Participants}
					options={{
						headerTitle: 'Reward Screen',
						title: 'Reward Screen',
						headerBackTitleVisible: true,
						headerShown: true,
						// headerTransparent: true,
					}}
				/>
				<MainNav.Screen
					name="SingersScreen"
					component={SingersScreen}
					options={{
						headerTitle: 'Singers Screen',
						title: 'Singers Screen',
						headerBackTitleVisible: true,
						headerShown: true,
						headerTransparent: true,
					}}
				/>
				<MainNav.Screen
					name="MusicScreen"
					component={MusicScreen}
					options={{
						presentation: 'formSheet',
						orientation: 'portrait',
						headerShown: false,
					}}
				/>
				<MainNav.Screen
					name="Settings"
					component={SettingScreen}
					options={{
						presentation: 'transparentModal',
						orientation: 'portrait',
						headerShown: false,
						animation: 'slide_from_bottom',
					}}
				/>
				<MainNav.Screen
					name="Edit"
					component={UpdateUserScreen}
					options={{
						presentation: 'transparentModal',
						orientation: 'portrait',
						headerShown: false,
						animation: 'slide_from_bottom',
					}}
				/>
				<MainNav.Screen
					name="Delete"
					component={DeleteScreen}
					options={{
						presentation: 'transparentModal',
						orientation: 'portrait',
						headerShown: false,
						animation: 'slide_from_bottom',
					}}
				/>
				<MainNav.Screen
					name="ProfilePicture"
					component={ProfilePictureScreen}
					options={{
						// presentation: 'formSheet',
						// orientation: 'portrait',
						presentation: 'transparentModal',
						orientation: 'portrait',

						headerShown: false,
						animation: 'slide_from_bottom',
					}}
				/>
				<MainNav.Screen
					name="Diposit"
					component={DipositScreen}
					options={
						{
							// presentation: 'formSheet',
							// orientation: 'landscape',
						}
					}
				/>
				<MainNav.Screen
					name="Withdraw"
					component={WithdrawalsScreen}
					options={
						{
							// presentation: 'formSheet',
							// orientation: 'landscape',
						}
					}
				/>
			</MainNav.Navigator>
		</>
	);
};

export default MainStack;

const styles = StyleSheet.create({});
