module.exports = (api) => {
	api.cache(true);
	// const presets = ['module:metro-react-native-babel-preset'];
	const presets = ['babel-preset-expo'];

	const plugins = [
		[
			'module-resolver',
			{
				alias: {
					'@': './src',
					'@/': './src/',
					'@Images': './src/assets/images',
					'@Main': './src/navigation/main',
					'@Stack': './src/navigation/stack',
					'@assets': './src/assets',
					'@async': './src/redux/asyncs',
					'@axios': ['./src/core/service/axios/index.ts'],
					'@components': './src/components',
					'@base': './src/components/Base',
					'@config': './src/core/config',
					'@constants': './src/core/constants',
					'@hooks': './src/lib/hooks',
					'@icons': './src/icons',
					'@navigation': './src/navigation',
					'@redux': './src/redux',
					'@screens': './src/screens',
					'@store': './src/core/store',
					'@theme/': './src/core/constants/theme/',
					'@types': './src/redux/types',
					'@utils': './src/lib/utils',
				},
				extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.jsx', '.json'],
				root: ['./src'],
			},
		],
		[
			'@babel/plugin-transform-react-jsx',
			{
				runtime: 'automatic',
			},
		],

		'react-native-reanimated/plugin',
	];

	return {
		plugins,
		presets,
	};
};
