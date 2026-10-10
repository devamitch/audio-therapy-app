import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';

import { Button, PrimaryButton } from '@/components';
import MaterialTextEditorComponent from '@/components/Base/experimental/BasicTextEditor';
import GradientText from '@/components/Base/GradientText';
import { useAppStore } from '@/core/store';
import { updateUser } from '@/lib/server';
import { handleError, isAndroid, toast } from '@/lib/utils';
import { MainStackRouteType } from '@/navigation/main/MainStack';
import { ALL_COLORS, FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const EDIT = 'Edit Profile Here' as const;

const selectedItem = {
	title: 'Gender',
	description: 'Select Gender',
} as const;

const ITEMS = [
	// { label: 'Please select gender', value: 'gender' },
	{ label: 'Male', value: 'male' },
	{ label: 'Female', value: 'female' },
] as const;

const EditeHeader = () => (
	<GradientText
		allowFontScaling
		numberOfLines={2}
		adjustsFontSizeToFit
		style={[FontSizeColorStyle['montserrat-500-xxl-white'], styles.edit]}
		colors={['#00BCFD', '#007097']}
		start={{ x: 0, y: 1 }}
		end={{ x: 1, y: 0 }}
	>
		{EDIT}
	</GradientText>
);

const UpdateUserScreen: React.FC<MainStackRouteType<'Edit'>> = ({ navigation }) => {
	const [open, setOpen] = useState(false);

	const setUser = useAppStore((state) => state?.setUser);

	const user = useAppStore((state) => state?.user);

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		city: '',
		gender: 'gender',
		dob: new Date(),
	});

	const { firstName, lastName, phone, city, gender, dob } = formData;

	const { mutate: update, isPending } = useMutation({
		mutationKey: [user?.email],
		mutationFn: updateUser,
		onError: (error) => {
			handleError(error);
		},
		onSuccess: (data) => {
			toast.success('Successful Update');
			setUser({
				...data,
				name: `${firstName} ${lastName}`,
				phone_number: phone,
				icon: user?.icon,
			});
			navigation.goBack();
		},
	});

	useEffect(() => {
		if (user) {
			console.log({ lastName: user?.name?.split(' ')?.[1] ?? '' });
			setFormData({
				firstName: user?.name?.split(' ')?.[0] ?? '',
				lastName: user?.name?.split(' ')?.[1] ?? '',
				phone: user?.phone_number || '',
				city: user?.city || '',
				gender: user?.gender || 'gender',
				dob: user?.dob ? new Date(user.dob) : new Date(),
			});
		}
	}, [user]);

	const validateForm = useCallback(() => {
		if (!firstName || !lastName || gender === null) {
			Alert.alert('Validation Error', 'Please fill in all required fields.');

			return false;
		}

		return true;
	}, [firstName, lastName, gender]);

	const onSubmit = useCallback(() => {
		if (validateForm()) {
			update({
				name: `${firstName} ${lastName}`,
				phone_number: phone,
				userId: user?.id || user?._id,
				gender,
				city,
				dob,
			});
		}
	}, [firstName, lastName, phone, gender, city, dob, user, update, validateForm]);

	const handleInputChange = useCallback((field: string, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	}, []);

	return (
		<GestureHandlerRootView style={LayoutStyle.fill}>
			<BlurView
				style={[LayoutStyle.fill, LayoutStyle.center, { padding: 20 }]}
				tint="dark"
				intensity={50}
				experimentalBlurMethod={'dimezisBlurView'}
			>
				<Animated.View
					style={styles.itemsContainer}
					entering={SlideInDown.duration(500)}
					exiting={SlideOutDown.delay(100).duration(300)}
				>
					<View style={styles.header}>
						<EditeHeader />
						<RectButton onPress={() => navigation?.navigate('ProfilePicture')}>
							<Animated.Image
								style={styles.avatar}
								source={{ uri: user?.icon }}
								sharedTransitionTag={user?._id}
							/>
							<RectButton style={styles.close}>
								<Entypo name="pencil" size={responsive(24)} color="white" />
							</RectButton>
						</RectButton>
					</View>
					<View style={{ gap: responsive(20) }}>
						<MaterialTextEditorComponent
							placeholder="First Name"
							value={firstName}
							onChangeText={(text) => handleInputChange('firstName', text)}
							keyboardType="name-phone-pad"
							autoFocus
						/>
						<MaterialTextEditorComponent
							placeholder="Last Name"
							value={lastName || ''}
							onChangeText={(text) => handleInputChange('lastName', text)}
							keyboardType="name-phone-pad"
						/>
						<MaterialTextEditorComponent
							placeholder="Email"
							value={user?.email}
							editable={false}
							showClearButton={false}
						/>
						<MaterialTextEditorComponent
							placeholder="Date of Birth"
							onPressIn={() => setOpen(true)}
							value={dob?.toDateString()}
							showClearButton={false}
						/>
						<View style={{ gap: responsive(8), flexDirection: 'row', width: '100%' }}>
							<View
								style={{
									flex: 1,
									gap: responsive(5),
									paddingVertical: responsive(5),
								}}
							>
								<Animated.Text
									style={[
										FontSizeColorStyle['heebo-600-13-white'],
										{ position: 'absolute', top: responsive(-15) },
									]}
								>
									{selectedItem.title}
								</Animated.Text>
								<RNPickerSelect
									placeholder={{ label: 'Please select gender', value: 'gender' }}
									value={gender}
									onValueChange={(value) => handleInputChange('gender', value)}
									items={ITEMS}
									useNativeAndroidPickerStyle
									fixAndroidTouchableBug
									darkTheme
									pickerProps={{ accessibilityLabel: selectedItem.title }}
								>
									<Animated.View
										style={{
											borderRadius: responsive(8),
											borderColor: 'white',
											borderWidth: responsive(2),
											justifyContent: 'center',
											padding: isAndroid ? responsive(15) : responsive(12),
										}}
									>
										<Animated.Text
											style={[
												FontSizeColorStyle['heebo-400-16-white'],
												{ color: '#c4c4c4' },
											]}
											numberOfLines={1}
											adjustsFontSizeToFit
											allowFontScaling
										>
											{ITEMS.find((item) => item.value === gender)?.label ||
												'Please select gender'}
										</Animated.Text>
									</Animated.View>
								</RNPickerSelect>
							</View>
							<View style={{ flex: 1 }}>
								<MaterialTextEditorComponent
									placeholder="City"
									value={city}
									onChangeText={(text) => handleInputChange('city', text)}
								/>
							</View>
						</View>
						<MaterialTextEditorComponent
							placeholder="Phone"
							keyboardType="numeric"
							value={phone}
							onChangeText={(text) => handleInputChange('phone', text)}
						/>
					</View>
					<PrimaryButton
						label="Save Profile Details"
						style={{ justifyContent: 'center' }}
						onPress={onSubmit}
						isLoading={isPending}
						gradientType="type3"
					/>
					<Button
						label="Cancel"
						labelStyle={FontSizeColorStyle['heebo-600-16-white']}
						style={{ justifyContent: 'center' }}
						onPress={() => navigation?.goBack()}
						enabled={!isPending}
					/>
					<DatePicker
						modal
						open={open}
						date={dob}
						onConfirm={(date) => {
							setOpen(false);
							handleInputChange('dob', date);
						}}
						onCancel={() => setOpen(false)}
						mode="date"
					/>
				</Animated.View>
			</BlurView>
		</GestureHandlerRootView>
	);
};

export default UpdateUserScreen;

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
		height: responsive(119),
		width: responsive(119),
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
		backgroundColor: 'rgba(0,0,0,0.7)',
		justifyContent: 'center',
		overflow: 'hidden',
		position: 'relative',
		borderColor: '#0A7593',
		borderTopWidth: responsive(1),
		borderLeftWidth: responsive(1),
		width: '100%',
	},
	itemsContainer2: {
		gap: responsive(20),
		padding: responsive(30),
		borderRadius: responsive(10),
		width: responsive(320),
		justifyContent: 'center',
		overflow: 'hidden',
		position: 'relative',
		borderColor: '#0A7593',
		borderTopWidth: 1,
		borderLeftWidth: 1,
	},
	close: {
		alignItems: 'center',
		backgroundColor: '#006C92',
		borderRadius: responsive(20),
		height: responsive(40),
		justifyContent: 'center',
		position: 'absolute',
		right: responsive(0),
		bottom: responsive(5),
		width: responsive(40),
	},
	edit: {
		width: responsive(187),
		fontFamily: 'DoHyeon',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: responsive(10),
		paddingVertical: responsive(10),
		width: '100%',
	},
} as const);
