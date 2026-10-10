import type { ButtonProps } from '../experimental/Button';
import Button from '../experimental/Button';

import { BASE_BUTTON_TEXT_STYLE, ButtonStyle, FontSizeColorStyle } from '@/styles';

export const TernaryButton = ({ labelStyle: textStyle, style, ...props }: ButtonProps) => (
	<Button
		style={[ButtonStyle.ternary, style]}
		labelStyle={[
			BASE_BUTTON_TEXT_STYLE,
			FontSizeColorStyle['montserrat-500-20-dark-383838'],
			textStyle,
		]}
		loadingColor="primary"
		center
		{...props}
	/>
);

export default TernaryButton;
