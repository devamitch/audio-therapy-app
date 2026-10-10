import { StyleSheet, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { MainStackNavigationType } from '@/navigation/main/MainStack';
import { FontSizeColorStyle, responsive } from '@/styles';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const Button = Animated.createAnimatedComponent(RectButton);

export const GradientButtonDiposit: React.FC<{
	label?: React.ReactNode;
	varient?: 'color1' | 'color2';
	onPress?: RectButtonProps['onPress'];
}> = ({ label, varient = 'color1', onPress }) => {
	const isPressed = useSharedValue(false);

	const animatedStyle = useAnimatedStyle(() => {
		const scale = withSpring(isPressed.value ? 0.9 : 1, { stiffness: 100 });

		const opacity = withTiming(isPressed.value ? 0.8 : 1, {
			duration: 150,
			easing: Easing.linear,
		});

		return {
			transform: [{ scale }],
			opacity,
			overflow: 'hidden',
		};
	});

	return (
		<Animated.View
			style={[
				{
					flex: 1,
					height: responsive(65),
					borderRadius: responsive(9),
					overflow: 'hidden',
				},
				animatedStyle,
			]}
		>
			<Button
				onBegan={() => {
					isPressed.value = true;
				}}
				onActivated={() => {
					isPressed.value = true;
				}}
				onFailed={() => {
					isPressed.value = false;
				}}
				onCancelled={() => {
					isPressed.value = false;
				}}
				onEnded={() => {
					isPressed.value = false;
				}}
				onLongPress={() => {
					isPressed.value = false;
				}}
				style={{ flex: 1, borderRadius: responsive(9), overflow: 'hidden' }}
				onPress={onPress}
			>
				<AnimatedGradient
					colors={varient === 'color1' ? ['#003F3B', '#00667C'] : ['#00495E', '#00BCFD']}
					start={{ x: 0.3, y: 1 }}
					end={{ x: 1, y: 0 }}
					style={{
						flexDirection: 'row',
						paddingHorizontal: responsive(20),
						paddingVertical: responsive(10),
						alignItems: 'center',
						// justifyContent: 'center',
						justifyContent: 'space-between',
						overflow: 'hidden',
						flex: 1,
					}}
				>
					<Animated.Text style={FontSizeColorStyle['montserrat-500-18-white']}>
						{label}
					</Animated.Text>

					{true ? (
						<Entypo name="chevron-right" size={responsive(24)} color="white" />
					) : null}
				</AnimatedGradient>
			</Button>
		</Animated.View>
	);
};

const DashoardDipositContainer = () => {
	const navigation = useNavigation<MainStackNavigationType>();

	return (
		<View style={styles.container}>
			<GradientButtonDiposit
				label="Deposit"
				varient="color1"
				onPress={() => navigation.navigate('Diposit')}
			/>
			<GradientButtonDiposit
				label="Withdraw"
				varient="color2"
				onPress={() => navigation.navigate('Withdraw')}
			/>
		</View>
	);
};

export default DashoardDipositContainer;

const styles = StyleSheet.create({
	container: { flexDirection: 'row', gap: responsive(20), overflow: 'hidden', width: '100%' },
});
