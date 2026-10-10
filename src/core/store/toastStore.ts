// toastStore.ts
import { z } from 'zod';
import create from 'zustand';

const toastSchema = z.object({
	type: z.enum(['error', 'success', 'info', 'retry']),
	title: z.string().optional(),
	subtitle: z.string().optional(),
	description: z.string().optional(),
	duration: z.number().optional(),
});

export type ToastType = z.infer<typeof toastSchema>;

interface ToastState {
	toast: ToastType | null;
	showToast: (toast: ToastType) => void;
	hideToast: () => void;
}

const useToastStore = create<ToastState>((set) => ({
	toast: null,
	showToast: (toast) => {
		const parsedToast = toastSchema.parse(toast);

		set({ toast: parsedToast });
	},
	hideToast: () => set({ toast: null }),
}));

export default useToastStore;
