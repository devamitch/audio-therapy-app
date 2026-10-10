import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

import MusicPlayer from '@/components/Music/MusicPlayer';
import { LayoutStyle, responsive } from '@/styles';
const MusicScreen = () => {
	return (
		<BlurView style={LayoutStyle.fill}>
			<SafeAreaView
				style={[
					LayoutStyle.fill,
					{ backgroundColor: 'rgba(0,0,0,0.4)' },
					{
						position: 'relative',
						overflow: 'hidden',
						alignItems: 'center',

						paddingTop: responsive(40),
						justifyContent: 'center',
					},
				]}
			>
				<StatusBar barStyle={'light-content'} />

				<MusicPlayer />
			</SafeAreaView>
		</BlurView>
	);
};

export default MusicScreen;

const styles = StyleSheet.create({});
