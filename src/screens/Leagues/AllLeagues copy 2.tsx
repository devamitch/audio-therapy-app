import { useCallback, useMemo } from 'react';
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';
// import { Image, RefreshControl, SectionList, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	FadeInDown,
	FadeOutDown,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import { Chip } from '@/components';
import AnimatedRefreshControl from '@/components/Base/AnimatedRefreshControl';
import GradientText from '@/components/Base/GradientText';
import { AvatarGroup } from '@/components/Dashboard/DashboardSingersCards';
import { getLeagues, LeagueType } from '@/lib/server/challange';
import { windowWidth } from '@/lib/utils';
import { LeagueStackNavigationType } from '@/navigation/main/LeagueStack';
import { FontSizeColorStyle, LayoutStyle } from '@/styles';

type ContestButtonProps = {
	onPress: (contest: LeagueType) => void;
	checked?: boolean;
	index: number;
	contest: LeagueType;
};

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

const ContestButton: React.FC<ContestButtonProps> = ({ onPress, checked, contest, index }) => {
	const isPressed = useSharedValue(false);

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
		};
	});

	return (
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
					style={{ height: 110, width: windowWidth - 40, flex: 1 }}
					resizeMode="cover"
					sharedTransitionTag={contest?._id}
				/>
				<View style={styles.headerContainer}>
					<View>
						<GradientText
							style={FontSizeColorStyle['montserrat-600-24-white']}
							colors={['#00BCFD', '#007097']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						>
							{contest?.title}
						</GradientText>
						<View style={[LayoutStyle.row, LayoutStyle.center]}>
							<GradientText
								style={FontSizeColorStyle['montserrat-500-xs-white']}
								colors={['#00BCFD', '#007097']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
							>
								Starting On :
							</GradientText>
							<Text style={FontSizeColorStyle['montserrat-500-sm-white']}>
								{contest?.leagueStart
									? ` ${new Date(contest?.leagueStart)?.toDateString() || ''}`
									: ''}
							</Text>
						</View>
					</View>
					<View style={{ alignItems: 'flex-end' }}>
						<View style={[LayoutStyle.row, LayoutStyle.center]}>
							<GradientText
								style={FontSizeColorStyle['montserrat-700-16-white']}
								colors={['#00BCFD', '#007097']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
							>
								Fee :
							</GradientText>
							<Text style={FontSizeColorStyle['montserrat-700-16-white']}>
								{` ${contest?.entryFee || 'Free'}`}
							</Text>
						</View>
						<View style={[LayoutStyle.row, LayoutStyle.center]}>
							<GradientText
								style={FontSizeColorStyle['montserrat-500-xs-white']}
								colors={['#00BCFD', '#007097']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
							>
								Ends On :
							</GradientText>
							<Text style={FontSizeColorStyle['montserrat-500-sm-white']}>
								{contest?.leagueEnd
									? ` ${new Date(contest?.leagueEnd)?.toDateString() || 'Free'}`
									: ''}
							</Text>
						</View>
					</View>
				</View>
				<LinearGradient
					colors={['#052F3B', '#1e1e1e']}
					style={{
						padding: 20,
						width: '100%',
						flexDirection: 'row',
						gap: 10,
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={[LayoutStyle.row, LayoutStyle.center, { gap: 8 }]}>
						<Image
							source={{
								uri: 'https://t3.ftcdn.net/jpg/06/23/56/90/360_F_623569090_sIwfbSjZkml1ff2i9gxyBb7IiCOdf9bV.jpg',
							}}
							style={{ width: 30, height: 30 }}
						/>
						<View>
							<Text style={FontSizeColorStyle['montserrat-400-sm-white']}>
								{`Reward`}
							</Text>
							<GradientText
								style={FontSizeColorStyle['montserrat-600-16-white']}
								colors={['#00BCFD', '#007097']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
							>
								{`${contest?.reward?.amount || 'Free'}`}
							</GradientText>
						</View>
					</View>
					<AvatarGroup
						images={[
							'https://t3.ftcdn.net/jpg/02/57/27/20/360_F_257272034_PqpJ7rx0pqXHqB6RJ27w662p3FwY0r2G.jpg',
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOza36lSYO6bLPuiCEyN2qmG4MoMc_6TBew&usqp=CAU',
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsEWJ4QZwBu34arF-10mkTMXjl5p_S5QHEQ&usqp=CAU',
						]}
					/>
				</LinearGradient>

				{contest?.leagueEnd ? (
					<View style={{ position: 'absolute', top: 0, right: 0 }}>
						<Chip
							colors={['#125B6F', '#052F3B', '#00212A']}
							text={new Date(contest?.leagueEnd)?.toDateString()}
							color="#ffffff"
						/>
					</View>
				) : null}
			</LinearGradient>
		</AnimatedRectButton>
	);
};

const EnterContest = ({ navigation }: { navigation: LeagueStackNavigationType }) => {
	const { data, isLoading, isFetching, refetch } = useQuery({
		queryFn: getLeagues,
		queryKey: ['getLeagues'],
		refetchOnMount: true,
	});

	const totalData = useMemo(() => {
		const free = data?.filter((item) => item?.entryFee === 0) || [];

		const paid = data?.filter((item) => item?.entryFee) || [];

		return [
			{ title: 'Paid Contests', data: paid },
			{ title: 'Free Contests', data: free },
		];
	}, [data]);

	const selectContest = useCallback(
		(contest: LeagueType) => {
			navigation.push('LeagueDetail', {
				id: contest?._id,
				name: contest?.title,
				image:
					contest?.banner ||
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_ZVwWBc-CF_4nhuHd16_COB8jgEIKSCfAw&usqp=CAU',
			});
		},
		[navigation]
	);

	const { top: paddingTop } = useSafeAreaInsets();

	console.log({ paddingTop });

	return (
		<GestureHandlerRootView style={LayoutStyle.fill}>
			<SectionList
				contentContainerStyle={styles.scrollLayoutContainer}
				sections={totalData}
				// endFillColor={'blue'}
				// onRefresh={async () => refetch()}
				// refreshing={isFetching}
				overScrollMode="never"
				showsVerticalScrollIndicator={false}
				keyExtractor={(_, index) => index?.toString()}
				refreshControl={
					<AnimatedRefreshControl
						loading={isFetching || isLoading}
						onRefresh={async () => refetch()}
					/>
				}
				// refreshControl={
				// 	<RefreshControl
				// 		refreshing={isFetching || isLoading}
				// 		onRefresh={async () => refetch()}
				// 		colors={['transparent']}
				// 		tintColor="transparent"
				// 		style={{ flex: 1, minHeight: 300 }}
				// 		progressViewOffset={-10}
				// 	>
				// 		{isFetching || isLoading ? (
				// 			<BlurView
				// 				style={{
				// 					flex: 1,
				// 					alignItems: 'center',
				// 					justifyContent: 'center',
				// 					minHeight: 300,
				// 				}}
				// 				tint="dark"
				// 			>
				// 				<RefreshIndicator />
				// 			</BlurView>
				// 		) : null}
				// 	</RefreshControl>
				// }
				renderItem={({ item, index }) => (
					<ContestButton
						onPress={() => selectContest(item)}
						contest={item}
						index={index}
					/>
				)}
				renderSectionHeader={({ section: { title } }) => (
					<BlurView tint="dark" style={{ padding: 20, paddingBottom: 30 }}>
						<Text style={FontSizeColorStyle['montserrat-700-15-white']}>{title}</Text>
					</BlurView>
				)}
			/>
		</GestureHandlerRootView>
	);
};

export default EnterContest;

const styles = StyleSheet.create({
	bottomSheetContainer: {
		backgroundColor: '#000000',
		borderColor: '#0A7593',
		borderLeftWidth: 0.75,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		borderTopWidth: 0.75,
		bottom: 0,
		elevation: 25,
		overflow: 'hidden',
		position: 'absolute',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.5,
		shadowRadius: 50,
		width: '100%',
	},
	bottomSheetInnerContainer: {
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		display: 'flex',
		overflow: 'hidden',
		width: '100%',
	},
	buttonInnerContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 5,
		justifyContent: 'space-between',
	},
	chipContainer: {
		borderRadius: 6,
		paddingHorizontal: 11,
		paddingVertical: 6,
	},
	contestButtonContainer: {
		backgroundColor: '#000000',
		borderColor: '#0A7593',
		borderLeftWidth: 0.75,
		borderRadius: 11,
		borderTopWidth: 0.75,
		elevation: 25,
		// overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.5,
		shadowRadius: 50,
		width: '100%',
		marginBottom: 5,
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

		gap: 10,
		paddingHorizontal: 20,
	},
	linearGradientContainer: {
		borderRadius: 8,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		display: 'flex',
		overflow: 'hidden',
		flex: 1,

		gap: 10,
	},
	rectButtonContainer: {
		borderRadius: 8,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		width: windowWidth - 40,
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
		shadowRadius: 2,
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	scrollLayoutContainer: {
		flex: 0,
		paddingHorizontal: 20,
		paddingTop: 0,
		gap: 20,
		paddingVertical: 100,
		// backgroundColor: '#00495E',
	},

	statsContainer: {
		borderBottomColor: '#00495E',
		borderBottomWidth: 1,
		flex: 1,
		gap: 10,
		paddingBottom: 10,
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
} as const);
