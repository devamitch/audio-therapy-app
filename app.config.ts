import { ExpoConfig } from 'expo/config';

import pkg from './package.json';

const config: ExpoConfig = {
	name: 'test',
	version: pkg?.version || '1.0.7',
	orientation: 'portrait',
	scheme: ['musix', 'fb917543446019028'],
	icon: './assets/icon.png',
	androidNavigationBar: {
		visible: 'leanback',
		barStyle: 'dark-content',
		backgroundColor: '#000000',
	},
	userInterfaceStyle: 'dark',
	android: {
		adaptiveIcon: {
			backgroundColor: '#000000',
			foregroundImage: './assets/icon.png',
		},
		package: 'com.nonceblox.test1',
		permissions: ['INTERNET'],
		versionCode: 8,
		googleServicesFile: './google-services.json',
		intentFilters: [
			{
				action: 'VIEW',
				data: {
					scheme: 'https',
					host: 'test.com',
					pathPrefix: '/',
				},
				category: ['BROWSABLE', 'DEFAULT'],
			},
		],
	},
	notification: {
		icon: './assets/icon2.png',
		color: '#00BCFD',
	},
	primaryColor: '#00BCFD',

	platforms: ['ios', 'android', 'web'],
	assetBundlePatterns: ['**/*'],
	ios: {
		buildNumber: pkg?.version || '1.0.7',
		usesAppleSignIn: true,
		entitlements: {
			'com.apple.developer.networking.wifi-info': true,
		},
		associatedDomains: ['applinks:test.com'],
		bundleIdentifier: 'com.nonceblox.test1',
		supportsTablet: false,
		infoPlist: {
			ITSAppUsesNonExemptEncryption: false,
			NSContactsUsageDescription:
				'Allow test to access your contacts. We need access to your contacts  for our referral programm when you will share your refferal link you your friends. You will get rewards',
			NSCameraUsageDescription: 'Need camera access for uploading images',
			NSMicrophoneUsageDescription: 'Allow app to access microphone',
			NSPhotoLibraryAddUsageDescription: 'Allow app to access your photos.',
			NSPhotoLibraryUsageDescription: 'Allow app to access your photos.',
			UIBackgroundModes: ['fetch', 'remote-notification'],
		},
		googleServicesFile: './GoogleService-Info.plist',
	},

	plugins: [
		'expo-apple-authentication',
		[
			'expo-image-picker',
			{
				cameraPermission:
					'$(PRODUCT_NAME) Need camera access for uploading images to save your image in our collection, So we can provide seemless user provide you user personalized data, Dont worry you can remove them',
				photosPermission:
					'$(PRODUCT_NAME) accesses your photos to save your image in our collection, So we can provide seemless user provide you user personalized data, Dont worry you can remove them',
			},
		],
		// [
		// 	'@sentry/react-native/expo',
		// 	{
		// 		url: 'https://sentry.io/',
		// 		project: 'music-x',
		// 		authToken:
		// 			'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',
		// 		organization: 'nonceblox-5h',
		// 	},
		// ],
		[
			'@stripe/stripe-react-native',
			{
				merchantIdentifier: [],
				enableGooglePay: true,
			},
		],
		// ['react-native-appsflyer', {}],
		[
			'expo-build-properties',
			{
				android: {
					flipper: '0.125.0',
					newArchEnabled: false,
				},
				ios: {
					flipper: true,
				},
			},
		],
		// [
		// 	'react-native-vision-camera',
		// 	{
		// 		cameraPermissionText:
		// 			'$(PRODUCT_NAME) needs access to your camera to save your image in our collection, So we can provide seemless user provide you user personalized data, Dont worry you can remove them',

		// 		enableMicrophonePermission: true,
		// 		microphonePermissionText:
		// 			'$(PRODUCT_NAME) needs access to your Microphone to save your image in our collection, So we can provide seemless user provide you user personalized data, Dont worry you can remove them',
		// 	},
		// ],
		'expo-av',
		'expo-localization',
		'@react-native-google-signin/google-signin',

		// 'expo-font',
		// 'expo-secure-store',
		// [
		// 	'expo-notifications',
		// 	{
		// 		icon: './assets/icon2.png',
		// 		color: '#00BCFD',
		// 	},
		// ],
	],
	privacy: 'public',
	slug: 'test',
	splash: {
		image: './assets/splash.png',
		resizeMode: 'cover',
		backgroundColor: '#000000',
		imageResizeMode: 'cover',
		duration: 1000,
		// image: './assets/images/splash-logo-all.png',
		// resizeMode: 'contain',
		// backgroundColor: '#191015',
		backgroundImage: './assets/splash.png',
	},
	updates: {
		url: 'https://github.com/nonceblox/musix',
	},
	extra: {
		eas: {
			projectId: '11f464af-154b-419d-be7b-4735e08545ac',
		},
	},
	owner: 'nonceblox',
};

export default config;
// export default withSentry(config, {
// 	url: 'https://sentry.io/',
// 	project: 'music-x',
// 	authToken:
// 		'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',
// 	organization: 'nonceblox-5h',
// });
