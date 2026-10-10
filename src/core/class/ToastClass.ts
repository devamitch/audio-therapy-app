import useToastStore from '../store/toastStore';
import { Durations, ToastTypes } from '../store/types/toastypes';

export interface ToastInterface {
	hide: () => void;
	error: (text: string, description?: string, retry?: () => void) => void;
	retry: (text: string, tryagain?: () => void) => void;
	info: (text: string, description?: string, retry?: () => void) => void;
	success: (text: string, description?: string, retry?: () => void) => void;
	succeess: (text: string, description?: string, retry?: () => void) => void;
}

class ToastClass implements ToastInterface {
	toast = (
		type: 'error' | 'success' | 'info' | 'retry',
		text: string,
		description?: string,
		retry?: () => void
	) => {
		const showToast = useToastStore.getState().showToast;

		const hideToast = useToastStore.getState().hideToast;

		showToast({
			type,
			title: text,
			subtitle: '',
			description,
			duration: type === 'error' || type === 'retry' ? Durations.long : Durations.short,
		});

		// Hide toast after duration
		setTimeout(
			() => {
				hideToast();
			},
			type === 'error' || type === 'retry' ? Durations.long : Durations.short
		);
	};

	hide = () => useToastStore.getState().hideToast();

	error = (text: string, description?: string, retry?: () => void) => {
		return this.toast(ToastTypes.error, text, description, retry);
	};

	success = (text: string, description?: string, retry?: () => void) => {
		return this.toast(ToastTypes.success, text, description, retry);
	};
	succeess = (text: string, description?: string, retry?: () => void) => {
		return this.toast(ToastTypes.success, text, description, retry);
	};

	info = (text: string, description?: string, retry?: () => void) => {
		return this.toast(ToastTypes.info, text, description, retry);
	};

	retry = (text: string, tryagain?: () => void) => {
		return this.toast('retry', text, tryagain);
	};
}

export default ToastClass;
