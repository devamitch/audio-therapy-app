import type { ButtonProps } from 'react-native';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { ModalProps as NativeModalProps } from 'react-native-modal';
import ReactNativeModal from 'react-native-modal';
import Toast from 'react-native-toast-message';

import { toastConfig } from './ToastConfig';

import { isAndroid } from '@/lib/utils';
import { Colors, FontSizeColorStyle, responsive } from '@/styles';

type ContentProps = {
	onClose?: NativeModalProps['onBackdropPress'];
	children?: NativeModalProps['children'];
	title?: string;
	onSubmit?: ButtonProps['onPress'];
	submitLabel?: React.ReactNode;
};

type ModalProps = Partial<Omit<NativeModalProps, 'isVisible' | 'onBackdropPress'>> &
	ContentProps & {
		open?: boolean;
	};

const Content = ({ title, children, onSubmit, submitLabel = 'Submit' }: ContentProps) => {
	return (
		<GestureHandlerRootView style={styles.contentainer}>
			{title ? (
				<Text style={[FontSizeColorStyle['montserrat-700-15-dark-4a4a4a'], styles.title]}>
					{title}
				</Text>
			) : null}
			<ScrollView
				automaticallyAdjustKeyboardInsets
				keyboardShouldPersistTaps={'never'}
				contentContainerStyle={[styles.container]}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				{children}
			</ScrollView>
			{onSubmit ? (
				<GestureHandlerRootView style={styles.buttonContainer}>
					<Pressable onPress={onSubmit}>
						<Text>{submitLabel}</Text>
					</Pressable>
				</GestureHandlerRootView>
			) : null}
			<Toast config={toastConfig} />
		</GestureHandlerRootView>
	);
};

const Modal = ({ open, onClose, children, title, onSubmit, ...props }: ModalProps) => (
	<ReactNativeModal
		isVisible={open}
		onBackdropPress={onClose}
		swipeDirection={['right', 'left', 'up', 'down']}
		onSwipeComplete={onClose}
		onBackButtonPress={onClose}
		onDismiss={onClose}
		backdropOpacity={0.7}
		animationIn="fadeInDownBig"
		animationOut="fadeOutUpBig"
		coverScreen
		hasBackdrop
		onModalHide={onClose}
		backdropTransitionOutTiming={0}
		useNativeDriver={isAndroid ? true : false}
		useNativeDriverForBackdrop={isAndroid ? true : false}
		avoidKeyboard={false}
		{...props}
	>
		<Content title={title} onClose={onClose} onSubmit={onSubmit}>
			{open ? children : null}
		</Content>
		<Toast config={toastConfig} />
	</ReactNativeModal>
);

export default Modal;

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: responsive(9),
		paddingHorizontal: responsive(20),
		paddingVertical: responsive(20),
	},
	container: {
		borderRadius: 9,
		gap: 20,
		padding: 20,
	},
	contentainer: {
		// alignSelf: 'center',
		borderRadius: responsive(9),
		// flex: 1,
		// margin: responsive(20),
		// maxHeight: responsive(Constants?.screenHeight * 0.6),
		// width: responsive(Constants?.screenWidth * 0.9),
		...Colors['bg-dark-00181f'],
	},
	title: {
		margin: responsive(20),
	},
});
