/* eslint-disable no-warning-comments */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-inline-styles/no-inline-styles */
import { Entypo } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { Modal, SectionList, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { shallow } from 'zustand/shallow';

import { PrimaryButton } from '@/components';
import LeagePlyerList from '@/components/League/LeagePlyerList';
import SearchPlayerBottomSheet from '@/components/League/SearchPlayerBottomSheet';
import { useAppStore, useStateStore } from '@/core/store';
import { ArtistType, getArtists } from '@/lib/server/challange';
import { LegueResponse } from '@/lib/server/leagues';
import { isAndroid } from '@/lib/utils';
import { LeagueStackRouteType } from '@/navigation/main/LeagueStack';
import { SEARCH_TITLE, SearchPlayerParam } from '@/navigation/types';
import { FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const League: React.FC<LeagueStackRouteType<'League'>> = ({ navigation, route }) => {
	const user = useAppStore((state) => state.user?._id, shallow);

	const [type, setType] = useState<SearchPlayerParam>('headliners');

	const [openSearch, setOpenSearch] = useState<boolean>(false);

	const setSelect = useStateStore((state) => state?.selectTempStar);

	const queryClient = useQueryClient();

	const pastData = queryClient.getQueryData<LegueResponse>([
		'getJoinedLeagues',
		route?.params?.id,
	]);

	const { data } = useQuery({
		queryFn: async () => getArtists({ type, leagueId: route?.params?.id }),
		queryKey: ['getArtists', type, route?.params?.id],
	});

	const onEdit = (search: SearchPlayerParam) => {
		setType(search);
		setOpenSearch(true);
	};

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

	const onAction = (search: SearchPlayerParam, artist: ArtistType, action?: 'add' | 'remove') => {
		setType(search);
		// const artist = data?.find((item) => item?._id === id);

		if (action === 'remove') {
			if (artist && search) {
				setSelect(search, artist);

				return;
			}
		}
		// searchBottomSheetRef?.current?.present();
		setOpenSearch(true);

		// navigation.navigate('SearchPlayer', { search });
	};

	// const { top: paddingTop } = useSafeAreaInsets();

	// const totalJoinCr  =  useMemo(()=>{},[])
	return (
		<GestureHandlerRootView style={LayoutStyle.fill}>
			<SectionList
				sections={tempSeletedArists}
				overScrollMode="never"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[styles.wrapper]}
				keyExtractor={(_, index) => index?.toString()}
				renderItem={({ item }) => (
					<LeagePlyerList
						type={item?.key}
						onEdit={onEdit}
						onAction={onAction}
						singers={item?.list}
					/>
				)}
			/>
			{/* <ScrollLayout contentContainerStyle={[styles.wrapper]}>
				<LeagePlyerList
					type={'headliners'}
					onEdit={onEdit}
					onAction={onAction}
					singers={tempSeletedArists?.headliners}
				/>
				<LeagePlyerList
					type={'testStars'}
					onEdit={onEdit}
					onAction={onAction}
					singers={tempSeletedArists?.testStars}
				/>
				<LeagePlyerList
					type={'risingStars'}
					onEdit={onEdit}
					onAction={onAction}
					singers={tempSeletedArists?.risingStars}
				/>
			</ScrollLayout> */}
			<LinearGradient
				style={{
					position: 'absolute',
					bottom: 0,
					alignItems: 'center',
					paddingBottom: 20,
					width: '100%',
					opacity: (totalJoinCr?.count || team?.length) >= 11 ? 1 : 0.8,
					overflow: 'hidden',
				}}
				colors={['transparent', 'rgba(0,0,0,0.7)', 'black']}
			>
				<PrimaryButton
					label={
						<View
							style={{
								alignItems: 'center',
								gap: 10,
								justifyContent: 'center',
								flexDirection: 'row',
							}}
						>
							<Text style={FontSizeColorStyle['montserrat-600-24-white']}>
								{totalJoinCr?.sum}{' '}
								<Text style={FontSizeColorStyle['montserrat-700-xxs-white']}>
									{totalJoinCr?.count}
								</Text>{' '}
								/ {pastData?.creditPoints}
							</Text>

							<Text style={FontSizeColorStyle['montserrat-600-12-white']}>
								{`${route?.params?.edit ? 'Edit this team' : 'Enroll in Legue'} `}
							</Text>
						</View>
					}
					outlineStyle={[
						styles.btnOutline,
						{ opacity: (totalJoinCr?.count || team?.length) >= 11 ? 1 : 0.5 },
					]}
					style={[
						styles.btn,
						{ opacity: (totalJoinCr?.count || team?.length) >= 11 ? 1 : 0.5 },
					]}
					size="md"
					endIcon={<Entypo name="chevron-right" size={24} color="white" />}
					enabled={(totalJoinCr?.count || team?.length) >= 11}
					onPress={() => {
						if (user && team && route?.params?.id) {
							navigation.navigate('ConfirmLeague', {
								id: route?.params?.id,
								name: route?.params?.name,
								edit: route?.params?.edit,
							});
						}
					}}
				/>
			</LinearGradient>
			<Modal
				presentationStyle="pageSheet"
				visible={openSearch}
				onRequestClose={() => {
					setOpenSearch(false);
				}}
				onDismiss={() => {
					setOpenSearch(false);
				}}
				animated
				animationType="slide"
				// transparent={}
				transparent
				hardwareAccelerated
				statusBarTranslucent
			>
				<SearchPlayerBottomSheet
					type={type}
					// artists={
					// 	(pastData?.teams?.[type] || [])?.length > 0 ? pastData?.teams?.[type] : data
					// }
					artists={data || []}
					onClose={() => {
						setOpenSearch(false);
					}}
				/>
			</Modal>
		</GestureHandlerRootView>
	);
};

export default League;

const styles = StyleSheet.create({
	heading: {
		paddingLeft: responsive(40),
		paddingTop: responsive(40),
	},
	pv0: {
		paddingVertical: 0,
		paddingTop: responsive(10),
	},
	wrapper: {
		paddingHorizontal: responsive(0),
		// paddingVertical: responsive(20),
		paddingVertical: responsive(isAndroid ? 53 : 50),
		paddingTop: responsive(isAndroid ? 53 : 50),
		gap: responsive(0),
		flexGrow: 1,
		// backgroundColor: 'red',
	},
	btnOutline: {
		// borderRadius: 0,
		// flex: 1,
		// maxHeight: responsive(70),
		width: 315,

		alignSelf: 'center',
	},
	btn: {
		// borderRadius: 0,
		// height: responsive(70),

		justifyContent: 'space-between',
	},
} as const);
