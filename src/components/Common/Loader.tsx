import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { StatusBar } from 'expo-status-bar';
import { AnimatePresence, MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

import { IMAGES } from '@/assets';
import { screenHeight, screenWidth } from '@/lib/utils';
import { LayoutStyle } from '@/styles';

const Loader = () => {
	return (
		<>
			<StatusBar style={'light'} backgroundColor="transparent" translucent animated />
			<View style={[LayoutStyle.fillBlack, { height: screenHeight }]}>
				<Skeleton height={screenHeight} width={screenWidth} />
				<AnimatePresence>
					<View style={styles.container}>
						<MotiView
							style={[styles.indicator, styles.elevation]}
							from={{
								borderRadius: 50,
								borderWidth: 0,
								height: 100,
								shadowRadius: 10,
								width: 100,
							}}
							animate={{
								borderRadius: 60,
								borderWidth: 10,
								height: 120,
								shadowRadius: 12,
								width: 120,
							}}
							transition={{
								duration: 1000,
								loop: true,
								repeatReverse: false,
								type: 'timing',
							}}
						>
							<FastImage style={styles.image} source={IMAGES.loader} />
						</MotiView>
					</View>
				</AnimatePresence>
			</View>
		</>
	);
};

export default Loader;

const styles = StyleSheet.create({
	appImage: {
		height: 50,
		width: 50,
	},
	container: {
		alignItems: 'center',
		flex: 1,
		height: screenHeight,
		justifyContent: 'center',
		position: 'absolute',
		width: screenWidth,
	},
	elevation: {
		elevation: 36,
		shadowColor: '#ffffff',
	},
	indicator: {
		alignItems: 'center',
		borderColor: '#ffffff',
		borderRadius: 50,
		// shadowRadius: 10,
		borderWidth: 6,
		display: 'flex',
		height: 100,
		justifyContent: 'center',
		shadowColor: '#ffffff',
		shadowOffset: {
			height: 1,
			width: 0,
		},
		shadowOpacity: 1,
		shadowRadius: 10,
		width: 100,
	},
	image: {
		height: screenHeight,
		width: screenWidth,
	},
} as const);
