import { useCallback } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BlurView as ExpoBlur } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { MuxicXText } from '../Base/experimental/GradienText';

import { IMAGES } from '@/assets';
import { useAppStore } from '@/core/store';
import { windowHeight, windowWidth } from '@/lib/utils';
import { FontSizeColorStyle, responsive } from '@/styles';

const textColor = '#29506D';

const borderColor = 'rgba(0, 98, 132, 0.90)';

const whiteColor = '#fff';

const Slider4 = () => {
	const BlurView = ExpoBlur;
	// const BlurView = isAndroid ? RNBlurView : ExpoBlur;

	const setShowOnboarding = useAppStore(useCallback((state) => state.setShowOnboarding, []));

	return (
		<ImageBackground
			height={windowHeight}
			width={windowWidth}
			source={IMAGES.slider4}
			resizeMode="cover"
			style={styles.bgImage}
		>
			<StatusBar backgroundColor="transparent" hidden />
			<View style={styles.boundry}>
				<View style={styles.boundryView}>
					<View style={styles.wrapper}>
						<View style={styles.imageWrapper}>
							<FastImage
								source={IMAGES.image4}
								resizeMode="cover"
								style={styles.imageOne}
							/>
							<LinearGradient
								colors={['rgba(0, 98, 132, 0.50)', 'rgba(0, 0, 0, 0.5)']}
								style={styles.gradientTopBox}
							>
								<BlurView
									style={styles.blurBoxContainer}
									tint="dark"
									intensity={70}
									experimentalBlurMethod="dimezisBlurView"
								>
									<View style={styles.blurBoxTop}>
										<Text style={FontSizeColorStyle['lato-700-xxl-white']}>
											100+
										</Text>
										<Text style={FontSizeColorStyle['lato-300-12-white']}>
											Discover and Connect with Over 100+ talented Artists{' '}
										</Text>
									</View>
								</BlurView>
							</LinearGradient>
						</View>
						<View style={styles.ellipseContainerTop}>
							<View style={styles.ellipseTop}>
								<Text
									style={[
										FontSizeColorStyle['montserrat-400-xxl-white'],
										styles.textNumber,
									]}
								>
									15+
								</Text>
								<Text
									style={[
										FontSizeColorStyle['montserrat-400-xs-black'],
										{ flex: 1 },
									]}
									numberOfLines={2}
									adjustsFontSizeToFit
								>
									{'Explore over 15 & more collaborations'}
								</Text>
							</View>
							<FastImage
								source={IMAGES.image5}
								resizeMode="cover"
								style={styles.imageTwo}
							/>
						</View>
					</View>
					<View style={styles.ellipseMiddle}>
						{/* <Text
							style={[FontSizeColorStyle['poppins-400-xxl-white'], styles.textNumber]}
						>
							98.7%
						</Text>
						<Text style={FontSizeColorStyle['poppins-400-12-black']}>
							{'Placements\nMusiced'}
						</Text> */}
						<Text
							style={FontSizeColorStyle['montserrat-400-13-black']}
							numberOfLines={2}
							adjustsFontSizeToFit
						>
							<Text
								style={FontSizeColorStyle['montserrat-700-13-black']}
								numberOfLines={2}
								adjustsFontSizeToFit
							>
								{'Win Big: '}
							</Text>
							{'Excitement, Music, Winnings'}
						</Text>
					</View>
				</View>

				<View style={styles.bottomView}>
					<View style={styles.bottomInnerView}>
						<View style={styles.bottomContainer}>
							<View style={styles.gap10}>
								<Text style={FontSizeColorStyle['montserrat-400-14-white']}>
									Let's break through the barriers, redefine distribution models
									and empower artists to share their creations directly with the
									world.
								</Text>
								<MuxicXText height={24} />
							</View>
						</View>
						<View style={styles.flex1}>
							<LinearGradient
								colors={['rgba(0, 98, 132, 0.10)', 'rgba(0, 0, 0, 0)']}
								style={styles.gradientBottom}
							>
								<View style={styles.gradientBottomBox}>
									<Text style={FontSizeColorStyle['lato-700-48-white']}>
										~20%
									</Text>
									<Text style={FontSizeColorStyle['lato-300-18-white']}>
										{`More Revenue on\nOur Platform`}
									</Text>
								</View>
							</LinearGradient>
						</View>
					</View>
				</View>
				<View style={styles.buttonContainer}>
					<FastImage source={IMAGES.x} resizeMode="cover" style={styles.imageX} />
				</View>
			</View>
		</ImageBackground>
	);
};

export default Slider4;

const styles = StyleSheet.create({
	imageX: {
		height: responsive(48),
		width: responsive(48),
	},
	boundry: {
		position: 'relative',
		flex: 1,
		justifyContent: 'space-between',
		paddingLeft: responsive(0),
		paddingTop: responsive(38),
	},
	bgImage: {
		height: windowHeight,
		width: windowWidth,
		position: 'relative',
		flex: 1,
	},
	imageOne: {
		height: responsive(240),
		width: responsive(157),
		position: 'absolute',
		top: responsive(80),
		left: responsive(70),
	},
	gradientTopBox: {
		borderRadius: responsive(25),
		// borderWidth: responsive(1),
		// borderColor: borderColor,
		marginLeft: responsive(20),
		width: responsive(137),
		height: responsive(133.9),
		position: 'relative',
	},
	blurBoxContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		borderRadius: responsive(25),
		overflow: 'hidden',
	},
	blurBoxTop: {
		borderRadius: responsive(25),
		paddingHorizontal: responsive(12),
		paddingVertical: responsive(34),
		display: 'flex',
		// alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		position: 'relative',
		flex: 1,
	},
	ellipseContainerTop: {
		position: 'relative',
		alignItems: 'flex-end',
		paddingTop: responsive(80),
		justifyContent: 'flex-end',
		flex: 1,
	},
	ellipseTop: {
		backgroundColor: whiteColor,
		paddingHorizontal: responsive(15),
		paddingVertical: responsive(15),
		overflow: 'hidden',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: responsive(5),
		shadowColor: whiteColor,
		shadowOpacity: 0.5,
		shadowRadius: responsive(40),
		elevation: responsive(80),
		borderRadius: responsive(100),
		shadowOffset: { height: responsive(20), width: responsive(20) },
		width: '90%',
	},
	ellipseMiddle: {
		backgroundColor: whiteColor,
		paddingHorizontal: responsive(20),
		paddingVertical: responsive(12),
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: responsive(20),
		position: 'absolute',
		top: responsive(350),
		left: responsive(50),
		width: '65%',
		shadowColor: whiteColor,
		shadowOpacity: 1,
		shadowRadius: responsive(40),
		elevation: responsive(80),
		borderRadius: responsive(100),
		shadowOffset: { height: responsive(0), width: responsive(20) },
	},
	imageTwo: {
		height: responsive(200),
		width: responsive(136),
		position: 'absolute',
		top: responsive(180),
		left: responsive(20),
	},
	bottomView: {
		position: 'absolute',
		bottom: responsive(140),
		left: responsive(40),
		right: 0,
		gap: 0,
	},
	bottomContainer: {
		gap: responsive(10),
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		paddingBottom: responsive(100),
	},
	gradientBottom: {
		borderRadius: responsive(25),
		borderTopEndRadius: 0,
		marginLeft: responsive(20),
		padding: responsive(1),
		position: 'relative',
	},

	gradientBottomBox: {
		paddingVertical: responsive(67),
		position: 'relative',
		paddingLeft: responsive(24),
		borderRadius: responsive(25),
		borderTopEndRadius: responsive(0),
		borderTopWidth: responsive(1),
		borderLeftWidth: responsive(1),
		borderTopColor: borderColor,
		borderLeftColor: borderColor,
	},
	buttonContainer: {
		gap: responsive(10),
		position: 'absolute',
		bottom: responsive(40),
		right: responsive(40),
	},
	boundryView: {
		position: 'relative',
		paddingRight: responsive(20),
		flex: 1,
	},
	wrapper: { position: 'relative', flexDirection: 'row' },
	imageWrapper: { position: 'relative', flex: 1 },
	font12: { fontSize: responsive(12) },
	bottomInnerView: { flex: 1, flexDirection: 'row', gap: responsive(10) },
	gap10: { gap: responsive(40), width: responsive(150) },
	flex1: { flex: 1 },
	textNumber: { color: textColor, fontSize: responsive(36) },
	buttonFont: { fontFamily: 'Poppins-ExtraBold' },
} as const);
