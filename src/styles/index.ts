import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import { Colors } from './colors';
import { Fonts, FontSizeWithColors, FontWithColors, FontWithSize } from './fonts';
import type { ColorsType, FontColorType, FontSizeColorType, FontSizeType, FontType } from './types';

export type StyleType = TextStyle & ViewStyle & ImageStyle;

export const ColorStyle = StyleSheet.create<ColorsType>(Colors);
export const FontStyle = StyleSheet.create<FontType>(Fonts);
export const FonthSizeStyle = StyleSheet.create<FontSizeType>(FontWithSize);
export const FontColorStyle = StyleSheet.create<FontColorType>(FontWithColors);

export const FontSizeColorStyle = StyleSheet.create<FontSizeColorType>(FontSizeWithColors);

export * from './buttons';
export * from './colors';
export * from './fonts';
export * from './inputs';
export * from './layout';
export * from './types';
