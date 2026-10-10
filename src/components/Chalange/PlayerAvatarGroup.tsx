import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import GradientText from '../Base/GradientText';

import { IMAGES } from '@/assets';
import useCountdownTimer from '@/lib/hooks/useCountdownTimer';
import { isAndroid } from '@/lib/utils';
import { FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const TEXT = {
	token: '21,000,909,00',
	first: 'Ashguard',
	second: 'Komi221',
	description: `Let’s break down barriers, challenge traditional distribution models, and empower artists to share their work directly with the world.`,
	bet: '123',
	writerImage:
		'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
	writerName: 'Music-X',
	date: '2015-03-25T12:00:00Z',
	bottomTokenText: '21,000,909,00 test Tokens on Bet',
} as const;

const IMAGE =
	'https://media.istockphoto.com/id/1768696871/photo/group-of-happy-indian-joint-family-seeing-mobile-phone-during-family-diwali-festival.webp?b=1&s=170667a&w=0&k=20&c=8U5fS_4gxPoL5KS6IFtKGFwohbupSsSC9yjBeYA-2kE=' as const;

const DEMO_IMAGES = [
	IMAGE,
	'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
	'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
	'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
	'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
	'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
	'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
] as const;

FastImage.preload([{ uri: TEXT.writerImage }, ...DEMO_IMAGES.map((item) => ({ uri: item }))]);

const createdOnFormat = (createdOn?: Date) => {
	try {
		return new Intl.DateTimeFormat('en-IN', {
			weekday: 'short',
			year: '2-digit',
			month: 'short',
			day: '2-digit',
		}).format(new Date(createdOn));
	} catch (error) {
		return new Intl.DateTimeFormat('en-IN', {
			weekday: 'short',
			year: '2-digit',
			month: 'short',
			day: '2-digit',
		}).format(new Date('2015-03-25T12:00:00Z'));
	}
};

const Avatar: React.FC<{ image?: string; first?: boolean; src?: Source }> = ({
	image = IMAGE,
	first,
	src,
}) => (
	<FastImage
		style={styles[first ? 'firstAvatar' : 'avatar']}
		source={
			src ?? {
				uri: image,
				priority: FastImage.priority.normal,
				cache: FastImage.cacheControl.web,
			}
		}
		resizeMode="cover"
	/>
);

const AvatarGroup: React.FC<{ images?: string[]; bet?: string | number }> = ({
	images = DEMO_IMAGES,
	bet,
}) => (
	<View style={styles.avatarGroup}>
		<View style={styles.avatarGroupContent}>
			{images?.map((image, index) => (
				<Avatar image={image} first={index === 0} key={index} />
			))}
		</View>
		<Text style={[FontSizeColorStyle['montserrat-500-13-white'], styles.digiface]}>
			{`${bet} Playing`}
		</Text>
	</View>
);

export type PlayerAvatarGroupType = {
	first?: string;
	second?: string;
	numOfTokenBet?: string | number;
	description?: string;
	writerImage?: string;
	avatars?: string[];
	writerName?: string;
	totatBets?: number | string;
	bottomTexts?: string[];
	createdOn?: Date;
	endOn?: Date;
	artistShare?: number;
	looserShare?: number;
	winnersShare?: number;
	matchNumber?: number;
	round?: string;
};

export const PlayerAvatarGroup: React.FC<PlayerAvatarGroupType> = ({
	first = TEXT.first,
	second = TEXT.second,
	numOfTokenBet,
	description = TEXT.description,
	totatBets,
	writerName = TEXT.writerName,
	avatars,
	createdOn,
	artistShare,
	looserShare,
	winnersShare,
	endOn,
	round,
	matchNumber,
}) => {
	const data = useCountdownTimer(endOn ? new Date(endOn) : new Date(createdOn));

	// Create animated values for each time unit
	const animatedDays = useSharedValue(data.days);

	const animatedHours = useSharedValue(data.hours);

	const animatedMinutes = useSharedValue(data.minutes);

	const animatedSeconds = useSharedValue(data.seconds);

	// Update animated values when the countdown timer changes
	useEffect(() => {
		animatedDays.value = withTiming(data.days, { duration: 500, easing: Easing.ease });
		animatedHours.value = withTiming(data.hours, { duration: 500, easing: Easing.ease });
		animatedMinutes.value = withTiming(data.minutes, { duration: 500, easing: Easing.ease });
		animatedSeconds.value = withTiming(data.seconds, { duration: 500, easing: Easing.ease });
	}, [animatedDays, animatedHours, animatedMinutes, animatedSeconds, data]);

	const hourStyle = useAnimatedStyle(() => {
		return {
			opacity: animatedHours.value > 0 ? 1 : 0,
			transform: [{ scale: animatedHours.value > 0 ? 1 : 0.8 }],
			marginHorizontal: 2,
		};
	});

	const dayStyle = useAnimatedStyle(() => {
		return {
			opacity: animatedHours.value > 0 ? 1 : 0,
			transform: [{ scale: animatedDays.value > 0 ? 1 : 0.8 }],
			marginHorizontal: 2,
		};
	});

	const minuteStyle = useAnimatedStyle(() => {
		return {
			opacity: animatedMinutes.value > 0 ? 1 : 0,
			transform: [{ scale: animatedMinutes.value > 0 ? 1 : 0.8 }],
			marginHorizontal: 2,
		};
	});

	const secondStyle = useAnimatedStyle(() => {
		return {
			opacity: animatedSeconds.value > 0 ? 1 : 0,
			transform: [{ scale: animatedSeconds.value > 0 ? 1 : 0.8 }],
			marginHorizontal: 2,
		};
	});

	return (
		<>
			<View style={styles.container}>
				<Text
					style={[FontSizeColorStyle['montserrat-500-xxs-grey-aeaeae'], styles.mb4]}
					numberOfLines={1}
				>
					{`${numOfTokenBet} test Tokens on Bet`}
				</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Text
						style={[
							FontSizeColorStyle['montserrat-500-16-primary-text'],
							{ fontFamily: 'DigifaceWide' },
						]}
						numberOfLines={1}
						adjustsFontSizeToFit
					>
						{`${first ? first?.split(' ')?.[0] : ''} Vs ${second ? second?.split(' ')?.[0] : ''}`}
					</Text>
					<View style={[LayoutStyle.row, LayoutStyle.center]}>
						<Animated.Text
							style={[FontSizeColorStyle['poppins-700-xxs-success'], hourStyle]}
						>
							Live
						</Animated.Text>
						<Animated.Text
							style={[FontSizeColorStyle['poppins-600-sm-grey-aeaeae'], dayStyle]}
						>
							{animatedDays.value}{' '}
						</Animated.Text>
						<Animated.Text
							style={[FontSizeColorStyle['poppins-600-sm-grey-aeaeae'], hourStyle]}
						>
							:
						</Animated.Text>
						<Animated.Text
							style={[FontSizeColorStyle['poppins-600-sm-grey-aeaeae'], hourStyle]}
						>
							{animatedHours.value}{' '}
						</Animated.Text>
						<Animated.Text
							style={[FontSizeColorStyle['poppins-600-sm-grey-aeaeae'], hourStyle]}
						>
							:
						</Animated.Text>
						<Animated.Text
							style={[FontSizeColorStyle['poppins-600-sm-grey-aeaeae'], minuteStyle]}
						>
							{animatedMinutes.value}{' '}
						</Animated.Text>
						<Animated.Text
							style={[FontSizeColorStyle['poppins-600-sm-grey-aeaeae'], minuteStyle]}
						>
							:
						</Animated.Text>
						<Animated.Text
							style={[FontSizeColorStyle['poppins-600-sm-grey-aeaeae'], secondStyle]}
						>
							{animatedSeconds.value}{' '}
						</Animated.Text>
					</View>
				</View>

				{/* <Text
					style={[FontSizeColorStyle['montserrat-500-15-white'], styles.mt6]}
					numberOfLines={4}
				>
					{description}
				</Text> */}

				<LinearGradient
					style={{
						flexDirection: 'row',
						gap: responsive(4),
						alignItems: 'center',
						paddingHorizontal: responsive(6),
						paddingVertical: responsive(4),
						borderRadius: responsive(6),
						marginVertical: responsive(6),
					}}
					colors={['#00212A', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}
					start={{ x: 0, y: 1 }}
				>
					<Text
						style={FontSizeColorStyle['montserrat-600-xxs-dark-929292']}
						numberOfLines={1}
						adjustsFontSizeToFit
					>
						{`Match ${matchNumber ?? ''}`}
					</Text>
					<View
						style={{
							height: responsive(10),
							width: 1,
							backgroundColor: '#929292',
							marginHorizontal: responsive(5),
						}}
					/>
					<Text
						style={FontSizeColorStyle['montserrat-500-sm-white']}
						numberOfLines={1}
						adjustsFontSizeToFit
					>
						{round}
					</Text>
					<View
						style={{
							height: responsive(10),
							width: responsive(1),
							backgroundColor: '#F1F1F1',
							marginHorizontal: responsive(5),
						}}
					/>
					<GradientText
						style={[
							FontSizeColorStyle['montserrat-700-sm-grey-797979'],
							{ fontFamily: 'Moonwalk' },
						]}
						numberOfLines={1}
						colors={['#00BCFD', '#7CD0E8']}
						start={{ x: 0, y: 1 }}
						end={{ x: 1, y: 0 }}
					>
						World Cup
					</GradientText>
				</LinearGradient>
				<AvatarGroup bet={totatBets} images={avatars} />
			</View>

			<View style={styles.writerContainer}>
				<View style={[LayoutStyle.row, { gap: responsive(5) }]}>
					<Avatar src={IMAGES.icon} />
					<View style={{ gap: responsive(3) }}>
						{/* */}
						<Text
							style={FontSizeColorStyle['poppins-600-xxs-white']}
							numberOfLines={1}
							adjustsFontSizeToFit
						>
							{writerName}
						</Text>

						<Text
							style={FontSizeColorStyle['poppins-500-xs-grey-aeaeae']}
							numberOfLines={1}
						>
							{`Created on : ${createdOnFormat(createdOn)} `}
						</Text>
					</View>
				</View>
			</View>
			<View style={styles.bottomTextContainer}>
				{/* {bottomTexts?.map((item, index) => (
					<Text
						style={FontSizeColorStyle['poppins-500-xxs-grey-aeaeae']}
						numberOfLines={1}
						key={index?.toString()}
					>
						{item}
					</Text>
				))} */}
				{winnersShare ? (
					<Text
						style={FontSizeColorStyle['poppins-500-xxs-grey-aeaeae']}
						numberOfLines={1}
					>
						{'Winners will get '}
						<Text
							style={FontSizeColorStyle['poppins-500-xxs-primary-text']}
							numberOfLines={1}
						>
							{winnersShare}
						</Text>
					</Text>
				) : null}
				{artistShare ? (
					<Text
						style={FontSizeColorStyle['poppins-500-xxs-grey-aeaeae']}
						numberOfLines={1}
					>
						{'Artists will get '}
						<Text
							style={FontSizeColorStyle['poppins-500-xxs-primary-text']}
							numberOfLines={1}
						>
							{artistShare}
						</Text>
					</Text>
				) : null}
				{looserShare ? (
					<Text
						style={FontSizeColorStyle['poppins-500-xxs-grey-aeaeae']}
						numberOfLines={1}
					>
						{'Other participants will get '}
						<Text
							style={FontSizeColorStyle['poppins-500-xxs-primary-text']}
							numberOfLines={1}
						>
							{looserShare}
						</Text>
					</Text>
				) : null}
			</View>
		</>
	);
};

export default PlayerAvatarGroup;

const styles = StyleSheet.create({
	svg: {
		position: 'absolute',
		right: responsive(-50),
		top: -responsive(20),
	},
	container: {
		flex: 0,
		paddingBottom: responsive(50),
		marginTop: responsive(40),
		width: responsive(312),
	},
	mb4: { marginBottom: responsive(8) },
	mt6: { marginTop: responsive(6) },
	avatarGroup: {
		with: '100%',
		// justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		gap: responsive(10),
		marginTop: responsive(20),
	},
	avatarGroupContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
	avatar: {
		height: responsive(33),
		width: responsive(33),
		borderRadius: responsive(20),
		marginLeft: responsive(-10),

		shadowColor: 'rgba(0,0,0,0.5)',
		shadowRadius: responsive(10),
		shadowOffset: { height: 0, width: -responsive(10) },
		elevation: responsive(5),
		shadowOpacity: 0.5,
		borderWidth: responsive(0.3),
		borderColor: 'rgba(0,0,0,0.5)',
	},
	firstAvatar: {
		height: responsive(33),
		width: responsive(33),
		borderRadius: responsive(20),
		backgroundColor: '#fff', // Ensure there is a background color
		shadowColor: '#fff',
		shadowRadius: 10,
		shadowOffset: { height: 0, width: 0 },
		elevation: 5, // Android elevation
		shadowOpacity: 0.5,
	},
	digiface: { fontFamily: 'DigifaceWide' },
	writerContainer: {
		// flexDirection: 'row',
		position: 'absolute',
		right: responsive(10),
		alignItems: 'center',
		gap: responsive(2),
		bottom: responsive(isAndroid ? 100 : 100),
		// bottom: responsive(isAndroid ? 150 : 122),
		maxWidth: responsive(205),
		width: '100%',
	},
	wFull: { width: '100%' },
	svgRev: {
		left: responsive(-80),
		position: 'absolute',
		transform: [{ scaleX: -1 }],
	},
	bottomTextContainer: {
		paddingVertical: responsive(25),
		gap: responsive(2),
		width: '100%',
		position: 'absolute',
		left: responsive(40),
		alignItems: 'flex-start',
		bottom: responsive(isAndroid ? 20 : 0),
		// bottom: responsive(isAndroid ? 70 : 40),
		maxWidth: responsive(200),
		height: responsive(70),
	},
} as const);
