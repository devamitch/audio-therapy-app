import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	SlideInUp,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { DashboardTopPlayers } from '@/components/Dashboard';
import { ALL_COLORS, FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const color = 'rgb(229, 229, 231)' as const;

const AnimatedBlur = Animated.createAnimatedComponent(BlurView);

const PLAYERS_DATA = [
	{
		icon: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
		name: 'Demo1',
		index: 1,
	},
	{
		icon: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
		name: 'Demo2',
		index: 2,
	},
	{
		icon: 'https://plus.unsplash.com/premium_photo-1675626492183-865d6d8e2e8a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
		name: 'Demo3',
		index: 3,
	},
	{
		icon: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
		name: 'Demo4',
		index: 4,
	},
];

export function PointerSvg({ height = 50, width = 50, ...props }: SvgProps) {
	return (
		<Svg
			width={height}
			height={width}
			viewBox="0 0 16 16"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<Path
				fill={ALL_COLORS.primary}
				d="M12.6 5H12c0-.2-.2-.6-.4-.8s-.6-.4-1.1-.4c-.2 0-.4 0-.6.1-.1-.2-.2-.3-.3-.5-.2-.2-.5-.4-1.1-.4-.2 0-.4 0-.5.1V1.4C8 .8 7.6 0 6.6 0c-.4 0-.8.2-1.1.4C5 1 5 1.8 5 1.8v4.3c-.6.1-1.1.3-1.4.6C3 7.4 3 8.3 3 9.5v.7c0 1.4.7 2.1 1.4 2.8l.3.4C6 14.6 7.1 15 9.8 15c2.9 0 4.2-1.6 4.2-5.1V7.4c0-.7-.2-2.1-1.4-2.4zm.4 2.4V10c0 3.4-1.3 4.1-3.2 4.1-2.4 0-3.3-.3-4.3-1.3l-.4-.4c-.7-.8-1.1-1.2-1.1-2.2v-.7c0-1 0-1.7.3-2.1.1-.1.4-.2.7-.2v.5l-.3 1.5c0 .1 0 .1.1.2s.2 0 .2 0l1-1.2V1.8c0-.1 0-.5.2-.7.1 0 .2-.1.4-.1.3 0 .4.3.4.4v4.3c0 .3.2.6.5.6S8 6 8 5.8V4.5c0-.1.1-.5.5-.5.3 0 .5.1.5.4v1.3c0 .3.2.6.5.6s.5-.3.5-.5v-.7c0-.1.1-.3.5-.3.2 0 .3.1.3.1.2.1.2.4.2.4v.8c0 .3.2.5.4.5.3 0 .5-.1.5-.4 0-.1.1-.2.2-.3h.2c.6.2.7 1.2.7 1.5 0-.1 0-.1 0 0z"
			/>
		</Svg>
	);
}

export const TopSingersTutorial = () => {
	return <DashboardTopPlayers singerData={PLAYERS_DATA} />;
};

export const TutorialHeader: React.FC<{ title?: string }> = ({ title = 'Dashboard' }) => {
	const paddingTop = useSafeAreaInsets().top;

	return (
		<AnimatedBlur
			entering={SlideInUp.delay(200).duration(700)}
			style={[
				styles.header,
				{
					paddingTop,
				},
			]}
			tint={'dark'}
			intensity={20}
		>
			<RectButton style={styles.iconButton}>
				<AnimatedBlur
					style={styles.iconBlur}
					tint="dark"
					experimentalBlurMethod={'dimezisBlurView'}
					intensity={60}
				>
					<Ionicons
						// name="ios-notifications"
						name="chevron-back"
						size={responsive(24)}
						color={color}
					/>
				</AnimatedBlur>
			</RectButton>

			<Animated.Text style={[FontSizeColorStyle['montserrat-700-16-white'], { color }]}>
				{title}
			</Animated.Text>
			<RectButton>
				<BlurView
					style={styles.iconBlur}
					tint="dark"
					experimentalBlurMethod={'dimezisBlurView'}
					intensity={60}
				>
					<Ionicons name="notifications" size={responsive(20)} color={color} />
				</BlurView>
			</RectButton>
		</AnimatedBlur>
	);
};

export const TutorialLayout: React.FC<{ title?: string; children?: React.ReactNode }> = ({
	title,
	children,
}) => (
	<Animated.View style={LayoutStyle.fill}>
		<TutorialHeader title={title} />
		<Animated.View style={styles.layout}>{children}</Animated.View>
	</Animated.View>
);

export const PointerHelper: React.FC<{
	title?: string;
	subtitle?: string;
	description?: string;
	alignItems?: 'center' | 'flex-start' | 'flex-end';
}> = ({ title, subtitle, description, alignItems = 'flex-start' }) => (
	<Animated.View style={{ gap: 10, maxWidth: 200, alignItems }}>
		<PointerSvg />
		<Animated.Text
			style={FontSizeColorStyle['montserrat-600-24-primary-text']}
			numberOfLines={1}
			adjustsFontSizeToFit
			allowFontScaling
		>
			{title}
		</Animated.Text>
		<Animated.Text
			style={[FontSizeColorStyle['montserrat-600-12-light-f1f1f1'], { textAlign: 'right' }]}
			numberOfLines={1}
			adjustsFontSizeToFit
			allowFontScaling
		>
			{subtitle}
		</Animated.Text>
		<Animated.Text
			style={[FontSizeColorStyle['montserrat-600-xs-grey-a7a7a7'], { textAlign: 'right' }]}
			numberOfLines={3}
			adjustsFontSizeToFit
			allowFontScaling
		>
			{description}
		</Animated.Text>
	</Animated.View>
);

export const PointerHelperBottom: React.FC<{
	title?: string;
	subtitle?: string;
	description?: string;
	alignItems?: 'center' | 'flex-start' | 'flex-end';
}> = ({ title, subtitle, description, alignItems = 'flex-start' }) => (
	<Animated.View style={{ gap: 10, maxWidth: 200, alignItems }}>
		<Animated.Text
			style={FontSizeColorStyle['montserrat-600-24-primary-text']}
			numberOfLines={1}
			adjustsFontSizeToFit
			allowFontScaling
		>
			{title}
		</Animated.Text>
		<Animated.Text
			style={[FontSizeColorStyle['montserrat-600-12-light-f1f1f1'], { textAlign: 'right' }]}
			numberOfLines={1}
			adjustsFontSizeToFit
			allowFontScaling
		>
			{subtitle}
		</Animated.Text>
		<Animated.Text
			style={[FontSizeColorStyle['montserrat-600-xs-grey-bfbfbf'], { textAlign: 'right' }]}
			numberOfLines={2}
			adjustsFontSizeToFit
			allowFontScaling
		>
			{description}
		</Animated.Text>
		<Animated.View style={{ transform: [{ rotate: '180deg' }] }}>
			<PointerSvg />
		</Animated.View>
	</Animated.View>
);

export const BreathingAnimation = ({
	children,
	flex,
	flexGrow,
	scale = 0.95,
}: {
	children: React.ReactNode | React.ReactNode[];
	flex?: number;
	flexGrow?: number;
	scale?: number;
}) => {
	const animationValue = useSharedValue(1);

	const animationColor = useSharedValue('rgba(229, 229, 231, 0.5)');

	const animationColor2 = useSharedValue('rgba(229, 229, 231, 0.1)');

	useEffect(() => {
		animationValue.value = withRepeat(
			withTiming(scale, {
				duration: 2000,
				easing: Easing.inOut(Easing.elastic(1.5)),
			}),
			-1,
			true
		);
		animationColor.value = withRepeat(
			withTiming('rgba(229, 229, 231, 0.1)', {
				duration: 2000,
				easing: Easing.inOut(Easing.elastic(1.5)),
			}),
			-1,
			true
		);
		animationColor2.value = withRepeat(
			withTiming('rgba(229, 229, 231, 0)', {
				duration: 2000,
				easing: Easing.inOut(Easing.elastic(1.5)),
			}),
			-1,
			true
		);
	}, [animationValue, animationColor, scale, animationColor2]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: animationValue.value }],
			backgroundColor: animationColor2?.value,
			borderColor: animationColor.value,
			borderWidth: 1 + animationValue.value,
			borderRadius: 5,
			borderStyle: 'dashed',
			width: '100%',
			flex,
			flexGrow,
			position: 'relative',
		};
	});

	return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: responsive(20),
	},
	iconBlur: {
		borderRadius: responsive(10),
		overflow: 'hidden',

		padding: responsive(2),
	},
	iconButton: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: responsive(0),
	},
	layout: {
		flex: 1,
		// padding: responsive(20),
	},
});
