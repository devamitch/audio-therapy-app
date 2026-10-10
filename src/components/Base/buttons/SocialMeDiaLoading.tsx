import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { MotiView } from 'moti';

import { FontSizeColorStyle, responsive } from '@/styles';

type SocialMeDiaLoadingProps = {
	socialLoading?: boolean;
	backendConnecting?: boolean;
	from?: number;
	animate?: number;
};

export const SocialMeDiaLoading = ({
	socialLoading,
	backendConnecting,
	from = 100,
	animate = 300,
}: SocialMeDiaLoadingProps) => (
	<MotiView
		style={[styles.loadingText, { top: responsive(from) }]}
		from={{
			translateY:
				socialLoading || backendConnecting ? -responsive(from) : -responsive(animate),
		}}
		animate={{
			translateY:
				socialLoading || backendConnecting ? -responsive(from) : -responsive(animate),
		}}
	>
		<ActivityIndicator color={'white'} />
		<Text style={FontSizeColorStyle['montserrat-600-12-white']}>
			{socialLoading ? 'Connecting with SocialMedia ' : 'Connecting with our server '}
			{'Please Wait ...'}
		</Text>
	</MotiView>
);

export default SocialMeDiaLoading;

const styles = StyleSheet.create({
	loadingText: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		gap: responsive(5),
		justifyContent: 'center',
		left: 0,
		padding: responsive(5),
		position: 'absolute',
		right: 0,
	},
} as const);
