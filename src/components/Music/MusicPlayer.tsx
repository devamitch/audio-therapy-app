import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Linking, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import TrackPlayer, { useActiveTrack } from 'react-native-track-player';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/core';

import { GradientIcon } from '../Base/GradientText';

import { ActionSheet } from './ActionSheet';
import { OptionSheet } from './OptionSheet';
import { PlayerControls } from './PlayerControls';
import { Progress } from './Progress';
import { Spacer } from './Spacer';
import { TrackInfo } from './TrackInfo';

import { QueueInitialTracksService, SetupService } from '@/core/service/music';
import { responsive } from '@/styles';

const MusicPlayer: React.FC = () => {
	const track = useActiveTrack();

	const isPlayerReady = useSetupPlayer();

	const naviagtion = useNavigation();

	// options bottom sheet
	const optionsSheetRef = useRef<BottomSheet>(null);

	const optionsSheetSnapPoints = useMemo(() => [500], []);

	const handleOptionsPress = useCallback(() => {
		optionsSheetRef.current?.snapToIndex(0);
	}, [optionsSheetRef]);

	// actions bottom sheet
	const actionsSheetRef = useRef<BottomSheet>(null);

	const actionsSheetSnapPoints = useMemo(() => ['40%'], []);

	const handleActionsPress = useCallback(() => {
		actionsSheetRef.current?.snapToIndex(0);
	}, [actionsSheetRef]);

	useEffect(() => {
		function deepLinkHandler(data: { url: string }) {
			console.log('deepLinkHandler', data.url);
		}

		// This event will be fired when the app is already open and the notification is clicked
		const subscription = Linking.addEventListener('url', deepLinkHandler);

		// When you launch the closed app from the notification or any other link
		Linking.getInitialURL().then((url) => console.log('getInitialURL', url));

		return () => {
			subscription.remove();
		};
	}, []);

	if (!isPlayerReady) {
		return (
			<SafeAreaView style={styles.screenContainer}>
				<ActivityIndicator />
			</SafeAreaView>
		);
	}

	return (
		<View style={styles.screenContainer}>
			<View style={styles.contentContainer}>
				<View style={styles.topBarContainer}>
					<BorderlessButton onPress={() => naviagtion?.goBack()}>
						<GradientIcon name="arrow-back" size={responsive(30)} />
					</BorderlessButton>
					<BorderlessButton onPress={handleOptionsPress}>
						<GradientIcon name="options" size={responsive(30)} />
					</BorderlessButton>
				</View>
				<TrackInfo track={track} />
				<Progress live={track?.isLiveStream} />
				<Spacer />
				<PlayerControls />
				<Spacer mode={'expand'} />
				{/* <SponsorCard /> */}
			</View>
			<BottomSheet
				index={-1}
				ref={optionsSheetRef}
				enablePanDownToClose={true}
				snapPoints={optionsSheetSnapPoints}
				handleIndicatorStyle={styles.sheetHandle}
				backgroundStyle={styles.sheetBackgroundContainer}
			>
				<OptionSheet />
				<ActionSheet />
			</BottomSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		// alignItems: 'center',
		flex: 1,
		width: '100%',
	},
	screenContainer: {
		alignItems: 'center',
		// backgroundColor: 'rgba(0,0,0,0.1)',
		flex: 1,
		// height: 200,
		justifyContent: 'center',
		minHeight: Platform.OS === 'web' ? '100vh' : '100%',
		width: '100%',
	},
	sheetBackgroundContainer: {
		backgroundColor: '#181818',
		paddingHorizontal: responsive(30),
		paddingVertical: responsive(40),
	},
	sheetHandle: {
		backgroundColor: 'white',
	},
	topBarContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		// justifyContent: 'flex-end',
		paddingHorizontal: responsive(20),
		width: '100%',
	},
});

function useSetupPlayer() {
	const [playerReady, setPlayerReady] = useState<boolean>(false);

	useEffect(() => {
		let unmounted = false;

		(async () => {
			await SetupService();
			if (unmounted) return;
			setPlayerReady(true);
			const queue = await TrackPlayer.getQueue();

			if (unmounted) return;
			if (queue.length <= 0) {
				await QueueInitialTracksService();
			}
		})();

		return () => {
			unmounted = true;
		};
	}, []);

	return playerReady;
}

export default MusicPlayer;
