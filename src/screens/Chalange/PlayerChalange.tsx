import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import ChalangePlayerWrapper, {
	ChalangePlayerWrapperType,
} from '@/components/Chalange/ChalangePlayerWrapper';
import PlayerAvatarGroup, { PlayerAvatarGroupType } from '@/components/Chalange/PlayerAvatarGroup';
import { windowHeight } from '@/lib/utils';
import { responsive } from '@/styles';

type PlayerChalangeProps = PlayerAvatarGroupType & ChalangePlayerWrapperType;

const PlayerChalange: React.FC<PlayerChalangeProps> = ({
	players,
	player1,
	player2,
	artist1Detail,
	artist2Detail,
	onPlay,
	onBet,
	chalangeId,
	bidAmount,
	shouldShowBet = true,
	...props
}) => (
	<Animated.View style={styles.container}>
		<ChalangePlayerWrapper
			shouldShowBet={props?.status === 1}
			{...{
				players,
				artist1Detail,
				artist2Detail,
				player1,
				player2,
				onPlay,
				onBet,
				chalangeId,
				bidAmount,
			}}
		/>
		<PlayerAvatarGroup
			first={(artist1Detail || players?.[0] || player1)?.artist?.name}
			second={(artist2Detail || players?.[1] || player2)?.artist?.name}
			totatBets={props?.totatBets}
			numOfTokenBet={+(props?.totatBets || 0) * +(bidAmount || 0)}
			{...props}
		/>
	</Animated.View>
);

export default PlayerChalange;

const styles = StyleSheet.create({
	container: {
		// backgroundColor: 'red',
		// borderBottomWidth: 10,
		// borderColor: 'blue',
		flex: 1,
		height: windowHeight - responsive(152),
		overflow: 'hidden',
		paddingBottom: responsive(0),
		paddingHorizontal: responsive(30),
		position: 'relative',
		width: '100%',
	},
});
