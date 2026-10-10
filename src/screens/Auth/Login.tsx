/* eslint-disable no-warning-comments */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-inline-styles/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';

import { AuthLayout } from '@/components';
import MaterialTextEditorComponent from '@/components/Base/experimental/BasicTextEditor';
import { useAppStore } from '@/core/store';
import { login } from '@/lib/server';
import { handleError, toast } from '@/lib/utils';
import { navigateAndSimpleReset } from '@/navigation/navigation';
import { RootStackNavigationType } from '@/navigation/types';
import { FontSizeColorStyle } from '@/styles';

const LoginPage = ({ navigation }: { navigation: RootStackNavigationType }) => {
	const setUser = useAppStore((state) => state.setUser);

	const setToken = useAppStore((state) => state.setAccessToken);

	const setTempUser = useAppStore((state) => state.setTempUser);

	const setCompleteAuth = useAppStore((state) => state.setCompleteAuth);

	const [email, setEmail] = useState<string>();

	const [password, setPassword] = useState<string>();

	const takeTour = useAppStore((data) => data.takeTour!!);

	const create = useMutation({
		mutationKey: [email, password],
		mutationFn: login,
		onError: (error) => {
			handleError(error);
		},
		onSuccess(data) {
			console.log({ data });
			toast.success('Successful user Login');
			setUser({
				...data,
				email,
				password,
			});
			setToken(data?.accessToken);
			setTempUser(undefined);
			setCompleteAuth(true);
			if (!takeTour) {
				return navigateAndSimpleReset('Main');
				// return navigation.navigate('Main');
			}

			return navigateAndSimpleReset('Tutorial');
			// navigation.navigate('Main');
		},
	});

	const mutate = create.mutate;

	// create.isPending
	const onSubmit = useCallback(() => {
		if (!email || !password) {
			return toast.error('Please enter credetials');
		}
		mutate({
			email,
			password,
		});
	}, [email, mutate, password]);

	return (
		<AuthLayout
			background="complete_profile"
			height={500}
			submitLabel="Continue"
			onSubmit={onSubmit}
			loading={create.isPending}
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
							Continue{' '}
						</Text>
						<Text style={FontSizeColorStyle['montserrat-700-xxl-grey-b6b6b6']}>
							Signin Here !!
						</Text>
						<Text style={FontSizeColorStyle['montserrat-500-16-grey-858585']}>
							This information would help us serve you better{' '}
						</Text>
					</View>
				</View>
			}
		>
			<MaterialTextEditorComponent
				placeholder="Email"
				keyboardType="email-address"
				value={email}
				onChangeText={(text) => setEmail(text?.toLowerCase())}
			/>

			<MaterialTextEditorComponent
				placeholder="Password"
				keyboardType="default"
				secureTextEntry
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>
		</AuthLayout>
	);
};

export default LoginPage;
