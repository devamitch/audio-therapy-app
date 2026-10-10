import { useState } from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, Fontisto, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { BlurView } from 'expo-blur';
import { LinearGradient as ExpoLinear } from 'expo-linear-gradient';
import { shallow } from 'zustand/shallow';

import { PrimaryButton } from '../Base';
import GradientText, { GradientIconFontisto } from '../Base/GradientText';

import { useAppStore } from '@/core/store';
import { isAndroid } from '@/lib/utils';
import { MainStackNavigationType } from '@/navigation/main/MainStack';
import { ContestSvg, GameSvg, LeagueSvg } from '@/navigation/main/Svgs';
import { FontSizeColorStyle, responsive } from '@/styles';

const LinearGradient = Animated.createAnimatedComponent(ExpoLinear);

const DashboardTab = ({ mode }: { mode?: 'league' | 'contest' }) => {
	const user = useAppStore((state) => state.user, shallow);

	const navigation = useNavigation<MainStackNavigationType>();

	const padding = useSafeAreaInsets();

	const [open, setOpen] = useState(false);

	const openAnimation = useSharedValue(0);

	const toggleOpen = (status: boolean) => {
		setOpen(status);
		openAnimation.value = status ? 0 : 100;
	};

	return (
		<>
			<Animated.View style={styles.animatedContainer}>
				<LinearGradient
					colors={['#125B6F', '#052F3B', '#00212A']}
					location={[0.25, 0.65, 1]}
					start={[0, 1]}
					end={[0.75, 1]}
					style={[styles.gradient, { paddingBottom: padding.bottom - responsive(12) }]}
				>
					<LinearGradient
						colors={
							mode
								? ['transparent', 'rgba(0,0,0,0.05)']
								: ['transparent', 'transparent']
						}
						start={[0, 1]}
						end={[1, 0]}
						style={styles.innerGradient}
					>
						<RectButton
							style={styles.rectButton}
							onPress={() => {
								navigation?.canGoBack()
									? navigation?.goBack()
									: navigation?.navigate('Dashboard');
								setOpen(false);
							}}
						>
							<Image style={styles.userIcon} source={{ uri: user?.icon }} />
							<View>
								<Text
									numberOfLines={1}
									style={FontSizeColorStyle['montserrat-400-14-white']}
								>
									{user?.name ? user?.name.split(' ')[0] : 'Profile'}
								</Text>
								{false && (
									<Text
										numberOfLines={1}
										style={FontSizeColorStyle['poppins-400-xxs-primary-text']}
									>
										{'Pro Level 12'}
									</Text>
								)}
							</View>
						</RectButton>
					</LinearGradient>
					<LinearGradient
						colors={mode ? ['#00212A', '#007190'] : ['#00212A', 'rgba(0,0,0,0.5)']}
						location={[0, 1]}
						start={[0, 1]}
						end={[1, 0]}
						style={styles.innerGradient}
					>
						<RectButton style={styles.rectButton} onPress={() => toggleOpen(true)}>
							{mode === 'league' ? (
								<LeagueSvg />
							) : mode === 'contest' ? (
								<ContestSvg />
							) : (
								<GameSvg />
							)}
							<Text
								numberOfLines={1}
								style={[
									FontSizeColorStyle[
										`montserrat-400-14-${mode ? 'primary-text' : 'white'}`
									],
									{ textTransform: 'capitalize' },
								]}
							>
								{`${mode ?? 'Game'} ${mode === 'league' ? '' : 'Mode'}`}
								{mode === 'league' ? (
									<Text
										numberOfLines={1}
										style={FontSizeColorStyle[`montserrat-400-xxs-white`]}
									>
										{'Beta'}
									</Text>
								) : null}
							</Text>
						</RectButton>
					</LinearGradient>
				</LinearGradient>
			</Animated.View>

			<Modal
				visible={open}
				onRequestClose={() => toggleOpen(false)}
				onDismiss={() => toggleOpen(false)}
				animated
				animationType="slide"
				transparent
				hardwareAccelerated
				statusBarTranslucent
			>
				<BlurView
					style={StyleSheet.absoluteFill}
					intensity={isAndroid ? 100 : 60}
					tint="dark"
					experimentalBlurMethod="dimezisBlurView"
				>
					<GestureHandlerRootView style={styles.modalContainer}>
						<View style={styles.itemsContainer}>
							<View style={styles.modalContent}>
								<Text
									allowFontScaling
									style={[
										FontSizeColorStyle['montserrat-700-13-white'],
										styles.modalTitle,
									]}
								>
									Select the Game Mode
								</Text>
								<View style={styles.modalGradient}>
									<PrimaryButton
										style={styles.modalButton}
										outlineStyle={{ overflow: 'hidden' }}
										onPress={() => {
											navigation.navigate('Leagues');
											toggleOpen(false);
										}}
										// colors={
										// 	mode === 'league'
										// 		? ['#262626', '#0C0C0C', '#00212A']
										// 		: undefined
										// }
									>
										<View
											style={{
												position: 'absolute',
												top: responsive(8),
												left: -responsive(28),
												transform: [{ rotate: '-40deg' }],
												width: responsive(100),
												overflow: 'hidden',
											}}
										>
											<LinearGradient
												colors={['#00BCFD', '#006582']}
												style={{
													padding: responsive(3),
													alignItems: 'center',
													justifyContent: 'center',
													overflow: 'hidden',
												}}
												start={{ x: 1, y: 0 }}
											>
												<GradientText
													colors={['#EBEBEB', '#fff']}
													style={
														FontSizeColorStyle['heebo-600-xxs-white']
													}
												>
													Beta
												</GradientText>
											</LinearGradient>
										</View>
										<View style={styles.modalButtonContent}>
											<LeagueSvg />
											<Text
												style={[
													FontSizeColorStyle['heebo-600-13-white'],
													styles.modalButtonText,
												]}
											>
												League
												<Text
													style={[
														FontSizeColorStyle['heebo-700-xxs-white'],
														{ fontSize: responsive(7) },
													]}
												>
													{'  (Beta)'}
												</Text>
											</Text>
										</View>
										{mode === 'league' ? (
											<AntDesign
												name="checkcircle"
												size={responsive(20)}
												color="#00AEDF"
											/>
										) : (
											<Fontisto
												name="radio-btn-passive"
												size={responsive(20)}
												color="#00AEDF"
											/>
										)}
									</PrimaryButton>
									{/* <PrimaryButton
										style={styles.modalButton}
										onPress={() => {
											navigation.navigate('AllContests');
											toggleOpen(false);
										}}
										// colors={
										// 	mode === 'contest'
										// 		? ['#262626', '#0C0C0C', '#00212A']
										// 		: undefined
										// }
									>
										<View style={styles.modalButtonContent}>
											<ContestSvg />
											<Text
												style={[
													FontSizeColorStyle['heebo-600-13-white'],
													styles.modalButtonText,
												]}
											>
												World Cup Contests
											</Text>
										</View>
										{mode === 'contest' ? (
											<AntDesign
												name="checkcircle"
												size={responsive(20)}
												color="#00AEDF"
											/>
										) : (
											<Fontisto
												name="radio-btn-passive"
												size={responsive(20)}
												color="#00AEDF"
											/>
										)}
									</PrimaryButton> */}

									<PrimaryButton
										style={styles.modalButton}
										onPress={() => {
											navigation.navigate('LiveContests');
											toggleOpen(false);
										}}
									>
										<View style={styles.modalButtonContent}>
											<GradientIconFontisto
												name="hours-24"
												size={responsive(20)}
											/>
											<Text
												style={[
													FontSizeColorStyle['heebo-600-13-white'],
													styles.modalButtonText,
												]}
											>
												Music World Cup
											</Text>
										</View>
										{mode === 'contest' ? (
											<AntDesign
												name="checkcircle"
												size={responsive(20)}
												color="#00AEDF"
											/>
										) : (
											<Fontisto
												name="radio-btn-passive"
												size={responsive(20)}
												color="#00AEDF"
											/>
										)}
									</PrimaryButton>
								</View>
							</View>
						</View>

						<View
							style={{
								position: 'absolute',
								flexDirection: 'row',
								left: padding.left + responsive(20),
								right: padding.right + responsive(20),
								top: padding.top + responsive(20),
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<RectButton style={styles.backButton} onPress={() => toggleOpen(false)}>
								<Ionicons name="arrow-back" color="white" />
								<Text style={FontSizeColorStyle['montserrat-600-12-white']}>
									Back
								</Text>
							</RectButton>
							<RectButton
								style={[
									styles.backButton,
									{
										borderRadius: responsive(15),
										height: responsive(30),
										width: responsive(30),
										padding: 0,
										paddingVertical: 0,
										alignItems: 'center',
										justifyContent: 'center',
									},
								]}
								onPress={() => toggleOpen(false)}
							>
								<Ionicons name="close" color="white" size={15} />
							</RectButton>
						</View>
					</GestureHandlerRootView>
				</BlurView>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	animatedContainer: {
		alignItems: 'center',
		borderRadius: responsive(6),
		flexDirection: 'row',
		justifyContent: 'space-around',
		overflow: 'hidden',
		width: '100%',
	},
	backButton: {
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,0.1)',
		borderRadius: responsive(5),
		flexDirection: 'row',
		gap: responsive(2),
		justifyContent: 'center',
		padding: responsive(10),
	},
	gradient: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		gap: responsive(10),
		justifyContent: 'space-around',
		paddingHorizontal: responsive(12),
	},
	innerGradient: {
		alignItems: 'center',
		borderRadius: responsive(100),
		flex: 1,
		flexDirection: 'row',
		gap: responsive(8),
		justifyContent: 'center',
		overflow: 'hidden',
		width: responsive(167),
	},
	itemsContainer: {
		alignItems: 'center',
		flex: 1,
		gap: responsive(10),
		justifyContent: 'center',
	},
	modalButton: {
		alignItems: 'center',
		flexDirection: 'row',
		flexGrow: 1,
		gap: responsive(20),
		justifyContent: 'space-between',
		overflow: 'hidden',
		// padding: responsive(30),
		// paddingVertical: responsive(24),
		width: '100%',
	},
	modalButtonContent: {
		alignItems: 'center',
		flexDirection: 'row',
		flex: 1,
		gap: responsive(5),
		overflow: 'hidden',
	},
	modalButtonText: {
		// fontFamily: 'DoHyeon',
	},
	modalContainer: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		paddingVertical: responsive(20),
	},
	modalContent: {
		gap: responsive(10),
		maxWidth: responsive(300),
		minWidth: responsive(250),
		width: '95%',
	},
	modalDivider: {
		alignSelf: 'center',
		backgroundColor: '#2B2B2B',
		height: StyleSheet.hairlineWidth,
		width: '80%',
	},
	modalGradient: {
		borderRadius: responsive(7),
		flexGrow: 1,
		gap: responsive(10),
	},
	modalTitle: {
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
	rectButton: {
		alignItems: 'center',
		flexDirection: 'row',
		flex: 1,
		gap: responsive(5),
		justifyContent: 'center',
		paddingVertical: responsive(12),
	},
	userIcon: {
		borderRadius: responsive(100),
		height: responsive(33),
		width: responsive(33),
	},
});

export default DashboardTab;
