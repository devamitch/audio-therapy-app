import type { StateCreator } from 'zustand';

import type { SliceState, StateSliceType } from '../types/state';

import { toast } from '@/lib/utils';

export const initialSliceState = {
	pageIndex: 0,
	bottomSheetOpen: false,
} satisfies SliceState;

const StateSlice: StateCreator<StateSliceType> = (set) => ({
	...initialSliceState,

	reset: () => set(initialSliceState),
	setBottomSheetOpen: (bottomSheetOpen) => {
		set({
			bottomSheetOpen,
		});
	},
	setPageIndex: (pageIndex) =>
		set({
			pageIndex,
		}),
	setTempAppleToken: (tempAppleToken) =>
		set({
			tempAppleToken,
		}),
	setSocialLoading: (socialLoading) => set({ socialLoading }),
	setBackendConnecting: (backendConnecting) => set({ backendConnecting }),
	selectTempStar: (type, artist) =>
		set((prev) => {
			const prevData = prev.tempSelectedStars;

			const requirement = { headliners: 3, testStars: 5, risingStars: 3 }[type] as const;

			const thisData = prevData?.[type] || [];

			const noDataCond = thisData?.length < 1;

			const foundIndex = thisData?.findIndex((item) => artist?._id === item?._id);

			const noMatchedDataCond = foundIndex === -1;

			const forEmptyData = [artist];

			const stars = prev?.tempSelectedStars?.[type] || [];

			const forPushData = stars?.length >= requirement ? stars : [...stars, artist];

			if (stars?.length >= requirement && noMatchedDataCond) {
				toast.error(`You have already chose ${requirement} areists`);
			}
			const forFilterData =
				prev?.tempSelectedStars?.[type]?.filter((item) => item?._id !== artist?._id) || [];

			const tempSelectedStars = {
				...prevData,
				[type]: noDataCond ? forEmptyData : noMatchedDataCond ? forPushData : forFilterData,
			};

			return { ...prev, tempSelectedStars };
		}),
	clearStars: () => set({ tempSelectedStars: undefined }),
	setTempStars: (tempSelectedStars) => set({ tempSelectedStars }),
});

export default StateSlice;
