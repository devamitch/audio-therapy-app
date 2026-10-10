import type { StateCreator } from 'zustand';

import type { AppSliceState, AppSliceType } from '../types/app';
import type { UserSliceType } from '../types/user';

export const initialAppSliceState: AppSliceState = {
	_hydrate: true,
	fcmToken: '',
	hasWallet: false,
	showOnboarding: true,
	takeTour: true,
	showIntro: true,
	skipped: false,
};

const AppSlice: StateCreator<
	AppSliceType & UserSliceType,
	[['zustand/persist', unknown]],
	[],
	AppSliceType
> = (set) => ({
	...initialAppSliceState,
	hydrate: () => {
		set(() => ({
			_hydrate: false,
		}));
	},
	setHasWallet: (hasWallet) =>
		set(() => ({
			hasWallet,
		})),
	setShowOnboarding: (showOnboarding) =>
		set(() => ({
			showOnboarding,
		})),
	setShowIntro: (showIntro) =>
		set(() => ({
			showIntro,
		})),
	setSkipped: (skipped) =>
		set(() => ({
			skipped,
		})),
	setTakeTour: (takeTour) =>
		set(() => ({
			takeTour,
		})),
});

export default AppSlice;
