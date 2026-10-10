import { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shallow } from 'zustand/shallow';

import { Layout, OnboardingForm } from '@/components';
import { useAppStore } from '@/core/store';
import type { MainStackNavigationType } from '@/navigation/types';
import { LayoutStyle } from '@/styles';

const OnBoarding = ({ navigation }: { navigation: MainStackNavigationType }) => {
	const setUserType = useAppStore(
		useCallback((state) => state.setUserType, []),
		shallow
	);

	const onPress = useCallback(
		(user: 'volunteer' | 'donor') => {
			navigation.navigate('Intro', {
				user,
			});
			setUserType(user);
		},
		[navigation, setUserType]
	);

	return (
		<Layout>
			<SafeAreaView style={[LayoutStyle.fill, LayoutStyle.screenLayout]}>
				<OnboardingForm
					onDonorPress={() => onPress('donor')}
					onVolunteerPress={() => onPress('volunteer')}
				/>
			</SafeAreaView>
		</Layout>
	);
};

export default OnBoarding;
