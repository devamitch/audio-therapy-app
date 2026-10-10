import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'; // Import the AntDesign icons
import { useNavigation } from '@react-navigation/core';
import { useMutation } from '@tanstack/react-query';

import { AuthLayout } from '@/components';
import MaterialTextEditorComponent from '@/components/Base/experimental/BasicTextEditor';
import { useAppStore } from '@/core/store';
import { completeArtist, socialLogin, SocialLoginParams, SocialParams } from '@/lib/server';
import { handleError, toast } from '@/lib/utils';
import { RootStackNavigationType } from '@/navigation/types';
import { FontSizeColorStyle } from '@/styles';

const AddSocialHandlesPage = () => {
	const compete = useAppStore((state) => state.setCompleteAuth);

	const navigation = useNavigation<RootStackNavigationType>();

	const [tempUser, isSocialAuth, user] = useAppStore((state) => [
		state?.tempUser,
		state?.isSocialAuth,
		state?.user,
	]);

	const setUser = useAppStore((state) => state.setUser);

	const setToken = useAppStore((state) => state.setAccessToken);

	const setTempUser = useAppStore((state) => state.setTempUser);

	const [twitterUsername, setTwitter] = useState('');

	const [instagramUsername, setInstagram] = useState('');

	const [facebookUsername, setFacebook] = useState('');

	const [spotifyUsername, setSpotify] = useState('');

	const [youtubeUsername, setYoutube] = useState('');

	const onMutate = useCallback(
		async (data: SocialParams | SocialLoginParams) => {
			if (isSocialAuth) {
				return socialLogin({ ...data, type: 'artist' });
			}

			return completeArtist(data as SocialParams);
		},
		[isSocialAuth]
	);

	const { mutate, isLoading } = useMutation({
		mutationKey: [],
		mutationFn: onMutate,
		onError: (error) => handleError(error),
		onSuccess(data) {
			const data2 = {
				...data,
				...tempUser,
				twitterUsername,
				instagramUsername,
				facebookUsername,
				spotifyUsername,
				youtubeUsername,
			};

			console.log({ data, data2 });

			setUser(data2);
			setToken(data?.accessToken);

			setTempUser(undefined);
			toast.success('Artist Register sucessful');
			navigation.navigate('Main');
			compete(true);
		},
	});

	const handleMutate = () => {
		return mutate({
			...tempUser,
			...user,
			twitterUsername,
			instagramUsername,
			facebookUsername,
			spotifyUsername,
			youtubeUsername,
		});
	};

	return (
		<AuthLayout
			background="complete_profile"
			submitLabel="Add Social Handlers"
			onSubmit={handleMutate}
			height={700}
			loading={isLoading}
			alignItems="flex-start"
			header={
				<View style={{ width: '100%', gap: 18 }}>
					<View style={{ gap: 5 }}>
						<Text
							style={[
								FontSizeColorStyle['montserrat-600-xxl-white'],
								{ color: '#0A7593' },
							]}
						>
							Introduce{' '}
						</Text>
						<Text style={FontSizeColorStyle['montserrat-700-xxl-grey-b6b6b6']}>
							Your social media !!
						</Text>
						<Text style={FontSizeColorStyle['montserrat-500-16-grey-858585']}>
							This information would help us serve you better{' '}
						</Text>
					</View>
					<View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
						<View>
							<FastImage
								source={
									tempUser?.image
										? tempUser?.image
										: {
												uri:
													user?.icon ||
													tempUser?.icon ||
													'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQNvWDvQb_rCtRL-p_w329CtzHmfzfWP0FIw&usqp=CAU',
											}
								}
								style={{ height: 80, width: 80, borderRadius: 100 }}
							/>
						</View>
					</View>
				</View>
			}
		>
			{/* Twitter Handle */}
			{/* <Text style={styles.title}>Add Social Handles</Text> */}
			<View
				style={{
					flex: 1,
					width: '80%',
					gap: 10,
					alignItems: 'center',
					alignSelf: 'center',
				}}
			>
				<View style={styles.inputContainer}>
					<AntDesign name="twitter" size={24} color="white" style={styles.icon} />
					<MaterialTextEditorComponent
						style={styles.input}
						placeholder="Twitter Handle"
						value={twitterUsername}
						onChangeText={(text) => setTwitter(text)}
					/>
				</View>

				{/* Instagram Handle */}
				<View style={styles.inputContainer}>
					<AntDesign name="instagram" size={24} color="white" style={styles.icon} />
					<MaterialTextEditorComponent
						style={styles.input}
						placeholder="Instagram Handle"
						value={instagramUsername}
						onChangeText={(text) => setInstagram(text)}
					/>
				</View>

				{/* Facebook Handle */}
				<View style={styles.inputContainer}>
					<AntDesign name="facebook-square" size={24} color="white" style={styles.icon} />
					<MaterialTextEditorComponent
						style={styles.input}
						placeholder="Facebook Handle"
						value={facebookUsername}
						onChangeText={(text) => setFacebook(text)}
					/>
				</View>

				<View style={styles.inputContainer}>
					<FontAwesome5 name="spotify" size={24} color="white" style={styles.icon} />

					<MaterialTextEditorComponent
						style={styles.input}
						placeholder="Spotify Handle"
						value={spotifyUsername}
						onChangeText={(text) => setSpotify(text)}
					/>
				</View>
				<View style={styles.inputContainer}>
					<AntDesign name="youtube" size={24} color="white" style={styles.icon} />

					<MaterialTextEditorComponent
						style={styles.input}
						placeholder="Youtube Handle"
						value={youtubeUsername}
						onChangeText={(text) => setYoutube(text)}
					/>
				</View>
			</View>
		</AuthLayout>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f7f7f7',
		flex: 1,
	},
	formContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	icon: {
		marginRight: 8,
	},
	input: {
		flex: 1,
		// width: '80%',
	},
	inputContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		flex: 1,
		position: 'relative',
		// width: '90%',
		marginBottom: 16,
	},
	saveButton: {
		alignItems: 'center',
		backgroundColor: 'orange',
		borderRadius: 8,
		paddingVertical: 12,
	},
	saveButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
	},
});

export default AddSocialHandlesPage;
