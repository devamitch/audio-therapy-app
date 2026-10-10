import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { shallow } from 'zustand/shallow';

import { IMAGES } from '@/assets';
import { Button } from '@/components/Base';
import { DRAWER_BG, DRAWER_GRADIENT_COLOR, DRAWER_STYLE } from '@/constants/env';
import { useAppStore } from '@/core/store';
import { handleError, windowHeight } from '@/lib/utils';
import { navigateAndSimpleReset } from '@/navigation/navigation';
import { Colors, FontSizeColorStyle, FontWithColors, LayoutStyle, responsive } from '@/styles';
const padding = responsive(15);

const Content = (props: DrawerContentComponentProps) => {
	const tokenExists = useAppStore((state) => state.accessToken, shallow);

	const user = useAppStore((state) => state.user, shallow);

	const signOut2 = async () => {
		try {
			await useAppStore.setState({
				_hydrate: true,
				fcmToken: '',
				hasWallet: false,
				showOnboarding: true,
				takeTour: true,
				showIntro: true,
				_status: 'idle',
				skipped: false,
				user: undefined,
				accessToken: undefined,
				wallet: undefined,
				userType: undefined,
				isSocialAuth: undefined,
				isCompleteAuth: undefined,
			});
			await useAppStore?.persist?.clearStorage();

			await navigateAndSimpleReset('SignIn');
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<DrawerContentScrollView
			{...props}
			overScrollMode="never"
			scrollEnabled={false}
			showsVerticalScrollIndicator={false}
			style={LayoutStyle.fill}
			contentContainerStyle={[styles.drawer]}
		>
			<SafeAreaView style={[LayoutStyle.fill, { padding, backgroundColor: DRAWER_BG }]}>
				<LinearGradient
					style={styles.card}
					colors={DRAWER_GRADIENT_COLOR}
					start={[0, 1]}
					end={[1, 1]}
					// @ts-ignore
					location={[0.25, 0.4, 1]}
				>
					{tokenExists ? (
						<View style={styles.profile}>
							<FastImage
								source={{
									uri:
										user?.icon === ''
											? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxTtFJqJpOeBDcIRnPh1wee7RB_JUPXNTUXg&usqp=CAU'
											: user?.icon,
									priority: 'normal',
								}}
								resizeMode="cover"
								style={styles.icon}
							/>
							<View style={styles.textContainer}>
								{user?.name ? <Text style={styles.name}>{user?.name}</Text> : null}
								{user?.email ? (
									<Button
										style={[styles.chip, LayoutStyle.center]}
										onPress={() => {
											props.navigation.navigate('ProfileScreen');
										}}
									>
										<Text style={styles.email} numberOfLines={1}>
											{user?.email}
										</Text>
									</Button>
								) : null}
							</View>
						</View>
					) : (
						<View style={styles.logoContainer}>
							<FastImage
								source={IMAGES.logo}
								resizeMode="contain"
								style={styles.logo}
							/>
						</View>
					)}
				</LinearGradient>
				<View style={LayoutStyle.fill}>
					<DrawerItemList {...props} />
				</View>
				{/* <View style={LayoutStyle.fill} /> */}
				<Button
					label={tokenExists ? 'Logout' : 'Clear'}
					style={styles.logout}
					startIcon={
						tokenExists ? (
							<AntDesign name="logout" size={responsive(18)} color="#232323" />
						) : (
							<MaterialCommunityIcons
								name="restart"
								size={responsive(18)}
								color="#232323"
							/>
						)
					}
					labelStyle={FontSizeColorStyle['montserrat-600-12-grey-868686']}
					onPress={signOut2}
					// fullWidth
					center
				/>
			</SafeAreaView>
		</DrawerContentScrollView>
	);
};

export default Content;

const styles = StyleSheet.create({
	address: {
		fontSize: responsive(9),
		fontWeight: '300',
	},
	drawer: {
		width: '100%',
		height: windowHeight,
		padding: 0,
		paddingVertical: 0,
		margin: 0,
		marginVertical: 0,
		marginTop: 0,
		paddingTop: 0,
		paddingBottom: 0,
		marginBottom: 0,
		gap: 10,
		// backgroundColor: 'black',
	},
	content: {
		gap: responsive(20),
		width: '100%',
		height: windowHeight,
		flex: 1,
		padding: 0,
		paddingVertical: 0,
		margin: 0,
		marginVertical: 0,
		marginTop: 0,
		paddingTop: 0,
		paddingBottom: 0,
		marginBottom: 0,
	},
	logout: {
		paddingHorizontal: responsive(20),
		paddingVertical: responsive(20),
		// position: 'absolute',
		// bottom: responsive(5),
		// left: responsive(10),
		// right: responsive(10),
		borderRadius: responsive(10),
		flexDirection: 'row',
	},

	name: {
		fontSize: responsive(12),
		...DRAWER_STYLE,
		gap: responsive(11),
		textTransform: 'capitalize',
	},
	profile: {
		alignItems: 'center',
		borderRadius: responsive(10),
		padding: responsive(10),
		flexDirection: 'row',
		gap: responsive(8),
		paddingVertical: responsive(10),
		width: '100%',
	},
	email: {
		textTransform: 'lowercase',
		position: 'relative',
		flexWrap: 'wrap',
		flex: 1,
		flexShrink: 1,
		...FontWithColors['montserrat-600-grey-a7a7a7'],
		fontSize: responsive(10),
	},
	textContainer: {
		gap: responsive(5),
		position: 'relative',
		flex: 1,
	},
	chip: {
		// ...Colors['bg-primary'],
		borderRadius: responsive(12),
		paddingHorizontal: responsive(14),
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: responsive(25),
		shadowOpacity: 0,
	},
	icon: {
		borderRadius: responsive(30),
		flexShrink: 0,
		height: responsive(55),
		width: responsive(55),
	},
	logoContainer: {
		borderRadius: responsive(10),
		paddingVertical: responsive(25),
	},
	logo: {
		borderRadius: responsive(10),
		height: responsive(60),
		width: '100%',
	},
	card: {
		alignItems: 'center',
		flexDirection: 'row',
		...Colors['bg-dark-232323'],
		borderRadius: responsive(12),
		shadowOffset: {
			height: 3,
			width: 3,
		},
		shadowRadius: 2,
		...Colors['shadow-black'],
		elevation: 2,

		justifyContent: 'space-between',
		gap: responsive(8),
		paddingHorizontal: responsive(16),
		paddingVertical: responsive(13),
		marginBottom: 10,
	},
} as const);
