import 'react-native-get-random-values';
// import '@ethersproject/shims';
// import './shim.js';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import * as Sentry from '@sentry/react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useLayoutEffect, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, LogBox, Platform } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { enableScreens } from 'react-native-screens';
import TrackPlayer from 'react-native-track-player';

import { IMAGES, JSONS } from '@/assets';
import { GOOGLE_WEB_CLIENT_ID } from '@/constants';
import { FontFamily } from '@/constants/fonts';
import { QueueInitialTracksService } from '@/core/service/music';
import { SetupService } from '@/core/service/music/SetupService';
import { toast } from '@/lib/utils';
import SetUp from '@/screens/SetUpScreen';
import { LayoutStyle, responsive } from '@/styles';
import * as NavigationBar from 'expo-navigation-bar';

NavigationBar.setBorderColorAsync('transparent');
NavigationBar.setButtonStyleAsync('#00BCFD');

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

LogBox.ignoreAllLogs();

// const routingInstrumentation = new Sentry.ReactNavigationInstrumentation({
// 	enableTimeToInitialDisplay: Constants.appOwnership !== 'expo', // Only in   enableTimeToInitialDisplay: true, // default: false
// 	routeChangeTimeoutMs: 1000, // default: 1000
// });

// Sentry.init({
// 	dsn: 'https://3145bdc6d5f49d715e851d49421970ca@o4504751028043776.ingest.us.sentry.io/4507146519511040',
// 	integrations: [
// 		new Sentry.ReactNativeTracing({
// 			routingInstrumentation,
// 			enableNativeFramesTracking: Constants.appOwnership !== 'expo', // Only in native builds, not in Expo Go.
// 		}),
// 	],
// 	// _experiments: {
// 	// 	// profilesSampleRate is relative to tracesSampleRate.
// 	// 	// Here, we'll capture profiles for 100% of transactions.
// 	// 	profilesSampleRate: 1.0,
// 	// },
// 	environment: 'production',
// 	beforeSend(event, hint) {
// 		const error = hint.originalException;

// 		if (
// 			error &&
// 			(error as Error)?.message &&
// 			(error as Error)?.message.match(/database unavailable/i)
// 		) {
// 			event.fingerprint = ['database-unavailable'];
// 		}
// 		if (event.user) {
// 			// Don't send user's email address
// 			delete event.user.email;
// 		}

// 		return event;
// 	},
// 	ignoreErrors: [
// 		'fb_xd_fragment',
// 		/^Exact Match Message$/,
// 		/^TypeError $/,
// 		/^App Hanging $/,
// 		/^Notifications are not allowed for this application$/,
// 	],
// });

Audio.setAudioModeAsync({
	interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
	interruptionModeIOS: InterruptionModeIOS.DuckOthers,
	playThroughEarpieceAndroid: true,
	playsInSilentModeIOS: true,
	shouldDuckAndroid: true,
});

GoogleSignin.configure({
	scopes: ['profile', 'https://www.googleapis.com/auth/userinfo.profile'],
	webClientId: GOOGLE_WEB_CLIENT_ID,
});

const soundObject = new Audio.Sound();

// LogBox.ignoreLogs(['Warning : ....']);
// LogBox.ignoreAllLogs();

enableScreens(true);

const App = () => {
	const [fontsLoaded] = useFonts(FontFamily);

	const [ready, setReady] = useState(false);

	useLayoutEffect(() => {
		let unmounted = false;

		(async () => {
			await SetupService();
			if (unmounted) return;
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

	useLayoutEffect(() => {
		const enableSound = async () => {
			try {
				if (fontsLoaded) {
					await soundObject.pauseAsync();
					await soundObject.unloadAsync();

					return;
				}
			} catch (error) {
				toast.error((error as Error).message);
			}
		};

		if (!fontsLoaded) {
			enableSound();
		}
		const interVal = setInterval(() => {
			// setReady(fontsLoaded);
		}, 900);

		return () => {
			clearInterval(interVal);
		};
	}, [fontsLoaded]);

	if (!ready) {
		return (
			<GestureHandlerRootView style={LayoutStyle.fillBlack}>
				<StatusBar
					style={'light'}
					backgroundColor="transparent"
					translucent
					animated
					hidden
				/>
				<ImageBackground source={IMAGES.bg} style={[LayoutStyle.fill, LayoutStyle.center]}>
					<AnimatedLottieView
						source={JSONS.refresh4}
						autoPlay
						loop={false}
						style={{ height: responsive(320), width: responsive(320) }}
						// duration={1000}
						entering={FadeInDown.delay(500)}
						exiting={FadeOutDown.delay(500)}
						duration={2000}
						onAnimationFinish={() => setReady(fontsLoaded)}
					/>
				</ImageBackground>
			</GestureHandlerRootView>
		);
	}

	return (
		<StripeProvider
			publishableKey={'publishableKey'}
			merchantIdentifier="merchant.identifier" // required for Apple Pay
			urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
		>
			<GestureHandlerRootView style={LayoutStyle.fill}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					enabled
					style={LayoutStyle.fillBlack}
				>
					<BottomSheetModalProvider>
						<ErrorBoundary>
							<SetUp />
						</ErrorBoundary>
					</BottomSheetModalProvider>
				</KeyboardAvoidingView>
			</GestureHandlerRootView>
		</StripeProvider>
	);
};

export default App;
// export default Sentry.wrap(App);

TrackPlayer.registerPlaybackService(() => require('./service.js'));

//
