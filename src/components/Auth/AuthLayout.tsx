import { ImageBackground, StyleSheet, View } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IMAGES } from '@/assets';
import { Form } from '@/components';
import { MuxicXText } from '@/components/Base/experimental/GradienText';
import { screenHeight } from '@/lib/utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsive } from '@/styles';

type AuthLayoutProps = {
	loading?: boolean;
	children?: React.ReactNode | React.ReactNode[];
	submitLabel?: string | undefined;
	onSubmit?: RectButtonProps['onPress'];
	height?: number;
	gap?: number;
	header?: React.ReactNode;
	footer?: React.ReactNode;
	background?: 'loginBg' | 'complete_profile';
	alignItems?: 'center' | 'space-between' | 'flex-start' | 'flex-end';
};

const AuthLayout: React.FC<AuthLayoutProps> = ({
	loading,
	children,
	submitLabel,
	onSubmit,
	height = 600,
	gap = 25,
	header,
	footer,
	background = 'loginBg',
	alignItems = 'center',
}) => (
	<ImageBackground source={IMAGES[background]} style={[{ flex: 1, height: screenHeight }]}>
		<StatusBar backgroundColor="transparent" style="light" />
		{/* Form */}
		<SafeAreaView style={[styles.container]}>
			<Form
				style={[styles.formContainer, { height }]}
				innerStyle={{ gap }}
				onSubmit={onSubmit}
				submitLabel={submitLabel}
				loading={loading}
				footer={footer}
			>
				<View style={styles.headerContainer}>
					{header ? (
						header
					) : (
						<MuxicXText height={responsive(24)} width={responsive(100)} />
					)}
				</View>

				{children}
			</Form>
		</SafeAreaView>
	</ImageBackground>
);

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
	},
	formContainer: {
		alignSelf: 'center',
		borderRadius: responsive(10),
		gap: responsive(10),
		height: responsive(600),
		// margin: 40,
		padding: '8%',
		width: '100%',
	},
	headerContainer: {
		// alignItems: 'center',
		flex: 1,
		marginBottom: responsive(10),
	},
});

export default AuthLayout;
