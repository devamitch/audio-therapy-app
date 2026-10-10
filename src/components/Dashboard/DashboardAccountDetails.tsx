import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton, TouchableHighlight } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useMutation } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';

import { Chip } from '../Base';
import { ButtonProps } from '../Base/experimental/Button';

import { useAppStore } from '@/core/store';
import { updateUser } from '@/lib/server';
import { handleError, toast } from '@/lib/utils';
import { ALL_COLORS, FontSizeColorStyle, responsive } from '@/styles';

export type User = {
	_id?: string;
	name?: string;
	email?: string;
	icon?: string;
	currentBalance?: number;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
	id?: string;
	level?: string;
};

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

const AnimatedButton: React.FC<ButtonProps> = ({
	children,
	gradientStyle,
	btnStyle,
	colors = ['rgba(21, 113, 139, 0.20)', 'rgba(65, 169, 199, 0.20)'],
	...props
}) => {
	const isPressed = useSharedValue(false);

	const animatedStyle = useAnimatedStyle(() => {
		const scale = withSpring(isPressed.value ? 0.9 : 1, { stiffness: 100 });

		const opacity = withTiming(isPressed.value ? 0.8 : 1, {
			duration: 150,
			easing: Easing.linear,
		});

		const rotate = withTiming(isPressed.value ? '180deg' : '0deg', {
			duration: 400,
			easing: Easing.linear,
		});

		return {
			transform: [{ scale }, { rotate }],
			opacity,
		};
	});

	return (
		<AnimatedRectButton
			style={[animatedStyle, btnStyle]}
			onBegan={() => {
				isPressed.value = true;
			}}
			onActivated={() => {
				isPressed.value = true;
			}}
			onFailed={() => {
				isPressed.value = false;
			}}
			onCancelled={() => {
				isPressed.value = false;
			}}
			onEnded={() => {
				isPressed.value = false;
			}}
			onLongPress={() => {
				isPressed.value = false;
			}}
			{...props}
		>
			<LinearGradient colors={colors} style={gradientStyle}>
				{children}
			</LinearGradient>
		</AnimatedRectButton>
	);
};

const DashboardAccountDetails: React.FC<User> = ({ name, email, icon, level, id }) => {
	const [open, setOpen] = useState(false);

	const navigation = useNavigation();

	const setUser = useAppStore((state) => state?.setUser);

	const [profileOpen, setProfileOpen] = useState(false);

	const [soundEffet, setSound] = useState(false);

	const [phone, setPhone] = useState('');

	const [fullName, setFullName] = useState(name);

	const [gender, setGender] = useState<'male' | 'female' | 'na'>();

	const { mutate: update } = useMutation({
		mutationKey: [email],
		mutationFn: updateUser,
		onError: (error) => {
			handleError(error);
		},
		onSuccess(data) {
			setProfileOpen(false);
			toast.success('Successful Update');
			setUser({
				...data,
				name: fullName,
				phone_number: phone,
				icon,
				gender,
			});
			// setToken(data?.accessToken);
			// setTempUser(undefined);
			// setCompleteAuth(true);
			// navigation.navigate('Main');
		},
	});

	return (
		<>
			<View style={styles.container}>
				<View style={styles.wrapper}>
					<TouchableHighlight
						style={styles.avatarWrapper}
						onPress={() => navigation?.navigate('ProfilePicture', { id })}
					>
						<FastImage style={styles.avatar} source={{ uri: icon }} />
					</TouchableHighlight>

					<RectButton
						style={styles.gap4}
						onPress={() => navigation?.navigate('Edit', { id })}
					>
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit
							allowFontScaling
							style={FontSizeColorStyle['lato-700-20-white']}
						>
							{name}
						</Text>

						<Text
							style={FontSizeColorStyle['montserrat-500-12-primary-light']}
							numberOfLines={1}
							adjustsFontSizeToFit
							allowFontScaling
						>
							{`${email} `}
						</Text>
						{false ? <Chip text={level} /> : null}
					</RectButton>
				</View>
				<AnimatedButton
					gradientStyle={styles.buttton}
					colors={['transparent', 'rgba(0,0,0,0.1)']}
					onPress={() => navigation?.navigate('Settings', { id })}
				>
					<Ionicons name="settings-outline" size={responsive(38)} color="white" />
				</AnimatedButton>
			</View>
		</>
	);
};

export default DashboardAccountDetails;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: responsive(10),
		alignItems: 'center',
		paddingRight: responsive(10),
		paddingLeft: responsive(5),
	},
	wrapper: { flex: 1, flexDirection: 'row', gap: responsive(10), alignItems: 'center' },
	avatarWrapper: {
		borderRadius: responsive(100),
		borderColor: ALL_COLORS.white,
		borderWidth: responsive(2),
		borderBottomWidth: responsive(4),
	},
	avatar: {
		height: responsive(60),
		width: responsive(60),
		borderRadius: responsive(100),
	},
	gap4: {
		gap: responsive(4),
	},
	chip: {
		borderRadius: responsive(6),
		paddingHorizontal: responsive(11),
		paddingVertical: responsive(6),
		alignSelf: 'flex-start',
	},
	buttton: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 0,
		paddingVertical: 0,
		padding: 0,
		borderRadius: responsive(25),
		paddingLeft: 0,
		paddingTop: 0,
		paddingRight: 0,
		paddingBottom: 0,
	},
	itemsContainer: {
		gap: responsive(10),
		padding: responsive(30),
		borderRadius: responsive(10),
		maxWidth: responsive(320),
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.7)',
		justifyContent: 'center',
	},
	itemsContainer2: {
		gap: responsive(20),
		padding: responsive(30),
		borderRadius: responsive(10),
		maxWidth: responsive(320),
		width: '100%',
		justifyContent: 'center',
		overflow: 'hidden',
		position: 'relative',
		borderColor: '#0A7593',
		borderTopWidth: responsive(1),
		borderLeftWidth: responsive(1),
	},
} as const);
