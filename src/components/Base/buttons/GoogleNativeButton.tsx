import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { shallow } from 'zustand/shallow';

import type { ButtonProps } from '../experimental/Button';

import SocialMeDiaLoading from './SocialMeDiaLoading';
import TernaryButton from './TernaryButton';

import { IMAGES } from '@/assets';
import { useStateStore } from '@/core/store';
import { signInWithGoogle } from '@/lib/utils';
import { FontSizeColorStyle, responsive } from '@/styles';

type GoogleButtonProps = ButtonProps & {
	redirect?: 'Volunteer' | 'Donor';
	shouldNavigate?: boolean;
};

const GoogleNativeButton: React.FC<GoogleButtonProps> = ({
	redirect,
	shouldNavigate,
	...props
}) => {
	const [backendConnecting, socialLoading] = useStateStore(
		(state) => [state?.backendConnecting, state?.socialLoading],
		shallow
	);

	const onGoogleClick = useCallback(async () => {
		await signInWithGoogle({ redirect, shouldNavigate });
	}, [redirect, shouldNavigate]);

	return (
		<>
			<TernaryButton
				startIcon={
					<FastImage source={IMAGES.google} style={styles.google} resizeMode="contain" />
				}
				label="Sign in/Up"
				fullWidth
				center
				labelStyle={[FontSizeColorStyle['montserrat-600-18-grey-797979']]}
				onPress={onGoogleClick}
				isLoading={socialLoading || backendConnecting}
				{...props}
			/>
			<SocialMeDiaLoading
				socialLoading={socialLoading}
				backendConnecting={backendConnecting}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	google: {
		height: responsive(30),
		marginRight: responsive(8),
		width: responsive(32),
		resizeMode: 'contain',
	},
	loadingText: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		gap: responsive(5),
		justifyContent: 'center',
		left: 0,
		padding: responsive(5),
		position: 'absolute',
		right: 0,
		top: responsive(100),
	},
} as const);

export default GoogleNativeButton;
