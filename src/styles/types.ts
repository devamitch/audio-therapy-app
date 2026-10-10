import type { FlexAlignType } from 'react-native/types';
import type { RectButtonProps } from 'react-native-gesture-handler';

import type { ALL_COLORS, COLOR_PARAMS, ShadowRBGAColors } from './colors';
import type { All_FONT_SIZES, FONT_LITERALS, WEIGHT_LITERALS } from './fonts';

export type CreatLiteral<
	param extends string,
	params2 extends string,
> = `${Lowercase<param>}-${Lowercase<params2>}`;

export type CreatLiteral2<
	param extends string,
	params2 extends number,
> = `${Lowercase<param>}-${params2}`;

export type GetValue<T, P extends string> = T extends { [key in P]: infer K } ? K : never;

type ThemeFontSizeType = typeof All_FONT_SIZES;
export type ColorParamType = typeof COLOR_PARAMS;
export type ThemeFontWeightType = typeof WEIGHT_LITERALS;
export type ThemeFontFamilyType = typeof FONT_LITERALS;
export type ThemeColorType = typeof ALL_COLORS;
export type ThemeColorTypeKey = keyof ThemeColorType;
export type ColorKeyNameTypes = keyof ColorParamType;
export type ThemeFontSizeTypeKey = keyof ThemeFontSizeType;

export type TYPE_COLOR_NAME = `${Lowercase<ThemeColorType[keyof ThemeColorType]>}`;

export type ColorKeyNamesLiteral = CreatLiteral<ColorKeyNameTypes, keyof typeof ALL_COLORS>;

export type ExtractColor<Part extends string> = Part extends `${infer Property}-${infer Code}`
	? {
			readonly [key in GetValue<ColorParamType, Property>]: `${Lowercase<
				GetValue<ThemeColorType, Code>
			>}`;
	  }
	: never;

export type CreateColor<param extends ColorKeyNamesLiteral> = {
	readonly [Property in param]: ExtractColor<Property>;
};

export type ColorsType = CreateColor<ColorKeyNamesLiteral> & typeof ShadowRBGAColors;

export type ThemeFontWeightVALType<P extends keyof typeof WEIGHT_LITERALS> =
	(typeof WEIGHT_LITERALS)[P];

export type FONT_FAMILY_TYPE = ThemeFontFamilyType[keyof typeof FONT_LITERALS];

export type BaseFontKeyNamesLiteral = CreatLiteral2<FONT_FAMILY_TYPE, keyof typeof WEIGHT_LITERALS>;

export type FontKeyNamesLiteral =
	| CreatLiteral2<FONT_FAMILY_TYPE, keyof typeof WEIGHT_LITERALS>
	| `${CreatLiteral2<FONT_FAMILY_TYPE, keyof typeof WEIGHT_LITERALS>}-italic`;

export type FontKeyNamesWithColorLiteral = CreatLiteral<FontKeyNamesLiteral, keyof ThemeColorType>;

export type FontKeyNamesWithSizeLiteral = CreatLiteral<FontKeyNamesLiteral, ThemeFontSizeTypeKey>;

export type FontKeyNamesWithSizeColorLiteral = CreatLiteral<
	FontKeyNamesWithSizeLiteral,
	keyof ThemeColorType
>;

export type ExtractFont<Part extends string> =
	Part extends `${infer FontFamily}-${infer FontWeight}`
		? {
				fontFamily: `${GetValue<ThemeFontFamilyType, FontFamily>}-${GetValue<
					ThemeFontWeightType,
					FontWeight
				>}`;
		  }
		: never;

export type ExtractFontSize<Part extends string> =
	Part extends `${infer FontFamily}-${infer FontWeight}-${infer FontSize}`
		? {
				fontFamily: `${GetValue<ThemeFontFamilyType, FontFamily>}-${GetValue<
					ThemeFontWeightType,
					FontWeight
				>}`;
				fontSize: GetValue<ThemeFontSizeType, FontSize>;
				fontStyle: 'normal';
		  }
		: never;

export type ExtractFontWidthColor<Part extends string> =
	Part extends `${infer FontFamily}-${infer FontWeight}-${infer FontColor}`
		? {
				fontFamily: `${GetValue<ThemeFontFamilyType, FontFamily>}-${GetValue<
					ThemeFontWeightType,
					FontWeight
				>}`;
				color: `${Lowercase<GetValue<ThemeColorType, FontColor>>}`;
				fontStyle: 'normal';
		  }
		: never;

export type ExtractFontSizeWidthColor<Part extends string> =
	Part extends `${infer FontFamily}-${infer FontWeight}-${infer FontSize}-${infer FontColor}`
		? {
				fontFamily: `${GetValue<ThemeFontFamilyType, FontFamily>}-${GetValue<
					ThemeFontWeightType,
					FontWeight
				>}`;
				color: `${Lowercase<GetValue<ThemeColorType, FontColor>>}`;
				fontSize: GetValue<ThemeFontSizeType, FontSize>;
				fontStyle: 'normal';
		  }
		: never;

export type CreateFont<param extends FontKeyNamesLiteral> = {
	[Property in param]: ExtractFont<Property>;
};

export type CreateFontSizeWithColor<param extends FontKeyNamesWithSizeLiteral> = {
	[Property in param]: ExtractFontSize<Property>;
};

export type CreateFontWithColor<param extends FontKeyNamesWithColorLiteral> = {
	[Property in param]: ExtractFontWidthColor<Property>;
};

export type CreateFonSizetWithColor<param extends FontKeyNamesWithSizeColorLiteral> = {
	[Property in param]: ExtractFontSizeWidthColor<Property>;
};

export type FontType = CreateFont<FontKeyNamesLiteral>;
export type FontSizeType = CreateFontSizeWithColor<FontKeyNamesWithSizeLiteral>;
export type FontColorType = CreateFontWithColor<FontKeyNamesWithColorLiteral>;
export type FontSizeColorType = CreateFonSizetWithColor<FontKeyNamesWithSizeColorLiteral>;
export type FontSizeColorTypeTextType = Record<FontKeyNamesWithSizeColorLiteral, true>;

type AndroidBorderStyleNumberParams =
	| 'borderBottomEndRadius'
	| 'borderBottomLeftRadius'
	| 'borderBottomRightRadius'
	| 'borderBottomStartRadius'
	| 'borderBottomWidth'
	| 'borderLeftWidth'
	| 'borderRadius'
	| 'borderRightWidth'
	| 'borderTopEndRadius'
	| 'borderTopLeftRadius'
	| 'borderTopRightRadius'
	| 'borderTopStartRadius'
	| 'borderTopWidth'
	| 'borderWidth'
	| 'margin'
	| 'marginBottom'
	| 'marginEnd'
	| 'marginHorizontal'
	| 'marginLeft'
	| 'marginStart'
	| 'marginTop'
	| 'marginVertical'
	| 'maxHeight'
	| 'maxWidth'
	| 'minWidth'
	| 'minHeight'
	| 'right'
	| 'start'
	| 'left'
	| 'end'
	| 'top'
	| 'bottom'
	| 'zIndex';

type AndroidBorderStyleColors =
	| 'borderBottomColor'
	| 'borderColor'
	| 'borderEndColor'
	| 'borderLeftColor'
	| 'borderRightColor'
	| 'borderStartColor'
	| 'borderTopColor';

export type AndroidBorderStyleType = Partial<Record<AndroidBorderStyleNumberParams, number>> &
	Partial<Record<AndroidBorderStyleColors, TYPE_COLOR_NAME>> & {
		borderStyle?: 'solid' | 'dotted' | 'dashed';
		alignSelf?: 'auto' | FlexAlignType;
		position?: 'absolute' | 'relative';
	};

export type ButtonStyleType = Omit<
	RectButtonProps['style'],
	AndroidBorderStyleNumberParams | AndroidBorderStyleColors | 'backgroundColor'
> & {
	backgroundColor?: TYPE_COLOR_NAME;
};
