import type { StateCreator } from 'zustand';

import type { AppSliceType } from '../types/app';
import type { UserSliceState, UserSliceType } from '../types/user';

export const initialUserSliceState = {
	_status: 'idle',
} satisfies UserSliceState;

const UserSlice: StateCreator<
	UserSliceType & AppSliceType,
	[['zustand/persist', unknown]],
	[],
	UserSliceType
> = (set) => ({
	...initialUserSliceState,
	setAccessToken(accessToken) {
		set(() => ({
			accessToken,
		}));
	},
	setUserType(userType) {
		set(() => ({ userType }));
	},
	setUser: (user) => {
		set(() => ({ user }));
	},
	setTempUser: (tempUser) => {
		set(() => ({ tempUser }));
	},
	setWallet: (wallet) => {
		set(() => {
			return {
				wallet,
			};
		});
	},
	setCompleteAuth: (isCompleteAuth) => {
		set({ isCompleteAuth });
	},
	setIsSocialAuth: (isSocialAuth) => {
		set({ isSocialAuth });
	},
	clearDonorAmount() {
		set(({ donor }) => ({ donor: { ...donor, amount: undefined } }));
	},
});

export default UserSlice;
