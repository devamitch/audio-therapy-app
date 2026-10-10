import { useCallback, useMemo, useState } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Svg, { Circle, Defs, G, Path, SvgProps } from 'react-native-svg';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { shallow } from 'zustand/shallow';

import { useAppStore } from '@/core/store';
import { getLeagues, LeagueType } from '@/lib/server/challange';
import { LeagueStackNavigationType } from '@/navigation/main/LeagueStack';
import { FontSizeColorStyle, LayoutStyle } from '@/styles';

type Contest = LeagueType;

type ContestButtonProps = {
	onPress: (contest: Contest) => void;
	checked?: boolean;
	contest: Contest;
};

// const ReanimatedBlur = Animated.createAnimatedComponent(BlurView);

const Chip: React.FC<{ text?: string }> = ({ text }) => (
	<LinearGradient
		colors={['#00D1FF', '#006582']}
		style={styles.chipContainer}
		start={[0, 0.5]}
		end={[0.5, 1]}
	>
		<Text style={FontSizeColorStyle['montserrat-600-sm-black']}>{text}</Text>
	</LinearGradient>
);

const CheckCircle = ({ checked, ...props }: SvgProps & { checked?: boolean }) =>
	!checked ? (
		<Svg width={34} height={34} viewBox="0 0 34 34" fill="none" {...props}>
			<G filter="url(#filter0_i_412_752)">
				<Circle cx={17} cy={17} r={17} fill="#1E3A42" />
			</G>
			<Defs />
		</Svg>
	) : (
		<Svg width={34} height={34} viewBox="0 0 34 34" fill="none" {...props}>
			<G filter="url(#filter0_i_0_1)">
				<Circle cx={17} cy={17} r={17} fill="#00A6D6" />
			</G>
			<Path
				d="M25.45 11.436a1.68 1.68 0 00-2.373.114L12.83 22.834l-4.95-5.033a1.678 1.678 0 00-2.376-.02 1.678 1.678 0 00-.02 2.376l6.197 6.3a1.678 1.678 0 002.441-.047l11.443-12.6a1.68 1.68 0 00-.114-2.374z"
				fill="#002E3C"
			/>
			<Defs />
		</Svg>
	);

const ContestButton: React.FC<ContestButtonProps> = ({ onPress, checked, contest }) => (
	<TouchableOpacity activeOpacity={0.7}>
		<View style={styles.contestButtonContainer}>
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
				<RectButton
					style={styles.rectButtonContainer}
					underlayColor={contest?.entryFee ? '#00495E' : '#00BCFD'}
					rippleColor={contest?.entryFee ? '#00495E' : '#00BCFD'}
					onPress={() => onPress(contest)}
				>
					<View style={styles.buttonInnerContainer}>
						<View style={styles.textContainer}>
							<View style={styles.headerContainer}>
								<Text style={FontSizeColorStyle['montserrat-500-20-white']}>
									{contest?.title}
								</Text>
								{contest?.entryFee ? (
									<Chip text={contest.entryFee?.toString()} />
								) : null}
							</View>
							<Text style={FontSizeColorStyle['montserrat-500-12-primary']}>
								{`${contest?.creditPoints} Cr and `}
								{`${contest?.reward?.amount} ${contest?.reward?.currency}`}
							</Text>
						</View>
					</View>
					<CheckCircle checked={checked} />
				</RectButton>
			</LinearGradient>
		</View>
	</TouchableOpacity>
);

// const BottomSheet: React.FC<{
// 	translateY: SharedValue<number>;
// 	navigation: any;
// 	contests: Contest[];
// 	onMutate?: RectButtonProps['onPress'];
// }> = ({ translateY, navigation, contests, onMutate }) => {
// 	const gestureHandler = useAnimatedGestureHandler<
// 		PanGestureHandlerGestureEvent,
// 		{ startY: number }
// 	>({
// 		onStart: (_, ctx) => {
// 			ctx.startY = translateY.value;
// 		},
// 		onActive: (event, ctx) => {
// 			translateY.value = ctx.startY + event.translationY;
// 		},
// 		onEnd: (event) => {
// 			if (event.velocityY > 2) {
// 				const dist = withSpring(340, {
// 					velocity: event.velocityY,
// 				});

// 				translateY.value = withTiming(340, {
// 					duration: 400,
// 					easing: Easing.inOut(Easing.ease),
// 				});
// 				//  withSpring(320, { velocity: event.velocityY });

// 				return;
// 			}
// 			if (event.velocityY < -1) {
// 				translateY.value = withSpring(0, { velocity: event.velocityY });

// 				return;
// 			}
// 		},
// 	});

// 	const animatedStyle = useAnimatedStyle(() => ({
// 		transform: [{ translateY: translateY.value < -1 ? 0 : translateY.value }],
// 	}));

// 	const animatedStyle2 = useAnimatedStyle(() => ({
// 		flex: 1,
// 		padding: 42,
// 		gap: 10,
// 		paddingBottom: withSpring(translateY.value * -1 > 46 ? translateY.value * -1 : 46),
// 	}));

// 	const animatedStyle3 = useAnimatedStyle(() => ({
// 		// position: 'absolute',
// 		position: translateY.value === 0 ? 'absolute' : 'relative',
// 		...(translateY.value === 0 ? { top: 0, bottom: 0, left: 0, right: 0 } : {}),
// 	}));

// 	return (
// 		<PanGestureHandler onGestureEvent={gestureHandler}>
// 			<Animated.View style={[styles.bottomSheetContainer, animatedStyle]}>
// 				<LinearGradient
// 					colors={['rgba(225, 225, 225, 0.10)', 'rgba(34, 34, 34, 0.20)', 'black']}
// 					style={styles.bottomSheetInnerContainer}
// 				>
// 					<Animated.View style={animatedStyle2}>
// 						<View style={styles.statsContainer}>
// 							{contests?.map((item, index) => (
// 								<View style={styles.rowContainer} key={index?.toString()}>
// 									<Text style={FontSizeColorStyle['montserrat-500-16-white']}>
// 										{item?.title}
// 									</Text>
// 									<Text style={FontSizeColorStyle['montserrat-500-16-primary']}>
// 										{item?.entryFee}
// 									</Text>
// 								</View>
// 							))}
// 						</View>
// 						<View style={styles.totalContainer}>
// 							<Text style={FontSizeColorStyle['montserrat-800-16-white']}>Total</Text>
// 							<Text style={FontSizeColorStyle['montserrat-800-16-primary']}>
// 								{contests?.reduce((accumulator, currentValue) => {
// 									return (
// 										Number(accumulator || 0) +
// 										Number(currentValue?.entryFee || 0)
// 									);
// 								}, 0)}
// 							</Text>
// 						</View>
// 						<PrimaryButton gradientType="type2" label={'Proceed'} onPress={onMutate} />
// 					</Animated.View>
// 				</LinearGradient>
// 			</Animated.View>
// 		</PanGestureHandler>
// 	);
// };

const EnterContest = ({ navigation }: { navigation: LeagueStackNavigationType }) => {
	// const translateY = useSharedValue(300);

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryFn: getLeagues,
		queryKey: ['getLeagues'],
	});

	const totalData = useMemo(() => {
		const free = data?.filter((item) => item?.entryFee === 0) || [];

		const paid = data?.filter((item) => item?.entryFee) || [];

		return [
			{ title: 'Free Contests', data: free },
			{ title: 'Paid Contests', data: paid },
		];
		// return { free, paid };
	}, [data]);

	const [league, setLeague] = useState<Contest[]>([]);

	// const openBottomSheet = () => {
	// 	translateY.value = withTiming(0, { duration: 400, easing: Easing.inOut(Easing.ease) });
	// };

	const user = useAppStore((state) => state.user?._id, shallow);

	// const team = useStateStore(
	// 	useCallback(
	// 		(state) =>
	// 			Object.entries(state?.tempSelectedStars || {})
	// 				?.map(([_, item]) => item)
	// 				?.flat()
	// 				?.filter((item) => item?._id)
	// 				?.map((item) => item?._id),
	// 		[]
	// 	),
	// 	shallow
	// );

	// const seletedLeagues = useMemo(() => league?.map((item) => item?._id), [league]);

	// const { mutate } = useMutation({
	// 	mutationKey: [user, seletedLeagues],
	// 	mutationFn: createTeam,
	// 	onError: (error) => {
	// 		handleError(error);
	// 	},
	// 	onSuccess(data) {
	// 		toast.success('Successful enter contest');

	// 		navigation.replace('JoinedLeagues');
	// 	},
	// });

	// const onMutate = useCallback(() => {
	// 	mutate({ leagues: seletedLeagues, team, user });
	// }, [mutate, seletedLeagues, team, user]);

	const selectContest = useCallback(
		(contest: Contest) => {
			navigation.push('LeagueDetail');
		},
		[navigation]
	);

	return (
		<View style={LayoutStyle.fill}>
			<SectionList
				contentContainerStyle={styles.scrollLayoutContainer}
				sections={totalData}
				overScrollMode="never"
				showsVerticalScrollIndicator={false}
				keyExtractor={(_, index) => index?.toString()}
				renderItem={({ item }) => (
					<ContestButton
						onPress={() => selectContest(item)}
						checked={league?.findIndex((p) => p?._id === item?._id) !== -1}
						contest={item}
					/>
				)}
				renderSectionHeader={({ section: { title } }) => (
					<Text
						style={[FontSizeColorStyle['montserrat-500-15-white'], styles.sectionTitle]}
					>
						{title}
					</Text>
				)}
			/>
		</View>
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
		overflow: 'hidden',
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
		alignItems: 'center',
		flexDirection: 'row',
		gap: 3,
	},
	linearGradientContainer: {
		borderRadius: 12,
		display: 'flex',
		overflow: 'hidden',
		width: '100%',
	},
	rectButtonContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 28,
		paddingVertical: 20,
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	scrollLayoutContainer: {
		flex: 0,
		paddingHorizontal: 20,
		paddingTop: 40,
		paddingVertical: 100,
	},
	sectionTitle: {
		marginBottom: 10,
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
