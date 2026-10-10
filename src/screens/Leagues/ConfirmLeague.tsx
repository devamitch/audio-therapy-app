import { Entypo } from '@expo/vector-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { useCallback } from 'react';
import { FlatList, SectionList, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { shallow } from 'zustand/shallow';

import { Chip, PrimaryButton } from '@/components';
import { AvatarGroup } from '@/components/Dashboard/DashboardSingersCards';
import { Singer } from '@/components/League/LeagePlyerList';
// import GradientText, { GradientIcon } from '@/components/Base/GradientText';
import { useAppStore, useStateStore } from '@/core/store';
import useCountdownTimer from '@/lib/hooks/useCountdownTimer';
import { createTeam, updateTeam } from '@/lib/server/challange';
import { LegueResponse } from '@/lib/server/leagues';
import { handleError, toast } from '@/lib/utils';
import { LeagueStackRouteType } from '@/navigation/main/LeagueStack';
import { SEARCH_TITLE } from '@/navigation/types';
import { FontSizeColorStyle } from '@/styles';

const ConfirmLeague: React.FC<LeagueStackRouteType<'ConfirmLeague'>> = ({ navigation, route }) => {
	const user = useAppStore((state) => state.user?._id, shallow);

	const queryClient = useQueryClient();

	const pastData = queryClient.getQueryData<LegueResponse>([
		'getJoinedLeagues',
		route?.params?.id,
	]);

	const tempSeletedArists = useStateStore(
		useCallback((state) => {
			return [
				{
					title: 'Pick 3 Headliner ',
					data: [{ key: 'headliners', list: state?.tempSelectedStars?.headliners || [] }],
					key: 'headliners',
				},
				{
					title: SEARCH_TITLE.testStars,
					data: [
						{
							key: 'testStars',
							list: state?.tempSelectedStars?.testStars || [],
						},
					],
					key: 'testStars',
				},
				{
					title: SEARCH_TITLE.risingStars,
					data: [
						{
							key: 'risingStars',
							list: state?.tempSelectedStars?.risingStars || [],
						},
					],
					key: 'risingStars',
				},
			] as const;
		}, []),
		shallow
	);

	const team = useStateStore(
		useCallback(
			(state) =>
				Object.entries(state?.tempSelectedStars || {})
					?.map(([_, item]) => item)
					?.flat()
					?.filter((item) => item?._id)
					?.map((item) => item?._id),
			[]
		),
		shallow
	);

	const clearStars = useStateStore((state) => state?.clearStars, shallow);

	const { mutate } = useMutation({
		mutationKey: [user, team, pastData?.isJoined],
		mutationFn: pastData?.isJoined === 1 ? updateTeam : createTeam,
		onError: (error) => {
			handleError(error);
		},
		onSuccess(data) {
			toast.success(
				`${pastData?.isJoined ? 'Successful updated team successfully' : 'Thank you for joining'}`
			);
			clearStars();
			navigation.replace('Leagues');
		},
	});

	const { top: paddingTop } = useSafeAreaInsets();

	const timer = useCountdownTimer(new Date(pastData?.leagueStart));

	const totalJoinCr = useStateStore(
		useCallback(
			(state) =>
				Object.entries(state?.tempSelectedStars || {})
					?.map(([_, item]) => item)
					?.flat()
					?.filter((item) => item?._id)
					?.map((item) => item?.popularity || 0)
					?.reduce(
						(acc, curr) => {
							acc.sum += curr % 10;
							acc.count += 1;

							return acc;
						},
						{ sum: 0, count: 0 }
					),
			[]
		),
		shallow
	);

	return (
		<SectionList
			sections={tempSeletedArists}
			overScrollMode="never"
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				flexGrow: 1,
				// alignItems: 'center',
				justifyContent: 'center',
				paddingHorizontal: 20,
				paddingBottom: 100,
				gap: 20,
				// backgroundColor: 'white',
			}}
			ListHeaderComponent={
				<View style={{ gap: 5, width: '100%' }}>
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
						<View
							style={{
								alignItems: 'center',
								gap: 10,
								justifyContent: 'center',
								flexDirection: 'row',
							}}
						>
							<Text style={FontSizeColorStyle['montserrat-600-24-white']}>
								{totalJoinCr?.sum}
								{'credit '}
								<Text style={FontSizeColorStyle['montserrat-700-xxs-white']}>
									{totalJoinCr?.count}
								</Text>{' '}
								/ {pastData?.creditPoints}
							</Text>
						</View>
						{pastData?.isJoined === 1 ? (
							<Chip
								text={`Joined`}
								colors={['#00212A', '#1e1e1e', '#1e1e1e']}
								color="#f1f1f1"
							/>
						) : null}
					</View>

					<View
						style={{
							flexDirection: 'row',
							width: '100%',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						{pastData?.leagueStart ? (
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
				</View>
			}
			keyExtractor={(_, index) => index?.toString()}
			renderItem={({ item }) => (
				<FlatList
					data={item?.list}
					numColumns={3}
					contentContainerStyle={{ gap: 10 }}
					columnWrapperStyle={{ gap: 10 }}
					keyExtractor={(item, index) => item?._id || index?.toString()}
					renderItem={({ item }) => <Singer {...item} />}
				/>
			)}
			renderSectionHeader={({ section: { title } }) => (
				<BlurView
					style={{ padding: 5, paddingVertical: 12 }}
					tint="dark"
					experimentalBlurMethod={'dimezisBlurView'}
				>
					<Text style={FontSizeColorStyle['montserrat-600-17-primary-text']}>
						{title}
					</Text>
				</BlurView>
			)}
			ListFooterComponent={
				<PrimaryButton
					label={pastData?.isJoined ? `Update team` : 'Join This League'}
					onPress={() => {
						mutate({
							user,
							team,
							league: route?.params?.id,
							leagues: route?.params?.id,
						});
					}}
					gradientType="type4"
					size="md"
					style={{ justifyContent: 'space-between' }}
					endIcon={<Entypo name="chevron-right" size={24} color="white" />}
				/>
			}
		/>
	);
};

export default ConfirmLeague;

const styles = StyleSheet.create({});
