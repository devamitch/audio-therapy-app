import { StyleSheet, Text, View } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
// import { PanGestureHandler, RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

import GestureButton2 from '../Base/buttons/GestureButton';

import { MainStackNavigationType } from '@/navigation/main/MainStack';
import { FontSizeColorStyle, responsive } from '@/styles';

export const GestureButton = GestureButton2;

const DashboardStatusWrapperButtton: React.FC<
	RectButtonProps & { text?: string; count?: number }
> = ({ text, count = 0, ...props }) => {
	return (
		<GestureButton
			label={''}
			color={''}
			btnStyle={styles.btnContainer}
			gradientStyle={styles.button}
			{...props}
		>
			<View style={styles.buttonContent}>
				<Text style={FontSizeColorStyle['montserrat-600-xxs-white']}>{text}</Text>
				<Text style={FontSizeColorStyle['montserrat-500-xxl-white']}>{count}</Text>
			</View>
		</GestureButton>
	);
};

const DashboardStatusWrapper: React.FC<{ leagues?: number; contests?: number }> = ({
	leagues,
	contests,
}) => {
	const navigation = useNavigation<MainStackNavigationType>();

	return (
		<View style={styles.container}>
			<DashboardStatusWrapperButtton
				text="CONTESTS"
				count={contests}
				onPress={() => navigation.navigate('AllContests')}
			/>
			<DashboardStatusWrapperButtton
				text="LEAGUES"
				count={leagues}
				onPress={() => navigation.navigate('Leagues')}
			/>
		</View>
	);
};

export default DashboardStatusWrapper;

const styles = StyleSheet.create({
	container: { flex: 1, gap: responsive(15) },
	btnContainer: {
		flex: 1,

		borderRadius: responsive(23),
	},
	button: {
		flex: 1,
		gap: responsive(10),
		paddingVertical: responsive(12),
		paddingHorizontal: responsive(17),
		borderRadius: responsive(23),
	},
	buttonContent: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
} as const);
