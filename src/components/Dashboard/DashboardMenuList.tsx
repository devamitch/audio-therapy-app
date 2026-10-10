import { useNavigation } from '@react-navigation/core';
import { Alert, Share, StyleSheet, View } from 'react-native';

import DashboardMenuListItem from './DashboardMenuListItem';

import { useAppStore } from '@/core/store';
import { handleError, openURL } from '@/lib/utils';
import { MainStackNavigationType } from '@/navigation/main/MainStack';
import { navigateAndSimpleReset } from '@/navigation/navigation';
import { responsive } from '@/styles';

const DashboardMenuList = () => {
	const navigation = useNavigation<MainStackNavigationType>();

	const signOut2 = async () => {
		try {
			await useAppStore.setState({
				_hydrate: true,
				fcmToken: '',
				hasWallet: false,
				showOnboarding: false,
				takeTour: false,
				showIntro: false,
				_status: 'idle',
				skipped: false,
				user: undefined,
				tempUser: undefined,
				accessToken: undefined,
				wallet: undefined,
				userType: undefined,
				isSocialAuth: undefined,
				isCompleteAuth: undefined,
			});

			// await useAppStore?.persist?.clearStorage();

			await navigateAndSimpleReset('SignIn');
		} catch (error) {
			handleError(error);
		}
	};

	const onShare = async () => {
		try {
			const result = await Share.share({
				message: 'Hi there, I am playing this wonderfull app. Join here',
				url: 'https://testflight.apple.com/join/9hH6BZus',
			});

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error: any) {
			Alert.alert(error.message);
		}
	};

	return (
		<View style={styles.gap15}>
			<DashboardMenuListItem
				label="Transactions"
				onPress={() => navigation.navigate('Transaction')}
			/>
			<DashboardMenuListItem label="Rewards" onPress={() => navigation.navigate('Rewards')} />

			<DashboardMenuListItem label="Invite Friends" onPress={onShare} />
			<DashboardMenuListItem
				label="Terms and conditions"
				onPress={() => openURL('https://thetest.io')}
			/>
			<DashboardMenuListItem
				label="Notifications"
				onPress={() => navigation.navigate('Notification')}
			/>
			<DashboardMenuListItem label={'Sign Out'} onPress={signOut2} />
		</View>
	);
};

export default DashboardMenuList;

const styles = StyleSheet.create({ gap15: { gap: responsive(15) } });
