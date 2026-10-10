import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import { BlurRoundBg } from '@/components';
import { ALL_COLORS, responsive } from '@/styles';

const BlurCard: React.FC<{ children: React.ReactNode; type?: 'winner' | 'participants' }> = ({
	children,
	type = 'winner',
}) => (
	<View style={styles.border}>
		{type === 'participants' ? null : <BlurRoundBg />}

		<LinearGradient
			colors={[
				type === 'winner' ? 'rgba(10,117,147,0.5)' : 'rgba(0,0,0,0.6)',
				type === 'winner' ? 'rgba(10,117,147,0.4)' : '#rgba(0,0,0,0.6)',
				type === 'winner' ? 'rgba(10,117,147,0.2)' : '#222222',
				type === 'winner' ? 'transparent' : '#1e1e1e12',
				type === 'winner' ? 'transparent' : '#1e1e1e',
				type === 'winner' ? 'transparent' : '#000',
			]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			// end={type === 'winner' ? { x: 1, y: 1 } : { x: 0, y: 1 }}
			style={styles.wrapper}
		>
			<BlurView
				tint="dark" // tint="dark"
				experimentalBlurMethod={'dimezisBlurView'}
				style={[styles.wrapper, styles.blurWraper]}
			>
				{children}
			</BlurView>
		</LinearGradient>
	</View>
);

export default BlurCard;

const styles = StyleSheet.create({
	blurWraper: {
		flex: 1,
		gap: responsive(20),
		overflow: 'hidden',
		paddingBottom: responsive(100),
		paddingHorizontal: responsive(40),
		paddingTop: responsive(20),
	},
	border: {
		borderColor: ALL_COLORS['primary-006582'],
		borderLeftWidth: responsive(1),
		borderRadius: responsive(39),
		borderTopWidth: responsive(1),
		flex: 1,
		overflow: 'hidden',
		shadowColor: ALL_COLORS['primary-00252f'],
		shadowOffset: { width: responsive(-2), height: responsive(-2) },
		shadowOpacity: 0.25,
		shadowRadius: responsive(5),
	},

	wrapper: {
		borderRadius: responsive(39),
		flex: 1,
		overflow: 'hidden',
	},
});
