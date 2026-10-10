import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BlurView } from 'expo-blur';

import { MuxicXText } from '../Base/experimental/GradienText';
import GradientText from '../Base/GradientText';

import { Slider2Texts } from './Svgs';

import { IMAGES } from '@/assets';
import { isAndroid, windowHeight, windowWidth } from '@/lib/utils';
import { FonthSizeStyle, FontSizeColorStyle, responsive } from '@/styles';
import { StatusBar } from 'expo-status-bar';

const Slider2 = () => {
	return (
		<ImageBackground
			height={windowHeight}
			width={windowWidth}
			source={IMAGES.slider2}
			resizeMode="cover"
			style={{ height: windowHeight, width: windowWidth, position: 'relative', flex: 1 }}
		>
			<StatusBar backgroundColor="transparent" style="light" />
			<SafeAreaView
				style={{
					position: 'relative',
					flex: 1,
					justifyContent: 'space-between',
					backgroundColor: 'rgba(0,0,0,0.3)',
				}}
			>
				<View
					style={{
						paddingTop: isAndroid ? responsive(80) : responsive(20),
						left: responsive(20),
						backgroundColor: 'rgba(0,0,0,0.4)',
					}}
				>
					<MuxicXText />
				</View>
				<FastImage
					source={IMAGES.x}
					resizeMode="cover"
					style={{
						height: responsive(80),
						width: responsive(80),
						position: 'absolute',
						flex: 1,
						top: '48%',
						left: '32%',
					}}
				/>

				<BlurView
					tint="dark"
					style={{
						flex: 1,
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: responsive(80),
						padding: responsive(40),
						paddingBottom: responsive(100),
						overflow: 'hidden',
					}}
					intensity={50}
					experimentalBlurMethod="dimezisBlurView"
				>
					<View style={{ marginBottom: responsive(20) }}>
						{/* <Slider2Texts />
						 */}
						<GradientText
							style={[
								FontSizeColorStyle['montserrat-400-12-dark-3f3f3f'],
								{ fontSize: responsive(36) },
							]}
							colors={['#00BCFD', '#125B6F']}
						>
							The revenue models in the music industry are broken.
						</GradientText>
					</View>
					<Text style={FontSizeColorStyle['lato-300-15-white']}>
						Current revenue models fail to fairly support musicians and listeners,
						leaving creativity and access compromised.
					</Text>
					{/* <Text style={FontSizeColorStyle['lato-300-15-white']}>
						Empowering{' '}
						<Text style={FonthSizeStyle['lato-600-15']}>
							<Text style={{ color: '#FFBE72' }}> Dreams </Text>
							or Musicians and Listeners,
							{' \n'}
						</Text>
						Setting Music Free.{' '}
					</Text> */}
				</BlurView>
			</SafeAreaView>
		</ImageBackground>
	);
};

export default Slider2;

const styles = StyleSheet.create({});
