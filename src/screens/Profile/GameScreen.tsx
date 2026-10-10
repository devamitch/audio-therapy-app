import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';

import { PrimaryButton } from '@/components';
import { GameStackRouteType } from '@/navigation/main/GeameStack';
import { ContestSvg, LeagueSvg } from '@/navigation/main/Svgs';
import DashBoard from '@/screens/Profile/DashBoard';
import { FontSizeColorStyle } from '@/styles';

const GameScreen = ({ navigation }: GameStackRouteType<'MainGame'>) => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<DashBoard />
			<BlurView
				style={[StyleSheet.absoluteFill, styles.container]}
				tint="dark"
				experimentalBlurMethod={'dimezisBlurView'}
			>
				<View style={styles.itemsContainer}>
					<Text allowFontScaling style={FontSizeColorStyle['montserrat-700-16-white']}>
						Select the Game Mode{' '}
					</Text>
					<PrimaryButton
						label="League"
						startIcon={<LeagueSvg />}
						onPress={() => navigation.navigate('Leagues')}
					/>
					<PrimaryButton
						label="Contest"
						startIcon={<ContestSvg />}
						onPress={() => navigation.navigate('Contests')}
					/>
				</View>
			</BlurView>
		</GestureHandlerRootView>
	);
};

export default GameScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		postion: 'absolute',
	},
	itemsContainer: {
		gap: 10,
		width: 200,
	},
});
