const { mergeConfig } = require('metro');
const { getDefaultConfig } = require('expo/metro-config');
// const { createSentryMetroSerializer } = require('@sentry/react-native/metro');
const { withExpoSerializers } = require('@expo/metro-config/build/serializer/withExpoSerializers');

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

// const sentryConfig = {
// 	serializer: {
// 		customSerializer: createSentryMetroSerializer(),
// 	},
// };

// const finalConfig = mergeConfig(config, sentryConfig);
module.exports = withExpoSerializers(config);
