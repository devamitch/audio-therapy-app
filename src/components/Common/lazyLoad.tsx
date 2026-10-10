import { ComponentType, lazy, ReactNode, Suspense } from 'react';
import ErrorBoundary, { ErrorBoundaryProps } from 'react-native-error-boundary';

import { Loader } from './Loaders';
import { Layout } from '.';

type RetryImportOptions = {
	retries?: number;
	delayDuration?: number;
	fallback?: ReactNode;
	errorFallback?: ErrorBoundaryProps['FallbackComponent'];
	onError?: ErrorBoundaryProps['onError'];
	layout?: 'bg' | 'donorIntro' | 'volunteerIntro' | false;
};

async function delay(ms: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function getComponentLoader<T>(
	importFunc: () => Promise<{ default: ComponentType<T> }>,
	options: RetryImportOptions = {}
): (props: T) => JSX.Element {
	const { retries = 3, delayDuration = 500, fallback, errorFallback, onError, layout } = options;

	try {
		const LazyComponent = lazy(importFunc);

		const WrappedLazyComponent = (props: T) => (
			<ErrorBoundary FallbackComponent={errorFallback} onError={onError}>
				<Suspense fallback={fallback || <Loader />}>
					{!layout ? (
						<LazyComponent {...props} />
					) : (
						<Layout bg={layout}>
							<LazyComponent {...props} />
						</Layout>
					)}
				</Suspense>
			</ErrorBoundary>
		);

		return WrappedLazyComponent;
	} catch (error) {
		console.error('Error loading component:', error);
		delay(delayDuration);

		if (retries > 0) {
			return getComponentLoader(importFunc, {
				retries: retries - 1,
				delayDuration,
				fallback,
				errorFallback,
				onError,
				layout,
			});
		} else {
			throw new Error('Failed to load component after multiple retries.');
		}
	}
}

export default getComponentLoader;
