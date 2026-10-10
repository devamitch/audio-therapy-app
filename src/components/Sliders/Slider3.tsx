import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { MuxicXText } from '../Base/experimental/GradienText';

import { Slider3Texts } from './Svgs';
import GradientText from '../Base/GradientText';

import { IMAGES } from '@/assets';
import { isAndroid, windowHeight, windowWidth } from '@/lib/utils';
import { FonthSizeStyle, FontSizeColorStyle, responsive } from '@/styles';
import { StatusBar } from 'expo-status-bar';

const Slider3 = () => {
	return (
		<ImageBackground
			height={windowHeight}
			width={windowWidth}
			source={IMAGES.slider3}
			resizeMode="cover"
			style={{ height: windowHeight, width: windowWidth, position: 'relative', flex: 1 }}
		>
			<StatusBar backgroundColor="transparent" style="light" />
			<SafeAreaView
				style={{ position: 'relative', flex: 1, justifyContent: 'space-between' }}
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

				<BlurView
					tint="dark"
					style={{
						flex: 1,
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: responsive(100),
						padding: responsive(40),
						paddingBottom: responsive(100),
						overflow: 'hidden',
					}}
					intensity={50}
					experimentalBlurMethod="dimezisBlurView"
				>
					<View style={{ marginBottom: responsive(20) }}>
						{/* <Slider3Texts /> */}

						<GradientText
							style={[
								FontSizeColorStyle['montserrat-400-12-dark-3f3f3f'],
								{ fontSize: responsive(36) },
							]}
							colors={['#00BCFD', '#125B6F']}
						>
							Join Us in Liberating Music{' '}
						</GradientText>
					</View>
					<Text style={FontSizeColorStyle['lato-300-15-white']}>
						Revolutionizing music by removing barriers and empowering artists and
						listeners.
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

export default Slider3;

const styles = StyleSheet.create({});
