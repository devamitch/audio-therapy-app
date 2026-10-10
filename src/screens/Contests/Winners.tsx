import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import Animated, {
	Easing,
	Extrapolate,
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';

import { Tab } from './RecentContests';

import { Button, Chip, List } from '@/components';
import GradientText, { GradientIcon } from '@/components/Base/GradientText';
import { useAppStore } from '@/core/store';
import {
	ChalangesResponse,
	getChallangeParticipants,
	ParticipantUser,
} from '@/lib/server/challange';
import { responsive2 } from '@/lib/utils/responsive';
import { PROFILE_NAV_PROPS_TYPES } from '@/navigation/types';
import { Colors, FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const TAB_HEADINGS = ['Winners', 'Participants'] as const;

const TAB_WIDTH = responsive2(90);

const WinnerCard: React.FC<ParticipantUser> = ({ name, winAmount, icon }) => {
	return (
		<RectButton>
			<BlurView style={styles.card} tint="dark" intensity={90}>
				<View style={styles.imageContainer}>
					<Image source={{ uri: icon }} style={styles.image} />
				</View>
				<View style={styles.textContainer}>
					<Text style={FontSizeColorStyle['heebo-500-15-light-b4b4b4']}>{name}</Text>
					<View style={styles.header}>
						<Chip text={`${winAmount || 0} Music-X`} />
					</View>
				</View>
			</BlurView>
		</RectButton>
	);
};

const Winners = ({ route, navigation }: PROFILE_NAV_PROPS_TYPES<'Winners'>) => {
	const challangeId = route.params?.id;

	const status = route.params?.status;

	const queryClient = useQueryClient();

	const pastdata = queryClient
		.getQueryData<ChalangesResponse[]>(['recentContests', status])
		?.find((d) => d._id === challangeId);

	console.log({ pastdata });
	const [activeTab, setActiveTab] = useState<number>(0);

	const userData = useAppStore((state) => state?.user);

	const viewPager = useAnimatedRef<PagerView>();

	const scrollPosition = useSharedValue(0);

	const onPageSelected = (event: { nativeEvent: { position: number } }) => {
		setActiveTab(event.nativeEvent.position);
	};

	const onToggleTabs = (tabIndex: number) => {
		viewPager.current?.setPage(tabIndex);
		setActiveTab(tabIndex);
	};

	useEffect(() => {
		// Use `setOptions` to update the button that we previously specified
		// Now the button includes an `onPress` handler to update the count
		if (pastdata?.artist1Detail?.artist?.name && pastdata?.artist2Detail?.artist?.name) {
			navigation.setOptions({
				headerTitle: (props) => (
					<GradientText
						style={[
							FontSizeColorStyle['montserrat-700-18-primary-text'],
							{ fontFamily: 'Moonwalk' },
						]}
						numberOfLines={1}
					>
						{`${pastdata?.artist1Detail?.artist?.name?.split(' ')?.[0]} Vs ${pastdata?.artist2Detail?.artist?.name?.split(' ')?.[0]}`}
					</GradientText>
				),
				headerLeft: (props) =>
					props?.canGoBack ? (
						<RectButton
							style={{
								flexDirection: 'row',
								gap: responsive(3),
								alignItems: 'center',
							}}
							onPress={() => navigation?.goBack()}
						>
							<GradientIcon name="chevron-back" size={responsive(30)} />
						</RectButton>
					) : null,
				headerRight: (props) =>
					props?.canGoBack ? (
						<RectButton
							style={{
								flexDirection: 'row',
								gap: responsive(3),
								alignItems: 'center',
							}}
							onPress={() => navigation?.goBack()}
						>
							<GradientIcon name="ios-notifications" size={responsive(24)} />
						</RectButton>
					) : null,
			});
		}
	}, [pastdata?.artist1Detail?.artist?.name, pastdata?.artist2Detail?.artist?.name, navigation]);

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

	const {
		data = { items: [], winnersCount: 0, participantsCount: 0 },
		isLoading,
		isFetching,
		refetch,
	} = useQuery({
		queryFn: async () =>
			getChallangeParticipants({
				type: activeTab === 0 ? 'winners' : 'participants',
				challangeId,
			}),
		queryKey: ['getChallenges', activeTab, challangeId],
	});

	const renderWinnerCard = useCallback(
		({ item }: { item: ParticipantUser }) => <WinnerCard {...item} />,
		[]
	);

	const stickyHeaderIndices = useMemo(() => {
		if (isLoading || isFetching) {
			return undefined;
		}
		if (((data || [])?.items?.length || 0) < 2) {
			return undefined;
		}

		return data?.items?.reduce((indexes, user, index) => {
			if (
				user?.winAmount &&
				user?.winAmount > 0 &&
				(user?._id === userData?.id || user?._id === userData?._id)
			) {
				indexes.push(index);
			}

			return indexes;
		}, [] as number[]);
	}, [data, isFetching, isLoading, userData?._id, userData?.id]);

	return (
		<GestureHandlerRootView style={LayoutStyle.fill}>
			<View style={styles.tabWrapper}>
				{TAB_HEADINGS.map((tab, index) => (
					<Tab
						key={index?.toString()}
						index={index}
						scrollPosition={scrollPosition}
						count={index === 0 ? data?.winnersCount || 0 : data?.participantsCount || 0}
						tab={tab}
						onToggleTabs={onToggleTabs}
					/>
				))}
				<Animated.View style={[styles.tabIndiCator, indicatorStyle]} />
				<Button
					label="View Details"
					labelStyle={[
						FontSizeColorStyle['heebo-500-xs-white'],
						{ textDecorationStyle: 'solid', textDecorationLine: 'underline' },
					]}
					style={{ marginLeft: 'auto' }}
					size="md"
					onPress={() => {
						navigation.navigate('ChalangeDetails', {
							challangeId,
							status,
						});
					}}
				/>
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
					data={data?.items}
					renderItem={renderWinnerCard}
					// stickyHeaderHiddenOnScroll
					// stickyHeaderIndices={stickyHeaderIndices}
					keyExtractor={(item, index) => `${index}`}
					contentContainerStyle={styles.container}
					refreshing={isLoading || isFetching}
					refetch={refetch}
					ListFooterComponent={(data?.items || [])?.length > 20 ? undefined : null}
				/>
				<List
					data={data?.items}
					renderItem={renderWinnerCard}
					// stickyHeaderHiddenOnScroll
					// stickyHeaderIndices={stickyHeaderIndices}
					keyExtractor={(item, index) => `${index}`}
					contentContainerStyle={styles.container}
					refreshing={isLoading || isFetching}
					refetch={refetch}
					ListFooterComponent={(data?.items || [])?.length > 20 ? undefined : null}
				/>
			</PagerView>
		</GestureHandlerRootView>
	);
};

export default Winners;

const styles = StyleSheet.create({
	card: {
		borderRadius: responsive(12),
		elevation: responsive(3),
		flexDirection: 'row',
		marginBottom: responsive(12),
		overflow: 'hidden',
		padding: responsive(16),
	},
	container: {
		gap: responsive(10),
		paddingBottom: responsive(40),
		paddingHorizontal: responsive(20),
	},
	header: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: responsive(10),
		justifyContent: 'space-between',
		width: '100%',
	},
	image: {
		borderRadius: responsive(40),
		height: responsive(80),
		width: responsive(80),
	},
	imageContainer: {
		marginRight: responsive(16),
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
		marginLeft: responsive(20),
		position: 'relative',
	},

	textContainer: {
		flex: 1,
		justifyContent: 'center',
		paddingRight: responsive(20),
	},
	viewPager: {
		flex: 1,
	},
});
