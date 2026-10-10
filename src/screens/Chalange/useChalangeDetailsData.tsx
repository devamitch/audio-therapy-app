import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { RouteProp,  useRoute } from '@react-navigation/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { shallow } from 'zustand/shallow';

import GradientText, { GradientIcon } from '@/components/Base/GradientText';
import { useAppStore } from '@/core/store';
import { ChalangesResponse, getChallange } from '@/lib/server/challange';
import { MainStackRouteType } from '@/navigation/main/MainStack';
import { FontSizeColorStyle, responsive } from '@/styles';

Audio.setAudioModeAsync({
	interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
	interruptionModeIOS: InterruptionModeIOS.DuckOthers,
	playThroughEarpieceAndroid: true,
	playsInSilentModeIOS: true,
	shouldDuckAndroid: true,
});

const useChalangeDetails = () => {
	const { challangeId, status, tag } =
		useRoute<MainStackRouteType<'ChalangeDetails'>['route']>()?.params;

	const user = useAppStore((state) => state?.user, shallow);

	const navigation = useNavigation<MainStackRouteType<'ChalangeDetails'>['navigation']>();

	const queryClient = useQueryClient();

	const pastdata = queryClient.getQueryData<ChalangesResponse[]>(['recentContests', status]);

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryFn: async () => getChallange({ challangeId, status }),
		queryKey: ['getChallange', status, challangeId],
		initialData: () => {
			return pastdata?.find((d) => d._id === challangeId);
		},
		refetchOnMount: true,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true,
	});

	useEffect(() => {
		// Use `setOptions` to update the button that we previously specified
		// Now the button includes an `onPress` handler to update the count

		if (data?.artist1Detail?.artist?.name && data?.artist2Detail?.artist?.name) {
			navigation.setOptions({
				headerShown: true,
				title: `${data?.artist1Detail?.artist?.name?.split(' ')?.[0]} Vs ${data?.artist2Detail?.artist?.name?.split(' ')?.[0]}`,

				headerTitle: (props) => (
					<GradientText
						style={[
							FontSizeColorStyle['montserrat-700-18-primary-text'],
							{ fontFamily: 'Moonwalk' },
						]}
					>
						{`${data?.artist1Detail?.artist?.name?.split(' ')?.[0]} Vs ${data?.artist2Detail?.artist?.name?.split(' ')?.[0]}`}
					</GradientText>
				),
				headerLeft: (props) => (
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
				),
				headerRight: (props) => (
					<RectButton
						style={{
							flexDirection: 'row',
							gap: responsive(3),
							alignItems: 'center',
						}}
						onPress={() => navigation?.goBack()}
					>
						<GradientIcon name="notifications" size={responsive(24)} />
					</RectButton>
				),
			});
		}
	}, [data?.artist1Detail?.artist?.name, data?.artist2Detail?.artist?.name, navigation]);

	return { data, isLoading, isFetching, refetch, challangeId, status, tag, user };
};

export default useChalangeDetails;

const styles = StyleSheet.create({});
