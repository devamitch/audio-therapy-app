import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { MuxicXText } from '../Base/experimental/GradienText';

import { Slider1Texts } from './Svgs';

import { IMAGES } from '@/assets';
import { isAndroid, windowHeight, windowWidth } from '@/lib/utils';
import { FonthSizeStyle, FontSizeColorStyle, responsive } from '@/styles';
import { StatusBar } from 'expo-status-bar';
import GradientText from '../Base/GradientText';

const Slider1 = () => {
	return (
		<ImageBackground
			height={windowHeight}
			width={windowWidth}
			source={IMAGES.slider1}
			resizeMode="cover"
			style={{ height: windowHeight, width: windowWidth, position: 'relative', flex: 1 }}
		>
			<StatusBar backgroundColor="transparent" style="light" />
			<SafeAreaView
				style={{ position: 'relative', flex: 1, justifyContent: 'space-between' }}
			>
				<View
					style={{
						paddingTop: isAndroid ? 80 : 20,
						left: 20,
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
						right: responsive(120),
						padding: responsive(40),
						paddingBottom: responsive(100),
						overflow: 'hidden',
					}}
					intensity={50}
					experimentalBlurMethod="dimezisBlurView"
				>
					<View style={{ marginBottom: responsive(20) }}>
						{/* <Slider1Texts />
						background: linear-gradient(180deg, #00BCFD 0%, #125B6F 83.33%);
background: linear-gradient(180deg, #00BCFD 0%, #5EDCFF 83.33%);

						 */}
						<GradientText
							style={[
								FontSizeColorStyle['heebo-400-12-dark-3f3f3f'],
								{ fontSize: responsive(36) },
							]}
							colors={['#00BCFD', '#125B6F']}
						>
							Setting
						</GradientText>
						<View
							style={{
								flexDirection: 'row',
								gap: responsive(12),
								alignItems: 'center',
							}}
						>
							<GradientText
								style={[FontSizeColorStyle['montserrat-400-xxl-dark-3f3f3f']]}
								colors={['#00BCFD', '#125B6F']}
							>
								MUSIC
							</GradientText>
							<GradientText
								style={[FontSizeColorStyle['montserrat-700-xxl-dark-3f3f3f']]}
								colors={['#00BCFD', '#5EDCFF']}
							>
								FREE
							</GradientText>
						</View>
					</View>
					<Text style={FontSizeColorStyle['lato-300-15-white']}>
						Empowering the{' '}
						<Text style={FontSizeColorStyle['lato-500-15-white']}>Dreams</Text> of
						Musicians and Listeners, Unleashing the Power of Music.
					</Text>
					{/* <Text style={FontSizeColorStyle['lato-300-15-white']}>
						Empowering the{' '}
						<Text style={FonthSizeStyle['lato-600-15']}>
							<Text style={{ color: '#FFBE72' }}> Dreams </Text> of Musicians and
							Listeners,
							{' \n'}
						</Text>
						Setting Music Free.{' '}
					</Text> */}
				</BlurView>
			</SafeAreaView>
		</ImageBackground>
	);
};

export default Slider1;

const styles = StyleSheet.create({});
