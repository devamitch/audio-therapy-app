// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';

import pkg from '../../app.config';

import { FontWithColors, responsive } from '@/styles';
export const PACKAGE_NAME = pkg?.android?.package || pkg?.ios?.bundleIdentifier;
export const APP_VERSION = pkg?.version;
export const ITUNES_ID = '' as const;
export const TERMSPAGE = '' as const;
export const PRIVACY_PAGE = '' as const;
export const RAZOR_PAY_KEY = 'rzp_test_lNCZ28btHocVIg' as const;

export const GOOGLE_ANDROID_KEY =
	'28308747711-bsf9j13qjrd4329qrvt9fp9cuk9ogtjo.apps.googleusercontent.com' as const;

export const TWITTER_KEY = 'rmdspy5lYBzbgkeULqCUPUHKi' as const;

export const GOOGLE_IOS_KEY =
	'28308747711-4basrikarngtub0mvsl06ukfdbv65kfe.apps.googleusercontent.com' as const;

export const GOOGLE_WEB_CLIENT_ID =
	'318004227623-11oacf5ek03ssmmsbnuavmlija0kgrm8.apps.googleusercontent.com' as const;

// export const GOOGLE_WEB_CLIENT_ID =
// 	'1009817119333-q5efl6iescrfv6uu92a3tsv6no8apjhj.apps.googleusercontent.com' as const;

export const GOOGLE_WEB_CLIENT_SECRET = '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' as const;

export const TWITTER_SECRET = '18iF0usUYlfTzojWY9QfI5Hq4wULQR0u3wnkid4JA45y2BUZup' as const;

export const TWITTER_URL = 'https://musix-a7299.firebaseapp.com/__/auth/handler' as const;

export const FIREBASE_API_KEY = 'AIzaSyAkVLGvR9zvROXKMHjdilxOPbyQbfcLg18' as const;

export const OAuth0Credential = {
	clientId: 'sBIm5u7HkgTFV8OG1UbBdBzeBq9xZWU1',
	domain: 'dev-qk6444t6yjuz5tjh.us.auth0.com',
} as const;

export const TWITTER_CONFIG = {
	clientId: TWITTER_KEY,
	clientSecret: TWITTER_SECRET,
	redirectUrl: TWITTER_URL,
} as const;

export const DOT_SIZE = responsive(12);

export const ISDARK_MODE = false;
export const SHOULD_DARK_HEADER = true;

export const DRAWER_BG = SHOULD_DARK_HEADER ? ('#232323' as const) : ('#fdfdfd' as const);

export const DRAWER_STYLE = !SHOULD_DARK_HEADER
	? FontWithColors['montserrat-500-dark-232323']
	: FontWithColors['montserrat-500-white'];

export const DRAWER_TEXT_COLOR = !SHOULD_DARK_HEADER ? ('#232323' as const) : ('#fdfdfd' as const);

export const DRAWER_GRADIENT_COLOR = !SHOULD_DARK_HEADER
	? ['#e1e1e1', '#fdfdfd', '#f1f1f1']
	: ['#313131', '#333333', '#434343'];

export const firebaseConfig = {
	apiKey: 'AIzaSyBKu7MypaVj4U5-HDmYprk0K4aHjfzjzuQ',
	authDomain: 'musix-a7299.firebaseapp.com',
	projectId: 'musix-a7299',
	storageBucket: 'musix-a7299.appspot.com',
	messagingSenderId: '318004227623',
	appId: '1:318004227623:web:bb991af23a4240b54b6802',
	measurementId: 'G-TX6HMN2NTN',
} as const;

// const twiterApp = initializeApp(firebaseConfig);

// export const TWITTER_AUTH = getAuth(twiterApp);
