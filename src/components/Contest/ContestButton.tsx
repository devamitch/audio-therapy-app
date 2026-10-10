import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import GradientText from '../Base/GradientText';

import ContestPlayer from './ContestPlayer';

import { IMAGES } from '@/assets';
import { Chip } from '@/components';
import { customTransition } from '@/components/Dashboard/RandomPlayers';
import useCountdownTimer from '@/lib/hooks/useCountdownTimer';
import { ChalangesResponse } from '@/lib/server/challange';
import { FontSizeColorStyle, responsive } from '@/styles';

type ContestButtonProps = ChalangesResponse & {
	onPress?: (contest: string) => void;
	onArtistPress: (id: string, image: string, name: string) => void;
	amount?: number;
	win?: boolean;
};

const ContestButton: React.FC<ContestButtonProps> = ({
	onPress,
	artist1Detail,
	artist2Detail,
	amount,
	_id,
	description,
	bidAmount,
	status,
	votes,
	totalVotes,
	win,
	onArtistPress,
	endOn,
	matchNumber,
	round,
}) => {
	const data = useCountdownTimer(new Date(endOn || '1757694600000'));

	// // Create animated values for each time unit
	const animatedDays = useSharedValue(data.days);

	const animatedHours = useSharedValue(data.hours);

	const animatedMinutes = useSharedValue(data.minutes);

	const animatedSeconds = useSharedValue(data.seconds);

	// Update animated values when the countdown timer changes
	useEffect(() => {
		animatedDays.value = withTiming(data.days, { duration: 500, easing: Easing.ease });
		animatedHours.value = withTiming(data.hours, { duration: 500, easing: Easing.ease });
		animatedMinutes.value = withTiming(data.minutes, { duration: 500, easing: Easing.ease });
		animatedSeconds.value = withTiming(data.seconds, { duration: 500, easing: Easing.ease });
	}, [animatedDays, animatedHours, animatedMinutes, animatedSeconds, data]);

	const dayStyle = useAnimatedStyle(() => {
		return {
			opacity: animatedHours.value > 0 ? 1 : 0,
			transform: [{ scale: animatedDays.value > 0 ? 1 : 0.8 }],
			marginHorizontal: 2,
		};
	});

	const hourStyle = useAnimatedStyle(() => {
		return {
			opacity: animatedHours.value > 0 ? 1 : 0,
			transform: [{ scale: animatedHours.value > 0 ? 1 : 0.8 }],
			marginHorizontal: 2,
		};
	});

	const minuteStyle = useAnimatedStyle(() => {
		return {
			opacity: animatedMinutes.value > 0 ? 1 : 0,
			transform: [{ scale: animatedMinutes.value > 0 ? 1 : 0.8 }],
			marginHorizontal: 2,
		};
	});

	const secondStyle = useAnimatedStyle(() => {
		return {
			opacity: animatedSeconds.value > 0 ? 1 : 0,
			transform: [{ scale: animatedSeconds.value > 0 ? 1 : 0.8 }],
			marginHorizontal: 2,
		};
	});

	return (
		<>
			<RectButton style={styles.main} onPress={() => onPress && _id && onPress(_id)}>
				<BlurView
					intensity={15}
					tint="dark"
					style={styles.container}
					experimentalBlurMethod={'dimezisBlurView'}
				>
					{bidAmount && status === 3 ? (
						<FastImage source={IMAGES.prize} style={styles.cup} />
					) : null}
					<Animated.View
						style={styles.contestButtonContainer}
						sharedTransitionTag={`${artist1Detail?.artist?.name?.split(' ')?.[0]}  vs ${artist2Detail?.artist?.name?.split(' ')?.[0]}`}
						sharedTransitionStyle={customTransition}
					>
						<LinearGradient
							colors={[
								amount ? 'rgba(42, 144, 172, 0.20) ' : 'rgba(225, 225, 225, 0.10)',
								amount ? 'rgba(0, 88, 113, 0.20)' : 'rgba(34, 34, 34, 0.20)',
								amount ? 'rgba(0, 88, 113, 0.20)' : 'black',
							]}
							style={styles.linearGradientContainer}
						>
							<View style={styles.rectButtonContainer}>
								<View style={styles.buttonInnerContainer}>
									<View style={styles.textContainer}>
										<ContestPlayer
											name={artist1Detail?.artist?.name || ''}
											image={artist1Detail?.artist?.icon || ''}
											votes={artist1Detail?.votesCount || 0}
											flag={
												artist1Detail?.artist?.flag ||
												artist1Detail?.artist?.country?.flag ||
												artist1Detail?.flag ||
												artist1Detail?.country?.flag
											}
											onPress={() => {
												onArtistPress(
													artist1Detail?._id,
													artist1Detail?.artist?.icon,
													artist1Detail?.artist?.name
												);
											}}
											// win
										/>
										<ContestPlayer
											name={artist2Detail?.artist?.name || ''}
											image={artist2Detail?.artist?.icon || ''}
											votes={artist2Detail?.votesCount || 0}
											flag={
												artist2Detail?.artist?.flag ||
												artist2Detail?.artist?.country?.flag ||
												artist2Detail?.flag ||
												artist2Detail?.country?.flag
											}
											right
											win
											onPress={() => {
												onArtistPress(
													artist2Detail?._id,
													artist2Detail?.artist?.icon,
													artist2Detail?.artist?.name
												);
											}}
										/>
									</View>
									<View style={styles.header2Container}>
										<View
											style={{ flexDirection: 'row', alignItems: 'center' }}
										>
											{artist1Detail?.artist?.flag ||
											artist1Detail?.artist?.country?.flag ||
											artist1Detail?.flag ||
											artist1Detail?.country?.flag ? (
												<FastImage
													source={{
														uri:
															artist1Detail?.artist?.flag ||
															artist1Detail?.artist?.country?.flag ||
															artist1Detail?.flag ||
															artist1Detail?.country?.flag,
													}}
													style={{
														height: responsive(8),
														width: responsive(12),
													}}
												/>
											) : null}
											<Text
												style={
													FontSizeColorStyle['montserrat-500-15-white']
												}
												numberOfLines={1}
											>
												{` ${artist1Detail?.artist?.name?.split(' ')?.[0]}`}
											</Text>
											<Text
												style={
													FontSizeColorStyle['montserrat-500-15-white']
												}
												numberOfLines={1}
											>
												{` vs `}
											</Text>
											{artist2Detail?.artist?.flag ||
											artist2Detail?.artist?.country?.flag ||
											artist2Detail?.flag ||
											artist2Detail?.country?.flag ? (
												<FastImage
													source={{
														uri:
															artist2Detail?.artist?.flag ||
															artist2Detail?.artist?.country?.flag ||
															artist2Detail?.flag ||
															artist2Detail?.country?.flag,
													}}
													style={{
														height: responsive(8),
														width: responsive(12),
													}}
												/>
											) : null}
											<Text
												style={
													FontSizeColorStyle['montserrat-500-15-white']
												}
												numberOfLines={1}
											>
												{` ${artist2Detail?.artist?.name?.split(' ')?.[0]}`}
											</Text>
										</View>
										<Text
											style={
												FontSizeColorStyle[
													'montserrat-500-12-primary-light'
												]
											}
											numberOfLines={1}
										>
											{description}
										</Text>

										<View style={{ flexDirection: 'row', gap: responsive(5) }}>
											{bidAmount ? (
												<Chip text={`${bidAmount} Music-X `} />
											) : null}
											{totalVotes ? (
												<Chip
													text={`${totalVotes} ${status === 1 ? 'Playing' : 'Joined'}`}
													outlined
												/>
											) : null}
										</View>
									</View>
								</View>
								{/* <Entypo name="chevron-thin-right" size={24} color="white" /> */}
							</View>
							<LinearGradient
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									flex: 1,
									justifyContent: 'space-between',
									paddingHorizontal: responsive(20),
									paddingVertical: responsive(10),
								}}
								colors={['#006582', '#00252F']}
								start={{ x: 0, y: 1 }}
							>
								<LinearGradient
									style={{
										flexDirection: 'row',
										gap: responsive(4),
										alignItems: 'center',
										paddingHorizontal: responsive(6),
										paddingVertical: responsive(4),
										borderRadius: responsive(6),
									}}
									colors={['#00212A', '#00252F', '#00212A']}
								>
									<Text
										style={FontSizeColorStyle['montserrat-600-xxs-dark-929292']}
										numberOfLines={1}
										adjustsFontSizeToFit
									>
										{`Match ${matchNumber ?? ''}`}
									</Text>
									<View
										style={{
											height: responsive(10),
											width: responsive(1),
											backgroundColor: '#929292',
											marginHorizontal: responsive(5),
										}}
									/>
									<Text
										style={FontSizeColorStyle['poppins-600-xxs-white']}
										numberOfLines={1}
									>
										{round}
									</Text>
									<View
										style={{
											height: responsive(10),
											width: responsive(1),
											backgroundColor: '#F1F1F1',
											marginHorizontal: responsive(5),
										}}
									/>
									<GradientText
										style={[
											FontSizeColorStyle['poppins-700-xxs-grey-797979'],
											{ fontFamily: 'Moonwalk' },
										]}
										numberOfLines={1}
										colors={['#00BCFD', '#7CD0E8']}
										start={{ x: 0, y: 1 }}
										end={{ x: 1, y: 0 }}
									>
										World Cup
									</GradientText>
								</LinearGradient>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										gap: responsive(2),
										justifyContent: 'center',
									}}
								>
									<Animated.View style={dayStyle}>
										<GradientText
											style={[
												FontSizeColorStyle['poppins-700-sm-grey-797979'],
												{ fontFamily: 'Moonwalk' },
											]}
											numberOfLines={1}
											colors={['#717171', '#696262']}
											start={{ x: 0, y: 1 }}
											end={{ x: 1, y: 0 }}
										>
											{animatedDays.value} D{' '}
										</GradientText>
									</Animated.View>

									<Animated.View style={hourStyle}>
										<GradientText
											style={[
												FontSizeColorStyle['poppins-700-sm-grey-797979'],
												{ fontFamily: 'Moonwalk' },
											]}
											numberOfLines={1}
											colors={['#868686', '#8E8E8E']}
											start={{ x: 0, y: 1 }}
											end={{ x: 1, y: 0 }}
										>
											{animatedHours.value}
										</GradientText>
									</Animated.View>
									<Animated.Text
										style={[
											FontSizeColorStyle['poppins-700-sm-grey-797979'],
											{ fontFamily: 'Moonwalk' },
										]}
									>
										:
									</Animated.Text>
									<Animated.View style={minuteStyle}>
										<GradientText
											style={[
												FontSizeColorStyle['poppins-700-sm-grey-797979'],
												{ fontFamily: 'Moonwalk' },
											]}
											numberOfLines={1}
											colors={['#bfbfbf', '#B6B6B6']}
											start={{ x: 0, y: 1 }}
											end={{ x: 1, y: 0 }}
										>
											{animatedMinutes.value}
										</GradientText>
									</Animated.View>
									<Text
										style={[
											FontSizeColorStyle['poppins-700-sm-light-c4c4c4'],
											{ fontFamily: 'Moonwalk' },
										]}
									>
										:
									</Text>
									<Animated.View style={secondStyle}>
										<GradientText
											style={[
												FontSizeColorStyle['poppins-700-sm-grey-797979'],
												{ fontFamily: 'Moonwalk' },
											]}
											numberOfLines={1}
											colors={['#cbcbcb', '#EBEBEB']}
											start={{ x: 0, y: 1 }}
											end={{ x: 1, y: 0 }}
										>
											{animatedSeconds.value}
										</GradientText>
									</Animated.View>
								</View>
							</LinearGradient>
						</LinearGradient>
					</Animated.View>
				</BlurView>
			</RectButton>
		</>
	);
};

export default ContestButton;

const styles = StyleSheet.create({
	contestButtonContainer: {
		backgroundColor: '#000000',
		borderColor: '#0A7593',
		borderLeftWidth: responsive(0.75),
		borderRadius: responsive(19),
		borderTopWidth: responsive(1),
		elevation: responsive(25),
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: {
			width: responsive(0),
			height: responsive(4),
		},
		shadowOpacity: 0.5,
		shadowRadius: responsive(50),
		width: '100%',
	},
	ml20: {
		marginLeft: responsive(20),
	},
	contestSectionContainer: {
		flex: 1,
		marginTop: responsive(20),
		width: '100%',
	},
	headerContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: responsive(3),
	},
	linearGradientContainer: {
		borderRadius: responsive(19),
		display: 'flex',
		overflow: 'hidden',
		width: '100%',
	},
	rectButtonContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: responsive(15),
		paddingVertical: responsive(20),
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	container: {
		borderRadius: responsive(5),
		position: 'relative',
		paddingTop: responsive(15),
		paddingHorizontal: responsive(10),
		paddingBottom: responsive(5),
		elevation: responsive(25),
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: responsive(4),
		},
		shadowOpacity: 0.5,
		shadowRadius: responsive(50),
		width: '100%',
	},
	main: {
		borderRadius: responsive(5),
		position: 'relative',

		elevation: responsive(25),
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: responsive(4),
		},
		shadowOpacity: 0.5,
		shadowRadius: responsive(50),
		width: '100%',
	},
	cup: {
		height: responsive(35),
		width: responsive(35),
		position: 'absolute',
		right: responsive(46),
		top: 0,
		zIndex: 1,
	},
	buttonInnerContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: responsive(15),
		flex: 1,
	},
	textContainer: {
		flexDirection: 'row',
		gap: responsive(3),
		width: responsive(112),
		position: 'relative',
	},
	header2Container: {
		gap: responsive(3),
		flex: 1,
	},
} as const);
