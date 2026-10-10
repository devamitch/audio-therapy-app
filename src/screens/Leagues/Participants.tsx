import { useMemo } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { shallow } from 'zustand/shallow';

import { BlurRoundBg, Chip } from '@/components';
import GradientText from '@/components/Base/GradientText';
import { AvatarGroup } from '@/components/Dashboard/DashboardSingersCards';
import WinnerList from '@/components/Winner/WinnerList';
import { useAppStore } from '@/core/store';
import useCountdownTimer from '@/lib/hooks/useCountdownTimer';
import { getAllLeagueRanks, LegueResponse } from '@/lib/server/leagues';
import { MainStackRouteType } from '@/navigation/main/MainStack';
import { FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const Participants: React.FC<MainStackRouteType<'Participants'>> = ({ navigation, route }) => {
	const queryClient = useQueryClient();

	const user = useAppStore((state) => state.user?._id, shallow);

	const pastData = queryClient.getQueryData<LegueResponse>([
		'getJoinedLeagues',
		route?.params?.id,
	]);

	const { data } = useQuery({
		queryFn: async () => getAllLeagueRanks({ league: route?.params?.id }),
		queryKey: ['getChallangeRank', route?.params?.id],
		// refetchOnMount: true,
		// refetchOnReconnect: true,
		// refetchOnWindowFocus: true,
	});

	console.log({ data });
	const timer = useCountdownTimer(new Date(pastData?.leagueStart));

	// winners //winAmount
	const sections = useMemo(() => {
		return [
			{
				title: 'Tournament Winner' as const,
				data: [
					{
						key: 'winner' as const,
						list: data?.winners
							?.sort((a, b) => (a?.points || 0) - (b?.points || 0))
							?.map((item) => ({
								image: item?.user?.icon,
								name: item?.user?.name,
								amount: item?.winAmount,
								date: item?.points,
								points: item?.points,
							})),
					},
				] as const,
				key: 'winner' as const,
			},
			{
				title: 'Participants' as const,
				data: [
					{
						key: 'participants',
						list:
							data?.joins
								?.sort((a, b) => (a?.points || 0) - (b?.points || 0))
								?.map((item) => ({
									image: item?.user?.icon,
									name: item?.user?.name,
									amount: item?.rank,
									date: item?.points,
									points: item?.points,
								})) || [],
					},
				],
				key: 'participants' as const,
			},
		];
	}, [data?.joins, data?.winners]);

	return (
		<GestureHandlerRootView style={[LayoutStyle.fill, { paddingVertical: 20 }]}>
			<BlurRoundBg />

			<SectionList
				sections={sections}
				overScrollMode="never"
				showsVerticalScrollIndicator={false}
				style={{ flex: 1 }}
				contentContainerStyle={{
					flexGrow: 1,
				}}
				ListHeaderComponent={
					<Animated.View style={styles.container}>
						<GradientText
							style={FontSizeColorStyle['lato-900-24-light-f7f7f7']}
							colors={['#00BCFD', '#007097']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						>
							{data?.title ?? pastData?.title}
						</GradientText>
						<Text style={FontSizeColorStyle['montserrat-600-sm-primary-text']}>
							Starting on :{'  '}
							<Text style={FontSizeColorStyle['montserrat-600-sm-white']}>
								{new Date(pastData?.leagueStart).toDateString()}
							</Text>
						</Text>
						<View
							style={{
								flexDirection: 'row',
								width: '100%',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							{pastData?.isJoined === 1 ? (
								<Chip
									text={`Joined`}
									colors={['#00212A', '#1e1e1e', '#1e1e1e']}
									color="#f1f1f1"
								/>
							) : null}
						</View>

						<View style={styles.wrapper}>
							{pastData?.leagueStart ? (
								<Chip
									text={`${timer?.days} D : ${timer?.hours} H : ${timer?.minutes} M : ${timer?.seconds} S`}
									colors={['#125B6F', '#052F3B', '#00212A']}
									color="#ffffff"
								/>
							) : null}

							<RectButton
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
										pastData?.users
											? pastData?.users?.map((item) => item?.user)
											: [
													'https://t3.ftcdn.net/jpg/02/57/27/20/360_F_257272034_PqpJ7rx0pqXHqB6RJ27w662p3FwY0r2G.jpg',
													'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOza36lSYO6bLPuiCEyN2qmG4MoMc_6TBew&usqp=CAU',
													'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsEWJ4QZwBu34arF-10mkTMXjl5p_S5QHEQ&usqp=CAU',
													'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsEWJ4QZwBu34arF-10mkTMXjl5p_S5QHEQ&usqp=CAU',
												]
									}
								/>
								<Text style={FontSizeColorStyle['heebo-500-20-white']}>
									+{pastData?.joinedUsers}
								</Text>
							</RectButton>
						</View>
					</Animated.View>
				}
				keyExtractor={(_, index) => index?.toString()}
				renderItem={({ item }) => <WinnerList data={item?.list} type={item?.key} />}
			/>
		</GestureHandlerRootView>
	);
};

export default Participants;

const styles = StyleSheet.create({
	container: {
		gap: responsive(5),
		overflow: 'hidden',
		paddingHorizontal: responsive(20),
		width: '100%',
	},
	wrapper: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
});
