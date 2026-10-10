/* eslint-disable no-warning-comments */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	AxiosInterceptorManager,
	AxiosPromise,
	AxiosRequestConfig as AxiosRequestConfig3,
	AxiosResponse,
} from 'axios';

import type { URLS_TYPE } from '../../../constants/urls';

declare module 'axios' {
	export type COMMON_URL_CONFIG = {
		url: URLS_TYPE;
		// url: URLS_TYPE;
	};
	export interface CreateAxiosDefaults<D = any> extends Omit<AxiosRequestConfig2<D>, 'headers'> {
		headers?: RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>;
	}

	export interface AxiosRequestConfig2<D = any> extends Omit<AxiosRequestConfig3<D>, 'url'> {
		url?: URLS_TYPE;
	}

	export interface API_INSTANCE_TYPE_INTERCEPTER_REQUEST_CONFIG<T extends COMMON_URL_CONFIG>
		extends AxiosRequestConfig2<T> {
		url: URLS_TYPE;
	}

	export type REQUEST_CONFIG = API_INSTANCE_TYPE_INTERCEPTER_REQUEST_CONFIG<COMMON_URL_CONFIG>;
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface API_INSTANCE_TYPE_INTERCEPTER_REQUEST
		extends AxiosInterceptorManager<REQUEST_CONFIG> {}

	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface API_INSTANCE_TYPE_INTERCEPTER_Response
		extends AxiosInterceptorManager<AxiosResponse> {}

	export interface AxiosInstance {
		(config: REQUEST_CONFIG): AxiosPromise;
		(url: URLS_TYPE, config?: REQUEST_CONFIG): AxiosPromise;
		url?: URLS_TYPE;
		interceptors: {
			request: API_INSTANCE_TYPE_INTERCEPTER_REQUEST;
			response: API_INSTANCE_TYPE_INTERCEPTER_Response;
		};
		get<T = unknown, R = AxiosResponse<T>, D = unknown>(
			url: URLS_TYPE,
			config?: AxiosRequestConfig<D>
		): Promise<R>;
		delete<T = unknown, R = AxiosResponse<T>, D = unknown>(
			url: URLS_TYPE,
			config?: AxiosRequestConfig<D>
		): Promise<R>;
		head<T = unknown, R = AxiosResponse<T>, D = unknown>(
			url: URLS_TYPE,
			config?: AxiosRequestConfig<D>
		): Promise<R>;
		options<T = unknown, R = AxiosResponse<T>, D = unknown>(
			url: URLS_TYPE,
			config?: AxiosRequestConfig<D>
		): Promise<R>;
		post<T = unknown, R = AxiosResponse<T>, D = unknown>(
			url: URLS_TYPE,
			data?: D,
			config?: AxiosRequestConfig<D>
		): Promise<R>;
		put<T = unknown, R = AxiosResponse<T>, D = unknown>(
			url: URLS_TYPE,
			data?: D,
			config?: AxiosRequestConfig<D>
		): Promise<R>;
		patch<T = unknown, R = AxiosResponse<T>, D = unknown>(
			url: URLS_TYPE,
			data?: D,
			config?: AxiosRequestConfig<D>
		): Promise<R>;
	}
}
