import { ActivityIndicator, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';
import { LinearGradient } from 'expo-linear-gradient';

import { GradientIcon } from '../Base/GradientText';

import { responsive } from '@/styles';

export const PlayPauseButton: React.FC = () => {
	const { playing, bufferingDuringPlay } = useIsPlaying();

	return (
		<LinearGradient
			colors={['rgba(0,188,253,0.8)', 'rgba(0,188,253,0.5)', 'transparent']}
			style={styles.playBtnOutline}
			start={{ x: 0, y: 0 }}
			end={{ x: 0.4, y: 0.7 }}
		>
			<RectButton
				style={styles.playBtn}
				onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
			>
				{bufferingDuringPlay ? (
					<ActivityIndicator color={'#00BCFD'} />
				) : (
					<GradientIcon
						name={playing ? 'pause' : 'play'}
						size={responsive(50)}
						color={'white'}
					/>
				)}
			</RectButton>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	containerInner: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.1)',
		borderColor: '#7CD0E8',
		borderLeftWidth: 1,
		borderRadius: responsive(100),
		height: responsive(100),
		justifyContent: 'center',
		// overflow: 'hidden',
		width: responsive(100),
	},
	playBtn: {
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		borderRadius: responsive(50),
		flex: 1,
		justifyContent: 'center',
	},
	playBtnOutline: {
		alignSelf: 'center',
		borderRadius: responsive(50),
		height: responsive(100),
		padding: responsive(2),

		overflow: 'hidden',
		// position: 'absolute',
		// top: '48%',
		width: responsive(100),
	},
});
