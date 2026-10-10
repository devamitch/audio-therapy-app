import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { shallow } from 'zustand/shallow';

import { PrimaryButton } from '@/components';
import SwitchComponent from '@/components/Base/experimental/Switch';
import { APP_VERSION } from '@/constants';
import { useAppStore } from '@/core/store';
import { handleError } from '@/lib/utils';
import { MainStackRouteType } from '@/navigation/main/MainStack';
import { navigateAndSimpleReset } from '@/navigation/navigation';
import { ALL_COLORS, FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const SettingScreen: React.FC<MainStackRouteType<'Settings'>> = ({ navigation }) => {
	const [soundEffet, setSound] = useState(false);

	const deleted = useAppStore((state) => state?.deleted, shallow);

	const router = useRoute();

	const signOut = useCallback(async () => {
		try {
			useAppStore.setState({
				_hydrate: true,
				fcmToken: '',
				hasWallet: false,
				showOnboarding: false,
				takeTour: false,
				showIntro: false,
				_status: 'idle',
				skipped: false,
				user: undefined,
				accessToken: undefined,
				wallet: undefined,
				userType: undefined,
				isSocialAuth: undefined,
				isCompleteAuth: undefined,
				deleted: undefined,
				deletedSettingClosed: true,
			});
			navigateAndSimpleReset('Main');
		} catch (error) {
			handleError(error);
		}
	}, []);

	return (
		<GestureHandlerRootView style={LayoutStyle.fill}>
			<BlurView
				style={[LayoutStyle.fill, LayoutStyle.center]}
				tint="dark"
				intensity={50}
				experimentalBlurMethod={'dimezisBlurView'}
			>
				<Animated.View
					style={styles.itemsContainer}
					entering={SlideInDown.duration(500)}
					exiting={SlideOutDown.delay(100).duration(300)}
				>
					<RectButton
						style={styles.close}
						onPress={() => {
							if (deleted) {
								navigation?.goBack();
								signOut();

								return;
							}
							navigation?.goBack();
						}}
					>
						<Entypo name="cross" size={responsive(24)} color="white" />
					</RectButton>

					<Text
						allowFontScaling
						style={[FontSizeColorStyle['montserrat-500-24-white'], styles.title]}
					>
						Informations
					</Text>
					<View style={[LayoutStyle.row, LayoutStyle.between]}>
						<Text
							allowFontScaling
							style={FontSizeColorStyle['montserrat-400-14-white']}
						>
							User Id
						</Text>
						<Text
							allowFontScaling
							style={FontSizeColorStyle['montserrat-400-sm-primary-text']}
						>
							{router?.params?.id}
						</Text>
					</View>
					<View style={[LayoutStyle.row, LayoutStyle.between]}>
						<Text
							allowFontScaling
							style={FontSizeColorStyle['montserrat-400-14-white']}
						>
							App Version
						</Text>
						<Text
							allowFontScaling
							style={FontSizeColorStyle['montserrat-400-sm-primary-text']}
						>
							{APP_VERSION}
						</Text>
					</View>
					<Text
						allowFontScaling
						numberOfLines={1}
						adjustsFontSizeToFit
						style={[FontSizeColorStyle['montserrat-500-24-white'], styles.title]}
					>
						Game Options
					</Text>
					<SwitchComponent
						onValueChange={setSound}
						value={soundEffet}
						label="Sound Effect"
					/>

					<SwitchComponent
						onValueChange={setSound}
						value={soundEffet}
						label="Show Status"
					/>

					<SwitchComponent
						onValueChange={setSound}
						value={soundEffet}
						label="Allow Notification"
					/>
					<SwitchComponent
						onValueChange={setSound}
						value={soundEffet}
						label="Clear Play List"
					/>
					<View style={{ gap: responsive(8), paddingTop: responsive(10) }}>
						<PrimaryButton
							style={[LayoutStyle.row, LayoutStyle.between]}
							gradientType="type2"
							label={'Update User'}
							labelStyle={FontSizeColorStyle['montserrat-600-13-white']}
							size="md"
							endIcon={
								<Entypo name="chevron-right" size={responsive(16)} color="white" />
							}
							onPress={() => navigation.navigate('Edit')}
						/>
						<PrimaryButton
							style={[LayoutStyle.row, LayoutStyle.between]}
							gradientType="type3"
							label={'Delete User'}
							labelStyle={FontSizeColorStyle['montserrat-600-13-white']}
							size="md"
							endIcon={
								<Entypo name="chevron-right" size={responsive(16)} color="white" />
							}
							onPress={() => navigation.navigate('Delete')}
						/>
					</View>
				</Animated.View>
			</BlurView>
		</GestureHandlerRootView>
	);
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: responsive(10),
		alignItems: 'center',
		paddingRight: responsive(10),
		paddingLeft: responsive(5),
	},
	wrapper: { flex: 1, flexDirection: 'row', gap: responsive(10), alignItems: 'center' },
	avatarWrapper: {
		borderRadius: responsive(100),
		borderColor: ALL_COLORS.white,
		borderWidth: responsive(2),
		borderBottomWidth: responsive(4),
	},
	avatar: {
		height: responsive(119),
		width: responsive(119),
		borderRadius: responsive(100),
	},
	gap4: {
		gap: responsive(4),
	},
	chip: {
		borderRadius: responsive(6),
		paddingHorizontal: responsive(11),
		paddingVertical: responsive(6),
		alignSelf: 'flex-start',
	},
	buttton: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 0,
		paddingVertical: 0,
		padding: 0,
		borderRadius: responsive(25),
		paddingLeft: 0,
		paddingTop: 0,
		paddingRight: 0,
		paddingBottom: 0,
	},
	itemsContainer: {
		gap: responsive(10),
		padding: responsive(30),
		borderRadius: responsive(10),
		// width: responsive(320),
		// height: 520,
		backgroundColor: 'rgba(0,0,0,0.7)',
		justifyContent: 'center',
		// overflow: 'hidden',
		// flex: 1,
		position: 'relative',
		borderColor: '#0A7593',
		borderWidth: responsive(1),
		width: '100%',
		maxWidth: responsive(320),
	},
	itemsContainer2: {
		gap: responsive(20),
		padding: responsive(30),
		borderRadius: responsive(10),
		width: responsive(320),
		// height: 520,
		justifyContent: 'center',
		overflow: 'hidden',
		// flex: 1,
		position: 'relative',
		borderColor: '#0A7593',
		borderTopWidth: 1,
		borderLeftWidth: 1,
	},
	close: {
		alignItems: 'center',
		backgroundColor: 'red',
		borderRadius: responsive(7),
		height: responsive(30),
		justifyContent: 'center',
		position: 'absolute',
		right: responsive(-10),
		top: responsive(-10),
		width: responsive(30),
	},
	edit: {
		width: responsive(187),
		fontFamily: 'DoHyeon',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: responsive(10),
		// flex: 1,
		position: 'relative',
		paddingVertical: responsive(10),
		width: '100%',
	},
} as const);
