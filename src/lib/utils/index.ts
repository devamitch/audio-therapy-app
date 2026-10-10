import { Dimensions, NativeModules, Platform, StatusBar } from 'react-native';

import { isAndroid } from './android';

export * from './android';
export * from './error';
export * from './openLink';
export * from './sound';
export * from './toast';

export const shortAddress = (address: string, num?: number) => {
	const numLettters = num || 5;

	return address
		? address.length > numLettters * 2
			? `${address.slice(0, numLettters)}...${address.slice(-numLettters)}`
			: address
		: '';
};

const { StatusBarManager } = NativeModules;

const getStatusBarHeight = () => {
	if (Platform.OS === 'ios') {
		// For iOS, use the StatusBar component
		return StatusBar.currentHeight;
	} else if (Platform.OS === 'android' && StatusBarManager) {
		// For Android, use the StatusBarManager module
		return StatusBarManager.HEIGHT;
	}

	return 0; // Default value
};

// export const isTabarAVailable = false as const;
export const isTabarAVailable = true as const;
export const isStatusBarAvailable = isTabarAVailable ? (true as const) : (false as const);

// const androidTOP_BAR_HEIGHT = 42 as const;
// const androidTOP_BAR_HEIGHT = 43 as const;

export const TAB_BAR_HEIGHT = isTabarAVailable ? (40 as const) : (0 as const);
export const TOP_BAR_HEIGHT = 45;
// export const TOP_BAR_HEIGHT = isTabarAVailable
// 	? isAndroid
// 		? androidTOP_BAR_HEIGHT
// 		: (44.2 as const)
// 	: (0 as const);

export const statusBarHeight = isStatusBarAvailable ? getStatusBarHeight() : 0;

export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;
export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;
export const navbarHeight = screenHeight - windowHeight;
export const extraItemRatioHeight = windowHeight * 0.03434;
export const extraItemRatioHeightConst = isAndroid ? 22 : 5;

export const itemWithStatusHeight =
	windowHeight -
	(statusBarHeight + 0 + TAB_BAR_HEIGHT + navbarHeight + extraItemRatioHeightConst);

export const topWithStatusBarHeight = statusBarHeight + TAB_BAR_HEIGHT;

export const topBarHeight = topWithStatusBarHeight;

export const itemHeight = isTabarAVailable ? itemWithStatusHeight : windowHeight;

// export const formatVotes = (v: number) =>
// 	new Intl.NumberFormat().format(v).replace(/(\d)([A-Z])/, '$1$1+');

export const formatVotes = (v: number) => {
	const suffixes = ['', 'K', 'M', 'B', 'T'];

	const thousands = Math.floor(Math.log10(v) / 3);

	const rounded = Math.floor(v / Math.pow(10, 3 * thousands));

	return `${rounded}${suffixes[thousands]}`;
};

export const formatDate = (schedule: string | number | Date) => {
	try {
		const date = new Date(schedule);

		return new Intl.DateTimeFormat('en-IN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		}).format(date);
	} catch {
		return schedule?.toString();
	}
};
