import { statusCodes } from '@react-native-google-signin/google-signin';
import { isAxiosError } from 'axios';

import { toast } from './toast';

type ErrorCode = Error & {
	code?: string;
};

export const handleError = (error: unknown, isToast = true) => {
	if (isToast) {
		if ((error as ErrorCode)?.code) {
			if ((error as ErrorCode)?.code === statusCodes.SIGN_IN_CANCELLED) {
				return toast.error('Oporation Cancelled');
			} else if ((error as ErrorCode)?.code === statusCodes.IN_PROGRESS) {
				return toast.error('Oporation in progress... Please wait ...');
			} else if ((error as ErrorCode)?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				return toast.error('Play service not available');
			} else if ((error as ErrorCode)?.code === statusCodes.SIGN_IN_REQUIRED) {
				return toast.error('You are not signed in');
			}
			if (isAxiosError(error)) {
				return toast.error(
					error.response?.data?.message ||
						error.response?.data?.error?.message ||
						error?.response?.data?.error?.error ||
						error?.response?.data?.error ||
						error.message
				);
			}

			return toast.error('Oporation failed');
		}

		if (isAxiosError(error)) {
			return toast.error(
				error.response?.data?.message ||
					error.response?.data?.error?.message ||
					error?.response?.data?.error?.error ||
					error?.response?.data?.error ||
					error.message
			);
		}

		return toast.error((error as Error).message);
	} else {
		if (isAxiosError(error)) {
			throw new Error(
				error.response?.data?.error?.message ||
					error?.response?.data?.error?.error ||
					error?.response?.data?.error ||
					error.message
			);
		}
		throw new Error((error as Error).message);
	}
};
