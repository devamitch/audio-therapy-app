import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
	RectButton,
} from 'react-native-gesture-handler';
// import { Image, RefreshControl, SectionList, StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, {
	Easing,
	Extrapolate,
	FadeIn,
	FadeOut,
	interpolate,
	runOnJS,
	SlideInDown,
	SlideOutDown,
	useAnimatedRef,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ButtonProps } from 'react-native-share/lib/typescript/src/components/Button';
import { FontAwesome5 } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import { Tab } from '../Contests/RecentContests';

import { Button, List } from '@/components';
import GradientText from '@/components/Base/GradientText';
import DasboardTab from '@/components/Dashboard/DasboardTab';
import { LeagueCard } from '@/components/League';
// import { LeagueType } from '@/lib/server/challange';
import { getAllLeagues, LegueResponse } from '@/lib/server/leagues';
import { windowWidth } from '@/lib/utils';
import { responsive2 } from '@/lib/utils/responsive';
import { LeagueStackNavigationType } from '@/navigation/main/LeagueStack';
import { Colors, FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const HEIGHT = 500;
export const OVERDRAG = 20;
type ContestButtonProps = {
	onPress: (contest: LegueResponse) => void;
	checked?: boolean;
	index: number;
	contest: LegueResponse;
};

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

const IconButton: React.FC<ButtonProps> = ({
	children,
	gradientStyle,
	btnStyle,
	colors = ['rgba(21, 113, 139, 0.20)', 'rgba(65, 169, 199, 0.20)'],
	...props
}) => {
	const isPressed = useSharedValue(false);

	const animatedStyle = useAnimatedStyle(() => {
		const scale = withSpring(isPressed.value ? 0.9 : 1, { stiffness: 100 });

		const opacity = withTiming(isPressed.value ? 0.8 : 1, {
			duration: 150,
			easing: Easing.linear,
		});

		const rotate = withTiming(isPressed.value ? '180deg' : '0deg', {
			duration: 400,
			easing: Easing.linear,
		});

		return {
			transform: [{ scale }],
			opacity,
			borderRadius: 10,
			overflow: 'hidden',
		};
	});

	return (
		<AnimatedRectButton
			style={[animatedStyle, btnStyle]}
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
			onLongPress={() => {
				isPressed.value = false;
			}}
			{...props}
		>
			<BlurView tint="dark" experimentalBlurMethod={'dimezisBlurView'}>
				<LinearGradient colors={colors} style={{ padding: 8, borderRadius: 30 }}>
					{children}
				</LinearGradient>
			</BlurView>
		</AnimatedRectButton>
	);
};

const TAB_WIDTH = responsive2(90);

const TAB_HEADINGS = ['FREE', 'PAID'] as const;

const AllLeagues = ({ navigation }: { navigation: LeagueStackNavigationType }) => {
	const [status, setStatus] = useState<0 | 1 | 2 | 3 | 4>();

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryFn: async () => getAllLeagues({ status }),
		queryKey: ['getLeagues', status],
		refetchOnMount: true,
	});

	const [activeTab, setActiveTab] = useState<number>(0);

	const offset = useSharedValue(0);

	const [openFilter, setOpenFilter] = useState<boolean>();

	const viewPager = useAnimatedRef<PagerView>();

	const scrollPosition = useSharedValue(0);

	const toggleSheet = () => {
		setOpenFilter((prev) => !prev);
		offset.value = 0;
	};

	const pan = Gesture.Pan()
		.onChange((event) => {
			const offsetDelta = event.changeY + offset.value;

			const clamp = Math.max(-OVERDRAG, offsetDelta);

			offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
		})
		.onFinalize(() => {
			if (offset.value < HEIGHT / 3) {
				offset.value = withSpring(0);
			} else {
				offset.value = withTiming(HEIGHT, {}, () => {
					runOnJS(toggleSheet)();
				});
			}
		});

	const translateY = useAnimatedStyle(() => ({
		transform: [{ translateY: offset.value }],
	}));

	const onPageSelected = (event: { nativeEvent: { position: number } }) => {
		setActiveTab(event.nativeEvent.position);
	};

	const onToggleTabs = (tabIndex: number) => {
		viewPager.current?.setPage(tabIndex);
		setActiveTab(tabIndex);
	};

	const totalData = useMemo(() => {
		const free = data?.filter((item) => item?.entryFee === 0) || [];

		const paid = data?.filter((item) => item?.entryFee) || [];

		// return [
		// 	{ title: 'Paid Contests', data: paid },
		// 	{ title: 'Free Contests', data: free },
		// ];
		return { free, paid };
	}, [data]);

	useEffect(() => {
		// Use `setOptions` to update the button that we previously specified
		// Now the button includes an `onPress` handler to update the count
		navigation.setOptions({
			headerTitle: (props) => (
				<GradientText
					style={[
						FontSizeColorStyle['montserrat-700-24-primary-text'],
						{ textTransform: 'capitalize' },
					]}
					numberOfLines={1}
				>
					{TAB_HEADINGS[activeTab]} League
				</GradientText>
			),
			headerLargeTitle: false,
			headerBackVisible: false,

			headerBackTitleVisible: false,
			// headerLeft: (props) =>
			// 	props?.canGoBack ? (
			// 		<RectButton
			// 			style={{
			// 				flexDirection: 'row',
			// 				gap: responsive(3),
			// 				alignItems: 'center',
			// 			}}
			// 			onPress={() => navigation?.goBack()}
			// 		>
			// 			<GradientIcon name="chevron-back" size={responsive(30)} />
			// 		</RectButton>
			// 	) : null,
		});
	}, [navigation, activeTab]);

	const selectContest = useCallback(
		(contest: LegueResponse) => {
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

	const indicatorStyle = useAnimatedStyle(() => {
		const translateX = withTiming(
			interpolate(
				scrollPosition.value,
				TAB_HEADINGS.map((_, index) => index),
				TAB_HEADINGS.map((_, index) => index * responsive2(TAB_WIDTH)),
				Extrapolate.CLAMP
			),
			{
				duration: 200,
				easing: Easing.linear,
			}
		);

		return {
			transform: [{ translateX }],
		};
	});

	return (
		<GestureHandlerRootView style={[LayoutStyle.fill, { gap: 5, paddingTop: 20 }]}>
			<View style={styles.tabContainer}>
				<View style={styles.tabWrapper}>
					{TAB_HEADINGS.map((tab, index) => (
						<Tab
							key={index?.toString()}
							index={index}
							scrollPosition={scrollPosition}
							// count={index === 0 ? data?.winnersCount || 0 : data?.participantsCount || 0}
							tab={tab}
							onToggleTabs={onToggleTabs}
						/>
					))}
					<Animated.View style={[styles.tabIndiCator, indicatorStyle]} />
				</View>
				<IconButton
					onPress={() => {
						setOpenFilter(true);
					}}
				>
					<FontAwesome5 name="filter" size={responsive(10)} color="white" />
				</IconButton>
			</View>

			<PagerView
				style={styles.viewPager}
				onPageSelected={onPageSelected}
				initialPage={0}
				ref={viewPager}
				onPageScroll={({ nativeEvent }) => {
					const pos = nativeEvent.position + nativeEvent.offset;

					scrollPosition.value = pos;
				}}
			>
				<List
					data={totalData?.free}
					renderItem={({ item, index }) => (
						<LeagueCard
							onPress={() => selectContest(item)}
							contest={item}
							index={index}
						/>
					)}
					keyExtractor={(item, index) => `${index}`}
					contentContainerStyle={styles.container}
					refreshing={isLoading || isFetching}
					refetch={refetch}
					ListFooterComponent={(totalData?.free || [])?.length > 20 ? undefined : null}
				/>
				<List
					data={totalData.paid}
					renderItem={({ item, index }) => (
						<LeagueCard
							onPress={() => selectContest(item)}
							contest={item}
							index={index}
						/>
					)}
					keyExtractor={(item, index) => `${index}`}
					contentContainerStyle={styles.container}
					refreshing={isLoading || isFetching}
					refetch={refetch}
					ListFooterComponent={(totalData?.paid || [])?.length > 20 ? undefined : null}
				/>
			</PagerView>
			<DasboardTab mode="league" />
			{openFilter ? (
				<>
					<AnimatedPressable
						style={styles.backdrop}
						entering={FadeIn}
						exiting={FadeOut}
						onPress={toggleSheet}
					>
						<BlurView style={{ flex: 1 }} tint="dark" />
					</AnimatedPressable>
					<GestureDetector gesture={pan}>
						<Animated.View
							style={[styles.sheet, translateY]}
							entering={SlideInDown.springify().damping(15)}
							exiting={SlideOutDown}
						>
							<BlurView
								style={styles.sheetContent}
								tint="dark"
								experimentalBlurMethod={'dimezisBlurView'}
							>
								<Button
									style={styles.checkboxContainer}
									onPress={() => setStatus(0)}
								>
									<CheckBox
										value={status === 0}
										onValueChange={() => setStatus(0)}
										tintColor="#125B6F"
										onFillColor="#00212A"
										onTintColor="#0A7593"
										// hideBox
										tintColors={{ true: '#125B6F', false: '#00212A' }}
										onCheckColor="#0A7593"
										lineWidth={2}
										hideBox={true}
										boxType={'circle'}
										animationDuration={0.5}
										disabled={false}
										onAnimationType={'bounce'}
										offAnimationType={'stroke'}
									/>
									<Animated.Text
										style={FontSizeColorStyle['montserrat-500-12-white']}
									>
										Upcoming
									</Animated.Text>
								</Button>
								<Button
									style={styles.checkboxContainer}
									onPress={() => setStatus(1)}
								>
									<CheckBox
										value={status === 1}
										onValueChange={() => setStatus(1)}
										tintColor="#125B6F"
										onFillColor="#00212A"
										onTintColor="#0A7593"
										// hideBox
										tintColors={{ true: '#125B6F', false: '#00212A' }}
										onCheckColor="#0A7593"
										lineWidth={2}
										hideBox={false}
										boxType={'circle'}
										animationDuration={0.5}
										disabled={false}
										onAnimationType={'bounce'}
										offAnimationType={'stroke'}
									/>
									<Animated.Text
										style={FontSizeColorStyle['montserrat-500-12-white']}
									>
										Live
									</Animated.Text>
								</Button>
								<Button
									style={styles.checkboxContainer}
									onPress={() => setStatus(2)}
								>
									<CheckBox
										value={status === 2}
										onValueChange={() => setStatus(2)}
										tintColor="#125B6F"
										onFillColor="#00212A"
										onTintColor="#0A7593"
										// hideBox
										tintColors={{ true: '#125B6F', false: '#00212A' }}
										onCheckColor="#0A7593"
										lineWidth={2}
										hideBox={false}
										boxType={'circle'}
										animationDuration={0.5}
										disabled={false}
										onAnimationType={'bounce'}
										offAnimationType={'stroke'}
									/>
									<Animated.Text
										style={FontSizeColorStyle['montserrat-500-12-white']}
									>
										Completed
									</Animated.Text>
								</Button>
								<Button
									style={styles.checkboxContainer}
									onPress={() => setStatus(3)}
								>
									<CheckBox
										value={status === 3}
										onValueChange={() => setStatus(3)}
										tintColor="#125B6F"
										onFillColor="#00212A"
										onTintColor="#0A7593"
										// hideBox
										tintColors={{ true: '#125B6F', false: '#00212A' }}
										onCheckColor="#0A7593"
										lineWidth={2}
										hideBox={false}
										boxType={'circle'}
										animationDuration={0.5}
										disabled={false}
										onAnimationType={'bounce'}
										offAnimationType={'stroke'}
									/>
									<Animated.Text
										style={FontSizeColorStyle['montserrat-500-12-white']}
									>
										Declared
									</Animated.Text>
								</Button>
								<Button
									style={styles.checkboxContainer}
									onPress={() => setStatus(undefined)}
								>
									<Animated.Text
										style={FontSizeColorStyle['montserrat-500-12-white']}
									>
										Clear
									</Animated.Text>
								</Button>
							</BlurView>
						</Animated.View>
					</GestureDetector>
				</>
			) : null}
		</GestureHandlerRootView>
	);
};

export default AllLeagues;

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
	tabWrapper: {
		flexDirection: 'row',
		// marginLeft: responsive(20),
		position: 'relative',
		// justifyContent: 'space-between',
	},
	tabContainer: {
		flexDirection: 'row',
		paddingHorizontal: responsive(20),
		position: 'relative',
		justifyContent: 'space-between',
		alignItems: 'center',
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
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.2)',
		zIndex: 1,
	},
	sheet: {
		height: HEIGHT,
		width: '100%',
		position: 'absolute',
		bottom: -OVERDRAG * 1.1,
		borderTopRightRadius: 20,
		borderRadius: 20,
		borderTopLeftRadius: 20,
		zIndex: 1,
		overflow: 'hidden',
		shadowColor: '#338197',
		backgroundColor: 'rgba(0,0,0,0.8)',
		elevation: 1,
		shadowOffset: {
			width: -1,
			height: 0,
		},
		shadowOpacity: 0.3,
		shadowRadius: 2,
		borderColor: '#338197',
		borderWidth: 1,
	},
	sheetContent: {
		padding: 16,
		gap: 5,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		flex: 1,
	},
	checkboxContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: responsive(10),
		marginBottom: responsive(16),
		paddingHorizontal: responsive(10),
	},
} as const);
