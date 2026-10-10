import type { GestureResponderEvent, TouchableHighlightProps } from 'react-native';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import type { BaseToastProps } from 'react-native-toast-message';
import { ErrorToast, InfoToast, SuccessToast } from 'react-native-toast-message';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { FontSizeColorStyle, responsive } from '@/styles';

export const hideToast = () => Toast.hide();
interface CustomToastProps extends BaseToastProps {
	props: {
		retry?: () => void;
	};
}

const borderLeftColor = '#2196f3' as const;

const ICON_SIZE = responsive(20);

const RetryButton = ({ onPress }: { onPress: TouchableHighlightProps['onPress'] }) => {
	const retry = (event: GestureResponderEvent) => {
		if (onPress) {
			hideToast();
			onPress(event);
		}
	};

	return (
		<View style={styles.retryContainer}>
			<TouchableHighlight style={styles.button} onPress={retry} underlayColor="#233323">
				<Text style={FontSizeColorStyle['montserrat-300-12-white']}>Retry</Text>
			</TouchableHighlight>
			<AntDesign name="closecircle" size={ICON_SIZE} color="grey" onPress={hideToast} />
		</View>
	);
};

export const toastConfig = {
	error: (props: BaseToastProps) => (
		<ErrorToast
			style={styles.error}
			text1Style={FontSizeColorStyle['montserrat-600-13-white']}
			// text2Style={{ color: '#ffff' }}
			text2Style={FontSizeColorStyle['montserrat-600-13-white']}
			renderLeadingIcon={() => <AntDesign name="warning" size={ICON_SIZE} color="#fff" />}
			renderTrailingIcon={() => (
				<AntDesign name="closecircle" size={ICON_SIZE} color="#fff" onPress={hideToast} />
			)}
			text2NumberOfLines={2}
			{...props}
		/>
	),
	info: (props: BaseToastProps) => (
		<InfoToast
			style={styles.info}
			text1Style={FontSizeColorStyle['montserrat-500-13-black']}
			text2Style={FontSizeColorStyle['montserrat-300-xs-black']}
			renderLeadingIcon={() => <MaterialIcons name="info" size={ICON_SIZE} color="#f1f1f1" />}
			renderTrailingIcon={() => (
				<AntDesign
					name="closecircle"
					size={ICON_SIZE}
					color="#f1f1f1"
					onPress={hideToast}
				/>
			)}
			text2NumberOfLines={2}
			{...props}
		/>
	),
	retry: ({ props, ...rest }: CustomToastProps) => (
		<ErrorToast
			style={styles.error}
			text1Style={FontSizeColorStyle['montserrat-500-13-white']}
			text2Style={FontSizeColorStyle['montserrat-600-xs-white']}
			renderLeadingIcon={() => (
				<AntDesign name="closecircle" size={ICON_SIZE} color="#f32121" />
			)}
			renderTrailingIcon={() => <RetryButton onPress={props.retry} />}
			contentContainerStyle={styles.contentContainer}
			{...rest}
		/>
	),
	success: (props: BaseToastProps) => (
		<SuccessToast
			style={styles.success}
			text1Style={FontSizeColorStyle['montserrat-500-13-white']}
			text2Style={FontSizeColorStyle['montserrat-600-sm-white']}
			renderLeadingIcon={() => (
				<Ionicons name="checkmark-circle" size={ICON_SIZE} color="white" />
			)}
			renderTrailingIcon={() => (
				<AntDesign name="closecircle" size={ICON_SIZE} color="#fff" onPress={hideToast} />
			)}
			text2NumberOfLines={2}
			{...props}
		/>
	),
};
const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		backgroundColor: '#020202',
		borderRadius: responsive(5),
		justifyContent: 'center',
		marginRight: responsive(10),
		padding: responsive(8),
	},
	contentContainer: {
		alignItems: 'center',
		padding: responsive(8),
	},
	error: {
		alignItems: 'center',
		backgroundColor: '#125B6F',
		borderLeftColor: '#770737',
		height: responsive(60),
		padding: responsive(8),
		width: '92%',
		tintColor: 'white',
	},
	info: {
		alignItems: 'center',
		backgroundColor: '#EB5519',
		borderLeftColor: '#C5353A',
		height: responsive(60),
		padding: responsive(8),
		width: '92%',
		tintColor: 'white',
	},
	retryContainer: {
		flexDirection: 'row',
		padding: responsive(8),
	},
	success: {
		alignItems: 'center',
		backgroundColor: '#228B22',
		borderLeftColor: '#023020',
		height: responsive(40),
		padding: responsive(8),
		width: '92%',
	},
} as const);
