import { Text } from 'react-native';
import type { Source } from 'react-native-fast-image';
import FastImage from 'react-native-fast-image';
import type { RectButtonProps } from 'react-native-gesture-handler';
import { RectButton } from 'react-native-gesture-handler';

import { OnboardStyles } from './styles';

import { ColorStyle, FontSizeColorStyle, LayoutStyle } from '@/styles';

type FormButtonProps = RectButtonProps & {
	text?: React.ReactNode;
	image?: Source;
};

const FormButton: React.FC<FormButtonProps> = ({ text, image, ...props }) => (
	<RectButton
		style={[OnboardStyles.buttons, ColorStyle['bg-white'], LayoutStyle.center]}
		{...props}
	>
		<FastImage source={image} resizeMode="contain" style={OnboardStyles.image} />
		<Text style={FontSizeColorStyle['montserrat-600-14-grey-a7a7a7']}>You are a</Text>
		<Text style={FontSizeColorStyle['montserrat-600-18-primary']}>{text}</Text>
	</RectButton>
);

export default FormButton;
