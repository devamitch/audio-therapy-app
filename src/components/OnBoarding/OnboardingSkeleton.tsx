import { StyleSheet, View } from 'react-native';

import { MotiWrapper, Spacer, SquareSkeleton } from '@/components';
import { responsive } from '@/styles';

const justifyContent = 'center';

const OnboardingSkeleton = () => (
	<MotiWrapper style={{ justifyContent }}>
		<SquareSkeleton width={230} height={100} />
		<Spacer height={40} />
		<View>
			<SquareSkeleton width="70%" height={20} />
			<Spacer height={5} />
			<SquareSkeleton width="100%" height={20} />
			<Spacer height={5} />
			<SquareSkeleton width="60%" height={20} />
		</View>
		<Spacer height={40} />
		<View style={styles.inner}>
			<SquareSkeleton width={180} height={180} />
			<SquareSkeleton width={180} height={180} />
		</View>
		<Spacer height={30} />
		<View>
			<SquareSkeleton width="100%" height={10} />
			<Spacer height={8} />
			<SquareSkeleton width="100%" height={10} />
			<Spacer height={8} />
			<SquareSkeleton width="70%" height={10} />
		</View>
	</MotiWrapper>
);

const styles = StyleSheet.create({
	inner: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		padding: responsive(10),
		paddingHorizontal: responsive(20),
		gap: responsive(20),
	},
} as const);

export default OnboardingSkeleton;
