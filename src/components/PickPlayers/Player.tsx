import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

import { IMAGES } from '@/assets';
import { ArtistType } from '@/lib/server/challange';
import { FontSizeColorStyle, responsive } from '@/styles';

export type PlayerProps = ArtistType & {
	image?: string;
	level?: string | number;
	onPress?: (artist: ArtistType) => void;
	selected?: boolean;
};

const defaultProps = {
	level: '212',

	id: '23423kadkd2324',
} satisfies PlayerProps;

const LinearGradient = Animated.createAnimatedComponent(ExpoLinearGradient);

const Player: React.FC<PlayerProps> = (artist) => {
	const { image, name, level, followers, onPress, selected, ...props } = artist;

	const selectedStyle = useAnimatedStyle(() => {
		return {
			borderWidth: withTiming(selected ? 2 : 0, {
				duration: 300,
				easing: Easing.linear,
			}),
			padding: withTiming(selected ? 2 : 0, {
				duration: 300,
				easing: Easing.linear,
			}),
			borderColor: 'transparent',
			alignItems: 'center',
			justifyContent: 'center',
		};
	}, [selected]);

	const selectedStyle2 = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: withTiming(selected ? 0.95 : 1, {
						duration: 300,
						easing: Easing.linear,
					}),
				},
			],
		};
	}, [selected]);

	return (
		<RectButton
			style={styles.container}
			onPress={() => onPress && onPress(artist)}
			underlayColor="#125B6F"
			rippleColor={'#125B6F'}
			rippleRadius={100}
		>
			<LinearGradient
				style={[styles.image, selectedStyle]}
				colors={
					selected
						? ['#00BCFD', '#007097', '#00252F']
						: ['transparent', 'rgba(0,0,0,0.2)']
				}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<LinearGradient
					style={[styles.image, selectedStyle2]}
					colors={
						selected
							? ['#00BCFD', '#007097', '#00252F']
							: ['transparent', 'rgba(0,0,0,0.2)']
					}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				>
					<Animated.Image
						source={
							image
								? {
										uri: image,
									}
								: IMAGES.emptyUser
						}
						style={styles.image}
						resizeMode="cover"
					/>
					{props?.point ? (
						<LinearGradient
							colors={['#00BCFD', '#007097']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={{
								height: responsive(20),
								width: responsive(20),
								borderRadius: responsive(100),
								position: 'absolute',
								top: responsive(5),
								right: responsive(5),
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text
								style={FontSizeColorStyle['montserrat-700-xxs-white']}
								numberOfLines={1}
								adjustsFontSizeToFit
							>
								{props?.point}
							</Text>
						</LinearGradient>
					) : null}
				</LinearGradient>
			</LinearGradient>
			<Text
				style={FontSizeColorStyle['montserrat-600-xxs-white']}
				numberOfLines={1}
				adjustsFontSizeToFit
			>
				{`${name ?? ''}`}
			</Text>
			{/* <Text
				style={FontSizeColorStyle['montserrat-500-xxs-grey-858585']}
				numberOfLines={1}
				adjustsFontSizeToFit
			>
				{`Level ${props?.point ?? 'XX'}`}
			</Text> */}
			<Text
				style={FontSizeColorStyle['montserrat-400-xxs-grey-858585']}
				numberOfLines={1}
				adjustsFontSizeToFit
			>
				{`Credit: `}
				<Text
					style={FontSizeColorStyle['montserrat-600-xxs-white']}
					numberOfLines={1}
					adjustsFontSizeToFit
				>
					{` ${Number(level || 0) % 10 ?? 'XX'}`}
				</Text>
			</Text>

			<Text
				style={FontSizeColorStyle['montserrat-500-xxs-primary-text']}
				numberOfLines={1}
				adjustsFontSizeToFit
			>
				{`${followers || 0} Following`}
			</Text>
			{/* {selected ? (
				<Animated.View
					style={[styles.warpper, selectedStyle]}
					entering={FadeIn.delay(200)}
					exiting={FadeOut.delay(200)}
				/>
			) : null} */}
		</RectButton>
	);
};

Player.defaultProps = defaultProps;

export default Player;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		borderRadius: responsive(5),
		gap: responsive(5),
		// height: '100%',
		justifyContent: 'center',
		padding: responsive(5),
		position: 'relative',
		width: responsive(92),
	},
	image: {
		borderRadius: responsive(50),
		height: responsive(91),
		resizeMode: 'contain',
		width: responsive(91),
	},
	text: { gap: responsive(2), paddingHorizontal: responsive(3) },
	warpper: {
		height: responsive(0),
		position: 'absolute',
		width: responsive(0),
	},
});
