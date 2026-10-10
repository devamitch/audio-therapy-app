import { MMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

export const mmkvStorage = new MMKV({
	encryptionKey: 'test@1234',
	id: 'zustand_storage',
});

const ZustandStorage = {
	getItem: async (name) => {
		const value = mmkvStorage.getString(name) ?? null;

		return value;
	},
	removeItem: async (name) => {
		return mmkvStorage.delete(name);
	},
	setItem: async (name, value) => {
		return mmkvStorage.set(name, value);
	},
} satisfies StateStorage;

export default ZustandStorage;
