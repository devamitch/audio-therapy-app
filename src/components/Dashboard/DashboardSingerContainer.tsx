import { StyleSheet, View } from 'react-native';

import DashboardSingersCards from './DashboardSingersCards';
import DashboardStatusWrapper from './DashboardStatusWrapper';

import { responsive } from '@/styles';

const DashboardSingerContainer: React.FC<{
	images?: string[];
	singers?: number;
	contests?: number;
	leagues?: number;
}> = ({ images, singers = 0, leagues = 0, contests = 0 }) => (
	<View style={styles.container}>
		<DashboardSingersCards images={images} count={singers} />
		<DashboardStatusWrapper contests={contests} leagues={leagues} />
	</View>
);

export default DashboardSingerContainer;

const styles = StyleSheet.create({
	container: {
		// alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		gap: responsive(15),
		// width: '100%',
	},
} as const);
