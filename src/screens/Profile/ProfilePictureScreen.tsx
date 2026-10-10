import React, { useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppStore } from '@/core/store';
import { updateUser } from '@/lib/server';
import { singleFileUpload } from '@/lib/server/file';
import { handleError, toast } from '@/lib/utils';
import { MainStackRouteType } from '@/navigation/main/MainStack';
import { FontSizeColorStyle, responsive } from '@/styles';

// Reusable Components
type BackgroundImageProps = {
	source: { uri: string };
	children: React.ReactNode;
};

const BackgroundImage: React.FC<BackgroundImageProps> = ({ source, children }) => (
	<ImageBackground
		style={styles.fill}
		source={source}
		resizeMode="cover"
		imageStyle={{ opacity: 0.2 }}
		blurRadius={6}
	>
		{children}
	</ImageBackground>
);

type GradientOverlayProps = {
	children: React.ReactNode;
};

const GradientOverlay: React.FC<GradientOverlayProps> = ({ children }) => (
	<LinearGradient style={styles.fill} colors={['transparent', 'rgba(0,0,0,0.8)']}>
		{children}
	</LinearGradient>
);

type BlurredContainerProps = {
	children: React.ReactNode;
	style?: ViewStyle;
};

const BlurredContainer: React.FC<BlurredContainerProps> = ({ children, style }) => (
	<BlurView style={[styles.fill, style]} tint="dark" intensity={50}>
		{children}
	</BlurView>
);

type ProfileImageProps = {
	source: { uri: string };
};

const ProfileImage: React.FC<ProfileImageProps> = ({ source }) => (
	<BlurView style={styles.imageContainer} tint="dark" intensity={100}>
		<Animated.View style={styles.fill}>
			<Animated.Image style={styles.image} source={source} />
			<LinearGradient
				style={styles.imageGradient}
				colors={['transparent', 'rgba(0,0,0,0.4)']}
			/>
		</Animated.View>
	</BlurView>
);

type TopBarProps = {
	name: string;
	onBackPress: () => void;
};

const TopBar: React.FC<TopBarProps> = ({ name, onBackPress }) => (
	<Animated.View
		style={styles.topContainer}
		entering={SlideInDown.duration(500)}
		exiting={SlideOutDown.duration(300)}
	>
		<UserInfo name={name} />
		<IconButton
			icon={<Entypo name="cross" size={responsive(24)} color="white" />}
			onPress={onBackPress}
		/>
	</Animated.View>
);

type BottomBarProps = {
	onCameraPress: (type: 'front' | 'back') => void;
	onGalleryPress: () => void;
	onDeletePress: () => void;
	onUploadPress: () => void;
	onRemoveImagePress: () => void;
	onUnselectImagePress: () => void;
};

const BottomBar: React.FC<BottomBarProps> = ({
	onCameraPress,
	onGalleryPress,
	onDeletePress,
	onUploadPress,
	onRemoveImagePress,
	onUnselectImagePress,
}) => (
	<Animated.View
		style={styles.bottomContainer}
		entering={FadeIn.duration(500)}
		exiting={FadeOut.duration(300)}
	>
		<IconButton
			icon={<Entypo name="camera" size={responsive(24)} color="white" />}
			onPress={() => onCameraPress('back')}
		/>
		<IconButton
			icon={
				<MaterialCommunityIcons
					name="camera-front-variant"
					size={responsive(24)}
					color="white"
				/>
			}
			onPress={() => onCameraPress('front')}
		/>
		<IconButton
			icon={<Ionicons name="image" size={responsive(24)} color="white" />}
			onPress={onGalleryPress}
		/>
		<IconButton
			icon={
				<MaterialCommunityIcons name="delete-empty" size={responsive(24)} color="white" />
			}
			onPress={onDeletePress}
		/>
		<IconButton
			icon={<MaterialCommunityIcons name="cancel" size={responsive(24)} color="white" />}
			onPress={onRemoveImagePress}
		/>
		<IconButton
			icon={<MaterialCommunityIcons name="selection" size={responsive(24)} color="white" />}
			onPress={onUnselectImagePress}
		/>
		<IconButton
			icon={<Ionicons name="cloud-upload" size={responsive(24)} color="white" />}
			onPress={onUploadPress}
		/>
	</Animated.View>
);

type IconButtonProps = {
	icon: React.ReactNode;
	onPress: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({ icon, onPress }) => (
	<TouchableOpacity onPress={onPress} style={styles.iconButtonContainer}>
		<BlurView style={styles.iconButton} intensity={70} tint="dark">
			{icon}
		</BlurView>
	</TouchableOpacity>
);

type UserInfoProps = {
	name: string;
};

const UserInfo: React.FC<UserInfoProps> = ({ name }) => (
	<BlurView style={styles.userInfoContainer} intensity={70} tint="dark">
		<Text style={FontSizeColorStyle['lato-900-13-white']}>{name}</Text>
	</BlurView>
);

type LoadingOverlayProps = {
	visible: boolean;
	progress: number;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible, progress }) => {
	if (!visible) return null;

	return (
		<BlurView style={styles.loadingOverlay} tint="dark" intensity={30}>
			<ActivityIndicator size="large" color="#fff" />
			<Text style={styles.loadingText}>{`Uploading... ${progress}%`}</Text>
		</BlurView>
	);
};

// Main Component
const ProfilePictureScreen: React.FC<MainStackRouteType<'ProfilePicture'>> = ({ navigation }) => {
	const user = useAppStore((state) => state?.user);

	const setUser = useAppStore((state) => state?.setUser);

	const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

	const [uploadedIcon, setUploadedIcon] = useState<string>();

	const [uploadProgress, setUploadProgress] = useState(0);

	// const devices = useCameraDevices();

	// const device = devices.back;

	const checkCameraPermission = async (): Promise<any> => {
		// const status = await Camera.requestCameraPermission();
		// return status;
	};

	const onUpdate = async (file?: ImagePicker.ImagePickerAsset) => {
		if (file) {
			const icon = await singleFileUpload(file, setUploadProgress);

			setUploadedIcon(icon);
			setImage(null);

			return updateUser({
				icon,
				userId: user?.id || user?._id,
			});
		}
		setUploadedIcon(undefined);
		setUser({ icon: undefined, avatar: undefined });

		return updateUser({
			icon: '',
			userId: user?.id || user?._id,
		});
	};

	const { mutate: update, isPending } = useMutation({
		mutationKey: [user?.email, user?.id, user?._id],
		mutationFn: onUpdate,
		onError: (error) => {
			handleError(error);
			navigation.goBack();
		},
		onSuccess(data) {
			toast.success('Successful Update');
			setUser({ ...data, icon: uploadedIcon, avatar: uploadedIcon });
			navigation.goBack();
		},
	});

	const handleUpload = async () => {
		try {
			if (!image) {
				throw new Error('Please Select an Image');
			}
			update(image);
		} catch (error) {
			Alert.alert('Error', error?.message);
		}
	};

	const openCamera = async (type: 'front' | 'back') => {
		const permission = await checkCameraPermission();

		if (permission === 'authorized') {
			const result = await ImagePicker.launchCameraAsync({
				cameraType:
					type === 'front' ? ImagePicker.CameraType.front : ImagePicker.CameraType.back,
			});

			if (!result.cancelled) {
				setImage(result.uri);
			}
		} else {
			Alert.alert('Permission Denied', 'Camera access is required to take a photo.');
		}
	};

	const openLibrary = async () => {
		const result = await ImagePicker.launchImageLibraryAsync();

		if (!result?.canceled) {
			setImage(result?.assets?.[0]);
		}
	};

	const removeImage = () => {
		update(undefined);
	};

	const unselectImage = () => {
		setImage(null);
	};

	return (
		<GestureHandlerRootView style={styles.fill}>
			<BackgroundImage source={{ uri: user?.icon }}>
				<GradientOverlay>
					<BlurredContainer>
						<SafeAreaView style={[styles.fill, styles.center, styles.safeArea]}>
							<Animated.View
								style={styles.itemsContainer}
								entering={FadeIn.duration(500)}
								exiting={FadeOut.duration(300)}
							>
								<TopBar
									name={user?.name || 'Anonymous'}
									onBackPress={() => navigation.goBack()}
								/>
								<ProfileImage source={image ?? { uri: user?.icon }} />
								<BottomBar
									onCameraPress={openCamera}
									onGalleryPress={openLibrary}
									onDeletePress={removeImage}
									onUploadPress={handleUpload}
									onRemoveImagePress={removeImage}
									onUnselectImagePress={unselectImage}
								/>
							</Animated.View>
						</SafeAreaView>
						<LoadingOverlay visible={isPending} progress={uploadProgress} />
					</BlurredContainer>
				</GradientOverlay>
			</BackgroundImage>
		</GestureHandlerRootView>
	);
};

// Styles
const styles = StyleSheet.create({
	bottomContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		paddingVertical: responsive(12),
		width: '100%',
	},
	center: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	fill: {
		flex: 1,
	},
	iconButton: {
		alignItems: 'center',
		borderRadius: responsive(100),
		height: responsive(48),
		justifyContent: 'center',
		marginHorizontal: responsive(8),
		overflow: 'hidden',
		width: responsive(48),
	},
	iconButtonContainer: {
		borderRadius: responsive(100),
		height: responsive(48),
		marginHorizontal: responsive(8),
		width: responsive(48),
	},
	image: {
		height: '100%',
		resizeMode: 'cover',
		width: '100%',
	},
	imageContainer: {
		borderRadius: responsive(20),
		elevation: 10,
		flex: 1,
		height: '100%',
		marginVertical: responsive(24),
		overflow: 'hidden',
		shadowColor: 'black',
		shadowOffset: { height: 3, width: 0 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		width: '100%',
	},
	imageGradient: {
		...StyleSheet.absoluteFillObject,
	},
	itemsContainer: {
		flex: 1,
		width: '100%',
	},
	loadingOverlay: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.6)',
		justifyContent: 'center',
	},
	loadingText: {
		color: '#fff',
		marginTop: responsive(12),
	},
	safeArea: {
		paddingHorizontal: responsive(16),
	},
	topContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: responsive(12),
	},
	userInfoContainer: {
		borderRadius: responsive(8),
		paddingHorizontal: responsive(12),
		paddingVertical: responsive(8),
	},
});

export default ProfilePictureScreen;
