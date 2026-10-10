/* eslint-disable react-native/no-color-literals */
import { memo } from 'react';
import {
	Image,
	ImageSourcePropType,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';
import Animated, {
	Extrapolate,
	interpolate,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
import { BlurView } from '@react-native-community/blur';

import { windowHeight, windowWidth } from '@/lib/utils';

export type PlayerType = {
	img?: ImageSourcePropType;
	name?: string;
	image?: string;
	distance?: string;
	city?: string;
	occupation?: string;
	id?: string | number;
};
const DemoPlayers: React.FC<
	PlayerType & {
		index: number;
		handleSwipe: (direction: 'left' | 'right' | 'top' | 'bottom') => void;
	}
> = memo(
	({
		img,
		image,
		distance = '1 KM',
		name = 'Name',
		occupation = 'Occupation',
		city,
		index,
		handleSwipe,
	}) => {
		const height = windowHeight;

		const cardWidth = windowWidth * 0.9;

		const cardHeight = height * 0.8;

		const translateX = useSharedValue(0);

		const translateY = useSharedValue(0);

		const isCardActive = useSharedValue(true);

		const gestureHandler = useAnimatedGestureHandler({
			onStart: (_, context) => {
				context.startX = translateX.value;
				context.startY = translateY.value;
			},
			onActive: (event, context) => {
				translateX.value = context.startX + event.translationX;
				translateY.value = context.startY + event.translationY;
			},
			onEnd: (_, context) => {
				const deltaX = translateX.value;

				const deltaY = translateY.value;

				if (Math.abs(deltaX) > Math.abs(deltaY)) {
					runOnJS(handleSwipe)(deltaX > 0 ? 'right' : 'left', index);
				} else {
					runOnJS(handleSwipe)(deltaY > 0 ? 'bottom' : 'top', index);
				}

				translateX.value = withSpring(0, { damping: 15, stiffness: 90 });
				translateY.value = withSpring(0, { damping: 15, stiffness: 90 });
			},
		});

		const animatedStyle = useAnimatedStyle(() => {
			return {
				transform: [
					{ translateX: translateX.value },
					{
						translateY: interpolate(
							translateY.value,
							[-height * 0.1, 0, height * 0.1],
							[-height * 0.1, 0, height * 0.1],
							Extrapolate.CLAMP
						),
					},
					{
						scale: interpolate(
							translateY.value,
							[-height * 0.1, 0, height * 0.1],
							[0.8, 1, 0.8],
							Extrapolate.CLAMP
						),
					},
				],
				opacity: interpolate(
					translateY.value,
					[-height * 0.9, 0, height * 0.1],
					[0.9, 1, 0.9],
					Extrapolate.CLAMP
				),
				elevation: isCardActive.value ? 5 : 3,
				width: cardWidth,
				height: cardHeight,
				translateY: withSpring(height * 0.05),
				zIndex: isCardActive.value ? 1 : 0,
			};
		});

		return (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: '#fff',
					// display: isCardActive.value ? 'flex' : 'none',
				}}
			>
				<PanGestureHandler onGestureEvent={gestureHandler}>
					<Animated.View style={[styles.item, animatedStyle]}>
						<RectButton
							rippleRadius={100}
							rippleColor={'rgba(0,0,0,0.5)'}
							underlayColor="rgba(0,0,0,0.5)"
							style={styles.rectButton}
						>
							<Image source={{ uri: image }} style={styles.image} />
						</RectButton>
						<BlurView
							style={styles.blurView}
							tint="dark"
							experimentalBlurMethod={'dimezisBlurView'}
						>
							<Text style={styles.blurText}>{distance ?? '1 KM'}</Text>
						</BlurView>
						<View style={styles.infoContainer}>
							<View style={styles.infoContent}>
								<Text style={styles.nameText}>{name}</Text>
								<Text style={styles.occupationText}>{occupation}</Text>
								<View style={styles.detailsContainer}>
									<Text style={styles.detailsText}>{city ?? 'Chikago, UN'}</Text>
									<TouchableOpacity style={styles.locationButton}>
										<Text style={styles.locationButtonText}>
											{distance ?? '1km'}
										</Text>
										<Entypo name="location" size={24} color="#E94057" />
									</TouchableOpacity>
								</View>
							</View>
							<View style={styles.actionsContainer}>
								<TouchableOpacity
									style={styles.crossButton}
									onPress={() => handleSwipe('left')}
								>
									<Entypo name="cross" size={24} color="#F27121" />
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.heartButton}
									onPress={() => handleSwipe('right')}
								>
									<Entypo name="heart" size={35} color="white" />
								</TouchableOpacity>
								<TouchableOpacity style={styles.messageButton}>
									<Entypo name="message" size={24} color="#E94057" />
								</TouchableOpacity>
							</View>
						</View>
					</Animated.View>
				</PanGestureHandler>
			</SafeAreaView>
		);
	}
);

const styles = StyleSheet.create({
	actionsContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 20,
		justifyContent: 'center',
		paddingVertical: 15,
	},
	blurText: {
		color: 'white',
	},
	blurView: {
		borderRadius: 8,
		left: 20,
		paddingHorizontal: 13,
		paddingVertical: 8,
		position: 'absolute',
		top: 20,
	},
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
	},
	crossButton: {
		backgroundColor: 'white',
		borderRadius: 100,
		elevation: 2,
		padding: 10,
		shadowColor: 'red',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.51,
		shadowRadius: 2,
	},
	detailsContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	detailsText: {
		color: '#1E1E1E',
		fontFamily: 'Inter',
		fontSize: 14,
		fontWeight: '400',
	},
	heartButton: {
		backgroundColor: '#E94057',
		borderRadius: 100,
		elevation: 5,
		padding: 13,
		shadowColor: '#E94057',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.51,
		shadowRadius: 5,
	},
	image: {
		borderRadius: 10,
		height: '100%',
		width: '100%',
	},
	infoContainer: {
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		padding: 16,
		width: '100%',
	},
	infoContent: {
		gap: 10,
		width: '99%',
	},
	item: {
		borderRadius: 10,
		left: windowWidth * 0.05,
		overflow: 'hidden',
		position: 'absolute',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		top: 100,
	},
	locationButton: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 8,
		paddingVertical: 6,
	},
	locationButtonText: {
		color: '#E94057',
		fontFamily: 'Inter',
		fontSize: 11,
		fontWeight: '500',
	},
	messageButton: {
		backgroundColor: 'white',
		borderRadius: 100,
		elevation: 2,
		padding: 10,
		shadowColor: '#E94057',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.51,
		shadowRadius: 2,
	},
	nameText: {
		color: '#1E1E1E',
		fontFamily: 'Inter',
		fontSize: 20,
		fontWeight: '600',
	},
	occupationText: {
		color: '#1E1E1E',
		fontFamily: 'Inter',
		fontSize: 14,
		fontWeight: '400',
	},
	rectButton: {
		backgroundColor: '#fff',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		flex: 1,
	},
});

export default DemoPlayers;
