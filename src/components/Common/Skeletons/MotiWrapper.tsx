import { StyleSheet, ViewProps } from 'react-native';
import { MotiView } from 'moti';

import { Layout } from '@/components';
import { Colors, responsive } from '@/styles';

interface WrapperProps extends ViewProps {
	layout?: 'bg' | 'donorIntro' | 'volunteerIntro';
}

const MotiWrapper: React.FC<WrapperProps> = ({ children, style, layout }) =>
	layout === undefined ? (
		<MotiView
			transition={{
				type: 'timing',
			}}
			style={[styles.container, style]}
		>
			{children}
		</MotiView>
	) : (
		<Layout bg={layout}>
			<MotiView
				transition={{
					type: 'timing',
				}}
				style={[styles.container, style]}
			>
				{children}
			</MotiView>
		</Layout>
	);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		padding: responsive(30),
		...Colors['bg-transparent'],
	},
} as const);

export default MotiWrapper;
