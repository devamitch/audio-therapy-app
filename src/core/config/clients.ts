import { QueryCache, QueryClient } from '@tanstack/react-query';

import { toast } from '@/lib/utils';

export const FB_APP_ID = '917543446019028' as const;
export const clientId = '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' as const;
export const iosClientId =
	'317492842204-8i6eit2h29s7ic6l490qpojc3497g25r.apps.googleusercontent.com' as const;
export const androidClientId =
	'317492842204-gud6secmm78dd11qpc81vj19thqi021o.apps.googleusercontent.com' as const;

export const QUERY_CLIENT = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
	queryCache: new QueryCache({
		onError: (_error, query) => {
			// 🎉 only show error toasts if we already have data in the cache
			// which indicates a failed background update
			if (query.state.data !== undefined) {
				toast.error(`Something went wrong`);
			}
		},
	}),
});
