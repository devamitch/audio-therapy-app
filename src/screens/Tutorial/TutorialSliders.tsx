/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-inline-styles/no-inline-styles */
import { useCallback, useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Text, View } from 'react-native';
import Animated, {
	runOnJS,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useScrollViewOffset,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import { useAppStore } from '@/core/store';

const { width: screenWidth } = Dimensions.get('window');

import { useNavigation } from '@react-navigation/core';
import { BlurView } from 'expo-blur';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
	DashboardGameModeTutorial,
	DashboardTutorialSinger,
	DashboardTutorialUser,
} from './DashboardTutorial';
import * as GameModeTutorial from './GameModeTutorial';

import { IMAGES } from '@/assets';
import IntroScreen from '@/components/Base/AppSlider/IntroScreen';
import useSliderAnimationStyle from '@/components/Base/AppSlider/useSliderAnimationStyle';
import { RootStackNavigationType } from '@/navigation/types';
import { FontSizeColorStyle, LayoutStyle } from '@/styles';

const SCREENS = [
	DashboardTutorialSinger,
	DashboardTutorialUser,
	DashboardGameModeTutorial,
	GameModeTutorial.GameModeTutorial,
	GameModeTutorial.LeaguesTutorial,
	GameModeTutorial.LeaguesDetailsTutorial,
	GameModeTutorial.LeaguesTeamsTutorial,
	GameModeTutorial.LeaguesConfirmTutorial,
	GameModeTutorial.LeaguesWinnersTutorial,
	GameModeTutorial.LeaguesContestsTutorial,
	GameModeTutorial.LeaguesCongratsTutorial,
];

const TutorialSliders = () => {
	const scrollX = useSharedValue(0);

	const navigation = useNavigation<RootStackNavigationType>();

	const setTakeTour = useAppStore(useCallback((state) => state.setTakeTour, []));

	const [currentIndex, setCurrentIndex] = useState(0);

	const scrollviewRef = useAnimatedRef<Animated.ScrollView>();

	const endIndex = SCREENS.length - 1;

	const duration = 1000; // Set the desired duration in milliseconds

	const frames = 60; // Number of frames for the animation

	const scrollDistance = endIndex * screenWidth; // Adjust screenWidth based on your item size

	const scrollStep = scrollDistance / (duration / (1000 / frames));

	useEffect(() => {
		if (scrollviewRef.current) {
			scrollviewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
		}
	}, [scrollviewRef]);

	const scrollHandler = useScrollViewOffset(scrollviewRef);

	const onScroll = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollX.value = event.contentOffset.x;
			runOnJS(setCurrentIndex)(Math.round(event.contentOffset.x / screenWidth));
		},
	});

	const sliderStyle = useSliderAnimationStyle(scrollX, currentIndex);

	const scrollToNext = useCallback(() => {
		try {
			setCurrentIndex((prevIndex) => {
				scrollviewRef.current?.scrollTo({
					x: screenWidth * (prevIndex + 1),
					y: screenWidth * prevIndex,
					animated: true,
				});

				return prevIndex + 1;
			});
		} catch (errr) {}
	}, [scrollviewRef]);

	const handleDone = useCallback(() => {
		setTakeTour(false);
		// navigateAndSimpleReset('Main');
		navigation.replace('Main');
	}, [setTakeTour, navigation]);

	const animateScroll = useCallback(
		(currentStep: number, forward: boolean = true) => {
			if (currentStep < 0 || currentStep > scrollDistance) {
				return;
			}

			scrollviewRef.current?.scrollToEnd({
				animated: false,
			});

			const nextStep = forward ? currentStep + scrollStep : currentStep - scrollStep;

			requestAnimationFrame(() => animateScroll(nextStep, forward));
		},
		[scrollDistance, scrollStep, scrollviewRef]
	);

	const handleSkip = useCallback(() => {
		scrollviewRef.current?.scrollToEnd({
			animated: false,
		});
		handleDone();
	}, [scrollviewRef, handleDone]);

	const { top, bottom } = useSafeAreaInsets();

	const scrollStyle = useAnimatedStyle(
		() => ({
			display: 'flex',
			flex: 1,
			height: 'auto',
		}),
		[]
	);

	const bottomStyle = useAnimatedStyle(
		() => ({
			position: 'absolute',
			paddingHorizontal: 30,
			paddingVertical: 25,
			bottom: withTiming(bottom + (currentIndex === 2 ? 70 : 0)),
			left: 0,
			right: 0,
			justifyContent: 'space-between',
			flexDirection: 'row',
		}),
		[scrollX, currentIndex]
	);

	return (
		<ImageBackground source={IMAGES.bg_tutorial} style={LayoutStyle.fill}>
			<Animated.ScrollView
				pagingEnabled
				overScrollMode={'never'}
				onScroll={onScroll}
				ref={scrollviewRef}
				scrollEventThrottle={16}
				horizontal
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
			>
				{SCREENS?.map((item, index) => (
					<IntroScreen
						content={item}
						animatedStyle={sliderStyle}
						active={currentIndex === index}
						transparent
						key={index?.toString()}
					/>
				))}
			</Animated.ScrollView>
			<Animated.View style={bottomStyle}>
				<View
					style={{
						height: 30,
						width: 50,
						borderRadius: 6,
						overflow: 'hidden',
						borderColor:
							currentIndex === endIndex ? 'transparent' : 'rgba(255,233,233,0.5)',
						borderWidth: 1,
					}}
				>
					{currentIndex === endIndex ? null : (
						<BlurView
							style={{
								flex: 1,
								borderRadius: 4,

								// borderTopWidth: 2,
								// borderLeftWidth: 2,
							}}
							// tint="dark"
							experimentalBlurMethod={'dimezisBlurView'}
						>
							<RectButton
								style={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'center',
								}}
								onPress={handleSkip}
							>
								<Text style={FontSizeColorStyle['montserrat-600-12-white']}>
									Skip
								</Text>
							</RectButton>
						</BlurView>
					)}
				</View>
				<View
					style={{
						height: 30,
						width: 50,
						borderRadius: 6,
						overflow: 'hidden',
						borderColor:
							currentIndex === endIndex
								? 'rgba(0,188,253,0.6)'
								: 'rgba(255,233,233,0.5)',
						borderWidth: 1,
					}}
				>
					<BlurView
						style={{
							flex: 1,
							borderRadius: 4,

							// borderTopWidth: 2,
							// borderLeftWidth: 2,
						}}
						// tint="dark"
						experimentalBlurMethod={'dimezisBlurView'}
					>
						<RectButton
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onPress={currentIndex === endIndex ? handleDone : scrollToNext}
						>
							{currentIndex === endIndex ? (
								<Text style={FontSizeColorStyle['montserrat-700-12-primary-text']}>
									Done
								</Text>
							) : (
								<Text
									style={FontSizeColorStyle['montserrat-600-12-white']}
									onPress={scrollToNext}
								>
									Next
								</Text>
							)}
						</RectButton>
					</BlurView>
				</View>
			</Animated.View>
		</ImageBackground>
	);
};

export default TutorialSliders;
