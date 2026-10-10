import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
	Easing,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { BlurView } from 'expo-blur';

import { PrimaryButton } from '../Base';

import { IMAGES } from '@/assets';
import { isAndroid } from '@/lib/utils';
import { ALL_COLORS, FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

const TEXTS = { header: 'My Account ', rs: '@', amt: 500, remaining: '.000' } as const;

const DashboardBalanceCard: React.FC<{ currentBalance?: number }> = ({ currentBalance }) => {
	const isPressed = useSharedValue(false);

	const [modalVisible, setModalVisible] = useState(false);

	const { confirmPayment } = useStripe();

	const parts = currentBalance
		?.toLocaleString('en-US', {
			style: 'decimal',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})
		?.toString()
		.split('.');

	const wholeNumberPart = parts?.[0] || '00';

	console.log({ wholeNumberPart });

	const fractionalPart = parts?.[1] || '0';

	const gestureHandler = useAnimatedGestureHandler({
		onStart: () => {
			isPressed.value = true;
		},
		onEnd: () => {
			isPressed.value = false;
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		const scale = withSpring(isPressed.value ? 0.985 : 1, { stiffness: 100 });

		const opacity = withTiming(isPressed.value ? 0.8 : 1, {
			duration: 150,
			easing: Easing.linear,
		});

		return {
			transform: [{ scale }],
			opacity,
		};
	});

	return (
		<>
			<AnimatedRectButton
				style={[styles.container, animatedStyle]}
				activeOpacity={0.2}
				enabled={!isAndroid}
				onPress={() => setModalVisible(true)}
			>
				<View style={styles.border}>
					<LinearGradient
						colors={[
							ALL_COLORS['rgba(0, 0, 0, 0.50)'],
							ALL_COLORS['rgba(0,0,0,0.20)'],
							'transparent',
							'transparent',
							'transparent',
							'transparent',
						]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.wrapper}
					>
						<BlurView
							style={styles.wrapper}
							tint="dark"
							intensity={responsive(20)}
							experimentalBlurMethod={'dimezisBlurView'}
						>
							<View style={styles.content}>
								<View style={LayoutStyle.fill}>
									<Text
										style={FontSizeColorStyle['montserrat-500-12-primary-text']}
									>
										{TEXTS.header}
									</Text>
									<View style={styles.coinContainer}>
										<Text
											style={[
												FontSizeColorStyle[
													'montserrat-500-12-primary-text'
												],
												styles.textVertical,
											]}
										>
											{TEXTS.rs}
										</Text>
										<Text
											style={[
												FontSizeColorStyle['montserrat-800-12-white'],
												styles.text46,
											]}
										>
											{currentBalance ? wholeNumberPart : TEXTS.amt}
										</Text>
										<Text
											style={[
												FontSizeColorStyle['montserrat-800-12-white'],
												styles.textEnd,
											]}
										>
											{`.${currentBalance ? fractionalPart : TEXTS.remaining}`}
										</Text>
									</View>
								</View>
								<FastImage source={IMAGES.icon} style={styles.image} />
							</View>
						</BlurView>
					</LinearGradient>
				</View>
			</AnimatedRectButton>
			<Modal
				animated
				animationType="fade"
				// transparent={}
				transparent
				hardwareAccelerated
				statusBarTranslucent
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(false);
				}}
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#232323',
					padding: responsive(20),
				}}
			>
				<BlurView
					style={[
						styles.wrapper,
						{
							alignItems: 'center',
							justifyContent: 'center',
							padding: responsive(20),
						},
					]}
					tint="dark"
					intensity={responsive(50)}
					experimentalBlurMethod={'dimezisBlurView'}
				>
					<BlurView
						style={{
							justifyContent: 'center',
							padding: responsive(20),
							width: '100%',
							height: responsive(300),
							borderRadius: responsive(20),
							overflow: 'hidden',
						}}
						tint="dark"
						intensity={100}
						experimentalBlurMethod={'dimezisBlurView'}
					>
						<RectButton
							onPress={() => setModalVisible(false)}
							style={{
								position: 'absolute',
								top: responsive(20),
								right: responsive(20),
							}}
						>
							<MaterialIcons name="cancel" size={responsive(24)} color="white" />
						</RectButton>
						<Text style={FontSizeColorStyle['heebo-600-18-primary']}>
							Enter Card Details
						</Text>
						<CardField
							postalCodeEnabled={true}
							placeholders={{
								number: '4242 4242 4242 4242',
							}}
							cardStyle={{
								backgroundColor: 'transparent',
								textColor: '#fff',
							}}
							style={{
								width: '100%',
								height: responsive(50),
								marginVertical: responsive(30),
							}}
							onCardChange={(cardDetails) => {
								console.log('cardDetails', cardDetails);
							}}
							onFocus={(focusedField) => {
								console.log('focusField', focusedField);
							}}
						/>
						<View style={{ opacity: 0.5 }}>
							<PrimaryButton
								onPress={async () => confirmPayment()}
								label="Coming Soon..."
								enabled={false}
							/>
						</View>
					</BlurView>
				</BlurView>
			</Modal>
		</>
	);
};

export default DashboardBalanceCard;

const styles = StyleSheet.create({
	container: {
		borderRadius: responsive(20),

		shadowColor: ALL_COLORS['primary-00252f'],
		shadowOffset: { width: responsive(4), height: responsive(4) },
		shadowOpacity: 0.25,
		shadowRadius: responsive(5),
		elevation: responsive(5),
		height: responsive(118),
		paddingHorizontal: 0,
		paddingVertical: 0,
		padding: 0,
		paddingLeft: responsive(0),
		paddingTop: 0,
		paddingRight: 0,
		paddingBottom: 0,
		margin: 0,
		width: '100%',
		flex: 1,
	},
	wrapper: {
		flex: 1,
		borderRadius: responsive(20),

		overflow: 'hidden',
	},
	border: {
		flex: 1,
		borderRadius: responsive(20),
		borderTopWidth: responsive(2),
		borderColor: ALL_COLORS['primary-006582'],
		borderLeftWidth: responsive(1),
		overflow: 'hidden',
	},
	content: {
		padding: responsive(28),
		paddingRight: responsive(35),
		flex: 1,
		flexDirection: 'row',
	},
	coinContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: responsive(5),
	},
	textVertical: {
		alignSelf: 'flex-start',
		marginVertical: responsive(10),
	},
	text46: {
		fontSize: responsive(46),
	},
	textEnd: {
		alignSelf: 'flex-end',
		marginVertical: responsive(10),
	},
	image: {
		height: responsive(65),
		width: responsive(65),
	},
} as const);
