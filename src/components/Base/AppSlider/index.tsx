import { StatusBar } from 'expo-status-bar';
import type React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import ActionContainer from './ActionContainer';
import IntroScreen from './IntroScreen';
import type { AppIntroSliderProps } from './types';
import useOnBoardScreen from './useOnBoardScreen';

import { screenHeight } from '@/lib/utils';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppIntroSlider: React.FC<AppIntroSliderProps> = ({ introScreens }) => {
	const {
		scrollX,
		// handleDone,
		handleSkip,
		sliderStyle,
		handleNext,
		onScroll,
		dotStyle,
		scrollViewRef,
		currentIndex,
	} = useOnBoardScreen(introScreens);

	return (
		<SafeAreaView style={styles.container} edges={[]}>
			<StatusBar style={'light'} backgroundColor="transparent" translucent animated />
			<Animated.FlatList
				//@ts-ignore
				ref={(ref) => (scrollViewRef.current = ref)}
				horizontal
				pagingEnabled
				overScrollMode={'never'}
				scrollToOverflowEnabled={false}
				onScroll={onScroll}
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator={false}
				data={introScreens}
				renderItem={({ item, index }) => (
					<IntroScreen
						content={item}
						animatedStyle={sliderStyle}
						active={currentIndex === index}
					/>
				)}
				keyExtractor={(_, index) => index?.toString()}
			/>
			{/* <ScrollView
				ref={(ref) => (scrollViewRef.current = ref)}
				horizontal
				pagingEnabled
				onScroll={onScroll}
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator={false}
			>
				{introScreens.map((item, index) => {
					return (
						<IntroScreen
							key={index}
							content={item}
							animatedStyle={sliderStyle}
							active={currentIndex === index}
						/>
					);
				})}
			</ScrollView> */}

			<ActionContainer
				currentIndex={currentIndex}
				introScreensLength={introScreens.length}
				handleNext={handleNext}
				handleSkip={handleSkip}
				dotStyle={dotStyle}
				scrollX={scrollX}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: screenHeight,
		backfaceVisibility: 'hidden',
		backgroundColor: '#000',
	},
});

export default AppIntroSlider;
