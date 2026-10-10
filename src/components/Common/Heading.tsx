import { Text } from 'react-native';

import { FontSizeColorStyle } from '@/styles';
interface HeadingProps {
	text: React.ReactNode;
}

export const LayoutHeading: React.FC<HeadingProps> = ({ text, ...props }) => (
	<Text style={FontSizeColorStyle['montserrat-600-xxl-grey-696262']} {...props}>
		{text}
	</Text>
);

export default LayoutHeading;
