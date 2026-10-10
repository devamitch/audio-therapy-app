import { SafeAreaView } from 'react-native-safe-area-context';
import { shallow } from 'zustand/shallow';

import { IntroLayout, Layout } from '@/components';
import { useAppStore } from '@/core/store';
import { navigateAndSimpleReset } from '@/navigation/navigation';
import type { RootNavPropsType } from '@/navigation/types';
import { LayoutStyle } from '@/styles';

const VolunteerIntroScreen: React.FC<RootNavPropsType<'Intro'>> = ({ navigation }) => {
	const [userExists, userType, setShowIntro] = useAppStore(
		(state) => [state?.user?.verified!!, state?.userType, state?.setShowIntro],
		shallow
	);

	const handlePress = () => {
		if (userType === 'donor') {
			navigateAndSimpleReset('Donor');

			setShowIntro(false);

			return;
		}
		if (userExists) {
			navigateAndSimpleReset('Volunteer');

			setShowIntro(false);

			return;
		}
		setShowIntro(false);

		navigation.navigate('Signin');

		return;
	};

	return (
		<Layout bg={userType === 'volunteer' ? 'volunteerIntro' : 'donorIntro'}>
			<SafeAreaView style={[LayoutStyle.fill, LayoutStyle.screenLayout]}>
				<IntroLayout volunteer={userType === 'volunteer'} onPress={handlePress} />
			</SafeAreaView>
		</Layout>
	);
};

export default VolunteerIntroScreen;
