import { StyleSheet } from 'react-native';
import Animated, {
	SlideInDown,
	SlideOutDown,
	useAnimatedStyle,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useKeyboard } from '@react-native-community/hooks';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { shallow } from 'zustand/shallow';

import { PrimaryButton } from '@/components';
import useToastStore from '@/core/store/toastStore';
import { ALL_COLORS, FontSizeColorStyle, responsive } from '@/styles';

const ICON_SIZE = responsive(60);

const borderColor = {
	success: ALL_COLORS['darker-success'],
	error: ALL_COLORS?.error,
	info: ALL_COLORS.primary,
};

const BG_COLORS = {
	success: ['rgba(63, 134, 30, 0.5)', 'rgba(3, 94, 55, 0.2)'],
	error: ['rgba(230, 50, 27, 0.4)', 'rgba(182, 28, 8, 0.1)'],
	info: ['rgba(0,101,130, 0.5)', 'rgba(0,101,130, 0.2)'],
};

const BG_COLORS2 = {
	success: ['rgba(63, 134, 30, 1)', 'rgba(3, 94, 55, 0.6)'],
	error: ['rgba(230, 50, 27, 1)', 'rgba(182, 28, 8, 0.6)'],
	info: ['rgba(0,101,130, 1)', 'rgba(0,101,130, 0.7)'],
};

const ICONS = {
	success: (
		<Ionicons name="checkmark-circle" size={ICON_SIZE} color={ALL_COLORS['dark-success']} />
	),
	close: <AntDesign name="closecircle" size={ICON_SIZE} color={ALL_COLORS.error} />,
	error: <AntDesign name="warning" size={ICON_SIZE} color={ALL_COLORS.error} />,
	info: <MaterialIcons name="info" size={ICON_SIZE} color={ALL_COLORS.primary} />,
} as const;

const BlurView = Animated.createAnimatedComponent(ExpoBlurView);

const Toast = () => {
	const toast = useToastStore((state) => state?.toast, shallow);

	const keyboard = useKeyboard();

	const { bottom } = useSafeAreaInsets();

	const keyboardOpenHeight = keyboard?.keyboardShown
		? keyboard?.keyboardHeight < 300
			? 280
			: keyboard?.keyboardHeight
		: 0;

	const hideToast = useToastStore((state) => state?.hideToast, shallow);

	const uiStyle = useAnimatedStyle(() => {
		const translateY = withSpring(toast ? -(keyboardOpenHeight + bottom + 5) : -600, {
			duration: 1000,
		});

		const syle = toast && toast?.type ? styles[toast?.type] : {};

		const opacity = withTiming(toast ? 1 : 1);

		return {
			...syle,
			borderLeftWidth: 2,
			gap: 8,
			position: 'absolute',
			bottom: 0,
			borderRadius: 4,
			left: 10,
			right: 10,
			// transform: [{ translateY }],
			display: 'flex',
			flexDirection: 'row',
			zIndex: 1,
			justifyContent: 'space-between',
			// height,
			// padding,
			// opacity,
		};
	}, [keyboardOpenHeight, toast, bottom]);

	return toast ? (
		<BlurView
			style={{
				position: 'absolute',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				borderRadius: 0,
				overflow: 'hidden',
				backgroundColor: 'rgba(0,0,0,0.3)',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 1,
			}}
			entering={SlideInDown.duration(500)}
			exiting={SlideOutDown.duration(500)}
			intensity={20}
			tint="dark"
			experimentalBlurMethod={'dimezisBlurView'}
		>
			<Animated.View
				style={{
					borderColor: borderColor[toast?.type] ?? '#006582',
					borderRadius: 18,
					borderTopWidth: 2,
					borderLeftWidth: 2,
					overflow: 'hidden',
				}}
			>
				<LinearGradient
					colors={
						BG_COLORS[toast?.type] ?? [('rgba(0,101,130, 0.5)', 'rgba(0,101,130, 0.2)')]
					}
					style={{
						overflow: 'hidden',
						padding: 40,
						gap: 20,
						maxWidth: 380,
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
					}}
					start={{ x: 0.8, y: 0.7 }}
					end={{ x: 0.1, y: 0 }}
				>
					{/* <Image
								source={{
									uri: 'https://static.vecteezy.com/system/resources/thumbnails/021/975/492/small_2x/search-not-found-3d-render-icon-illustration-with-transparent-background-empty-state-png.png',
								}}
								style={{
									height: 200,
									width: 200,
									borderRadius: 5,
									backgroundColor: 'rgba(0,0,0,0.7)',
								}}
							/> */}
					{ICONS[toast?.type] ?? ICONS.info}
					<Animated.Text style={FontSizeColorStyle['heebo-600-20-white']}>
						{toast?.title ?? ' Info'}
					</Animated.Text>
					<Animated.Text style={FontSizeColorStyle['heebo-400-13-white']}>
						{toast?.description ?? ''}
					</Animated.Text>

					<PrimaryButton
						labelStyle={FontSizeColorStyle['montserrat-600-13-white']}
						label="Close"
						gradientType="type4"
						colors={BG_COLORS2[toast?.type] ?? ['#00BCFD', '#007097']}
						outlineStyle={{
							width: '100%',
							borderRadius: 40,
							overflow: 'hidden',
						}}
						style={{
							paddingVertical: 10,
							height: 'auto',
							justifyContent: 'center',
						}}
						onPress={hideToast}
					/>
				</LinearGradient>
			</Animated.View>
		</BlurView>
	) : null;
};

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		borderRadius: responsive(100),
		justifyContent: 'center',
		marginRight: responsive(10),
		padding: responsive(0),
	},
	contentContainer: {
		alignItems: 'center',
		padding: responsive(8),
	},
	error: {
		alignItems: 'center',
		borderTopColor: '#D22B2B',
		borderLeftColor: '#770737',
		// height: responsive(60),
		padding: responsive(8),
		tintColor: 'white',
	},
	info: {
		alignItems: 'center',
		borderTopColor: '#EB5519',
		borderLeftColor: '#C5353A',
		// height: responsive(60),
		padding: responsive(8),
		tintColor: 'white',
	},
	retryContainer: {
		flexDirection: 'row',
		padding: responsive(8),
	},
	success: {
		alignItems: 'center',
		borderTopColor: '#228B22',
		borderLeftColor: '#023020',
		height: responsive(40),
		padding: responsive(8),
	},
} as const);

export default Toast;
