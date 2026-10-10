import { ImageBackground, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { DashboardTutorialSinger, DashboardTutorialUser } from './DashboardTutorial';
import TutorialScreen from './TutorialScreen';

import { IMAGES } from '@/assets';
import { windowHeight, windowWidth } from '@/lib/utils';

const SCREENS = [DashboardTutorialSinger, DashboardTutorialUser];

const TutorialSlider = () => {
	return (
		<ImageBackground source={IMAGES.bg_tutorial} style={styles.container} resizeMode={'cover'}>
			<StatusBar style={'light'} backgroundColor="transparent" translucent animated />
			{/* <TutorialSliders />
			 */}
			<TutorialScreen />
		</ImageBackground>
	);
};

export default TutorialSlider;

const styles = StyleSheet.create({
	container: { flex: 1, height: windowHeight, width: windowWidth },
	bottom_tab_tutorial: {
		position: 'absolute',
		bottom: -5,
		right: -50,
		left: 0,
		width: windowWidth + 50,
		height: 72,
	},
} as const);
