/* eslint-disable react-native/no-color-literals */
import { createRef, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { shallow } from 'zustand/shallow';

// import type { ImagePickerAsset } from 'expo-image-picker';
import { PrimaryButton } from '../Base';
import PlayerFlashList from '../PickPlayers/PlayerFlashList';

import { toastConfig } from '@/components/Common/ToastConfig';
import { useStateStore } from '@/core/store';
import { ArtistType } from '@/lib/server/challange';
import { SEARCH_TITLE, SearchPlayerParam } from '@/navigation/types';
import { FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

type SearchBottomSheet = {
	onClose?: (() => void) | undefined;
	type: SearchPlayerParam;
	artists?: ArtistType[];
	open?: boolean;
};

export const searchBottomSheetRef = createRef<BottomSheetModal>();

const SearchPlayerBottomSheet: React.FC<SearchBottomSheet> = ({ onClose, type, artists }) => {
	const tempSeletedArists = useStateStore((state) => state?.tempSelectedStars, shallow);

	const setSelect = useStateStore((state) => state?.selectTempStar);

	const data = useMemo(
		() =>
			artists?.map((item) => ({
				...item,
				image: item?.icon || item?.images?.[0]?.url || '',
				level: item?.popularity || 0,
				// credit: item?.followers || 0,
				followers: item?.followers || 0,
				point: item?.point || 0,
				selected: tempSeletedArists?.[type]?.some((p) => p?._id === item?._id) || false,
			})) || [],
		[artists, tempSeletedArists, type]
	);

	const onClick = useCallback(
		(artist: ArtistType) => {
			console.log({ artist });
			setSelect(type, artist);
		},
		[setSelect, type]
	);

	return (
		<BlurView
			style={[LayoutStyle.fill, styles.wheelContainer]}
			// shouldRasterizeIOS
			// aria-expanded
			intensity={90}
			tint="dark"
			experimentalBlurMethod={'dimezisBlurView'}
		>
			<GestureHandlerRootView style={styles.layout}>
				<View
					style={{
						width: '100%',
						padding: responsive(20),
						gap: responsive(10),
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					{/* <MaterialTextEditorComponent
							label={'Search'}
							value={search}
							// onChangeText={(event) => setSearch(event)}
							containerStyle={{ flex: 1 }}
							onEndEditing={(event) => setSearch(event?.nativeEvent?.text)}
							showClearButton={false}
						/> */}
					<Text style={FontSizeColorStyle['heebo-500-12-primary-text']}>
						{SEARCH_TITLE[type]}
					</Text>
					<RectButton onPress={onClose}>
						<BlurView
							style={{
								padding: responsive(2),
								borderRadius: responsive(30),
								// borderWidth: 0.9,
								borderColor: '#f1f1f1',
								overflow: 'hidden',
							}}
							intensity={60}
							tint="light"
							experimentalBlurMethod={'dimezisBlurView'}
						>
							<Ionicons
								name="close"
								// name="chevron-back"
								size={responsive(20)}
								color={'white'}
							/>
						</BlurView>
					</RectButton>
					{/* <TextInput
						style={{
							borderRadius: 7,
							color: '#c4c4c4',
							fontSize: 12,
							paddingHorizontal: 24,
							paddingVertical: 12,
							width: '100%',
							borderColor: '#818181',
							borderWidth: 1,
						}}
						placeholder={'Search'}
						placeholderTextColor={'#818181'}
					/> */}
				</View>

				<PlayerFlashList players={data} onClick={onClick} />
				<PrimaryButton
					label="Confirm Singers"
					endIcon={<Entypo name="chevron-right" size={24} color="white" />}
					style={styles.btn}
					outlineStyle={styles.outline}
					onPress={onClose}
				/>
				<Toast config={toastConfig} />
			</GestureHandlerRootView>
		</BlurView>
	);
};

export default SearchPlayerBottomSheet;

const styles = StyleSheet.create({
	btn: { justifyContent: 'space-between' },
	layout: { flex: 1, paddingTop: responsive(10), width: '100%' },
	outline: {
		elevation: 10,
		marginLeft: responsive(20),
		marginTop: responsive(10),
		shadowColor: '#00BCFD',
		shadowOffset: { height: responsive(10), width: responsive(10) },
		shadowOpacity: 1,
		shadowRadius: responsive(20),
		width: '80%',
	},

	wheelContainer: {
		flex: 1,
		flexGrow: 1,
		gap: responsive(40),
		height: '100%',
		overflow: 'hidden',
		padding: responsive(1),
		paddingVertical: responsive(40),
		width: '100%',
	},
});
