import { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';

import { PrimaryButton, ScrollLayout } from '@/components';
import { generateRandomPlayerData } from '@/components/PickPlayers/data';
import PickPLayerHeader from '@/components/PickPlayers/Header';
import { PlayerProps } from '@/components/PickPlayers/Player';
import PlayerList from '@/components/PickPlayers/PlayerList';
import { RootStackNavigationType, SearchPlayerParam } from '@/navigation/types';
import { LayoutStyle, responsive } from '@/styles';

const PickPlayers = () => {
	const navigation = useNavigation<RootStackNavigationType>();

	const onSeeAll = (search?: SearchPlayerParam) => {
		navigation.navigate('SearchPlayer', { search });
	};

	const [loading, setLoading] = useState(false);

	const [data, setData] = useState<Partial<Record<SearchPlayerParam, PlayerProps[]>>>();

	useLayoutEffect(() => {
		setLoading(true);
		const stars = generateRandomPlayerData('stars', 8);

		setData({
			headliner: generateRandomPlayerData('headliner', 5),
			stars,
			rising: generateRandomPlayerData('rising', 5),
		});

		setLoading(false);
	}, []);

	const onClick = useCallback((type?: SearchPlayerParam, id?: string) => {
		if (!type || !id) {
			return;
		}
		setLoading(true);
		console.log({ type, id });

		setData((prev) => {
			const stars = prev?.stars;

			if (type === 'stars') {
				console.log({ stars, prev });

				return prev;
			}

			const daa = prev?.[type]?.map((player) => {
				if (type === 'stars') {
					console.log({
						[type]: prev?.[type],
						1: player.id !== id,
						2: player?.id === id && player?.selected === false,
					});

					return player;
				}
				if (player.id !== id) {
					return player;
				}
				const selected = player?.id === id && player?.selected === false;

				return {
					...player,
					selected,
				};
			});

			console.log({ daa, stars });

			return {
				...prev,
				[type]: daa,
			};
		});

		setLoading(false);
	}, []);

	console.log({ data });

	return (
		<View style={LayoutStyle.fill}>
			<StatusBar hidden />

			<View style={[LayoutStyle.screenLayout, LayoutStyle.fill, styles.pv0]}>
				<PickPLayerHeader />
				<ScrollLayout contentContainerStyle={styles.wrapper} refreshing={loading}>
					{data
						? Object.entries(data)?.map((item, index) => (
								<PlayerList
									type={item?.[0]}
									players={item?.[1]}
									rows={item?.[0] === 'stars' ? 2 : 1}
									key={index?.toString()}
									onSeeAll={onSeeAll}
									onPlayerClick={onClick}
								/>
							))
						: null}
				</ScrollLayout>
			</View>
			<PrimaryButton
				label="Navigations Here "
				outlineStyle={styles.btnOutline}
				style={styles.btn}
				endIcon={<Entypo name="chevron-right" size={24} color="white" />}
				// onPress={() => navigation.navigate('Main')}
				onPress={() => navigation.navigate('Demo1')}
			/>
		</View>
	);
};

export default PickPlayers;

const styles = StyleSheet.create({
	heading: {
		paddingLeft: responsive(40),
		paddingTop: responsive(40),
	},
	pv0: {
		paddingVertical: 0,
		paddingTop: responsive(10),
	},
	wrapper: { paddingHorizontal: responsive(10), gap: responsive(20), paddingBottom: 0, flex: 0 },
	btnOutline: {
		borderRadius: 0,
		flex: 1,
		maxHeight: responsive(70),
	},
	btn: { borderRadius: 0, height: responsive(70), justifyContent: 'space-between' },
} as const);
