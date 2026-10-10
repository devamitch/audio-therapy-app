import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { StateSliceType } from './types/state';
import { StateSlice } from './slices';

export const useStateStore = create<StateSliceType>()(
	subscribeWithSelector(
		devtools(
			immer((...a) => ({
				...StateSlice(...a),
			}))
		)
	)
);

export default useStateStore;
