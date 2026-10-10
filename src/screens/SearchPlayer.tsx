/* eslint-disable no-warning-comments */

/* eslint-disable react-native/no-color-literals */
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';

import { PrimaryButton } from '@/components';
import MaterialTextEditorComponent from '@/components/Base/experimental/BasicTextEditor';
import { generateRandomPlayerData } from '@/components/PickPlayers/data';
import { PlayerProps } from '@/components/PickPlayers/Player';
import PlayerFlashList from '@/components/PickPlayers/PlayerFlashList';
import { handleError, isAndroid } from '@/lib/utils';
import { RootStackNavigationType, RootStackRouteType } from '@/navigation/types';
import { LayoutStyle, responsive } from '@/styles';

const SearchPlayer = () => {
	const navigation = useNavigation<RootStackNavigationType>();

	const route = useRoute<RootStackRouteType<'SearchPlayer'>>();

	const type = route?.params?.search;

	const [search, setSearch] = useState('');

	const [loading, setLoading] = useState(false);

	const [totalData, setTotalData] = useState<PlayerProps[]>([]);

	useEffect(() => {
		setLoading(true);
		const generatedheadliner = generateRandomPlayerData(type, 24);

		setTotalData(generatedheadliner);
		setLoading(false);
	}, [type, setLoading, setTotalData]);

	const onClick = useCallback((id?: string) => {
		setLoading(true);

		setTotalData((prev) =>
			prev?.map((item) => {
				if (item?.id === id) {
					return { ...item, selected: !item?.selected };
				}

				return item;
			})
		);

		setLoading(false);
	}, []);

	useLayoutEffect(() => {
		if (isAndroid) {
			return;
		}
		navigation.setOptions({
			presentation: 'containedTransparentModal',

			headerSearchBarOptions: {
				onChangeText: (event) => setSearch(event.nativeEvent.text),
				textColor: '#fff',
				tintColor: '#0a96c4',
				headerIconColor: '#fff',
				hintTextColor: '#f1f1f1',
				barTintColor: '#000e12',
				hideNavigationBar: true,
				hideWhenScrolling: false,
				autoFocus: true,
				inputType: 'text',
				shouldShowHintSearchIcon: true,
				autoCapitalize: 'sentences',
				placeholder: 'Search',
			},
		});
	}, [navigation]);

	const data = useMemo(
		() =>
			(search || '')?.length < 2
				? totalData
				: totalData?.filter((item) => item?.name?.includes(search)),
		[search, totalData]
	);

	return (
		<BlurView
			style={[LayoutStyle.fill, { overflow: 'hidden' }]}
			tint="dark"
			accessibilityIgnoresInvertColors
			intensity={70}
		>
			<StatusBar hidden />

			<SafeAreaView style={styles.layout}>
				{isAndroid ? (
					<View style={{ width: '100%', padding: 10, height: 80, marginTop: 40 }}>
						<MaterialTextEditorComponent
							label={'Search'}
							value={search}
							onChangeText={(event) => setSearch(event)}
							containerStyle={{ flex: 1 }}
						/>
					</View>
				) : null}
				<PlayerFlashList players={data} onClick={onClick} />
				<PrimaryButton
					label="Proceed with this "
					endIcon={<Entypo name="chevron-right" size={24} color="white" />}
					style={styles.btn}
					outlineStyle={styles.outline}
					onPress={() => {
						try {
							if (navigation?.canGoBack()) {
								navigation.goBack();

								return;
							}
							navigation.navigate('PickPlayers');
						} catch (error) {
							handleError(error);
						}
					}}
				/>
			</SafeAreaView>
		</BlurView>
	);
};

export default SearchPlayer;

const styles = StyleSheet.create({
	btn: { justifyContent: 'space-between' },
	layout: { flex: 1, paddingBottom: responsive(0), paddingTop: responsive(20), width: '100%' },

	outline: {
		elevation: 10,
		marginLeft: responsive(20),
		marginTop: responsive(10),
		shadowColor: '#00BCFD',
		shadowOffset: { height: 10, width: 10 },
		shadowOpacity: 1,
		shadowRadius: 20,
		width: '80%',
	},
});
