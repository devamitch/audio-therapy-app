import type { DIFFERENT_URLS_TYPE, TOKELESS_URLS_TYPE, URLS_TYPE } from '@/constants/urls';
import { DIFFERENT_URLS, TOKELESS_URLS, URLS } from '@/constants/urls';

export const isRegisteredURL = (url?: string): url is URLS_TYPE => {
	return Object.values(URLS).includes(url as URLS_TYPE);
};

export const isTokenLessURL = (url: URLS_TYPE): url is TOKELESS_URLS_TYPE => {
	return Object.values(TOKELESS_URLS).includes(url as TOKELESS_URLS_TYPE);
};

export const isDifferentURL = (url: URLS_TYPE): url is DIFFERENT_URLS_TYPE => {
	return Object.values(DIFFERENT_URLS).includes(url as DIFFERENT_URLS_TYPE);
};
