import * as SecureStore from 'expo-secure-store';
import type { StateStorage } from 'zustand/middleware';

export const storage = SecureStore;

const ZustandStorage = {
	getItem: async (name) => {
		const value = await storage.getItemAsync(name);

		return value;
	},
	removeItem: async (name) => {
		await storage.deleteItemAsync(name);
	},
	setItem: async (name, value) => {
		await storage.setItemAsync(name, value);
	},
} satisfies StateStorage;

export default ZustandStorage;
