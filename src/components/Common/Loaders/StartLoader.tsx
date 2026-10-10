import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { IMAGES } from '@/assets';
import { screenHeight, screenWidth } from '@/lib/utils';
import { LayoutStyle } from '@/styles';

const Loader = () => (
	<GestureHandlerRootView style={[LayoutStyle.fillBlack, styles.container, LayoutStyle.center]}>
		<StatusBar style={'light'} backgroundColor="transparent" translucent animated />
		<FastImage style={styles.image} source={IMAGES.splash} />
	</GestureHandlerRootView>
);

export default Loader;

const styles = StyleSheet.create({
	image: {
		height: screenHeight,
		width: screenWidth,
	},
	container: {
		height: screenHeight,
		width: screenWidth,
		flex: 1,
	},
} as const);
