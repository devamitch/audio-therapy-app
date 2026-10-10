import axios from 'axios';

import { toast } from './toast';
import type { LANGUAGES2 } from './translate2';

// import { translate } from '@google-cloud-translate';

// // Create a new translation client
// const translationClient = translate({
// 	credentials: {
// 		private_key: '',
// 		client_email: 'YOUR_CLIENT_EMAIL', // Replace with your client email
// 	},
// });

// // Function to translate text
// export const translateText = async (text: string, targetLanguage: string) => {
// 	try {
// 		const [translation] = await translationClient.translate(text, targetLanguage);

// 		return translation;
// 	} catch (error) {
// 		console.error('Translation error:', error);

// 		return null;
// 	}
// };

export type LanguageKey2 = (typeof LANGUAGES2)[number]['code'];

export const translateText = async ({
	language: to,
	text,
}: {
	language: LanguageKey2;
	text: string;
}) => {
	const options = {
		data: {
			from: 'en',
			text,
			to,
		},
		headers: {
			'X-RapidAPI-Host': 'rapid-translate.p.rapidapi.com',
			'X-RapidAPI-Key': 'fc5f545382mshdcfafa4db3555fcp1b226ajsnb15e075d37f0',
			'content-type': 'application/json',
		},
		method: 'POST',
		url: 'https://rapid-translate.p.rapidapi.com/TranslateText',
	};

	try {
		const response = await axios.request(options);

		return response.data?.result as string;
	} catch (error) {
		toast.error((error as Error).message);

		return '';
	}
};
