import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import Share from 'react-native-share';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/core';

import { toast } from '../utils';

import {
	CloseIcon,
	FaceBookIcon,
	InstagramIcon,
	PinterestIcon,
	ShareIcon,
	TelegramIcon,
	TwitterIcon,
	WhatsappIcon,
} from './Icons';

import { PACKAGE_NAME } from '@/constants/env';
import { useStateStore } from '@/core/store';
import { smBottomSheetRef } from '@/screens/Settings';
export interface ShareIconProps {
	available: boolean;
}

export type ShareItemsTypes = {
	id: number;
	title:
		| 'facebook'
		| 'instagram'
		| 'whatsapp'
		| 'telegram'
		| 'twitter'
		| 'pinterest'
		| 'signal'
		| 'email'
		| 'more'
		| 'close';
	icon: ({ available }: ShareIconProps) => JSX.Element;
	package:
		| 'com.facebook.katana'
		| 'com.instagram.android'
		| 'com.whatsapp'
		| 'org.telegram.messenger'
		| 'com.twitter.android'
		| 'com.pinterest'
		| 'org.thoughtcrime.securesms'
		| 'com.google.android.gm'
		| 'com.android.settings'
		| '';
	onPress?: () => void;
	isEnabled?: boolean;
}[];
export default () => {
	const [items, setItems] = useState<ShareItemsTypes>([]);

	const setBottomSheetOpen = useStateStore((state) => state.setBottomSheetOpen);

	const { dismissAll } = useBottomSheetModal();

	// ${APP_NAME} Play Store ▶️ Link
	const url = `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`;

	// these are the available options in react-native-share
	const availableShareOptions = useMemo(() => {
		return [
			'facebook'.toLowerCase(),
			'twitter'.toLowerCase(),
			'instagram'.toLowerCase(),
			'whatsapp'.toLowerCase(),
			'telegram'.toLowerCase(),
			'pinterest'.toLowerCase(),
			'email'.toLowerCase(),
			'GOOGLEPLUS'.toLowerCase(),
			'LINKEDIN'.toLowerCase(),
			'MESSENGER'.toLowerCase(),
			'SNAPCHAT'.toLowerCase(),
			'SMS'.toLowerCase(),
			'INSTAGRAM_STORIES'.toLowerCase(),
			'WHATSAPPBUSINESS'.toLowerCase(),
			'PAGESMANAGER'.toLowerCase(),
			'FACEBOOK_STORIES'.toLowerCase(),
		];
	}, []);

	useFocusEffect(
		useCallback(() => {
			return () => {
				smBottomSheetRef.current?.close();

				dismissAll();
				setBottomSheetOpen(false);
			};
		}, [dismissAll, setBottomSheetOpen])
	);

	// Call Back Function to share the url
	const share = useCallback(
		async (social: string) => {
			try {
				if (social && availableShareOptions.includes(social)) {
					let socialType;

					if (social === 'close') {
						smBottomSheetRef.current?.close();
						dismissAll();
						setBottomSheetOpen(false);

						return;
					} else if (social === 'facebook') {
						socialType = Share.Social.FACEBOOK;
					} else if (social === 'twitter') {
						socialType = Share.Social.TWITTER;
					} else if (social === 'instagram') {
						socialType = Share.Social.INSTAGRAM;
					} else if (social === 'whatsapp') {
						socialType = Share.Social.WHATSAPP;
					} else if (social === 'telegram') {
						socialType = Share.Social.TELEGRAM;
					} else if (social === 'email') {
						socialType = Share.Social.EMAIL;
					} else if (social === 'pinterest') {
						socialType = Share.Social.PINTEREST;
					}
					if (socialType) {
						const shareOptions = {
							message:
								'True Knowledge lies in sharing together, share and invite your friends to get this news\n',
							social: socialType,
							title: `Share via ${social}`,
							url,
							// type: 'link',
							// email: 'tech@defieleven.com',
						};

						await Share.shareSingle(shareOptions);
					}
				} else {
					if (social === 'close') {
						smBottomSheetRef.current?.close();

						return;
					}
					await Share.open({
						message:
							'True Knowledge lies in sharing together, share and invite your friends to get this news \n',
						title: 'Share via',
						url,
					});
				}
			} catch (error) {
				toast.error((error as Error)?.message);
			}
		},
		[availableShareOptions, dismissAll, setBottomSheetOpen, url]
	);

	// Useing memo to avoid re-rendering the FlatList
	const shareItems = useMemo((): ShareItemsTypes => {
		return [
			{
				icon: FaceBookIcon,
				id: 1,
				package: 'com.facebook.katana',
				title: 'facebook',
			},
			{
				icon: InstagramIcon,
				id: 2,
				package: 'com.instagram.android',
				title: 'instagram',
			},
			{
				icon: WhatsappIcon,
				id: 3,
				package: 'com.whatsapp',
				title: 'whatsapp',
			},
			{
				icon: TelegramIcon,
				id: 4,
				package: 'org.telegram.messenger',
				title: 'telegram',
			},
			{
				icon: TwitterIcon,
				id: 5,
				package: 'com.twitter.android',
				title: 'twitter',
			},
			{
				icon: PinterestIcon,
				id: 6,
				package: 'com.pinterest',
				title: 'pinterest',
			},

			{
				icon: CloseIcon,
				id: 7,
				package: '',
				title: 'close',
			},
			{
				icon: ShareIcon,
				id: 8,
				package: 'com.android.settings',
				title: 'more',
			},
		];
	}, []);

	useEffect(() => {
		(() => {
			shareItems.map(async (item) => {
				if (Platform.OS === 'ios') {
					setItems((prevState) => [
						...prevState,
						{
							...item,
							icon: item.icon,
							isEnabled: true,
							onPress: async () => share(item.title),
						},
					]);
				} else if (Platform.OS === 'android') {
					if (
						item.title === 'more' ||
						item.title === 'signal' ||
						item.title === 'close'
					) {
						const { isInstalled } = await Share.isPackageInstalled(item.package);

						setItems((prevState) => [
							...prevState,
							{
								...item,
								isEnabled: item.title === 'signal' ? isInstalled : true,
								onPress: async () => share(item.title),
							},
						]);
					} else {
						const { isInstalled } = await Share.isPackageInstalled(item.package);

						setItems((prevState) => [
							...prevState,
							{
								...item,
								isEnabled: isInstalled,
								onPress: async () => share(item.title),
							},
						]);
					}
				}
			});
		})();
	}, [availableShareOptions, share, shareItems]);

	const finalItems = useMemo(() => {
		if (items.length >= 6) {
			return items.sort((a, b) => a.id - b.id);
		}

		return [];
	}, [items]);

	return {
		finalItems,
		items,
	};
};
