import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
// import { Image, RefreshControl, SectionList, StyleSheet, Text, View } from 'react-native';
import Animated, {
	Easing,
	FadeInDown,
	FadeOutDown,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { Chip } from '@/components';
import GradientText from '@/components/Base/GradientText';
import { AvatarGroup } from '@/components/Dashboard/DashboardSingersCards';
import useCountdownTimer from '@/lib/hooks/useCountdownTimer';
import { LegueResponse } from '@/lib/server/leagues';
// import { LeagueType } from '@/lib/server/challange';
import { windowWidth } from '@/lib/utils';
import { responsive2 } from '@/lib/utils/responsive';
import { Colors, FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

type ContestButtonProps = {
	onPress: (contest: LegueResponse) => void;
	checked?: boolean;
	demo?: boolean;
	index: number;
	contest: LegueResponse;
};

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

const TAB_WIDTH = responsive2(90);

const TAB_HEADINGS = ['FREE', 'PAID'] as const;

const LeagueCard: React.FC<ContestButtonProps> = ({ onPress, checked, contest, index, demo }) => {
	const isPressed = useSharedValue(false);

	const days = useSharedValue(0);

	const hours = useSharedValue(0);

	const minutes = useSharedValue(0);

	const seconds = useSharedValue(0);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date().getTime();

			const endDate = new Date(contest?.leagueEnd).getTime(); // Set your end date here

			const difference_1 = endDate - now;

			const difference = difference_1 > 0 ? difference_1 : 0;

			// Calculate days, hours, minutes, and seconds
			// const daysRemaining = Math.floor(difference / (1000 * 60 * 60 * 24));
			// const hoursRemaining = Math.floor(
			// 	(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			// );
			// const minutesRemaining = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const daysRemaining = withTiming(Math.floor(difference / (1000 * 60 * 60 * 24)), {
				duration: 300,
				easing: Easing.ease,
			});

			const hoursRemaining = withTiming(
				Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
				{
					duration: 300,
					easing: Easing.ease,
				}
			);

			const minutesRemaining = withTiming(
				Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
				{
					duration: 300,
					easing: Easing.ease,
				}
			);

			const secondsRemaining = withTiming(
				Math.round(Math.floor((difference % (1000 * 60)) / 1000)),
				{
					duration: 300,
					easing: Easing.ease,
				}
			);

			days.value = daysRemaining;
			hours.value = hoursRemaining;
			minutes.value = minutesRemaining;
			seconds.value = secondsRemaining;
		}, 1000);

		return () => clearInterval(interval);
	}, [contest?.leagueEnd, days, hours, minutes, seconds]);

	const animatedStyle = useAnimatedStyle(() => {
		const scale = withTiming(isPressed.value ? 0.95 : 1, {
			duration: 200,
			easing: Easing.linear,
		});
		// const scale = withSpring(isPressed.value ? 0.95 : 1, { stiffness: 100 });

		const opacity = withTiming(isPressed.value ? 0.8 : 1, {
			duration: 200,
			easing: Easing.linear,
		});

		return {
			// transform: [{ scale }],
			opacity,
			marginBottom: 10,
		};
	});

	const data = useCountdownTimer(new Date(contest?.leagueEnd));

	return demo ? (
		<LinearGradient
			colors={[
				contest?.entryFee !== 0 ? 'rgba(42, 144, 172, 0.20) ' : 'rgba(225, 225, 225, 0.10)',
				contest?.entryFee !== 0 ? 'rgba(0, 88, 113, 0.20)' : 'rgba(34, 34, 34, 0.20)',
				contest?.entryFee !== 0 ? 'rgba(0, 88, 113, 0.20)' : 'black',
			]}
			style={styles.linearGradientContainer}
		>
			<Animated.Image
				source={{
					uri:
						contest?.banner ||
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_ZVwWBc-CF_4nhuHd16_COB8jgEIKSCfAw&usqp=CAU',
				}}
				style={{ height: 110, width: windowWidth - 40, flex: 1 }}
				resizeMode="cover"
				sharedTransitionTag={contest?._id}
			/>
			<View style={styles.headerContainer}>
				<View
					style={{
						flexDirection: 'column',
						alignSelf: 'flex-start',
						flex: 2,
						position: 'relative',
					}}
				>
					<GradientText
						style={FontSizeColorStyle['montserrat-600-24-white']}
						colors={['#00BCFD', '#007097']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						numberOfLines={1}
						allowFontScaling
						adjustsFontSizeToFit
					>
						{contest?.title}
					</GradientText>
					<View
						style={[
							LayoutStyle.row,
							LayoutStyle.center,
							{ justifyContent: 'flex-start' },
						]}
					>
						<GradientText
							style={FontSizeColorStyle['montserrat-500-xs-white']}
							colors={['#00BCFD', '#007097']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							numberOfLines={1}
							allowFontScaling
							adjustsFontSizeToFit
						>
							Starting On :
						</GradientText>
						<Text
							style={FontSizeColorStyle['montserrat-500-sm-white']}
							numberOfLines={1}
							allowFontScaling
							adjustsFontSizeToFit
						>
							{contest?.leagueStart
								? ` ${new Date(contest?.leagueStart)?.toLocaleDateString() || ''}`
								: ''}
						</Text>
					</View>
				</View>
				<View
					style={{
						alignItems: 'flex-end',
						flex: 1,
						position: 'relative',
					}}
				>
					<View
						style={[
							LayoutStyle.row,
							{ position: 'relative', alignItems: 'center', flex: 1 },
						]}
					>
						{contest?.isJoined ? (
							<GradientText
								style={FontSizeColorStyle['montserrat-700-16-white']}
								colors={['#00BCFD', '#007097']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
								numberOfLines={1}
								allowFontScaling
								adjustsFontSizeToFit
							>
								Joined
							</GradientText>
						) : (
							<>
								<GradientText
									style={FontSizeColorStyle['montserrat-700-16-white']}
									colors={['#00BCFD', '#007097']}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 1 }}
									numberOfLines={1}
									allowFontScaling
									adjustsFontSizeToFit
								>
									Fee :
								</GradientText>
								<Text
									style={FontSizeColorStyle['montserrat-700-16-white']}
									numberOfLines={1}
									allowFontScaling
									adjustsFontSizeToFit
								>
									{` ${contest?.entryFee || 'Free'}`}
								</Text>
							</>
						)}
					</View>
					<View
						style={[
							LayoutStyle.row,
							{ position: 'relative', alignItems: 'center', flex: 1 },
						]}
					>
						<GradientText
							style={FontSizeColorStyle['montserrat-500-xs-white']}
							colors={['#00BCFD', '#007097']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							numberOfLines={1}
							allowFontScaling
							adjustsFontSizeToFit
						>
							Ends On :
						</GradientText>
						<Text
							style={FontSizeColorStyle['montserrat-500-sm-white']}
							numberOfLines={1}
							allowFontScaling
							adjustsFontSizeToFit
						>
							{contest?.leagueEnd
								? ` ${new Date(contest?.leagueEnd)?.toLocaleDateString() || 'Free'}`
								: ''}
						</Text>
					</View>
				</View>
			</View>
			<LinearGradient
				colors={['#052F3B', '#1e1e1e']}
				style={{
					padding: responsive(20),
					width: '100%',
					flexDirection: 'row',
					gap: responsive(10),
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<View style={[LayoutStyle.row, LayoutStyle.center, { gap: responsive(8) }]}>
					<Image
						source={{
							uri: 'https://t3.ftcdn.net/jpg/06/23/56/90/360_F_623569090_sIwfbSjZkml1ff2i9gxyBb7IiCOdf9bV.jpg',
						}}
						style={{ width: responsive(30), height: responsive(30) }}
					/>
					<View>
						<Text
							style={FontSizeColorStyle['montserrat-400-sm-white']}
							numberOfLines={1}
							allowFontScaling
							adjustsFontSizeToFit
						>
							{`Reward`}
						</Text>
						<GradientText
							style={FontSizeColorStyle['montserrat-600-16-white']}
							colors={['#00BCFD', '#007097']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							numberOfLines={1}
							allowFontScaling
							adjustsFontSizeToFit
						>
							{`${contest?.reward?.amount || 'Free'}`}
						</GradientText>
					</View>
				</View>
				<RectButton
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						gap: responsive(5),
						paddingHorizontal: responsive(5),
						transform: [{ scale: 0.8 }],
					}}
				>
					<AvatarGroup
						images={
							contest?.users
								? contest?.users?.map((item) => item?.user)
								: [
										'https://t3.ftcdn.net/jpg/02/57/27/20/360_F_257272034_PqpJ7rx0pqXHqB6RJ27w662p3FwY0r2G.jpg',
										'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOza36lSYO6bLPuiCEyN2qmG4MoMc_6TBew&usqp=CAU',
										'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsEWJ4QZwBu34arF-10mkTMXjl5p_S5QHEQ&usqp=CAU',
										'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsEWJ4QZwBu34arF-10mkTMXjl5p_S5QHEQ&usqp=CAU',
									]
						}
					/>
					<Text
						style={FontSizeColorStyle['heebo-500-20-white']}
						onPress={() => onPress(contest)}
					>
						{contest?.joinedUsers ? `+${contest?.joinedUsers}` : 'Join'}
					</Text>
				</RectButton>
			</LinearGradient>

			{contest?.leagueEnd ? (
				<View style={{ position: 'absolute', top: 0, right: 0 }}>
					<Chip
						colors={['#125B6F', '#052F3B', '#00212A']}
						text={`${data?.days} D : ${data?.hours} H : ${data?.minutes} M : ${data?.seconds} S`}
						color="#ffffff"
					/>
				</View>
			) : null}
			{/* {true ? (
					<View style={{ position: 'absolute', top: 0, left: 0 }}>
						<Chip
							colors={['#125B6F', '#052F3B', '#00212A']}
							text={`Joined`}
							color="#ffffff"
						/>
					</View>
				) : null} */}
		</LinearGradient>
	) : (
		<AnimatedRectButton
			style={[styles.rectButtonContainer, animatedStyle]}
			underlayColor={contest?.entryFee ? '#00495E' : '#00BCFD'}
			rippleColor={contest?.entryFee ? '#00495E' : '#00BCFD'}
			onPress={() => onPress(contest)}
			onBegan={() => {
				isPressed.value = true;
			}}
			onActivated={() => {
				isPressed.value = true;
			}}
			onFailed={() => {
				isPressed.value = false;
			}}
			onCancelled={() => {
				isPressed.value = false;
			}}
			onEnded={() => {
				isPressed.value = false;
			}}
			entering={FadeInDown.delay(500 * index)}
			exiting={FadeOutDown.delay(200)}
		>
			<LinearGradient
				colors={[
					contest?.entryFee !== 0
						? 'rgba(42, 144, 172, 0.20) '
						: 'rgba(225, 225, 225, 0.10)',
					contest?.entryFee !== 0 ? 'rgba(0, 88, 113, 0.20)' : 'rgba(34, 34, 34, 0.20)',
					contest?.entryFee !== 0 ? 'rgba(0, 88, 113, 0.20)' : 'black',
				]}
				style={styles.linearGradientContainer}
			>
				<Animated.Image
					source={{
						uri:
							contest?.banner ||
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_ZVwWBc-CF_4nhuHd16_COB8jgEIKSCfAw&usqp=CAU',
					}}
					style={{
						height: responsive(110),
						width: windowWidth - responsive(40),
						flex: 1,
					}}
					resizeMode="cover"
					sharedTransitionTag={contest?._id}
				/>
				<View style={styles.headerContainer}>
					<View
						style={{
							flexDirection: 'column',
							alignSelf: 'flex-start',
							flex: 2,
							position: 'relative',
						}}
					>
						<GradientText
							style={FontSizeColorStyle['montserrat-600-24-white']}
							colors={['#00BCFD', '#007097']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							numberOfLines={1}
							allowFontScaling
							adjustsFontSizeToFit
						>
							{contest?.title}
						</GradientText>
						<View
							style={[
								LayoutStyle.row,
								LayoutStyle.center,
								{ justifyContent: 'flex-start' },
							]}
						>
							<GradientText
								style={FontSizeColorStyle['montserrat-500-xs-white']}
								colors={['#00BCFD', '#007097']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
								numberOfLines={1}
								allowFontScaling
								adjustsFontSizeToFit
							>
								Starting On :
							</GradientText>
							<Text
								style={FontSizeColorStyle['montserrat-500-sm-white']}
								numberOfLines={1}
								allowFontScaling
								adjustsFontSizeToFit
							>
								{contest?.leagueStart
									? ` ${new Date(contest?.leagueStart)?.toLocaleDateString() || ''}`
									: ''}
							</Text>
						</View>
					</View>
					<View
						style={{
							alignItems: 'flex-end',
							flex: 1,
							position: 'relative',
						}}
					>
						<View
							style={[
								LayoutStyle.row,
								{ position: 'relative', alignItems: 'center', flex: 1 },
							]}
						>
							{contest?.isJoined ? (
								<GradientText
									style={FontSizeColorStyle['montserrat-700-16-white']}
									colors={['#00BCFD', '#007097']}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 1 }}
									numberOfLines={1}
									allowFontScaling
									adjustsFontSizeToFit
								>
									Joined
								</GradientText>
							) : (
								<>
									<GradientText
										style={FontSizeColorStyle['montserrat-700-16-white']}
										colors={['#00BCFD', '#007097']}
										start={{ x: 0, y: 0 }}
										end={{ x: 1, y: 1 }}
										numberOfLines={1}
										allowFontScaling
										adjustsFontSizeToFit
									>
										Fee :
									</GradientText>
									<Text
										style={FontSizeColorStyle['montserrat-700-16-white']}
										numberOfLines={1}
										allowFontScaling
										adjustsFontSizeToFit
									>
										{` ${contest?.entryFee || 'Free'}`}
									</Text>
								</>
							)}
						</View>
						<View
							style={[
								LayoutStyle.row,
								{ position: 'relative', alignItems: 'center', flex: 1 },
							]}
						>
							<GradientText
								style={FontSizeColorStyle['montserrat-500-xs-white']}
								colors={['#00BCFD', '#007097']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
								numberOfLines={1}
								allowFontScaling
								adjustsFontSizeToFit
							>
								Ends On :
							</GradientText>
							<Text
								style={FontSizeColorStyle['montserrat-500-sm-white']}
								numberOfLines={1}
								allowFontScaling
								adjustsFontSizeToFit
							>
								{contest?.leagueEnd
									? ` ${new Date(contest?.leagueEnd)?.toLocaleDateString() || 'Free'}`
									: ''}
							</Text>
						</View>
					</View>
				</View>
				<LinearGradient
					colors={['#052F3B', '#1e1e1e']}
					style={{
						padding: responsive(20),
						width: '100%',
						flexDirection: 'row',
						gap: responsive(10),
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={[LayoutStyle.row, LayoutStyle.center, { gap: 8 }]}>
						<Image
							source={{
								uri: 'https://t3.ftcdn.net/jpg/06/23/56/90/360_F_623569090_sIwfbSjZkml1ff2i9gxyBb7IiCOdf9bV.jpg',
							}}
							style={{ width: responsive(30), height: responsive(30) }}
						/>
						<View>
							<Text
								style={FontSizeColorStyle['montserrat-400-sm-white']}
								numberOfLines={1}
								allowFontScaling
								adjustsFontSizeToFit
							>
								{`Reward`}
							</Text>
							<GradientText
								style={FontSizeColorStyle['montserrat-600-16-white']}
								colors={['#00BCFD', '#007097']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
								numberOfLines={1}
								allowFontScaling
								adjustsFontSizeToFit
							>
								{`${contest?.reward?.amount || 'Free'}`}
							</GradientText>
						</View>
					</View>
					<RectButton
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							gap: responsive(5),
							paddingHorizontal: responsive(5),
							transform: [{ scale: 0.8 }],
						}}
					>
						<AvatarGroup
							images={
								contest?.users
									? contest?.users?.map((item) => item?.user)
									: [
											'https://t3.ftcdn.net/jpg/02/57/27/20/360_F_257272034_PqpJ7rx0pqXHqB6RJ27w662p3FwY0r2G.jpg',
											'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOza36lSYO6bLPuiCEyN2qmG4MoMc_6TBew&usqp=CAU',
											'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsEWJ4QZwBu34arF-10mkTMXjl5p_S5QHEQ&usqp=CAU',
											'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsEWJ4QZwBu34arF-10mkTMXjl5p_S5QHEQ&usqp=CAU',
										]
							}
						/>
						<Text
							style={FontSizeColorStyle['heebo-500-20-white']}
							onPress={() => onPress(contest)}
						>
							{contest?.joinedUsers ? `+${contest?.joinedUsers}` : 'Join'}
						</Text>
					</RectButton>
				</LinearGradient>

				{contest?.leagueEnd ? (
					<View style={{ position: 'absolute', top: 0, right: 0 }}>
						<Chip
							colors={['#125B6F', '#052F3B', '#00212A']}
							text={`${data?.days} D : ${data?.hours} H : ${data?.minutes} M : ${data?.seconds} S`}
							color="#ffffff"
						/>
					</View>
				) : null}
				{/* {true ? (
					<View style={{ position: 'absolute', top: 0, left: 0 }}>
						<Chip
							colors={['#125B6F', '#052F3B', '#00212A']}
							text={`Joined`}
							color="#ffffff"
						/>
					</View>
				) : null} */}
			</LinearGradient>
		</AnimatedRectButton>
	);
};

export default LeagueCard;

const styles = StyleSheet.create({
	bottomSheetContainer: {
		backgroundColor: '#000000',
		borderColor: '#0A7593',
		borderLeftWidth: responsive(0.75),
		borderTopLeftRadius: responsive(30),
		borderTopRightRadius: responsive(30),
		borderTopWidth: responsive(0.75),
		bottom: 0,
		elevation: responsive(25),
		overflow: 'hidden',
		position: 'absolute',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.5,
		shadowRadius: responsive(50),
		width: '100%',
	},
	bottomSheetInnerContainer: {
		borderTopLeftRadius: responsive(30),
		borderTopRightRadius: responsive(30),
		display: 'flex',
		overflow: 'hidden',
		width: '100%',
	},
	buttonInnerContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: responsive(5),
		justifyContent: 'space-between',
	},
	chipContainer: {
		borderRadius: responsive(6),
		paddingHorizontal: responsive(11),
		paddingVertical: responsive(6),
	},
	tabWrapper: {
		flexDirection: 'row',
		marginLeft: responsive(20),
		position: 'relative',
	},

	contestButtonContainer: {
		backgroundColor: '#000000',
		borderColor: '#0A7593',
		borderLeftWidth: responsive(0.75),
		borderRadius: responsive(11),
		borderTopWidth: responsive(0.75),
		elevation: responsive(25),
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: responsive(4),
		},
		shadowOpacity: responsive(0.5),
		shadowRadius: responsive(50),
		width: '100%',
		marginBottom: responsive(5),
	},
	contestSectionContainer: {
		gap: 5,
		marginTop: 20,
		width: '100%',
	},
	headerContainer: {
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		flexDirection: 'row',

		gap: responsive(10),
		paddingHorizontal: responsive(20),
	},
	linearGradientContainer: {
		borderRadius: responsive(8),
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		display: 'flex',
		overflow: 'hidden',
		flex: 1,

		gap: responsive(10),
	},
	rectButtonContainer: {
		borderRadius: responsive(8),
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		width: windowWidth - responsive(40),
		paddingRight: 0,
		borderColor: '#338197',
		shadowColor: '#338197',
		backgroundColor: '#121212',
		// borderWidth: 1,
		elevation: 1,
		shadowOffset: {
			width: -1,
			height: 0,
		},
		shadowOpacity: 0.3,
		shadowRadius: responsive(2),
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	scrollLayoutContainer: {
		flex: 0,
		paddingHorizontal: responsive(20),
		paddingTop: 0,
		gap: responsive(20),
		paddingVertical: responsive(100),
	},

	statsContainer: {
		borderBottomColor: '#00495E',
		borderBottomWidth: responsive(1),
		flex: 1,
		gap: responsive(10),
		paddingBottom: responsive(10),
	},
	textContainer: {
		flexDirection: 'column',
		gap: 5,
	},
	totalContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
		width: '100%',
	},
	tabIndiCator: {
		height: responsive(2),
		width: TAB_WIDTH,
		...Colors['bg-primary-text'],
		borderRadius: responsive(8),
		bottom: 0,
		flex: 1,
		left: 0,
		position: 'absolute',
	},
	viewPager: {
		flex: 1,
	},
	container: {
		gap: responsive(10),
		paddingBottom: responsive(40),
		paddingHorizontal: responsive(20),
	},
} as const);
