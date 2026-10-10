// import { RouteProp,  useRoute } from '@react-navigation/core';

import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

import PlayerChalange from './PlayerChalange';
import useChalangeDetails from './useChalangeDetailsData';
import useChalangePlayMusic from './useChalangePlayMusic';

import { ScrollLayout } from '@/components';
import { windowHeight } from '@/lib/utils';
import { MainStackRouteType } from '@/navigation/main/MainStack';
import { LayoutStyle, responsive } from '@/styles';

const ChalangeDetails = ({ navigation, route }: MainStackRouteType<'ChalangeDetails'>) => {
	const { data, isLoading, isFetching, refetch, challangeId, status, tag, user } =
		useChalangeDetails();

	const { onPlayClick, music, resourse, onBet } = useChalangePlayMusic({ data, refetch });

	return (
		<ScrollLayout
			refreshing={isFetching || isLoading}
			onRefresh={async () => refetch()}
			contentContainerStyle={styles.container}
		>
			<StatusBar animated />
			<Animated.View style={[LayoutStyle.fill, styles.wrapper]}>
				<PlayerChalange
					onBet={onBet}
					onPlay={onPlayClick}
					chalangeId={data?._id}
					createdOn={new Date(data?.publishedOn || '')}
					totatBets={data?.totalVotes}
					avatars={data?.users?.map((i) => i?.icon || '') || []}
					shouldShowBet={false}
					{...data}
				/>
			</Animated.View>
		</ScrollLayout>
	);
};

export default ChalangeDetails;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 0,
		position: 'relative',
	},

	wrapper: {
		height: windowHeight - responsive(152 + 50),
		overflow: 'hidden',
		position: 'relative',
	},
});
