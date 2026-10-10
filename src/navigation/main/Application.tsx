/* eslint-disable no-warning-comments */
/* eslint-disable react/no-unstable-nested-components */
import { useCallback } from 'react';
import { ImageBackground, Linking, Text } from 'react-native';
// import { ImageBackground, Modal, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
// import { useFlipper } from '@react-navigation/devtools';
import {
    LinkingOptions,
    NavigationContainer,
    useNavigationContainerRef,
} from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { shallow } from 'zustand/shallow';

import { RootTabScreenParamType, SEARCH_TITLE } from '../types';

import MainStack from './MainStack';

import { IMAGES } from '@/assets';
import { Toast } from '@/components';
import { MuxicXText } from '@/components/Base/experimental/GradienText';
import { useAppStore } from '@/core/store';
import { isAndroid } from '@/lib/utils';
import { navigationRef, RootNavigation } from '@/navigation/navigation';
import { CompleteProfilePage, TutorialScreen, TutorialSliderScreen } from '@/screens';
import AddSocialHandlesPage from '@/screens/Auth/AddSocialHandlesPage';
import Login from '@/screens/Auth/Login';
// import {
// 	AddSocialHandlesPage,
// 	CompleteProfilePage,
// 	Login,
// 	PickPlayers,
// 	SearchPlayer,
// 	// Signup,
// } from '@/screens';
import SignUp from '@/screens/Auth/SignUp';
import MusicScreen from '@/screens/MusicScreen';
import PickPlayers from '@/screens/PickPlayers';
import PlayersScreen from '@/screens/Players/PlayersScreen';
import SearchPlayer from '@/screens/SearchPlayer';
// import {
// 	AddSocialHandlesPage,
// 	CompleteProfilePage,
// 	Login,
// 	PickPlayers,
// 	SearchPlayer,
// 	Signup,
// } from '@/screens';
// import PlayerMultipleChalanges from '@/screens/PlayerMultipleChalanges';
// import PlayersScreen from '@/screens/Players/PlayersScreen';
import { ALL_COLORS, FontSizeColorStyle, LayoutStyle } from '@/styles';
enableScreens();

export const deepLinksConfig: LinkingOptions<RootTabScreenParamType>['config'] = {
	screens: {
		Main: 'referral/',
	},
};
const Application = () => {
	const rootNavigationRef = useNavigationContainerRef();

	// useFlipper(rootNavigationRef);

	const isCompleteAuth = useAppStore(
		useCallback((data) => data.isCompleteAuth!!, []),
		shallow
	);

	const takeTour = useAppStore((data) => data.takeTour!!, shallow);

	const initialRouteName = isCompleteAuth ? (takeTour ? 'Tutorial' : 'Main') : 'SignIn';

	console.log({ isCompleteAuth, takeTour, initialRouteName });

	return (
		<SafeAreaProvider>
			<ImageBackground source={IMAGES.bg} style={LayoutStyle.fill}>
				<SafeAreaView style={LayoutStyle.fill} edges={['right', 'left']}>
					<NavigationContainer
						ref={navigationRef}
						// theme={DarkTheme}
						theme={{
							dark: true,
							colors: {
								primary: ALL_COLORS['primary-button'],
								background: 'transparent',
								card: 'transparent',
								text: 'rgb(229, 229, 231)',
								border: 'rgb(39, 39, 41)',
								notification: ALL_COLORS.primary,
							},
						}}
						linking={{
							config: deepLinksConfig,
							prefixes: ['https://com.nonceblox.test1'],

							async getInitialURL() {
								const url = await Linking.getInitialURL();

								if (url != null) {
									return url;
								}

								// Handle URL from expo push notifications
								const response =
									await Notifications.getLastNotificationResponseAsync();

								return response?.notification.request.content.data.url;
							},
							subscribe(listener) {
								const onReceiveURL = ({ url }: { url: string }) => listener(url);

								// Listen to incoming links from deep linking
								const eventListenerSubscription = Linking.addEventListener(
									'url',
									onReceiveURL
								);

								// Listen to expo push notifications
								const subscription =
									Notifications.addNotificationResponseReceivedListener(
										(response) => {
											const url =
												response.notification.request.content.data.url;

											// Any custom logic to see whether the URL needs to be handled
											//...

											// Let React Navigation handle the URL
											listener(url);
										}
									);

								return () => {
									// Clean up the event listeners
									eventListenerSubscription.remove();
									subscription.remove();
								};
							},
						}}
						// independent={true}
						// fallback={<Loader />}
					>
						<RootNavigation.Navigator
							initialRouteName={
								isCompleteAuth ? (takeTour ? 'Tutorial' : 'Main') : 'SignIn'
							}
							// initialRouteName={'SignIn'}
							screenOptions={{
								gestureEnabled: true,
								headerShown: false,
								headerTitleAlign: 'left',
								headerTintColor: '#17a1cf',
								navigationBarColor: 'transparent',
								headerTitle: '',
								headerStyle: {
									backgroundColor: '#000',
								},
								navigationBarHidden: true,
								headerLeft: () => <MuxicXText />,
								animation: 'ios',
								fullScreenGestureEnabled: true,

							}}
						>
							<RootNavigation.Screen name="SignIn" component={SignUp} />
							<RootNavigation.Screen name="Tutorial" component={TutorialScreen} />
							<RootNavigation.Screen
								name="TutorialSliders"
								component={TutorialSliderScreen}
							/>
							<RootNavigation.Screen name="Login" component={Login} />
							<RootNavigation.Screen
								name="CompleteProfile"
								component={CompleteProfilePage}
							/>
							<RootNavigation.Screen
								name="AddSocial"
								component={AddSocialHandlesPage}
							/>
							<RootNavigation.Screen
								name="PickPlayers"
								component={PickPlayers}
								options={{
									headerShown: true,
									statusBarHidden: isAndroid ? true : undefined,
								}}
							/>
							<RootNavigation.Screen
								name="SearchPlayer"
								component={SearchPlayer}
								options={(props) => ({
									...TransitionPresets.RevealFromBottomAndroid,
									headerBlurEffect: 'systemUltraThinMaterialDark',
									presentation: 'modal',
									headerTransparent: true,
									headerShown: true,
									statusBarHidden: isAndroid ? true : undefined,
									headerLeft: () => (
										<Text
											style={FontSizeColorStyle['lato-700-18-primary-text']}
										>
											{props?.route?.params?.search
												? SEARCH_TITLE[props?.route?.params?.search]
												: SEARCH_TITLE.headliners}
										</Text>
									),
									headerTitle: '',
									headerSearchBarOptions: {
										textColor: '#fff',
										tintColor: '#0a96c4',
										headerIconColor: '#fff',
										hintTextColor: '#f1f1f1',
										barTintColor: '#000e12',
										hideNavigationBar: true,
										hideWhenScrolling: false,
										autoFocus: true,
										inputType: 'text',
										shouldShowHintSearchIcon: true,
										autoCapitalize: 'sentences',
										placeholder: 'Search',
									},
								})}
							/>

							<RootNavigation.Screen
								name="Players"
								component={PlayersScreen}
								options={{
									headerShown: true,
								}}
							/>

							<RootNavigation.Screen
								name="Main"
								options={{
									headerBackTitleVisible: false,
									headerShadowVisible: false, // applied here
									headerShown: false,
									headerTintColor: '#fff',
								}}
								component={MainStack}
							/>
							<RootNavigation.Screen
								name="Competition"
								component={PickPlayers}
								options={{ presentation: 'containedModal' }}
							/>
							<RootNavigation.Screen
								name="MusicScreen"
								component={MusicScreen}
								options={{ presentation: 'formSheet', orientation: 'portrait' }}
							/>
						</RootNavigation.Navigator>
					</NavigationContainer>
					{/* <Modal>

				</Modal> */}
					<Toast />
				</SafeAreaView>
			</ImageBackground>
		</SafeAreaProvider>
	);
};

export default Application;

//  LOG  {"tempAppleToken": "001911.435b2c61c8594f44a87b5a91932b34f5.0904"}
