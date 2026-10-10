import type { TextInputProps } from 'react-native';
import { TextInput } from 'react-native';

import { ColorStyle, FontColorStyle, InputStyle } from '@/styles';

const Input = ({ style: inputStyle, ...props }: TextInputProps) => (
	<TextInput
		placeholder="Title of the news"
		style={[
			InputStyle.primary,
			FontColorStyle['montserrat-500-dark-494949'],
			ColorStyle['bg-white'],
			inputStyle,
		]}
		placeholderTextColor="#494949"
		{...props}
	/>
);

export default Input;
