import { StyleSheet, ViewProps } from 'react-native';
import { GestureHandlerRootView, type RectButtonProps } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
// import { BlurView } from '@react-native-community/blur';
import { LinearGradient } from 'expo-linear-gradient';

import { PrimaryButton } from '../buttons';

import type { CreatorHeaderProps } from './Header';
import Header from './Header';

import { LayoutStyle } from '@/styles';

export type CreatorFormProps = CreatorHeaderProps & {
	children?: React.ReactNode | React.ReactNode[];
	submitLabel?: string;
	onSubmit?: RectButtonProps['onPress'];
	isHeader?: boolean;
	style?: ViewProps['style'];
	innerStyle?: ViewProps['style'];
	loading?: boolean;
	footer?: React.ReactNode;
};

const Form: React.FC<CreatorFormProps> = ({
	children,
	submitLabel = 'Submit',
	onSubmit,
	isHeader,
	style,
	innerStyle,
	loading,
	footer,
	...props
}) => {
	return (
		<LinearGradient
			colors={['rgba(0, 0, 0, 0.80)', 'rgba(0, 0, 0, 0.00)']}
			style={{ width: '85%', borderRadius: 10 }}
			start={[0, 1]}
			end={[1, 1]}
		>
			<BlurView
				style={[styles.flex, style]}
				tint="dark"
				intensity={60}
				experimentalBlurMethod={'dimezisBlurView'}
			>
				{isHeader ? <Header {...props} /> : null}
				<KeyboardAwareScrollView
					contentContainerStyle={styles.container}
					style={[LayoutStyle.fill, { position: 'relative', width: '100%' }]}
					extraScrollHeight={-300}
					enableOnAndroid={true}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
				>
					<GestureHandlerRootView style={[LayoutStyle.fill, { gap: 15 }, innerStyle]}>
						{children}
					</GestureHandlerRootView>
				</KeyboardAwareScrollView>
				{footer ?? (
					<PrimaryButton
						label={submitLabel}
						onPress={onSubmit}
						outlineStyle={styles.pt10}
						style={{ justifyContent: 'space-between' }}
						endIcon={<Entypo name="chevron-right" size={24} color="white" />}
						labelStyle={{ fontFamily: 'Montserrat-MediumItalic' }}
						isLoading={loading}
					/>
				)}
			</BlurView>
		</LinearGradient>
	);
};

export default Form;

const styles = StyleSheet.create({
	flex: {
		// flex: 1,
		gap: 20,
		paddingHorizontal: 33,
		paddingVertical: 40,
		borderRadius: 7,
		// borderColor: '#fff',
		// borderWidth: 1,
		height: 400,
		// width: '60%',
		// backgroundColor: '#000',
	},
	pickerItem: { height: 140 },
	container: { gap: 10, width: '100%', flexGrow: 1, borderRadius: 7, position: 'relative' },
	pt10: {
		marginTop: 20,
	},
} as const);
