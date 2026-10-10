// const { getSentryExpoConfig } = require('@sentry/react-native/metro');

// const { getDefaultConfig } = require('expo/metro-config');
// const { mergeConfig } = require('metro-config');
// const {
// 	createSentryMetroSerializer,
// } = require('@sentry/react-native/dist/js/tools/sentryMetroSerializer');

// const config = {
// 	serializer: {
// 		customSerializer: createSentryMetroSerializer(),
// 	},
// };

// module.exports = mergeConfig(getDefaultConfig(__dirname), config, getSentryExpoConfig(__dirname));

// const { getDefaultConfig } = require("expo/metro-config");
const { getSentryExpoConfig } = require('@sentry/react-native/metro');

// const config = getDefaultConfig(__dirname);
const config = getSentryExpoConfig(__dirname);

module.exports = config;
