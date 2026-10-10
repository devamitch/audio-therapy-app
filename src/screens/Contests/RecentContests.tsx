/* eslint-disable no-warning-comments */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import Animated, {
	Easing,
	Extrapolate,
	interpolate,
	interpolateColor,
	SharedValue,
	useAnimatedRef,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Fontisto } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';

import { IMAGES } from '@/assets';
import { Button, List } from '@/components';
import { GradientIcon, GradientIconFontisto } from '@/components/Base/GradientText';
import { ContestButton } from '@/components/Contest';
import DasboardTab from '@/components/Dashboard/DasboardTab';
import { getChallanges } from '@/lib/server/challange';
import { responsive2 } from '@/lib/utils/responsive';
import { MainStackRouteType } from '@/navigation/main/MainStack';
import { Colors, FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const TAB_HEADINGS = ['Upcoming', 'Live', 'Completed', 'Declared'] as const;

const TAB_WIDTH = responsive2(90);

export const Tab = ({
	index,
	scrollPosition,
	tab,
	onToggleTabs,
	count,
}: {
	index: number;
	scrollPosition: SharedValue<number>;
	tab?: string;
	count?: number;
	onToggleTabs: (tabIndex: number) => void;
}) => {
	const animatedStyle = useAnimatedStyle(() => {
		const color = interpolateColor(
			scrollPosition.value,
			[index - 1, index, index + 1],

			['#f7f7f7', '#00BCFD', '#f7f7f7']
		);

		return {
			color,
		};
	});

	return (
		<Button key={index} onPress={() => onToggleTabs(index)} style={styles.tab} size="sm">
			<Animated.Text
				style={[FontSizeColorStyle[`montserrat-600-sm-light-c4c4c4`], animatedStyle]}
				numberOfLines={1}
			>
				{tab}
			</Animated.Text>
			{count ? (
				<Animated.Text
					style={[FontSizeColorStyle[`montserrat-900-sm-light-c4c4c4`], animatedStyle]}
					numberOfLines={1}
				>
					{count}
				</Animated.Text>
			) : null}
		</Button>
	);
};

const RecentContest = ({ navigation }: MainStackRouteType<'AllContests'>) => {
	const [activeTab, setActiveTab] = useState<number>(0);

	const route = useRoute();

	const viewPager = useAnimatedRef<PagerView>();

	const scrollPosition = useSharedValue(0);

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
				easing: Easing.bounce,
			}
		);

		return {
			transform: [{ translateX }],
		};
	});

	const onPageSelected = (event: { nativeEvent: { position: number } }) => {
		setActiveTab(event.nativeEvent.position);
	};

	const onToggleTabs = (tabIndex: number) => {
		viewPager.current?.setPage(tabIndex);
		setActiveTab(tabIndex);
	};

	const {
		data = [],
		isLoading,
		isFetching,
		refetch,
	} = useQuery({
		queryFn: async () => getChallanges({ status: activeTab as 0 | 1 | 2 | 3 }),
		queryKey: ['recentContests', activeTab],
	});

	const stickyHeaderIndices = useMemo(() => {
		if (isLoading || isFetching) {
			return undefined;
		}
		if (data?.length === 0) {
			return undefined;
		}
		if (activeTab !== 3) {
			return undefined;
		}

		return data?.reduce((indexes, chalange, index) => {
			if (chalange?.status === 3 && chalange?.totalVotes && chalange?.totalVotes > 0) {
				indexes.push(index);
			}

			return indexes;
		}, [] as number[]);
	}, [activeTab, data, isFetching, isLoading]);

	// console.log({ data });

	const onPress = useCallback(
		(id: string) => {
			const findata = data?.find((item) => item?._id === id);

			const tag = `${findata?.artist1Detail?.artist?.name?.split(' ')?.[0]}  vs ${findata?.artist2Detail?.artist?.name?.split(' ')?.[0]}`;

			if (activeTab !== 3) {
				navigation.navigate('ChalangeDetails', {
					challangeId: id,
					status: activeTab as 0 | 1 | 2 | 3,
					tag,
				});

				return;
			}

			if (!findata) {
				navigation.navigate('ChalangeDetails', {
					challangeId: id,
					status: activeTab as 0 | 1 | 2 | 3,
					tag,
				});

				return;
			}
			if (
				findata?.totalVotes &&
				findata?.totalVotes > 0 &&
				findata?.bidAmount &&
				findata?.bidAmount > 0
			) {
				navigation.navigate('Winners', { id, status: activeTab as 0 | 1 | 2 | 3 });

				return;
			}
			navigation.navigate('ChalangeDetails', {
				challangeId: id,
				status: activeTab as 0 | 1 | 2 | 3,
				tag,
			});
		},
		[activeTab, data, navigation]
	);

	const onArtistPress = useCallback(
		(id: string, image: string, name: string) => {
			navigation.navigate('Player', {
				id,
				image,
				name,
			});
		},
		[navigation]
	);

	useEffect(() => {
		// Use `setOptions` to update the button that we previously specified
		// Now the button includes an `onPress` handler to update the count

		navigation.setOptions({
			headerRight: (props) => (
				<View style={{ alignItems: 'center', gap: 4, flexDirection: 'row' }}>
					<BorderlessButton
						style={{
							flexDirection: 'row',
							gap: responsive(3),
							alignItems: 'center',
						}}
						onPress={() => navigation.navigate('WorldCupPreview')}
					>
						<GradientIcon>
							<Fontisto name="world" size={responsive(26)} color="black" />
						</GradientIcon>
					</BorderlessButton>
					<BorderlessButton
						style={{
							flexDirection: 'row',
							gap: responsive(3),
							alignItems: 'center',
						}}
						onPress={() => navigation.navigate('LiveContests')}
					>
						<GradientIconFontisto name="hours-24" size={responsive(30)} />
					</BorderlessButton>
				</View>
			),
		});
	}, [route.name, navigation]);

	return (
		<View style={[LayoutStyle.fill, styles.main]}>
			<FastImage source={IMAGES.blurRound} style={styles.image} />
			<BlurView style={[LayoutStyle.fill, styles.container]} tint="dark">
				<View style={styles.tabWrapper}>
					{TAB_HEADINGS.map((tab, index) => (
						<Tab
							key={index?.toString()}
							index={index}
							scrollPosition={scrollPosition}
							tab={tab}
							onToggleTabs={onToggleTabs}
						/>
					))}
					<Animated.View style={[styles.tabIndiCator, indicatorStyle]} />
				</View>
				<PagerView
					style={LayoutStyle.fill}
					onPageSelected={onPageSelected}
					initialPage={0}
					ref={viewPager}
					onPageScroll={({ nativeEvent }) => {
						const pos = nativeEvent.position + nativeEvent.offset;

						scrollPosition.value = pos;
					}}
				>
					<List
						ListFooterComponent={null}
						data={data}
						refreshing={isLoading || isFetching}
						refetch={refetch}
						keyExtractor={(item, index) => item._id || index?.toString()}
						renderItem={({ item }) => (
							<ContestButton
								onPress={onPress}
								onArtistPress={onArtistPress}
								{...item}
							/>
						)}
						contentContainerStyle={styles.listContainer}
						style={LayoutStyle.fill}
						// stickyHeaderIndices={stickyHeaderIndices}
					/>
					<List
						ListFooterComponent={null}
						data={data}
						refreshing={isLoading || isFetching}
						refetch={refetch}
						keyExtractor={(item, index) => item._id || index?.toString()}
						renderItem={({ item }) => (
							<ContestButton
								onPress={onPress}
								onArtistPress={onArtistPress}
								{...item}
							/>
						)}
						contentContainerStyle={styles.listContainer}
						style={LayoutStyle.fill}
						// stickyHeaderIndices={stickyHeaderIndices}
					/>
					<List
						ListFooterComponent={null}
						data={data}
						refreshing={isLoading || isFetching}
						refetch={refetch}
						// stickyHeaderIndices={stickyHeaderIndices}
						keyExtractor={(item, index) => item._id || index?.toString()}
						renderItem={({ item }) => (
							<ContestButton
								onPress={onPress}
								onArtistPress={onArtistPress}
								{...item}
							/>
						)}
						contentContainerStyle={styles.listContainer}
						style={LayoutStyle.fill}
					/>
					<List
						ListFooterComponent={null}
						data={data}
						refreshing={isLoading || isFetching}
						refetch={refetch}
						// stickyHeaderIndices={stickyHeaderIndices}
						keyExtractor={(item, index) => item._id || index?.toString()}
						renderItem={({ item }) => (
							<ContestButton
								onPress={onPress}
								onArtistPress={onArtistPress}
								{...item}
							/>
						)}
						contentContainerStyle={styles.listContainer}
						style={LayoutStyle.fill}
					/>
				</PagerView>
			</BlurView>
			<DasboardTab mode="contest" />
		</View>
	);
};

export default RecentContest;

const styles = StyleSheet.create({
	container: {
		paddingTop: responsive(40),
		gap: responsive(5),
		position: 'relative',
		overflow: 'hidden',
		borderRadius: responsive(30),
	},
	main: {
		position: 'relative',

		borderBottomLeftRadius: 0,
		overflow: 'hidden',

		elevation: responsive(25),
		shadowRadius: responsive(50),
		shadowColor: '#000',
		shadowOffset: {
			width: responsive(0),
			height: responsive(4),
		},
	},
	statusContainer: { flexDirection: 'row', paddingHorizontal: responsive(20) },
	sectionTitle: { padding: responsive(10) },
	listContainer: {
		gap: responsive(20),
		paddingHorizontal: responsive(20),
	},
	image: {
		position: 'absolute',
		right: 0,
		top: responsive(100),
		height: responsive(400),
		width: responsive(200),
	},

	tab: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: responsive(2),
		gap: responsive(5),
		paddingVertical: responsive(10),
		paddingBottom: responsive(10),
		width: TAB_WIDTH,
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
	tabWrapper: {
		flexDirection: 'row',
		position: 'relative',
		marginLeft: responsive(20),
	},
} as const);
