import { Entypo } from '@expo/vector-icons';

import type { ButtonProps } from '../experimental/Button';
import Button from '../experimental/Button';

import {
	ALL_COLORS,
	BASE_BUTTON_TEXT_STYLE,
	ButtonStyle,
	FontSizeColorStyle,
	responsive,
} from '@/styles';
export const SecondaryButton = ({ labelStyle: textStyle, style, ...props }: ButtonProps) => (
	<Button
		style={[ButtonStyle.secondary, style]}
		labelStyle={[
			BASE_BUTTON_TEXT_STYLE,
			FontSizeColorStyle['montserrat-500-20-primary'],
			textStyle,
		]}
		loadingColor="primary"
		spread
		endIcon={<Entypo name="chevron-right" size={responsive(24)} color={ALL_COLORS.primary} />}
		{...props}
	/>
);

export default SecondaryButton;
