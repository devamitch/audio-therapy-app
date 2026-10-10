import type { AxiosHeaders, RawAxiosRequestHeaders, REQUEST_CONFIG } from 'axios';

import { useAppStore } from '@/core/store';

export function getHeaders(): RawAxiosRequestHeaders | AxiosHeaders {
	const accessToken = useAppStore?.getState()?.accessToken || '';

	console.log({ accessToken });
	console.log({ state: useAppStore?.getState() });

	return {
		Authorization: `Bearer ${accessToken}`,
		'x-auth-token': accessToken,
		...(accessToken ? { token: `Bearer ${accessToken}` } : {}),
	};
}
export function getParams(): REQUEST_CONFIG['params'] {
	const userId = useAppStore?.getState()?.user?.id || useAppStore?.getState()?.user?._id || '';

	console.log({ userId });

	return userId
		? {
				userId,
				id: userId,
			}
		: {};
}
