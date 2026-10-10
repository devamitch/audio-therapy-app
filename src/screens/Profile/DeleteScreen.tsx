import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';

import { PrimaryButton } from '@/components';
import { useAppStore } from '@/core/store';
import { updateUser } from '@/lib/server';
import { handleError, toast } from '@/lib/utils';
import { FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const ITEMS = [
	'I have privacy concern',
	'I spend too much time on this',
	"I don't like music",
	'Other issues',
] as const;

const DeleteScreen = () => {
	const [reason, setReason] = useState<(typeof ITEMS)[number]>();

	const user = useAppStore((state) => state?.user);

	const navigation = useNavigation();

	const signOut = async () => {
		try {
			await useAppStore.setState({
				deleted: true,
			});
			// await useAppStore?.persist?.clearStorage();
			navigation?.goBack();

			// await navigateAndSimpleReset('SignIn');
		} catch (error) {
			handleError(error);
		}
	};

	const { mutate: deleteUser, isPending } = useMutation({
		mutationKey: [user?._id],
		mutationFn: updateUser,
		onError: (error) => {
			handleError(error);
		},
		onSuccess(data) {
			toast.success('Successful Update');
			signOut();
		},
	});

	const handleDelete = () => {
		deleteUser({ reason, userId: user?._id });
	};

	const handleCancel = () => {
		navigation?.goBack();
	};

	return (
		<GestureHandlerRootView style={LayoutStyle.fill}>
			<Animated.View style={LayoutStyle.fill} />
			<Animated.View style={[LayoutStyle.fill, styles.container]}>
				<BlurView
					style={[LayoutStyle.fill, styles.blur]}
					experimentalBlurMethod={'dimezisBlurView'}
					tint="dark"
					intensity={70}
				>
					<SafeAreaView style={styles.card}>
						<Animated.Text style={FontSizeColorStyle['montserrat-600-20-white']}>
							Are you sure you want to delete?
						</Animated.Text>
						<Text style={FontSizeColorStyle['montserrat-400-12-grey-bfbfbf']}>
							This action cannot be undone. Please confirm if you want to proceed with
							deleting this item.
						</Text>
						<View style={styles.checkboxContainer}>
							{ITEMS?.map((item) => (
								<TouchableOpacity
									style={styles.checkboxItem}
									onPress={() => setReason(item)}
								>
									<FontAwesome
										name={item === reason ? 'dot-circle-o' : 'circle-o'}
										size={24}
										color="#0A7593"
									/>

									<Text
										style={FontSizeColorStyle['montserrat-500-13-grey-bfbfbf']}
									>
										{item}
									</Text>
								</TouchableOpacity>
							))}
						</View>
						<View style={styles.buttonContainer}>
							<PrimaryButton
								label="Yes, confirm Delete"
								size="md"
								onPress={handleDelete}
								gradientType="type2"
								style={[LayoutStyle.row, LayoutStyle.between]}
								endIcon={
									<Entypo
										name="chevron-right"
										size={responsive(16)}
										color="white"
									/>
								}
								isLoading={isPending}
							/>
							<PrimaryButton
								label="No, Cancel"
								size="md"
								onPress={handleCancel}
								gradientType="type3"
								style={[LayoutStyle.row, LayoutStyle.between]}
								endIcon={
									<Entypo
										name="chevron-right"
										size={responsive(16)}
										color="white"
									/>
								}
								isLoading={isPending}
							/>
						</View>
					</SafeAreaView>
				</BlurView>
			</Animated.View>
		</GestureHandlerRootView>
	);
};

export default DeleteScreen;

const styles = StyleSheet.create({
	buttonContainer: {
		gap: responsive(10),
	},
	buttonText: {
		color: 'white',
		fontSize: responsive(16),
		fontWeight: 'bold',
	},
	cancelButton: {
		backgroundColor: 'gray',
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	card: {
		// alignItems: 'center',
		flex: 1,
		gap: responsive(15),
		// justifyContent: 'center',
		paddingHorizontal: responsive(40),
	},
	checkboxContainer: {
		gap: responsive(10),
	},
	checkboxItem: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: responsive(10),
		paddingHorizontal: responsive(10),
	},
	checkboxLabel: {
		color: 'white',
		fontSize: responsive(16),
		marginLeft: responsive(10),
	},
	deleteButton: {
		backgroundColor: 'red',
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 5,
	},
	description: {
		color: 'white',
		fontSize: 16,
		marginVertical: 20,
		textAlign: 'center',
	},
	container: {
		overflow: 'hidden',
		// flex: 1,
		position: 'relative',
		borderColor: '#0A7593',
		borderTopWidth: responsive(1),
		borderLeftWidth: responsive(1),
		borderRadius: responsive(40),
	},
	blur: {
		overflow: 'hidden',
		position: 'relative',

		borderRadius: responsive(40),
	},
} as const);
