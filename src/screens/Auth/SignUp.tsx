import { AntDesign, Entypo } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { IMAGES } from '@/assets';
import { Button } from '@/components';
import { ButtonProps } from '@/components/Base/experimental/Button';
import { authBottomSheetRef } from '@/constants';
import { useAppStore } from '@/core/store';
import { useSocialLogin } from '@/lib/hooks';
import { isAndroid, screenHeight } from '@/lib/utils';
import { RootStackNavigationType } from '@/navigation/types';
import { ALL_COLORS, FontSizeColorStyle, responsive } from '@/styles';
// import { BlurView } from '@react-native-community/blur';
import { BlurView } from 'expo-blur';
import GradientText from '../../components/Base/GradientText';

const Footer = () => (
	<View style={[styles.socialLoginContainer, { marginTop: responsive(5), gap: responsive(20) }]}>
		<Link to={{ screen: 'Login' }} style={FontSizeColorStyle['poppins-400-14-grey-8e8e8e']}>
			Already have an account?
		</Link>
		<Link
			to={{ screen: 'CompleteProfile' }}
			style={FontSizeColorStyle['poppins-600-14-dark-4a4a4a']}
		>
			Signup now
		</Link>
	</View>
);

const LoginButton: React.FC<ButtonProps> = (props) => (
	<Button
		backgroundColor="light-ebebeb"
		label="Signup Via Google"
		labelStyle={FontSizeColorStyle['montserrat-700-16-dark-717171']}
		startIcon={
			<>
				{props?.isLoading ? <ActivityIndicator /> : null}
				<FastImage
					source={IMAGES.google}
					style={{ height: responsive(27), width: responsive(27) }}
				/>
			</>
		}
		{...props}
	/>
);

const SignUpScreen = ({ navigation }: { navigation: RootStackNavigationType }) => {
	const setUserType = useAppStore((state) => state.setUserType);

	const { loading, googleAuth, twitterAuth, appleAuth } = useSocialLogin();

	const handleSelect = useCallback(() => {
		setUserType('user');
		authBottomSheetRef?.current?.close();

		navigation.navigate('CompleteProfile');
	}, [navigation, setUserType]);

	return (
		<>
			<StatusBar backgroundColor="transparent" style="light" />

			<ImageBackground
				source={IMAGES.loginBg}
				style={{
					flex: 1,
					height: screenHeight,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<LinearGradient
					colors={['rgba(0, 0, 0, 0.80)', 'rgba(0, 0, 0, 0.00)']}
					style={{
						// width: '85%',
						borderRadius: responsive(7),
						overflow: 'hidden',
						borderColor: 'rgba(0, 0, 0, 0.50)',
						borderWidth: 0.25,
						alignSelf: 'center',
						width: responsive(350),
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
						tint={'dark'}
						intensity={isAndroid ? 100 : 30}
						style={{
							gap: responsive(20),
							paddingHorizontal: responsive(33),
							paddingVertical: responsive(40),
							borderRadius: responsive(7),
							display: 'flex',
							position: 'relative',

							overflow: 'hidden',
						}}
						experimentalBlurMethod="dimezisBlurView"
					>
						{/* Access 15,000 Music Industry Personas. Login Now.
						background: linear-gradient(101.38deg, #0A7593 9.82%, #FFFFFF 83.42%);

						*/}
						<GradientText
							style={[FontSizeColorStyle['lato-900-xl-white']]}
							colors={['#0A7593', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
							start={{ x: 0, y: 1 }}
							end={{ x: 1, y: 0 }}
						>
							test
						</GradientText>
						<View>
							<Text style={FontSizeColorStyle['poppins-300-22-white']}>
								Access{' '}
								<Text
									style={[
										FontSizeColorStyle['poppins-500-22-white'],
										{ color: '#55A6D3' },
									]}
								>
									15,000 Music Industry Personas.
								</Text>
								{'\n '}
								Login Now.
							</Text>
						</View>

						<Button
							backgroundColor="light-ebebeb"
							onPress={googleAuth}
							label=" Signup Via Google"
							labelStyle={FontSizeColorStyle['montserrat-700-16-dark-717171']}
							startIcon={
								<>
									{loading ? <ActivityIndicator /> : null}
									<FastImage
										source={IMAGES.google}
										style={{ height: responsive(27), width: responsive(27) }}
									/>
								</>
							}
						/>
						{isAndroid ? null : (
							<Button
								backgroundColor="black"
								onPress={appleAuth}
								label=" Signup Via Apple"
								labelStyle={FontSizeColorStyle['montserrat-700-16-white']}
								startIcon={
									<>
										{loading ? <ActivityIndicator /> : null}
										<AntDesign
											name="apple1"
											size={responsive(24)}
											color="white"
										/>
									</>
								}
							/>
						)}
						<Button
							backgroundColor="black"
							onPress={twitterAuth}
							label=" Available Soon ...."
							labelStyle={FontSizeColorStyle['poppins-700-16-white']}
							startIcon={
								<>
									{loading ? <ActivityIndicator /> : null}
									<Entypo name="spotify" size={responsive(24)} color="green" />
								</>
							}
							touchSoundDisabled
							style={{ opacity: 0.2 }}
							enabled={false}
						/>
						<Button
							backgroundColor="facebook"
							onPress={twitterAuth}
							label=" Available Soon ...."
							labelStyle={FontSizeColorStyle['poppins-700-16-white']}
							startIcon={
								<>
									{loading ? <ActivityIndicator /> : null}
									<Entypo name="facebook" size={responsive(24)} color="white" />
								</>
							}
							touchSoundDisabled
							style={{ opacity: 0.2 }}
							enabled={false}
						/>
						{/* <Button
							backgroundColor="twitter"
							onPress={twitterAuth}
							label=" Available Soon ...."
							labelStyle={FontSizeColorStyle['poppins-700-16-white']}
							startIcon={
								<>
									{loading ? <ActivityIndicator /> : null}
									<AntDesign name="twitter" size={responsive(24)} color="white" />
								</>
							}
							touchSoundDisabled
							style={{ opacity: 0.2 }}
							enabled={false}
						/> */}
						<Footer />
					</BlurView>
				</LinearGradient>
			</ImageBackground>
		</>
	);
};

const styles = StyleSheet.create({
	socialLoginContainer: {
		alignItems: 'center',
		gap: responsive(10),
		justifyContent: 'center',
		marginTop: responsive(20),
		position: 'relative',
		width: '100%',
	},
});

export default SignUpScreen;
