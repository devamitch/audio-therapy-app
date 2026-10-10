import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	FadeIn,
	FadeOut,
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
	withTiming,
} from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { BlurView as ExpoBlur } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Lottie from 'lottie-react-native';

import { IMAGES, JSONS } from '@/assets';
import { Chip, PrimaryButton } from '@/components';
import GradientText from '@/components/Base/GradientText';
import { AvatarGroup } from '@/components/Dashboard/DashboardSingersCards';
import { useStateStore } from '@/core/store';
import useCountdownTimer from '@/lib/hooks/useCountdownTimer';
import { getLeagueDetails } from '@/lib/server/leagues';
import { windowHeight, windowWidth } from '@/lib/utils';
import { LeagueStackRouteType } from '@/navigation/main/LeagueStack';
import { FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const HEADER_HEIGHT = 250;

const BlurView = Animated.createAnimatedComponent(ExpoBlur);

const LottieView = Animated.createAnimatedComponent(Lottie);

const StatusCard = ({ label, val }: { label?: string; val?: string | number }) => (
	<LinearGradient
		colors={['#151515', '#4A4A4A', '#151515']}
		start={{ x: 0, y: 0.5 }}
		end={{ x: 1, y: 1 }}
		style={styles.statusCard}
	>
		<Text style={FontSizeColorStyle['montserrat-600-12-primary-text']}>{label}</Text>
		<Text style={FontSizeColorStyle['montserrat-700-12-white']}>{val}</Text>
	</LinearGradient>
);

const LeagueDetails: React.FC<LeagueStackRouteType<'LeagueDetail'>> = ({ navigation, route }) => {
	const image = route?.params?.image;

	const name = route?.params?.name;

	const id = route?.params?.id;

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryFn: async () => getLeagueDetails({ leagueId: id }),
		queryKey: ['getJoinedLeagues', id],
		refetchOnMount: true,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true,
		// refetchOnMount: true,
	});

	const scrollRef = useAnimatedRef<Animated.ScrollView>();

	const scrollOffset = useScrollViewOffset(scrollRef);

	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[2, 1, 1]
					),
				},
			],
		};
	});

	const refreshStyle = useAnimatedStyle(
		() => ({
			height: withTiming(isFetching || isLoading ? windowHeight : 0, {
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			}),
			width: withTiming(isFetching || isLoading ? windowWidth : 0, {
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			}),
			// flex: 1,
			opacity: withTiming(isFetching || isLoading ? 1 : 0, {
				duration: 500,
				easing: Easing.linear,
			}),

			position: 'absolute',
			bottom: 0,
			zIndex: isFetching || isLoading ? 1 : 0,
			backgroundColor: 'rgba(0,0,0,0.4)',
			alignItems: 'center',
			justifyContent: 'center',
		}),
		[isFetching, isLoading]
	);

	const setTempStars = useStateStore((state) => state?.setTempStars);

	const timer = useCountdownTimer(new Date(data?.leagueStart));

	const onViewTeam = () => {
		setTempStars(data?.joinedTeam);
		navigation.navigate('League', {
			id: route?.params?.id,
			name: route?.params?.name,
			edit: true,
		});
	};

	return (
		<GestureHandlerRootView style={LayoutStyle.fill}>
			<StatusBar hidden animated />
			<FastImage source={IMAGES.blurRound} style={styles.image} />

			<BlurView
				style={[LayoutStyle.fill, styles.container]}
				tint="dark"
				experimentalBlurMethod={'dimezisBlurView'}
			>
				<Animated.ScrollView
					refreshControl={
						<RefreshControl onRefresh={async () => refetch()} refreshing={false} />
					}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					ref={scrollRef}
					scrollEventThrottle={16}
					contentContainerStyle={{ paddingBottom: 200, flexGrow: 1 }}
				>
					<Animated.View style={[styles.header, headerAnimatedStyle]}>
						<Animated.Image
							source={{
								uri:
									image ||
									'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFll7-nfrZANyJB0KjfQ-ekrBqDMIqENp7ZA&usqp=CAU',
							}}
							style={{ height: HEADER_HEIGHT }}
							sharedTransitionTag={id}
						/>
					</Animated.View>
					<View style={styles.content}>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'space-between',
								flexDirection: 'row',
							}}
						>
							<GradientText
								style={FontSizeColorStyle['lato-900-24-light-f7f7f7']}
								colors={['#00BCFD', '#007097']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
							>
								{name}
							</GradientText>
							{data?.isJoined === 1 ? (
								<Chip
									text={`Joined`}
									colors={['#052F3B', '#1e1e1e']}
									color="#f1f1f1"
								/>
							) : null}
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
								// backgroundColor: 'white',
								// height: 30,
								position: 'relative',
								overflow: 'hidden',
							}}
						>
							<Text style={FontSizeColorStyle['heebo-500-12-primary-text']}>
								Starting on :{' '}
								<Text style={FontSizeColorStyle['heebo-500-12-white']}>
									{new Date(data?.leagueStart).toDateString()}
								</Text>
							</Text>
						</View>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
								// backgroundColor: 'white',
								// height: 30,
								position: 'relative',
								overflow: 'hidden',
							}}
						>
							{data?.leagueStart ? (
								<Chip
									text={`${timer?.days} D : ${timer?.hours} H : ${timer?.minutes} M : ${timer?.seconds} S`}
									colors={['#125B6F', '#052F3B', '#00212A']}
									color="#ffffff"
								/>
							) : null}
							<RectButton
								onPress={() => {
									navigation.navigate('Participants', {
										id: route?.params?.id,
										name: route?.params?.name,
									});
								}}
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									gap: 5,
									paddingHorizontal: 5,
									transform: [{ scale: 0.8 }],
								}}
							>
								<AvatarGroup
									images={
										data?.users
											? data?.users?.map((item) => item?.user)
											: [
													'https://t3.ftcdn.net/jpg/02/57/27/20/360_F_257272034_PqpJ7rx0pqXHqB6RJ27w662p3FwY0r2G.jpg',
													'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOza36lSYO6bLPuiCEyN2qmG4MoMc_6TBew&usqp=CAU',
													'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsEWJ4QZwBu34arF-10mkTMXjl5p_S5QHEQ&usqp=CAU',
													'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsEWJ4QZwBu34arF-10mkTMXjl5p_S5QHEQ&usqp=CAU',
												]
									}
								/>
								<Text style={FontSizeColorStyle['heebo-500-20-white']}>
									+{data?.joinedUsers}
								</Text>
							</RectButton>
							{/* <Chip text="Ends in : 02d:12H:21M:45S" /> */}
						</View>

						<Text style={FontSizeColorStyle['heebo-500-15-light-b4b4b4']}>
							The Music of League of Legends was a collection of every song released
							officially by Riot Games Inc. through the means of music albums or
							direct internet viewing. Previously, every song was posted on
							LoLSoundcloud.com, but the official site for all of their albums can be
							found here. During PAX East 2015, Riot did a panel specifically for
							League music, including some orchestral and vocal performances. The
							Music of League of Legends was a collection of every song released
							officially by Riot Games Inc. through the means of music albums or
							direct internet viewing.
						</Text>
						<View
							style={{
								flexDirection: 'column',
								gap: 10,
								alignSelf: 'flex-end',
								marginTop: 30,
							}}
						>
							<StatusCard
								label="Start date"
								val={new Date(data?.leagueStart)?.toDateString()}
							/>
							<StatusCard
								label="End date"
								val={new Date(data?.leagueEnd)?.toDateString()}
							/>
							<StatusCard
								label="Rewards "
								val={`${data?.reward?.amount || 0} ${data?.reward?.currency}`}
							/>
							<StatusCard label="Total Credits" val={data?.creditPoints} />
						</View>
					</View>
				</Animated.ScrollView>
				<LinearGradient
					style={{
						position: 'absolute',
						bottom: 0,
						alignItems: 'center',
						padding: 20,
						height: 100,
						width: windowWidth,
					}}
					colors={[
						'transparent',
						'rgba(0,0,0,0.3)',
						'rgba(0,0,0,0.5)',
						'rgba(0,0,0,0.8)',
						'black',
					]}
				>
					<View />
				</LinearGradient>
				<Animated.View
					style={{
						position: 'absolute',
						bottom: 20,
						alignItems: 'center',
						paddingHorizontal: 20,
						width: '100%',
					}}
				>
					{data?.isJoined ? (
						<PrimaryButton
							label="View/Edit Teams"
							gradientType={'type3'}
							outlineStyle={{ width: '100%', zIndex: 1 }}
							style={{ justifyContent: 'space-between', zIndex: 1 }}
							size="md"
							endIcon={<Entypo name="chevron-right" size={24} color="white" />}
							onPress={onViewTeam}
						/>
					) : (
						<PrimaryButton
							label="Join This Legue "
							gradientType={'type2'}
							outlineStyle={{ width: '100%', zIndex: 1 }}
							onPress={() =>
								navigation.navigate('League', {
									id: route?.params?.id,
									name: route?.params?.name,
								})
							}
							endIcon={<Entypo name="chevron-right" size={24} color="white" />}
							style={{ justifyContent: 'space-between', zIndex: 1 }}
						/>
					)}
				</Animated.View>
			</BlurView>
			{isFetching || isLoading ? (
				<BlurView
					style={refreshStyle}
					entering={FadeIn.delay(500)}
					exiting={FadeOut.delay(500)}
					tint="dark"
					intensity={10}
				>
					<LottieView
						source={JSONS.refresh}
						autoPlay
						loop
						style={{ flex: 1, width: 320, height: 320 }}
						entering={FadeIn.delay(250)}
						exiting={FadeOut.delay(100)}
					/>
				</BlurView>
			) : null}
		</GestureHandlerRootView>
	);
};

export default LeagueDetails;

const styles = StyleSheet.create({
	container: {
		// borderRadius: responsive(30),
		gap: responsive(5),
		overflow: 'hidden',
		position: 'relative',
	},
	content: {
		gap: 20,
		paddingHorizontal: 30,
		paddingVertical: 20,
	},

	header: {
		height: HEADER_HEIGHT,
		overflow: 'hidden',
	},

	image: {
		height: responsive(400),
		position: 'absolute',
		right: 0,
		top: responsive(100),
		width: responsive(200),
	},
	statusCard: {
		alignItems: 'center',
		borderRadius: 4,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 10,
		width: '100%',
	},
});
