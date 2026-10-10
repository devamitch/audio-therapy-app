import * as AppleAuthentication from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/core';
import * as AuthSession from 'expo-auth-session';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';

import { handleError } from '../utils/error';

import { authBottomSheetRef } from '@/constants';
import { useAppStore, useStateStore } from '@/core/store';

export const FB_APP_ID = '917543446019028' as const;

import { checkUser, getAppleUser } from '../server';

import { navigateAndSimpleReset } from '@/navigation/navigation';
import { RootStackNavigationType } from '@/navigation/types';

const TWITTER_API_KEY = '0jcW1vWKsANJXdvQcDhlE2xBH';

const TWITTER_API_SECRET = 'WAfnsL0NRDCJdFjiqZE2Jq1yPkkcOhyGrRP1adAAMtmWTKWCEJ';

const SPOTIFY_CLIENT = '021ad06efd8549eca8a81116437ee06d';

const SPOTIFY_SECRET = 'a884d92dfc924abdbffb50232307f339';

export type FaceBookResponse = {
	id: string;
	name: string;
	email: string;
	picture: Picture;
};

export type Picture = {
	data: Data;
};

export type Data = {
	height?: number;
	is_silhouette?: boolean;
	url: string;
	width?: number;
};

export type GoogleResponseData = {
	email: string;
	family_name: string;
	gender: string;
	given_name: string;
	hd: string;
	id: string;
	link: string;
	locale: string;
	name: string;
	picture: string;
	verified_email: boolean;
	preferences?: string[];
};

WebBrowser.maybeCompleteAuthSession();

const useSocialLogin = () => {
	const setUserType = useAppStore((state) => state.setUserType);

	const navigation = useNavigation<RootStackNavigationType>();

	const setToken = useAppStore((state) => state.setAccessToken);

	const setTempUser = useAppStore((state) => state.setTempUser);

	const tempAppleToken = useStateStore((state) => state.tempAppleToken);

	const takeTour = useAppStore((data) => data.takeTour!!);

	const setTakeTour = useAppStore((data) => data.setTakeTour);

	const setTempAppleToken = useStateStore((state) => state.setTempAppleToken);

	const setCompleteAuth = useAppStore((state) => state.setCompleteAuth);

	const setUser = useAppStore((state) => state?.setUser);

	const setIsSocialAuth = useAppStore((state) => state.setIsSocialAuth);

	const [loading, setLoading] = useState<boolean>();

	const [_, response2, facebokAuth] = Facebook.useAuthRequest({
		clientId: FB_APP_ID,
		responseType: AuthSession.ResponseType.Token,
	});

	const [_twitterReq, twitterResponse, twitterPromptAsync] = AuthSession.useAuthRequest(
		{
			clientId: '0jcW1vWKsANJXdvQcDhlE2xBH',
			redirectUri: AuthSession.makeRedirectUri({
				path: 'https://nonceblox-58adb.firebaseapp.com/__/auth/handler',
			}),
			usePKCE: true,
			scopes: ['tweet.read'],
		},
		{
			authorizationEndpoint: 'https://twitter.com/i/oauth2/authorize',
			tokenEndpoint: 'https://twitter.com/i/oauth2/token',
			revocationEndpoint: 'https://twitter.com/i/oauth2/revoke',
		}
	);

	const [_spotifyReq, spotifyResponse, spotifyPromptAsync] = AuthSession.useAuthRequest(
		{
			clientId: '021ad06efd8549eca8a81116437ee06d',
			clientSecret: SPOTIFY_SECRET,
			scopes: ['user-read-email', 'playlist-modify-public'],
			// To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
			// this must be set to false
			usePKCE: false,
			redirectUri: AuthSession.makeRedirectUri({
				scheme: 'com.nonceblox.test1://authorize',
				// path: 'https://nonceblox-58adb.firebaseapp.com/__/auth/handler',
			}),
		},
		{
			authorizationEndpoint: 'https://accounts.spotify.com/authorize',
			tokenEndpoint: 'https://accounts.spotify.com/api/token',
		}
	);

	const handleTwitterSignIn = async () => {
		const loginResult = await twitterPromptAsync();

		console.log({ loginResult, response: twitterResponse });
		// const authUrl =
		// 	`${twitterConfig.authorizationEndpoint}?` +
		// 	`oauth_token=${twitterConfig.clientId}` +
		// 	`&oauth_callback=${encodeURIComponent(twitterConfig.redirectUri)}`;

		// const result = await WebBrowser.openAuthSessionAsync(authUrl, twitterConfig.redirectUri);

		// console.log(result);

		// if (result.type === 'success') {
		// 	// Handle the authentication result
		// 	console.log(result);
		// } else {
		// 	// Handle errors or cancellations
		// 	console.log('Authentication failed.');
		// }
	};

	const googleAuth = async () => {
		try {
			try {
				await GoogleSignin.hasPlayServices();
				const userInfo = await GoogleSignin.signIn();

				if (userInfo && userInfo?.idToken && userInfo?.user?.email) {
					setLoading(true);
					setIsSocialAuth(true);
					try {
						console.log('Check user ');
						const data = await checkUser({
							email: userInfo?.user?.email,
						});

						console.log('complete check user');

						setUser({
							name: userInfo?.user?.name ?? '',
							email: userInfo?.user?.email ?? '',
							icon: userInfo?.user?.photo ?? '',
							...data,
						});

						setLoading(false);
						setToken(data?.accessToken);
						setTempUser(undefined);
						setCompleteAuth(true);
						setUserType('user');
						authBottomSheetRef?.current?.close();
						if (!takeTour) {
							return navigation.replace('Main');
							// return navigateAndSimpleReset('Main');
							// return navigation.navigate('Main');
						}

						return navigation.replace('Tutorial');
						// return navigateAndSimpleReset('Tutorial');
					} catch (e) {
						setTempUser({
							name: userInfo?.user?.name ?? '',
							email: userInfo?.user?.email ?? '',
							icon: userInfo?.user?.photo ?? '',
						});
						setLoading(false);

						console.log('e =>', e);
						setUserType('user');
						authBottomSheetRef?.current?.close();
						navigation.navigate('CompleteProfile');
					} finally {
						setLoading(false);

						setUserType('user');
						authBottomSheetRef?.current?.close();
					}
				} else {
					setLoading(false);

					throw new Error('no ID token present!');
				}
			} catch (error: unknown) {
				setLoading(false);

				handleError(error);
			}
		} catch (e: unknown) {
			setLoading(false);

			handleError(e);
		}
	};

	const appleAuth = useCallback(async () => {
		try {
			if (!AppleAuthentication.appleAuth.isSupported) {
				throw new Error(' Not supported');
			}

			const appleAuthRequestResponse = await AppleAuthentication.appleAuth.performRequest({
				requestedOperation: AppleAuthentication.appleAuth.Operation.LOGIN,
				requestedScopes: [
					AppleAuthentication.appleAuth.Scope.FULL_NAME,
					AppleAuthentication.appleAuth.Scope.EMAIL,
				],
				nonceEnabled: true,
			});
			const credentialState = await AppleAuthentication.appleAuth.getCredentialStateForUser(
				appleAuthRequestResponse.user
			);

			if (credentialState === AppleAuthentication.appleAuth.State.AUTHORIZED) {
				if (!appleAuthRequestResponse?.user) {
					throw new Error('Something went wrong');
				}
			}
			// setSocialLoginMethod('apple');
			// const curentDate = new Date();

			// curentDate.setMonth(curentDate.getMonth() + 1);
			// setAppleTokenUpdateDate(curentDate);

			// setAppleToken(appleAuthRequestResponse?.user || undefined);

			// if (!appleAuthRequestResponse?.email) {
			// 	try {
			// 		// const currentUser = await getUserByToken(appleAuthRequestResponse?.user);

			// 				}}

			// const credential = await AppleAuthentication.signInAsync({
			// 	requestedScopes: [
			// 		AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
			// 		AppleAuthentication.AppleAuthenticationScope.EMAIL,
			// 	],
			// });

			console.log({ user: appleAuthRequestResponse?.user });
			if (appleAuthRequestResponse?.user) {
				setLoading(true);
				setIsSocialAuth(true);
				// setTempUser
				setTempAppleToken(appleAuthRequestResponse?.user);
				if (!appleAuthRequestResponse?.email) {
					try {
						const data = await getAppleUser({
							tokenId: appleAuthRequestResponse?.user,
						});

						console.log({ data });
						setUser({
							...data,
						});
						setLoading(false);
						setToken(data?.accessToken);
						setTempUser(undefined);
						setCompleteAuth(true);
						setUserType('user');
						authBottomSheetRef?.current?.close();
						if (!takeTour) {
							return navigateAndSimpleReset('Main');
							// return navigation.navigate('Main');
						}

						return navigateAndSimpleReset('Tutorial');
					} catch (e) {
						if (
							appleAuthRequestResponse?.fullName?.givenName &&
							appleAuthRequestResponse?.fullName?.familyName
						) {
							setTempUser({
								name:
									appleAuthRequestResponse?.fullName?.givenName +
									' ' +
									appleAuthRequestResponse?.fullName?.familyName,
							});
						}

						setLoading(false);

						console.log('e =>', e);
						setUserType('user');
						authBottomSheetRef?.current?.close();
						navigation.navigate('CompleteProfile');

						return;
					}
				}
				try {
					console.log('Check user ');
					const data = await checkUser({
						email: appleAuthRequestResponse?.email,
					});

					console.log('complete check user');

					setUser({
						...data,
					});

					setLoading(false);
					setToken(data?.accessToken);
					setTempUser(undefined);
					setCompleteAuth(true);
					setUserType('user');
					authBottomSheetRef?.current?.close();
					if (!takeTour) {
						return navigateAndSimpleReset('Main');
						// return navigation.navigate('Main');
					}

					return navigateAndSimpleReset('Tutorial');
				} catch (e) {
					setTempUser({
						name:
							(appleAuthRequestResponse?.fullName?.familyName || '') +
							' ' +
							(appleAuthRequestResponse?.fullName?.givenName || ''),
					});
					setLoading(false);

					console.log('e =>', e);
					setUserType('user');
					authBottomSheetRef?.current?.close();
					navigation.navigate('CompleteProfile');
				} finally {
					setLoading(false);

					setUserType('user');
					authBottomSheetRef?.current?.close();
				}
			} else {
				setLoading(false);

				throw new Error('no ID token present!');
			}
		} catch (e) {
			console.log({ e });
			setLoading(false);

			handleError(e);
		}
	}, [
		navigation,
		setCompleteAuth,
		setIsSocialAuth,
		setTempAppleToken,
		setTempUser,
		setToken,
		setUser,
		setUserType,
		takeTour,
	]);

	const fetchFacebookUserInfo = useCallback(
		async (token?: string) => {
			setLoading(true);

			if (!token) {
				setLoading(false);

				return;
			}

			const url =
				`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,link,picture` as const;

			const userInfoResponse = await fetch(url);

			const userInfo: FaceBookResponse = await userInfoResponse.json();

			setTempUser({
				name: userInfo?.name ?? '',
				email: userInfo?.email,
				icon: userInfo?.picture?.data?.url ?? '',
			});
			setIsSocialAuth(true);

			setLoading(false);
		},
		[setIsSocialAuth, setTempUser]
	);

	useEffect(() => {
		WebBrowser.warmUpAsync();

		return () => {
			WebBrowser.coolDownAsync();
		};
	}, []);

	useEffect(() => {
		(async () => {
			if (response2?.type === 'success') {
				await fetchFacebookUserInfo(response2?.authentication?.accessToken);
			}
		})();
	}, [fetchFacebookUserInfo, response2]);

	return {
		loading,
		googleAuth,
		facebokAuth,
		twitterAuth: spotifyPromptAsync,
		spotifyPromptAsync,
		appleAuth,
	};
};

export default useSocialLogin;
