import { RFValue, RFValue2 } from './android';
import { windowWidth } from '.';

export const idealIOSHeight = 940 as const;

export const responsive = <T extends number>(font: T) =>
	windowWidth > 786
		? (RFValue(font, windowWidth + 200) as T)
		: (RFValue(font, idealIOSHeight) as T);

export const responsive2 = <T extends number>(font: T) => {
	'worklet';

	const value = windowWidth > 786 ? windowWidth + 200 : idealIOSHeight;

	const newVal = RFValue2(font, value) as unknown as T;

	// console.log({ newVal });
	//
	return newVal;
};
