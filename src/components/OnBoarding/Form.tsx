import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import type { RectButtonProps } from 'react-native-gesture-handler';

import FormButton from './FormButton';
import { OnboardStyles } from './styles';

import { IMAGES } from '@/assets';
import { FontSizeColorStyle, LayoutStyle } from '@/styles';

export type OnboardingFormProps = {
	onDonorPress?: RectButtonProps['onPress'];
	onVolunteerPress?: RectButtonProps['onPress'];
};

const ONBOARDING_DATA = {
	title1: '2% of people who, land here are changemakers and ',
	title2: 'their actions make a huge difference to lives...',
	logo: IMAGES.logo,
	volunteer: IMAGES.volunteer,
	donor: IMAGES.donor,
	content1: 'You can also be involved in our efforts. Just donate few ',
	content2: 'hours of your time. Pledge a small ',
	content3: 'contribution towards any effort that help us create a better tomorrow.',
} as const;

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onDonorPress, onVolunteerPress }) => (
	<View style={OnboardStyles.form}>
		<FastImage source={ONBOARDING_DATA.logo} resizeMode="contain" style={OnboardStyles.logo} />
		<Text style={FontSizeColorStyle['montserrat-300-20-black']}>
			{ONBOARDING_DATA.title1}
			<Text style={FontSizeColorStyle['montserrat-500-20-black']}>
				{ONBOARDING_DATA.title2}
			</Text>
		</Text>
		<View style={[LayoutStyle.row, OnboardStyles.buttonContainer]}>
			<FormButton
				text="Volunteer"
				onPress={onVolunteerPress}
				image={ONBOARDING_DATA.volunteer}
			/>
			<FormButton text="Donor" onPress={onDonorPress} image={ONBOARDING_DATA.donor} />
		</View>
		<Text style={FontSizeColorStyle['montserrat-400-12-black']}>
			{ONBOARDING_DATA.content1}
			<Text style={FontSizeColorStyle['montserrat-700-12-primary-button']}>
				{ONBOARDING_DATA.content2}
			</Text>
			<Text style={FontSizeColorStyle['montserrat-400-12-black']}>
				{ONBOARDING_DATA.content3}
			</Text>
		</Text>
	</View>
);

export default OnboardingForm;
