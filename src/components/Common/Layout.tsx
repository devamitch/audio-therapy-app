import { ImageBackground, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { IMAGES } from '@/assets';
import { windowHeight, windowWidth } from '@/lib/utils';
import { LayoutStyle } from '@/styles';

const Layout: React.FC<{
	children?: React.ReactNode | React.ReactNode[];
	bg?: 'bg' | 'donorIntro' | 'volunteerIntro';
	fill?: boolean;
}> = ({ children, bg = 'bg', fill }) => {
	return (
		<>
			<StatusBar style={'dark'} backgroundColor="#ffffff" translucent animated />
			<ImageBackground
				source={IMAGES[bg]}
				style={[fill ? LayoutStyle.fill : {}, styles.container]}
			>
				{children}
			</ImageBackground>
		</>
	);
};

export default Layout;

const styles = StyleSheet.create({
	container: {
		height: windowHeight,
		width: windowWidth,
	},
} as const);
