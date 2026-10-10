import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { shallow } from 'zustand/shallow';

import { styles } from './Content';

import { IMAGES } from '@/assets';
import { Button } from '@/components/Base';
import { DRAWER_BG, DRAWER_GRADIENT_COLOR } from '@/constants/env';
import { useAppStore } from '@/core/store';
import { navigateAndSimpleReset } from '@/navigation/navigation';
import { FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

export const Content = (props: DrawerContentComponentProps) => {
	const tokenExists = useAppStore((state) => state.accessToken, shallow);

	const user = useAppStore((state) => state.user, shallow);

	const signOut2 = async () => {
		try {
			navigateAndSimpleReset('SignIn');
			useAppStore.setState({
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
			});
			useAppStore?.persist?.clearStorage();
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
