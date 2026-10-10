import { Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as WebBrowser from 'expo-web-browser';

import { toast } from './toast';

import { LOG } from '@/core/config/logger';
import { UiLibColors } from '@/styles/colors';

export const Languages = {
	Chinese: 'zh',
	English: 'en',
	French: 'fr',
	Hindi: 'hi',
	Japanese: 'ja',
	Korean: 'ko',
	Russian: 'ru',
} as const;

export const LanguageKeys = Object.keys(Languages);

type LanguageType = typeof Languages;

export const openURL = (url?: string) => {
	try {
		if (url) {
			WebBrowser.openBrowserAsync(url, {
				controlsColor: UiLibColors.white,
				enableBarCollapsing: true,
				secondaryToolbarColor: UiLibColors.white,
				showInRecents: true,
				showTitle: true,
				toolbarColor: UiLibColors['primary-button'],
			} as const);
		}
	} catch (error) {
		LOG.error(error);
	}
};

export const shareLink = async (url?: string) => {
	try {
		if (url) {
			await Share.share({
				message: `Hey checkout the article \n ${url}`,
				title: 'Share via',
				url,
			});
		}
	} catch (error) {
		LOG.error(error);
	}
};

export const copyToClipboard = async (text?: string) => {
	try {
		if (text) {
			await Clipboard.setStringAsync(text);
			toast.success('Copied Successful');
		}
	} catch (error) {
		LOG.error(error);
	}
};

export const fetchCopiedText = async () => {
	try {
		const text = await Clipboard.getStringAsync();

		if (text) {
			return text;
		}
		throw new Error('no data found');
	} catch (error) {
		LOG.error(error);
	}
};

export const transLate = async ({
	text: q,
	language,
}: {
	text: string;
	language: keyof LanguageType;
}) => {
	const res = await fetch('https://libretranslate.com/translate', {
		body: JSON.stringify({
			api_key: '',
			format: 'text',
			q,
			source: 'en',
			target: Languages[language],
		}),
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
	});

	const json: {
		translatedText: string;
	} = await res.json();

	return json.translatedText;
};
