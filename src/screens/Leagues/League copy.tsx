/* eslint-disable no-warning-comments */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-inline-styles/no-inline-styles */
import { Entypo } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { Modal, SectionList, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { shallow } from 'zustand/shallow';

import { PrimaryButton, ScrollLayout } from '@/components';
import LeagePlyerList from '@/components/League/LeagePlyerList';
import SearchPlayerBottomSheet, {
    searchBottomSheetRef,
} from '@/components/League/SearchPlayerBottomSheet';
import { useAppStore, useStateStore } from '@/core/store';
import { ArtistType, getArtists } from '@/lib/server/challange';
import { isAndroid } from '@/lib/utils';
import { LeagueStackRouteType } from '@/navigation/main/LeagueStack';
import { SearchPlayerParam } from '@/navigation/types';
import { FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const League: React.FC<LeagueStackRouteType<'League'>> = ({ navigation, route }) => {
	const user = useAppStore((state) => state.user?._id, shallow);

	const [type, setType] = useState<SearchPlayerParam>('headliners');

	const [openSearch, setOpenSearch] = useState<boolean>(false);

	const setSelect = useStateStore((state) => state?.selectTempStar);

	const onEdit = (search: SearchPlayerParam) => {
		setType(search);
		searchBottomSheetRef?.current?.present();
	};

	const { data } = useQuery({
		queryFn: async () => getArtists({ type, leagueId: route?.params?.id }),
		queryKey: ['getArtists', type, route?.params?.id],
	});

	const clearStars = useStateStore((state) => state?.clearStars, shallow);

	const tempSeletedArists2 = useStateStore(
		(state) => [
			{
				title: 'Pick 3 Headliner ',
				data: [{ key: 'headliners', list: state?.tempSelectedStars?.headliners || [] }],
				key: 'headliners',
			},
			{
				title: SEARCH_TITLE.testStars,
				data: [{ key: 'testStars', list: state?.tempSelectedStars?.testStars || [] }],
				key: 'testStars',
			},
			{
				title: SEARCH_TITLE.risingStars,
				data: [{ key: 'risingStars', list: state?.tempSelectedStars?.risingStars || [] }],
				key: 'risingStars',
			},
		],
		shallow
	);

	const tempSeletedArists = useStateStore((state) => state?.tempSelectedStars, shallow);

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

	return (
		<GestureHandlerRootView style={LayoutStyle.fill}>
			<SectionList
				sections={tempSeletedArists2}
				overScrollMode="never"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flexGrow: 1,
					// alignItems: 'center',
					justifyContent: 'center',
					padding: 20,
					paddingBottom: 100,
					gap: 20,
				}}
				ListHeaderComponent={
					<View style={{ gap: 5, width: '100%' }}>
						<GradientText
							style={FontSizeColorStyle['montserrat-600-24-white']}
							colors={['#00BCFD', '#007097']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						>
							{route?.params?.name}
						</GradientText>
						<Text style={FontSizeColorStyle['montserrat-600-sm-primary-text']}>
							Ends on :{'  '}
							<Text style={FontSizeColorStyle['montserrat-600-sm-white']}>
								23 Dec 2024
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
							<Chip
								colors={['#125B6F', '#052F3B', '#00212A']}
								// text={new Date(contest?.leagueEnd)?.toDateString()}
								color="#ffffff"
								text="Ends in : 02d:12H:21M:45S"
							/>
							<AvatarGroup
								images={[
									'https://t3.ftcdn.net/jpg/02/57/27/20/360_F_257272034_PqpJ7rx0pqXHqB6RJ27w662p3FwY0r2G.jpg',
									'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOza36lSYO6bLPuiCEyN2qmG4MoMc_6TBew&usqp=CAU',
									'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsEWJ4QZwBu34arF-10mkTMXjl5p_S5QHEQ&usqp=CAU',
								]}
							/>
						</View>
					</View>
				}
				keyExtractor={(_, index) => index?.toString()}
				renderItem={({ item }) => (
					<LeagePlyerList
						type={'headliners'}
						onEdit={onEdit}
						onAction={onAction}
						singers={tempSeletedArists?.headliners}
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
						label="Join This League"
						onPress={() => {
							mutate({
								user,
								team,
								league: route?.params?.id,
								leagues: route?.params?.id,
							});
						}}
					/>
				}
			/>
			<ScrollLayout contentContainerStyle={[styles.wrapper]}>
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
			</ScrollLayout>
			<LinearGradient
				style={{
					position: 'absolute',
					bottom: 0,
					alignItems: 'center',
					paddingBottom: 20,
					width: '100%',
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
								0 / 234
							</Text>
							<Text style={FontSizeColorStyle['montserrat-600-12-white']}>
								Enroll in Legue
							</Text>
						</View>
					}
					outlineStyle={styles.btnOutline}
					style={styles.btn}
					size="md"
					endIcon={<Entypo name="chevron-right" size={24} color="white" />}
					enabled={team?.length >= 11}
					onPress={() => {
						if (user && team && route?.params?.id) {
							navigation.navigate('ConfirmLeague', {
								id: route?.params?.id,
								name: route?.params?.name,
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
		paddingVertical: responsive(0),
		paddingTop: responsive(isAndroid ? 53 : 48),
		gap: responsive(0),
		flex: 0,
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
