import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import type { RectButtonProps } from 'react-native-gesture-handler';

import { SecondaryButton } from '../Base';

import DataContainer from './DataContainer';
import { introStyles } from './styles';

import { IMAGES } from '@/assets';
import { FontSizeColorStyle } from '@/styles';

type IntroLayoutProps = {
	onPress?: RectButtonProps['onPress'];
	volunteer?: boolean;
};

const DATA = {
	volunteerTitle: 'Get Involved \n Just donate few \n hours of your time.',
	donorTitle: 'When you donate,\n we help one more \n face smile.',
} as const;

const IntroLayout = ({ onPress, volunteer }: IntroLayoutProps) => (
	<>
		<FastImage
			style={introStyles.image}
			source={volunteer ? IMAGES.volunteerIntroBG : IMAGES.donorIntroBG}
		/>
		<View style={introStyles.container}>
			<View style={introStyles.title}>
				<Text
					style={[FontSizeColorStyle['montserrat-700-13-white'], introStyles.titileText]}
				>
					{volunteer ? DATA.volunteerTitle : DATA.donorTitle}
				</Text>
			</View>
			<DataContainer volunteer={volunteer} />
			<SecondaryButton
				label={volunteer ? 'Volunteer Now' : 'Donate Now!'}
				fullWidth
				labelStyle={[FontSizeColorStyle['montserrat-500-xl-primary-button']]}
				onPress={onPress}
				style={introStyles.volButton}
			/>
		</View>
	</>
);

export default IntroLayout;
