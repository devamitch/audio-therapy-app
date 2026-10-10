import { useCallback, useEffect, useRef, useState } from 'react';
import type { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { IntroScreenProp } from './types';
import useDotAnimtion from './useDotAnimtion';
import useSliderAnimationStyle from './useSliderAnimationStyle';

import { useAppStore } from '@/core/store';

const { width: screenWidth } = Dimensions.get('window');

const useOnBoardScreen = (introScreens: IntroScreenProp[]) => {
	const scrollX = useSharedValue(0);

	const setShowOnboarding = useAppStore(useCallback((state) => state.setShowOnboarding, []));

	const [currentIndex, setCurrentIndex] = useState(0);

	const activeIndex = useRef(0);

	const flatlistRef = useRef<FlatList<IntroScreenProp> | null>(null);

	const endIndex = introScreens.length - 1;

	const duration = 1000; // Set the desired duration in milliseconds

	const frames = 60; // Number of frames for the animation

	const scrollDistance = endIndex * screenWidth; // Adjust screenWidth based on your item size

	const scrollStep = scrollDistance / (duration / (1000 / frames));

	useEffect(() => {
		if (flatlistRef.current) {
			flatlistRef.current?.scrollToOffset({ offset: 0, animated: false });
			// scrollViewRef.current?.scrollTo({ x: 0, animated: false });
		}
	}, []);

	const onScroll = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			scrollX.value = event.nativeEvent.contentOffset.x;
			setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / screenWidth));
			activeIndex.current = event.nativeEvent.contentOffset.x / screenWidth;
		},
		[scrollX]
	);

	const sliderStyle = useSliderAnimationStyle(scrollX, currentIndex);

	const dotStyle = useDotAnimtion(scrollX, currentIndex);

	const scrollToNext = useCallback(() => {
		flatlistRef.current?.scrollToOffset({
			offset: screenWidth * (currentIndex + 1),
			animated: true,
		});
		setCurrentIndex((prevIndex) => prevIndex + 1);
	}, [currentIndex]);

	const handleDone = useCallback(() => {
		setShowOnboarding(false);
		// Implement functionality for 'Done' button
	}, [setShowOnboarding]);

	const handleNext = useCallback(() => {
		if (currentIndex < introScreens.length - 1) {
			scrollToNext();

			return;
		}
		handleDone();
	}, [currentIndex, handleDone, introScreens.length, scrollToNext]);

	const animateScroll = useCallback(
		(currentStep: number, forward: boolean = true) => {
			if (currentStep < 0 || currentStep > scrollDistance) {
				return; // Stop the animation when it reaches the start or end
			}

			flatlistRef.current?.scrollToOffset({
				offset: currentStep,
				animated: false,
			});

			const nextStep = forward ? currentStep + scrollStep : currentStep - scrollStep;

			requestAnimationFrame(() => animateScroll(nextStep, forward));
		},
		[scrollDistance, scrollStep]
	);

	const handleSkip = useCallback(() => {
		const currentOffset = currentIndex * screenWidth || 0;

		const forward = currentOffset < scrollDistance;

		animateScroll(currentOffset, forward);
		setShowOnboarding(false);
	}, [animateScroll, currentIndex, scrollDistance, setShowOnboarding]);

	return {
		handleDone,
		handleSkip,
		sliderStyle,
		handleNext,
		onScroll,
		dotStyle,
		scrollViewRef: flatlistRef,
		scrollX,
		currentIndex,
	};
};

export default useOnBoardScreen;
