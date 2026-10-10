import { lazy } from 'react';

export * from './Heading';
export { default as Layout } from './Layout';
export { default as lazyLoad } from './lazyLoad';
export { default as Loader } from './Loader';
export * from './Loaders';
export * from './Menu';
export * from './Skeletons';
export { default as Toast } from './Toast';

export const BottomSheet = lazy(async () => import('./BottomSheet'));
