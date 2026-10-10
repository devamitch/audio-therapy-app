import { isRunningInExpoGo } from '@utils';
import { mergeDeepLeft } from 'ramda';
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { AppSliceType } from './types/app';
import type { UserSliceType } from './types/user';
import ZustandStorage from './mmkvEngine';
import { AppSlice, UserSlice } from './slices';

export const useAppStore = create<AppSliceType & UserSliceType>()(
	subscribeWithSelector(
		devtools(
			persist(
				immer((...a) => ({
					...AppSlice(...a),
					...UserSlice(...a),
				})),
				{
					getStorage: () => (isRunningInExpoGo ? ZustandStorage : ZustandStorage),
					merge: (persistedState, currentState) =>
						mergeDeepLeft(persistedState as Object, currentState),
					name: 'appPersistedStorage',
					partialize: (state) => ({
						accessToken: state.accessToken,
						hasWallet: state.hasWallet,
						showOnboarding: state.showOnboarding,
						user: state.user,
						wallet: state.wallet,
						userType: state.userType,
						showIntro: state.showIntro,
						isCompleteAuth: state.isCompleteAuth,
						skipped: state.skipped,
						takeTour: state.takeTour,
					}),
				}
			)
		)
	)
);

export default useAppStore;
