import { IMAGES } from '@/assets';
import AppIntroSlider from '@/components/Base/AppSlider';
import Slider1 from '@/components/Sliders/Slider1';
import Slider2 from '@/components/Sliders/Slider2';
import Slider3 from '@/components/Sliders/Slider3';
import Slider4 from '@/components/Sliders/Slider4';
import { screenHeight } from '@/lib/utils';
import * as NavigationBar from 'expo-navigation-bar';
import { ImageBackground } from 'react-native';

NavigationBar.setBorderColorAsync('transparent');
NavigationBar.setButtonStyleAsync('#00BCFD');

const introScreens = [Slider1, Slider2, Slider3, Slider4];

const AppSlider: React.FC = () => {
	return (
		<ImageBackground source={IMAGES['loginBg']} style={[{ flex: 1, height: screenHeight }]}>
			<AppIntroSlider introScreens={introScreens} />
		</ImageBackground>
	);
};

export default AppSlider;
