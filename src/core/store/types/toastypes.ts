export const Colors = {
	primary: '#00BCFD',
	secondary: '#125B6F',
	white: '#FFFFFF',
	darkBackground: 'rgba(18, 91, 111, 0.7)',
} as const;

export const Sizes = {
	toastHeight: 80,
	iconSize: 24,
	textSize: 16,
	borderRadius: 8,
} as const;

export const Durations = {
	short: 3000,
	long: 4000,
} as const;

export const ToastTypes = {
	error: 'error',
	success: 'success',
	info: 'info',
	// retry: 'retry',
} as const;

export const Icons = {
	success: '', // Add SVG Skia path for success icon
	error: '', // Add SVG Skia path for error icon
	info: '', // Add SVG Skia path for info icon
	retry: '', // Add SVG Skia path for retry icon
} as const;
