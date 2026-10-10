import { InteractionManager } from 'react-native';
import {
	consoleTransport,
	fileAsyncTransport,
	logger,
	// sentryTransport
} from 'react-native-logs';
import * as FS from 'expo-file-system';
// import * as SENTRY from 'sentry-expo';

const enabledExtensions = ['ROOT', 'HOME', 'API', 'WEB3'];

const COLORS = [
	'whiteBright',
	'cyanBright',
	'magentaBright',
	'blueBright',
	'yellowBright',
	'greenBright',
	'redBright',
] as const;

const LEVELS = ['debug', 'error', 'info', 'warn'] as const;

const colors = {
	debug: 'magentaBright',
	error: 'redBright',
	info: 'cyanBright',
	warn: 'yellowBright',
} satisfies Record<(typeof LEVELS)[number], (typeof COLORS)[number]>;

const transport = __DEV__ ? [consoleTransport] : [fileAsyncTransport];
// const transport = __DEV__
// 	? [consoleTransport, sentryTransport]
// 	: [fileAsyncTransport, sentryTransport];

const levels = {
	debug: 0,
	error: 3,
	info: 1,
	warn: 2,
} satisfies Record<(typeof LEVELS)[number], 0 | 1 | 2 | 3>;

const newDate = new Date();

const fileName = new Intl.DateTimeFormat('en-US').format(newDate);

const LOG_CONFIG = {
	async: true,
	asyncFunc: InteractionManager.runAfterInteractions,
	dateFormat: 'time',
	enabled: true,
	enabledExtensions,
	levels,
	printDate: true,
	printLevel: true,
	severity: 'debug',
	transport,
	transportOptions: {
		FS,
		// SENTRY,
		colors,
		fileName,
	},
};

export const LOG = logger.createLogger(LOG_CONFIG);

export const ROOT_LOG = LOG.extend('ROOT');

export const HOME_LOG = LOG.extend('HOME');

export const API_LOG = LOG.extend('API');

export const WEB3_LOG = LOG.extend('WEB3');
