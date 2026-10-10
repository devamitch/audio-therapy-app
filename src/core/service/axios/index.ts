// import type { AxiosError, Canceler } from 'axios';
// import axiosRequest from 'axios';
// import isEmpty from 'lodash/isEmpty';

// import { getHeaders, getParams } from './headers';
// import { isDifferentURL, isRegisteredURL, isTokenLessURL } from './verify';

// import { BASEURL } from '@/constants/urls';
// import { API_LOG } from '@/core/config/logger';
// import { toast } from '@/lib/utils';

// function apiRequest() {
// 	const CancelToken = axiosRequest.CancelToken;

// 	let cancel: Canceler = () => {};

// 	const axiosClient = axiosRequest.create({
// 		baseURL: BASEURL,
// 		headers: {
// 			Accept: 'application/json',
// 			'content-type': 'application/json',
// 			'Access-Control-Allow-Credentials': true,
// 			'Access-Control-Allow-Headers': '*',
// 			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
// 			'Access-Control-Allow-Origin': '*',
// 		},
// 		timeout: 1000, // optional timeout
// 	});

// 	axiosClient.interceptors.request.use(
// 		async function (request) {
// 			const url = request.url;

// 			if (!isRegisteredURL(url)) {
// 				console.log('Url not registered');

// 				throw new Error('Url not registered');
// 			}
// 			if (isDifferentURL(url)) {
// 				console.log('isDifferentURL');

// 				request.baseURL = '';
// 				request.url = url;
// 			}

// 			if (!isTokenLessURL(url)) {
// 				console.log('not isTokenLessURL');

// 				const headers = getHeaders();

// 				console.log({ headers });

// 				if (isEmpty(headers)) {
// 					throw new Error("Token doesn't exist");
// 				}

// 				request.headers = {
// 					...headers,
// 				};

// 				const params = getParams();

// 				const newParams = request.params ? { ...request.params, ...params } : params;

// 				request.params = newParams;
// 				console.log({ newParams });
// 				request.cancelToken = new CancelToken((c) => {
// 					cancel = c;
// 				});
// 			}

// 			console.log('Hello next');
// 			console.log('url', url);

// 			console.log({ request });

// 			return request;
// 		},
// 		async function (error: AxiosError) {
// 			API_LOG.error(error?.response?.data?.message || error?.message);

// 			if (axiosRequest.isCancel(error)) {
// 				toast.error(error.message);
// 			} else {
// 				toast.error(JSON.stringify(error, null, 4));

// 				return Promise.reject(error);
// 			}
// 		}
// 	);
// 	axiosClient.interceptors.response.use(
// 		async function (response) {
// 			return response;
// 		},
// 		async function (error: AxiosError) {
// 			console.log({ error });
// 			API_LOG.error(error?.response?.data?.message || error?.message);

// 			return Promise.reject(error as Error);
// 		}
// 	);
// 	cancel('Request canceled.');

// 	return axiosClient;
// }

// const axios = apiRequest();

// export default axios;

import type { AxiosError, Canceler } from 'axios';
import axiosRequest from 'axios';
import isEmpty from 'lodash/isEmpty';

import { getHeaders, getParams } from './headers';
import { isDifferentURL, isRegisteredURL, isTokenLessURL } from './verify';

import { BASEURL } from '@/constants/urls';
import { API_LOG } from '@/core/config/logger';
import { toast } from '@/lib/utils';

function apiRequest() {
	const CancelToken = axiosRequest.CancelToken;

	let cancel: Canceler = () => {};

	const axiosClient = axiosRequest.create({
		baseURL: BASEURL,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		timeout: 10000, // optional timeout
	});

	axiosClient.interceptors.request.use(
		async function (request) {
			const url = request.url;

			if (!isRegisteredURL(url)) {
				console.log('URL not registered');
				throw new Error('URL not registered');
			}

			if (isDifferentURL(url)) {
				console.log('isDifferentURL');
				request.baseURL = '';
				request.url = url;
			}

			if (!isTokenLessURL(url)) {
				console.log('not isTokenLessURL');
				const headers = getHeaders();

				if (isEmpty(headers)) {
					throw new Error("Token doesn't exist");
				}

				request.headers = {
					...request.headers,
					...headers,
				};

				const params = getParams();

				request.params = request.params ? { ...request.params, ...params } : params;

				request.cancelToken = new CancelToken((c) => {
					cancel = c;
				});
			}

			console.log('Request:', request);

			return request;
		},
		async function (error: AxiosError) {
			API_LOG.error(error?.response?.data?.message || error?.message);

			if (axiosRequest.isCancel(error)) {
				toast.error(error.message);
			} else {
				toast.error(JSON.stringify(error, null, 4));

				return Promise.reject(error);
			}
		}
	);

	axiosClient.interceptors.response.use(
		async function (response) {
			return response;
		},
		async function (error: AxiosError) {
			console.log({ error });
			API_LOG.error(error?.response?.data?.message || error?.message);

			return Promise.reject(error);
		}
	);

	return axiosClient;
}

const axios = apiRequest();

export default axios;
