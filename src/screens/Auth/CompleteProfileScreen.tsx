import { useCallback, useEffect, useState } from 'react';
import {
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';
import { useMutation } from '@tanstack/react-query';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthLayout, Button, PrimaryButton } from '@/components';
import MaterialTextEditorComponent from '@/components/Base/experimental/BasicTextEditor';
import DropdownComponent from '@/components/Base/experimental/Dropdown';
import { useAppStore, useStateStore } from '@/core/store';
import { useImagePicker } from '@/lib/hooks';
import { signin, socialLogin, SocialLoginParams, SocialParams } from '@/lib/server';
import { handleError, isAndroid, screenHeight, toast } from '@/lib/utils';
import { RootStackNavigationType } from '@/navigation/types';
import { ALL_COLORS, FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';
import { StatusBar } from 'expo-status-bar';
import { IMAGES } from '@/assets';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { navigateAndSimpleReset } from '@/navigation/navigation';
import * as Notifications from 'expo-notifications';
// import { getUniqueId } from 'react-native-device-info';
import * as Device from 'expo-device';

import Constants from 'expo-constants';

Device.osBuildId;
const CompleteProfilePage = ({ navigation }: { navigation: RootStackNavigationType }) => {
	const setUser = useAppStore((state) => state.setUser);

	const setToken = useAppStore((state) => state.setAccessToken);

	const setTempUser = useAppStore((state) => state.setTempUser);

	const setCompleteAuth = useAppStore((state) => state.setCompleteAuth);

	const [user, tempUser, userType, isSocialAuth] = useAppStore((state) => [
		state.user,
		state?.tempUser,
		state?.userType,
		state?.isSocialAuth,
	]);

	const [fullName, setFullName] = useState<string>();

	const [email, setEmail] = useState<string>();

	const [password, setPassword] = useState<string>();

	const [gender, setGender] = useState<'male' | 'female' | 'na'>();

	const [phoneNumber, setPhoneNumber] = useState<string>();

	const [address, setAddress] = useState<string>();

	const [agreeToTerms, setAgreeToTerms] = useState(false);
	const tempAppleToken = useStateStore((state) => state.tempAppleToken);
	const takeTour = useAppStore((data) => data.takeTour!!);

	const { image, openCamera, openLibrary } = useImagePicker({ quality: 0 });

	useEffect(() => {
		setFullName(tempUser?.name);
		setPhoneNumber(tempUser?.phone_number);
		setAddress(tempUser?.location);
		setEmail(tempUser?.email);
	}, [setEmail, setPhoneNumber, tempUser, user]);

	const onMutate = useCallback(
		async (data: SocialParams | SocialLoginParams) => {
			if (isSocialAuth) {
				return socialLogin({ ...data, type: 'user' });
			}

			return signin(data as SocialParams);
		},
		[isSocialAuth]
	);

	const create = useMutation({
		mutationKey: [
			userType,
			tempUser?.email,
			tempUser?.password,
			tempUser?.name,
			tempUser?.phone_number,
			tempUser?.location,
			fullName,
			email,
			phoneNumber,
			address,
			password,
			gender,
			tempAppleToken,
		],
		mutationFn: onMutate,
		onError: (error) => {
			handleError(error);
		},
		onSuccess(data) {
			// if (userType === 'user') {
			toast.success('Successful user registration');
			setUser({
				...tempUser,
				...data,
				name: fullName,
				email,
				phone_number: phoneNumber,
				password,
				location: address,
				gender,
			});
			setToken(data?.accessToken);
			setTempUser(undefined);
			setCompleteAuth(true);
			if (!takeTour) {
				return navigateAndSimpleReset('Main');
				// return navigation.navigate('Main');
			}

			return navigateAndSimpleReset('Tutorial');
			// 	return;
			// }
			// setTempUser({
			// 	...tempUser,
			// 	...data,
			// 	name: fullName,
			// 	email,
			// 	phone_number: phoneNumber,
			// 	password,
			// 	location: address,
			// 	gender,
			// });
			// toast.success('Successful artist registration');
			// navigation.navigate('AddSocial');
		},
	});

	const mutate = create.mutate;

	console.log({ tempAppleToken });
	// create.isPending
	const onSubmit = useCallback(async () => {
		try {
			const projectId =
				Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
			const phno = (phoneNumber || '')?.replace(/\D/g, '');

			const tokenString = (
				await Notifications.getExpoPushTokenAsync({
					projectId,
				})
			)?.data;

			const tokenMatch = tokenString.match(/\[([^)]+)\]/);

			const notification_token = tokenMatch ? tokenMatch[1] : tokenString;

			console.log('hello');
			mutate({
				...tempUser,
				name: fullName,
				email,
				password,
				gender,
				phone_number: phno,
				location: address,
				image,
				tempAppleToken,
				tokenId: tempAppleToken,
				socialtoken: tempAppleToken,
				token_id: tempAppleToken,
				appleToken: tempAppleToken,
				apple: tempAppleToken,
				apple_token: tempAppleToken,
				notification_token,
				notificationToken: notification_token,
				soccialLoginType: tempAppleToken ? 'apple' : undefined,
			});
		} catch (err) {
			console.log({ err });
		}

		// 	return;
		// }
		// setTempUser({
		// 	...tempUser,
		// 	name: fullName,
		// 	email,
		// 	password,
		// 	gender,
		// 	phone_number: phoneNumber,
		// 	location: address,
		// 	image,
		// });
		// toast.success('Successful artist registration');
		// navigation.navigate('AddSocial');

		// return;
	}, [
		address,
		email,
		fullName,
		gender,
		image,
		mutate,
		password,
		phoneNumber,
		tempUser,
		tempAppleToken,
	]);

	return (
		<>
			<StatusBar backgroundColor="transparent" style="light" />
			<ImageBackground
				source={IMAGES.complete_profile}
				style={{
					flex: 1,
					height: screenHeight,
					justifyContent: 'center',
					alignItems: 'flex-start',
				}}
			>
				<LinearGradient
					colors={['rgba(0, 0, 0, 0.80)', 'rgba(0, 0, 0, 0.00)']}
					style={{
						// width: '85%',
						borderRadius: 7,
						overflow: 'hidden',
						borderColor: 'rgba(0, 0, 0, 0.50)',
						borderWidth: 0.25,
						width: 350,
						shadowColor: ALL_COLORS['black'],
						shadowOffset: { width: responsive(4), height: responsive(4) },
						shadowOpacity: 0.5,
						shadowRadius: responsive(5),
						elevation: responsive(5),
					}}
					start={[0, 1]}
					end={[1, 1]}
				>
					<BlurView
						// tint="dark"
						// blurType="dark"
						// blurAmount={10}
						// reducedTransparencyFallbackColor="white"
						// tint={'dark'}
						tint={isAndroid ? 'systemMaterialDark' : 'dark'}
						intensity={isAndroid ? 100 : 30}
						style={{
							gap: 20,
							paddingHorizontal: 33,
							paddingVertical: 40,
							borderRadius: 7,
							display: 'flex',
							position: 'relative',
							// borderColor: '#fff',
							// borderWidth: 1,
							// height: 400,
							// width: '60%',
							// flex: 1,
							overflow: 'hidden',
							height: 'auto',
						}}
					>
						<ScrollView
							contentContainerStyle={styles.container}
							// style={[{ position: 'relative', width: '100%', height: 'auto' }]}
							// extraScrollHeight={-300}
							// enableOnAndroid={true}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
						>
							{/* <AuthLayout
							background="complete_profile"
							height={isSocialAuth ? responsive(760) : responsive(820)}
							submitLabel="Save Profile Details "
							onSubmit={onSubmit}
							loading={create.isPending}
							alignItems="flex-start"
						> */}
							<View style={{ width: '100%', gap: responsive(18) }}>
								<View style={{ gap: responsive(5) }}>
									<Text
										style={[
											FontSizeColorStyle['montserrat-600-xxl-white'],
											{ color: '#0A7593' },
										]}
									>
										Introduce{' '}
									</Text>
									<Text
										style={FontSizeColorStyle['montserrat-700-xxl-grey-b6b6b6']}
									>
										Yourself !!
									</Text>
									<Text
										style={FontSizeColorStyle['montserrat-500-16-grey-858585']}
									>
										This information would help us serve you better{' '}
									</Text>
								</View>
								<View
									style={{
										width: '100%',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<View>
										<FastImage
											source={
												isSocialAuth
													? {
															uri:
																tempUser?.icon ||
																'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQNvWDvQb_rCtRL-p_w329CtzHmfzfWP0FIw&usqp=CAU',
														}
													: image || {
															uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQNvWDvQb_rCtRL-p_w329CtzHmfzfWP0FIw&usqp=CAU',
														}
											}
											style={{
												height: responsive(80),
												width: responsive(80),
												borderRadius: responsive(100),
											}}
										/>
										{isSocialAuth ? null : (
											<View
												style={[
													LayoutStyle.row,
													{
														position: 'absolute',
														bottom: 0,
														width: responsive(120),
														left: responsive(-20),
														gap: responsive(30),
														justifyContent: 'space-between',
													},
												]}
											>
												{/* <Buttton label={'Camera'} onPress={openCamera} />
												 */}
												<Button
													backgroundColor="transparent"
													onPress={openCamera}
													labelStyle={
														FontSizeColorStyle[
															'montserrat-700-16-white'
														]
													}
													size="sm"
													startIcon={
														<FontAwesome
															name="camera"
															size={responsive(24)}
															color="white"
														/>
													}
													// variant="outlined"
													// outlineColor='white'
												/>
												<Button
													backgroundColor="transparent"
													onPress={openLibrary}
													labelStyle={
														FontSizeColorStyle[
															'montserrat-700-16-white'
														]
													}
													size="sm"
													startIcon={
														<MaterialIcons
															name="photo-library"
															size={responsive(24)}
															color="white"
														/>
													}
													// variant="outlined"
												/>
											</View>
										)}
									</View>
								</View>
							</View>
							<KeyboardAvoidingView
								style={{ flex: 1, gap: 20 }}
								behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
							>
								<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
									<>
										{/* Full Name */}
										<MaterialTextEditorComponent
											placeholder="Full Name"
											value={fullName}
											onChangeText={(text) => setFullName(text)}
										/>

										<MaterialTextEditorComponent
											placeholder="Email"
											keyboardType="email-address"
											value={email}
											onChangeText={(text) => setEmail(text?.toLowerCase())}
										/>
										{isSocialAuth ? null : (
											<MaterialTextEditorComponent
												placeholder="Password"
												keyboardType="default"
												secureTextEntry
												value={password}
												onChangeText={(text) => setPassword(text)}
											/>
										)}

										{false && (
											<DropdownComponent
												options={['male', 'female', 'na'] as const}
												label="Gender"
												value={gender}
												onSelect={(text) => setGender(text)}
											/>
										)}
										{/* <MaterialTextEditorComponent
				placeholder="City"
				keyboardType="email-address"
				onChangeText={(text) => setAddress(text)}
			/> */}
										{/* Agree to Terms Checkbox */}

										<Pressable
											style={styles.checkboxContainer}
											onPress={() => setAgreeToTerms(!agreeToTerms)}
										>
											<CheckBox
												value={agreeToTerms}
												onValueChange={() => setAgreeToTerms(!agreeToTerms)}
												tintColor="#125B6F"
												onFillColor="#00212A"
												onTintColor="#0A7593"
												// hideBox
												onCheckColor="#0A7593"
											/>
											<Text
												style={
													FontSizeColorStyle['montserrat-500-12-white']
												}
											>
												I agree to terms and conditions
											</Text>
										</Pressable>
										<PrimaryButton
											label="Save Profile Details "
											onPress={onSubmit}
											isLoading={create.isPending}
										/>
									</>
								</TouchableWithoutFeedback>
							</KeyboardAvoidingView>
							{/* </AuthLayout> */}
						</ScrollView>
					</BlurView>
				</LinearGradient>
			</ImageBackground>
		</>
	);
};

const styles = StyleSheet.create({
	checkboxContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: responsive(10),
		marginBottom: responsive(16),
		paddingHorizontal: responsive(5),
		flex: 1,
	},
	container: {
		gap: 10,
		width: '100%',
		flexGrow: 1,
		borderRadius: 7,
		position: 'relative',
		paddingVertical: 20,
		// flex: 1,
	},
});

export default CompleteProfilePage;
