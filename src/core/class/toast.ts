import Toast from 'react-native-toast-message';

import { FontSizeColorStyle } from '@/styles';

export interface ToastInterface {
	hide: () => void;
	error: (text: string, retry?: () => void) => void;
	retry: (text: string, tryagain?: () => void) => void;
	info: (text: string, retry?: () => void) => void;
	success: (text: string, retry?: () => void) => void;
}

export class ToastClass implements ToastInterface {
	toast = (type: 'error' | 'success' | 'info' | 'retry', text: string, retry?: () => void) => {
		return Toast.show({
			autoHide: true,
			bottomOffset: 10,
			position: 'bottom',
			props: {
				retry,
			},
			text2: text,
			text1Style: FontSizeColorStyle['montserrat-600-sm-white'],
			text2Style: FontSizeColorStyle['montserrat-500-xs-white'],

			type,
			visibilityTime: type === 'error' || type === 'retry' ? 4000 : 3000,
		});
	};

	hide = () => Toast.hide();

	error = (text: string, retry?: () => void) => {
		return this.toast('error', text, retry);
	};
	success = (text: string, retry?: () => void) => {
		return this.toast('success', text, retry);
	};
	info = (text: string, retry?: () => void) => {
		return this.toast('info', text, retry);
	};
	retry = (text: string, tryagain?: () => void) => {
		return this.toast('retry', text, tryagain);
	};
}
