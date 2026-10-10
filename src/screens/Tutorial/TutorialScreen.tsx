import { IMAGES } from '@/assets';
import GradientText from '@/components/Base/GradientText';
import { GradientButtonDiposit } from '@/components/Dashboard/DashoardDipositContainer';
import { useAppStore } from '@/core/store';
import { navigateAndSimpleReset } from '@/navigation/navigation';
import { RootStackNavigationType } from '@/navigation/types';
import { FontSizeColorStyle, responsive } from '@/styles';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TutorialScreen = ({ navigation }: { navigation: RootStackNavigationType }) => {
	const setTakeTour = useAppStore(useCallback((state) => state.setTakeTour, []));

	const handleDone = useCallback(() => {
		setTakeTour(false);
		navigation?.replace('Main');
	}, [setTakeTour, navigation]);

	const takeTour = useCallback(() => {
		// Alert.alert('TutorialSliders');
		navigateAndSimpleReset('TutorialSliders');
		// navigation?.replace('TutorialSliders');
	}, [setTakeTour, navigation]);

	return (
		<ImageBackground source={IMAGES.bg_tutorial} style={styles.container} resizeMode="cover">
			<StatusBar style="light" backgroundColor="transparent" translucent />
			<GestureHandlerRootView style={styles.gestureContainer}>
				<View style={styles.imageWrapper}>
					<FastImage source={IMAGES.icon} style={styles.icon} />
				</View>
				<View style={styles.textWrapper}>
					<GradientText
						style={FontSizeColorStyle['lato-900-24-dark-313131']}
						colors={['#0A7593', '#FFFFFF']}
						start={{ x: 0, y: 1 }}
						end={{ x: 1, y: 0 }}
					>
						Stay Ahead with test
					</GradientText>
					<Text style={FontSizeColorStyle['lato-600-16-light-f1f1f1']}>
						Get the Latest Updates and Strategies for Gaming on Music
					</Text>
					<Text style={FontSizeColorStyle['heebo-400-sm-grey-b6b6b6']}>
						Customize your Music-X experience. Choose your favorite music genres,
						personalize your gaming strategy, and enjoy a tailored betting experience.
					</Text>
				</View>
				<View style={styles.buttonWrapper}>
					<GradientButtonDiposit label="Skip" varient="color1" onPress={handleDone} />
					<GradientButtonDiposit label="Take Tour" varient="color2" onPress={takeTour} />
				</View>
			</GestureHandlerRootView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: screenWidth,
		height: screenHeight,
	},
	gestureContainer: {
		flex: 1,
		paddingBottom: responsive(100),
		padding: responsive(40),
		justifyContent: 'flex-end',
		gap: responsive(50),
	},
	imageWrapper: {
		gap: responsive(20),
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	icon: {
		width: responsive(180),
		height: responsive(180),
	},
	textWrapper: {
		gap: responsive(15),
		paddingBottom: responsive(40),
		width: '100%',
	},
	buttonWrapper: {
		gap: responsive(10),
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
	},
});

export default TutorialScreen;
