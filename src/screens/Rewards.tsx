import { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
	Easing,
	SlideInDown,
	SlideOutDown,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';

import { PrimaryButton } from '@/components';
import { useAppStore } from '@/core/store';
import { getAllRewards, RewardResponse } from '@/lib/server/leagues';
import { MainStackRouteType } from '@/navigation/main/MainStack';
import { ALL_COLORS, FontSizeColorStyle, responsive } from '@/styles';

const rewards = [];

const RewardItem = (item: RewardResponse) => {
	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: withTiming(scale.value, {
						duration: 300,
						easing: Easing.out(Easing.ease),
					}),
				},
			],
		};
	});

	return (
		<BlurView
			intensity={40}
			tint="dark"
			experimentalBlurMethod={'dimezisBlurView'}
			style={[styles.rewardWrapper, styles.gradient]}
		>
			<Animated.View style={[styles.rewardItem, animatedStyle]}>
				<View style={styles.detailsContainer}>
					{item?.type === 'league' ? (
						<Text style={FontSizeColorStyle['montserrat-700-18-white']}>
							{item?.league?.title}
						</Text>
					) : (
						<View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
							<Text style={FontSizeColorStyle['montserrat-600-18-white']}>
								{item?.challange?.artistIds?.[0]?.name?.split(' ')?.[0]}
							</Text>
							<Text style={FontSizeColorStyle['montserrat-600-12-white']}>VS</Text>
							<Text style={FontSizeColorStyle['montserrat-600-18-white']}>
								{item?.challange?.artistIds?.[1]?.name?.split(' ')?.[0]}
							</Text>
						</View>
					)}

					<Text style={FontSizeColorStyle['montserrat-500-12-grey-b6b6b6']}>
						{item?.type?.toUpperCase()}
					</Text>
				</View>
				<View style={styles.iconContainer}>
					<Text style={FontSizeColorStyle['montserrat-700-18-primary-text']}>
						{item?.rewardAmount}
					</Text>
					<Icon name="emoji-events" size={20} color={ALL_COLORS['primary-text']} />
				</View>
			</Animated.View>
		</BlurView>
	);
};

const ChallengeRewards = ({ data }: { data: RewardResponse[] }) => (
	<FlatList
		data={data?.filter((item) => item.type === 'challenge')}
		keyExtractor={(item) => item._id}
		renderItem={({ item }) => <RewardItem {...item} />}
	/>
);

const TournamentRewards = ({ data }: { data: RewardResponse[] }) => (
	<FlatList
		data={data.filter((item) => item.type === 'league')}
		keyExtractor={(item) => item._id}
		renderItem={({ item }) => <RewardItem {...item} />}
	/>
);

const initialLayout = { width: Dimensions.get('window').width };

const RewardList: React.FC<MainStackRouteType<'Rewards'>> = ({ navigation }) => {
	const [index, setIndex] = useState(0);

	const user = useAppStore((state) => state?.user?._id);

	const {
		data = [],
		isLoading,
		isFetching,
		refetch,
	} = useQuery({
		queryFn: async () => getAllRewards({ user }),
		queryKey: ['getAllRewards'],
	});

	const [routes] = useState([
		{ key: 'challenge', title: 'Challenges' },
		{ key: 'league', title: 'Leagues' },
	]);

	const renderScene = SceneMap({
		challenge: () => <ChallengeRewards data={data} />,
		league: () => <TournamentRewards data={data} />,
	});

	return (
		<GestureHandlerRootView style={styles.container}>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={initialLayout}
				renderTabBar={(props) => (
					<TabBar
						{...props}
						indicatorStyle={styles.indicator}
						style={styles.tabBar}
						labelStyle={styles.labelStyle}
					/>
				)}
			/>
			{!isFetching && data?.length === 0 ? (
				<BlurView
					style={{
						position: 'absolute',
						top: 20,
						bottom: 20,
						left: 20,
						right: 20,
						borderRadius: 5,
						overflow: 'hiden',
						backgroundColor: 'rgba(0,0,0,0.3)',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					entering={SlideInDown.delay(500)}
					exiting={SlideOutDown.delay(500)}
					intensity={20}
					tint="dark"
				>
					<Animated.View
						style={{
							borderLeftColor: '#000000',
							borderTopColor: '#006582',
							borderRadius: 18,
							borderWidth: 2,
							overflow: 'hidden',
						}}
					>
						<LinearGradient
							colors={['rgba(0,101,130, 0.5)', 'rgba(0,101,130, 0.2)']}
							style={{
								overflow: 'hidden',
								padding: 40,
								gap: 20,
								maxWidth: 327,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							start={{ x: 0.8, y: 0.7 }}
							end={{ x: 0.1, y: 0 }}
						>
							{/* <Image
								source={{
									uri: 'https://static.vecteezy.com/system/resources/thumbnails/021/975/492/small_2x/search-not-found-3d-render-icon-illustration-with-transparent-background-empty-state-png.png',
								}}
								style={{
									height: 200,
									width: 200,
									borderRadius: 5,
									backgroundColor: 'rgba(0,0,0,0.7)',
								}}
							/> */}
							<Animated.Text style={FontSizeColorStyle['heebo-700-xxl-white']}>
								{' '}
								Empty data
							</Animated.Text>
							<Animated.Text style={FontSizeColorStyle['heebo-400-16-white']}>
								{' '}
								Your transaction history appears to be empty. Please check your
								internet settings and join some contests.
							</Animated.Text>

							<PrimaryButton
								label="Return to dashboard"
								onPress={() => {
									navigation?.canGoBack
										? navigation?.goBack()
										: navigation?.navigate('Dashboard');
								}}
								gradientType="type4"
								outlineStyle={{
									width: '100%',
									borderRadius: 40,
									overflow: 'hidden',
								}}
								style={{
									paddingVertical: 10,
									height: 'auto',
									justifyContent: 'center',
								}}
								labelStyle={FontSizeColorStyle['montserrat-600-13-white']}
							/>
							<PrimaryButton
								labelStyle={FontSizeColorStyle['montserrat-600-13-white']}
								label="Retry"
								gradientType="type3"
								outlineStyle={{
									width: '100%',
									borderRadius: 40,
									overflow: 'hidden',
								}}
								style={{
									paddingVertical: 10,
									height: 'auto',
									justifyContent: 'center',
								}}
								onPress={refetch}
							/>
						</LinearGradient>
					</Animated.View>
				</BlurView>
			) : null}
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	container: {
		// backgroundColor: '#121212',
		flex: 1,
		padding: 20,
	},
	detailsContainer: {
		flex: 1,
	},
	gradient: {
		alignItems: 'center',
		borderRadius: 10,
		flexDirection: 'row',
		flex: 1,
	},
	iconContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 5,
		marginLeft: 15,
	},
	indicator: {
		backgroundColor: ALL_COLORS['primary-text'],
	},
	labelStyle: {
		fontFamily: 'Montserrat-Bold',
		fontSize: responsive(14),
		fontStyle: 'normal',
	},
	league: {
		color: '#ffffff',
		fontSize: 14,
		marginVertical: 5,
	},
	mainTitle: {
		color: '#ffffff',
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
	},
	rewardAmount: {
		color: ALL_COLORS['primary-text'],
		fontSize: 16,
		fontWeight: 'bold',
	},
	rewardItem: {
		alignItems: 'center',
		borderRadius: 10,
		flexDirection: 'row',
		padding: 15,
	},
	rewardWrapper: {
		borderRadius: 10,
		marginBottom: 15,
		overflow: 'hidden',
	},
	tabBar: {
		backgroundColor: 'rgba(0,0,0,0.1)',
	},
	title: {
		color: '#ffffff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	type: {
		color: '#ffffff',
		fontSize: 16,
		marginVertical: 5,
	},
});

export default RewardList;

// jetir35233@egela.com
