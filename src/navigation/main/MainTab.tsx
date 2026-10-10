import { StyleSheet, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { shallow } from 'zustand/shallow';

import GeameStack from './GeameStack';
import ProfileStack from './ProfileStack';
import AnimatedTabBar from './ReanimatedTabBar';
import { GameSvg } from './Svgs';

import { useAppStore } from '@/core/store';
// import JoinedLeagues from '@/screens/JoinedLeagues';
import { FontSizeColorStyle } from '@/styles';

const Tab = createBottomTabNavigator();

export type MainParamListType = {
	League: undefined;
	Contest: undefined;
	Game: undefined;
	ProfileScreen: undefined;
	JoinedLeagues: undefined;
};

export type MainStackNavigationType = StackNavigationProp<MainParamListType>;

export type MainStackRouteType<T extends keyof MainParamListType> = {
	route: RouteProp<MainParamListType, T>;
	navigation: MainParamListType;
};

export const MainNav = createNativeStackNavigator<MainParamListType>();

const BottomTabNavigator = () => {
	const user = useAppStore((state) => state?.user, shallow);

	// return (
	// 	<MainNav.Navigator
	// 		// tabBar={(props) => <AnimatedTabBar {...props} />}
	// 		initialRouteName={'ProfileScreen'}
	// 		detachInactiveScreens
	// 		screenOptions={{
	// 			// tabBarHideOnKeyboard: true,
	// 			// tabBarActiveTintColor: 'rgb(229, 229, 231)',
	// 			// tabBarInactiveTintColor: '#00BCFD',
	// 			headerShown: false,
	// 			headerTintColor: 'rgb(229, 229, 231)',
	// 			headerTitle: (props) => (
	// 				<Text
	// 					style={[
	// 						FontSizeColorStyle['montserrat-700-16-white'],
	// 						{ color: props?.tintColor },
	// 					]}
	// 					numberOfLines={1}
	// 				>
	// 					{props.children}
	// 				</Text>
	// 			),
	// 			headerRight: (props) => (
	// 				<RectButton>
	// 					<MaterialCommunityIcons name="bell-badge" size={24} color="white" />
	// 				</RectButton>
	// 			),
	// 			headerBackgroundContainerStyle: { backgroundColor: 'transparent' },
	// 		}}
	// 		sceneContainerStyle={styles.sceneContainer}
	// 	>
	// 		<MainNav.Screen
	// 			name="ProfileScreen"
	// 			component={ProfileStack}
	// 			// listeners={({ navigation }) => ({
	// 			// 	blur: () => navigation.setParams({ screen: 'ProfileScreen' }),
	// 			// })}
	// 			options={{
	// 				headerShown: false,
	// 				// tabBarIcon: (props) =>
	// 				// 	user?.icon ? (
	// 				// 		<FastImage
	// 				// 			style={{
	// 				// 				height: props?.size || 25,
	// 				// 				width: props?.size || 25,
	// 				// 				borderRadius: 100,
	// 				// 			}}
	// 				// 			source={{ uri: user?.icon }}
	// 				// 		/>
	// 				// 	) : (
	// 				// 		<MaterialCommunityIcons
	// 				// 			name="account-circle"
	// 				// 			size={props?.size || 18}
	// 				// 			color={props?.color || '#00BCFD'}
	// 				// 		/>
	// 				// 	),

	// 				// tabBarLabel: user?.name ? user?.name?.split(' ')?.[0] : 'Profile',
	// 				headerTitle: 'Dashboard Page',
	// 			}}
	// 		/>

	// 		<MainNav.Screen
	// 			name="Game"
	// 			component={GeameStack}
	// 			options={{
	// 				// tabBarLabel: 'Geame Mode',
	// 				headerShown: false,
	// 				tabBarIcon: () => <GameSvg />,
	// 			}}
	// 			// listeners={({ navigation, route }) => ({
	// 			// 	tabPress: (e) => {
	// 			// 		// Prevent default action
	// 			// 		e.preventDefault();
	// 			// 		navigation.navigate('Game', { screen: 'MainGame' });
	// 			// 	},
	// 			// })}
	// 		/>
	// 	</MainNav.Navigator>
	// );
	return (
		<Tab.Navigator
			tabBar={(props) => <AnimatedTabBar {...props} />}
			initialRouteName={'ProfileScreen'}
			detachInactiveScreens
			screenOptions={{
				tabBarHideOnKeyboard: true,
				tabBarActiveTintColor: 'rgb(229, 229, 231)',
				tabBarInactiveTintColor: '#00BCFD',
				headerShown: false,
				headerTintColor: 'rgb(229, 229, 231)',
				headerTitle: (props) => (
					<Text
						style={[
							FontSizeColorStyle['montserrat-700-16-white'],
							{ color: props?.tintColor },
						]}
						numberOfLines={1}
					>
						{props.children}
					</Text>
				),
				headerRight: (props) => (
					<RectButton>
						<MaterialCommunityIcons name="bell-badge" size={24} color="white" />
					</RectButton>
				),
				headerBackgroundContainerStyle: { backgroundColor: 'transparent' },
			}}
			sceneContainerStyle={styles.sceneContainer}
		>
			<Tab.Screen
				name="ProfileScreen"
				component={ProfileStack}
				// listeners={({ navigation }) => ({
				// 	blur: () => navigation.setParams({ screen: 'ProfileScreen' }),
				// })}
				options={{
					headerShown: false,
					tabBarIcon: (props) =>
						user?.icon ? (
							<FastImage
								style={{
									height: props?.size || 25,
									width: props?.size || 25,
									borderRadius: 100,
								}}
								source={{ uri: user?.icon }}
							/>
						) : (
							<MaterialCommunityIcons
								name="account-circle"
								size={props?.size || 18}
								color={props?.color || '#00BCFD'}
							/>
						),

					tabBarLabel: user?.name ? user?.name?.split(' ')?.[0] : 'Profile',
					headerTitle: 'Dashboard Page',
				}}
			/>

			<Tab.Screen
				name="Game"
				component={GeameStack}
				options={{
					tabBarLabel: 'Geame Mode',
					headerShown: false,
					tabBarIcon: () => <GameSvg />,
				}}
				listeners={({ navigation, route }) => ({
					tabPress: (e) => {
						// Prevent default action
						e.preventDefault();
						navigation.navigate('Game', { screen: 'MainGame' });
					},
				})}
			/>

			{/* <Tab.Screen
				name="League"
				component={LeagueStack}
				options={{
					tabBarLabel: 'League',
					headerShown: false,
					tabBarIcon: () => <LeagueSvg />,
				}}
			/>
			<Tab.Screen
				name="Contest"
				component={ContestStack}
				options={{
					tabBarIcon: () => <ContestSvg />,

					tabBarLabel: 'Contest',
				}}
			/> */}
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		...StyleSheet.absoluteFillObject,
	},
	blurContainer: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
	},
	container: {
		flex: 1,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
	},
	sceneContainer: {
		backgroundColor: 'transparent',
		flex: 1,
		// paddingHorizontal: 40,
		// paddingTop: 40,
	},
	tab: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	tabBar: {
		backgroundColor: 'transparent',
		borderRadius: 15,
		bottom: 25,
		elevation: 0,
		height: 70,
		left: 20,
		position: 'absolute',
		right: 20,
	},
	tabIcon: {
		display: 'none',
	},
});

const tabBarOptions = {
	style: styles.tabBar,
	tabStyle: styles.tab,
	iconStyle: styles.tabIcon,
};

export default BottomTabNavigator;
