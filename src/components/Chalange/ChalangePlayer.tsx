/* eslint-disable no-warning-comments */
/* eslint-disable no-inline-styles/no-inline-styles */
/* eslint-disable react-native/no-inline-styles */
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { PrimaryButton } from '../Base';
import { GradientIcon } from '../Base/GradientText';

import { ArtistDetail } from '@/lib/server/challange';
import { handleError } from '@/lib/utils';
import { MainStackRouteType } from '@/navigation/main/MainStack';
import { FontSizeColorStyle, responsive } from '@/styles';

const TEXT = {
	headeing: 'Choose Winner',
	vs: 'VS',
	img: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHwxfDB8fHww',
	name: 'Name',
	level: 12,
	bet: 10,
	amount: 123,
};

FastImage.preload([{ uri: TEXT.img }]);

export type ChalangePlayerType = ArtistDetail & {
	onPress?: RectButtonProps['onPress'];
	onBet?: RectButtonProps['onPress'];
	onPlay?: RectButtonProps['onPress'];
	image?: string;
	name?: string;
	level?: string | number;
	amount?: string | number;
	bet?: number;
	right?: boolean;
	selected?: boolean;
	shouldShowBet?: boolean;
};

const ChalangePlayer: React.FC<ChalangePlayerType> = ({
	onPress,
	onPlay,
	image = TEXT.img,
	name = TEXT?.name,
	// level = TEXT?.level,
	// amount = TEXT?.amount,
	bet = TEXT?.bet,
	right,
	votesCount,
	isVoted = 0,
	selected = isVoted !== 0,
	artist,
	onBet,
	shouldShowBet,
	song,
	_id,
	country,
	flag,
}) => {
	const navigation = useNavigation<MainStackRouteType<'ChalangeDetails'>['navigation']>();

	const [isPlaying, setIsPlaying] = useState<boolean>();

	const [isBuffering, setIsBuffering] = useState<boolean>();

	const { playing, bufferingDuringPlay } = useIsPlaying();

	// useEffect(() => {
	// 	(async () => {
	// 		const tracks = (await TrackPlayer.getQueue())?.map((item) => item?.url || '');

	// 		if ((tracks || [])?.includes(song?.media)) {
	// 			setIsPlaying(playing);
	// 			setIsBuffering(bufferingDuringPlay);
	// 		}
	// 	})();
	// }, [playing, song?.media, bufferingDuringPlay]);

	useEffect(() => {
		(async () => {
			const song2 = await TrackPlayer.getActiveTrack();

			if (playing) {
				setIsPlaying(song?.media === song2?.url);
			}
			if (bufferingDuringPlay) {
				setIsPlaying(song?.media === song2?.url);
			}
			if (song?.media === song2?.url) {
				setIsPlaying(playing);
				setIsBuffering(bufferingDuringPlay);
			}
		})();
	}, [bufferingDuringPlay, playing, song?.media]);

	const onPlay2 = useCallback(async () => {
		try {
			const url = song?.media;

			if (!url) return undefined;

			const regex = /(?:\.([^.]+))?$/;

			const ext = regex?.exec(url)?.[1];

			if (ext !== 'mp3') {
				return onPlay();
			}

			const song2 = await TrackPlayer.getActiveTrack();

			const track = {
				url,
				title: song?.title ?? 'Soul Searching (Demo)',
				artist: name ?? 'David Chavez',
				artwork: song?.banner ?? 'https://rntp.dev/example/Soul%20Searching.jpeg',
				duration: song?.duration ?? 77,
			};

			console.log({ song });
			console.log({ song2 });

			if (isPlaying) {
				console.log('Pause');

				return await TrackPlayer?.pause();
			}
			if (isBuffering) {
				console.log('Pause');

				return await TrackPlayer?.pause();
			}

			if (song?.media === song2?.url) {
				console.log('common');
				console.log('play');

				return await TrackPlayer?.play();
			}

			console.log('add aand');
			console.log('play');

			await TrackPlayer.stop();
			await TrackPlayer.setQueue([track]);

			return await TrackPlayer?.play();
		} catch (error) {
			handleError(error);
		}
	}, [isBuffering, isPlaying, name, onPlay, song]);

	return (
		<LinearGradient
			colors={[
				selected ? '#125B6F' : '#000',
				selected ? 'rgba(18, 91, 111, 0.8)' : '#000',
				selected ? 'rgba(18, 91, 111, 0.5)' : '#000',
				'transparent',
			]}
			style={styles[right ? 'wrapperRight' : 'wrapper']}
		>
			<RectButton
				style={styles.btn}
				onPress={() => {
					navigation.navigate('Player', {
						// screen: 'Player',
						id: _id,
						image:
							artist?.icon ||
							image ||
							'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
						name: artist?.name || 'ASHGUARD MOMO',
					});
				}}
				underlayColor="#000"
				rippleColor={'#000'}
			>
				{/* <FastImage
					source={{
						uri: artist?.icon || image,
						// priority: FastImage.priority.normal,
						// cache: FastImage.cacheControl.web,
					}}
					style={styles.img}
					resizeMode="cover"
					// sharedTransitionTag={artist?.name}
				/> */}
				<Animated.Image
					source={{
						uri: artist?.icon || image,
						// priority: FastImage.priority.normal,
						// cache: FastImage.cacheControl.web,
					}}
					style={styles.img}
					resizeMode="cover"
					sharedTransitionTag={_id}
				/>
				<LinearGradient
					colors={[
						selected ? 'rgba(0,0,0,0.2)' : 'transparent',
						selected ? 'rgba(0,0,0,0.4)' : 'transparent',
						selected ? 'rgba(18, 91, 111, 0.2)' : 'rgba(0,0,0,0.2)',
						selected ? 'rgba(18, 91, 111, 0.6)' : 'rgba(0,0,0,0.4)',
						selected ? 'rgba(18, 91, 111, 0.8)' : '#01141a',
						selected ? '#125B6F' : 'rgba(0, 0, 0, 1)',
					]}
					style={styles.gradient}
				>
					<View style={styles.gradientContent}>
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
							{artist?.flag || country?.flag || flag ? (
								<FastImage
									source={{
										uri: artist?.flag || country?.flag || flag,
									}}
									style={{ height: responsive(15), width: responsive(15) }}
								/>
							) : null}
							<Text style={FontSizeColorStyle['montserrat-500-15-white']}>
								{artist?.name || name}
							</Text>
							{/* <Text style={FontSizeColorStyle['montserrat-500-15-white']}>
							{`Level ${level}`}
						</Text> */}
						</View>
						{!shouldShowBet ? (
							<Text
								style={
									FontSizeColorStyle[
										selected
											? 'montserrat-700-xxs-white'
											: 'montserrat-700-xxs-primary-text'
									]
								}
							>
								{`${votesCount || 0} Vote`}
							</Text>
						) : null}
					</View>
				</LinearGradient>
			</RectButton>

			{shouldShowBet ? (
				<PrimaryButton
					label={selected ? `Withdraw` : `Bet ${bet} Tokens`}
					size="md"
					outlineStyle={styles.bet}
					style={styles.betInner}
					onPress={onBet}
				/>
			) : null}

			{selected ? (
				<RectButton
					style={{
						position: 'absolute',
						top: '42%',
						alignSelf: 'center',
						borderRadius: 100,
					}}
					onPress={onPlay2}
				>
					<FontAwesome5
						name="check-circle"
						size={responsive(87)}
						color="rgba(0,188,253,0.8)"
					/>
				</RectButton>
			) : (
				<LinearGradient
					colors={['rgba(0,188,253,0.8)', 'rgba(0,188,253,0.5)', 'transparent']}
					style={styles.playBtnOutline}
				>
					<RectButton style={styles.playBtn} onPress={onPlay2}>
						{isBuffering ? (
							<ActivityIndicator color={'#00BCFD'} />
						) : (
							<GradientIcon
								name={isPlaying ? 'pause' : 'play'}
								size={responsive(25)}
								color={'white'}
							/>
						)}
					</RectButton>
				</LinearGradient>
			)}
		</LinearGradient>
	);
};

export default ChalangePlayer;

const styles = StyleSheet.create({
	heading: { fontFamily: 'Moonwalk', textAlign: 'right' },
	container: { flexDirection: 'row', position: 'relative' },
	wrapper: {
		transform: [{ skewX: '-5deg' }],
		width: '50%',
		height: 'auto',
		flexDirection: 'column',
		gap: responsive(5),
		position: 'relative',
		padding: responsive(2),
		overflow: 'hidden',
	},
	wrapperRight: {
		transform: [{ skewX: '-5deg' }],
		width: '50%',
		height: 'auto',
		flexDirection: 'column',
		gap: responsive(5),
		position: 'absolute',
		right: responsive(-5),
		top: responsive(35),
		padding: responsive(2),
	},
	btn: {
		width: '100%',
		height: 'auto',
		flexDirection: 'column',
		backgroundColor: '#000',
		// transform: [{ skewX: '5deg' }],
	},
	img: { height: responsive(353), width: '100%' },
	gradient: {
		position: 'absolute',
		width: '100%',
		bottom: responsive(0),
		top: responsive(0),
		// top: responsive(0),
		gap: responsive(10),

		// opacity: responsive(0.9),
	},
	gradientContent: {
		position: 'absolute',
		width: '100%',
		bottom: responsive(0),
		// top: responsive(0),
		justifyContent: 'center',
		gap: responsive(10),
		paddingHorizontal: responsive(15),
		paddingVertical: responsive(25),
		opacity: responsive(0.9),
	},
	bet: {
		borderRadius: responsive(-10),
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	betInner: {
		borderRadius: responsive(-10),
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	textContainer: {
		height: responsive(50),
		width: responsive(50),
		borderRadius: responsive(25),
		backgroundColor: '#000000',
		top: '49%',
		left: '45%',
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
	},
	playBtn: {
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		borderRadius: responsive(25),
	},
	playBtnOutline: {
		padding: responsive(1),
		borderRadius: responsive(25),
		height: responsive(50),
		width: responsive(50),
		position: 'absolute',
		top: '48%',
		alignSelf: 'center',
	},
} as const);
