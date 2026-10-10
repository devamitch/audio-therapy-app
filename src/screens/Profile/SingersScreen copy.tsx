import GradientText, { GradientIcon } from '@/components/Base/GradientText';
import { DOT_SIZE } from '@/constants';
import { HomeResponse } from '@/lib/server/home';
import { screenWidth, windowWidth } from '@/lib/utils';
import { FontSizeColorStyle, responsive } from '@/styles';
import { useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated, {
	SharedValue,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useScrollViewOffset,
	interpolate,
	useSharedValue,
	Extrapolation,
} from 'react-native-reanimated';

const cardWidth = responsive(240);
const flatListWidth = responsive(280);
const marginLeft = (windowWidth - flatListWidth) / 2;

const Singer: React.FC<{
	index: number;
	image?: string;
	name?: string;
	sharedValue: SharedValue;
}> = ({ index: currentIndex, image, name, sharedValue }) => {
	const animatedStyle = useAnimatedStyle(() => {
		const inputRange = [
			currentIndex * flatListWidth - flatListWidth / 2,
			currentIndex * flatListWidth,
			currentIndex * flatListWidth + flatListWidth / 2,
		];

		const scale = interpolate(
			sharedValue.value,
			inputRange,
			[0.5, 1, 0.5],
			Extrapolation.CLAMP
		);
		return {
			transform: [{ scale }],
			// marginLeft: index === 0 ? marginLeft : 0,
			flex: 1,
			width: flatListWidth,
			backgroundColor: '#3333',
			margin: 5,
			borderRadius: 40,
			paddingTop: 40,
			alignItems: 'center',
			// position: 'absolute',
			left: marginLeft,
			zIndex: 1,
		};
	}, [currentIndex]);

	return (
		<Animated.View style={animatedStyle}>
			<Animated.FlatList
				contentContainerStyle={styles.scrollContent}
				data={[]}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				ListHeaderComponentStyle={{ marginBottom: 40 }}
				ListHeaderComponent={
					<Animated.View style={styles.playerContainer}>
						<Animated.Image
							source={{
								uri:
									image ??
									'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
							}}
							style={styles.playerImage}
							resizeMode={'cover'}
						/>
						<GradientText
							style={styles.playerName}
							numberOfLines={1}
							adjustsFontSizeToFit
						>
							{name ?? 'Name'}
						</GradientText>
						<Animated.Text
							style={styles.playerDescription}
							numberOfLines={6}
							adjustsFontSizeToFit
						>
							{`Let’s break down barriers, challenge traditional distribution
									models, and empower artists to share their work directly with
									the world.`}
						</Animated.Text>
						<Animated.View style={styles.followersContainer}>
							<LinearGradient
								colors={['#000000', '#00212A', '#00212A']}
								style={styles.followersBtn}
								start={[0, 1]}
								end={[0.75, 1]}
							>
								<Animated.Text
									style={styles.followersText}
								>{` Followers`}</Animated.Text>
							</LinearGradient>
							<LinearGradient
								colors={['#000000', '#00212A', '#00212A']}
								style={styles.followersBtn}
								start={[0, 1]}
								end={[0.75, 1]}
							>
								<Animated.Text
									style={styles.followersText}
								>{` tracks`}</Animated.Text>
							</LinearGradient>
						</Animated.View>
						<RectButton
							style={{
								flexDirection: 'row',
								flex: 1,
								gap: 5,
								alignItems: 'center',
								position: 'relative',
								width: '100%',
								paddingHorizontal: 12,
								paddingVertical: 4,
								borderRadius: 4,
								backgroundColor: 'rgba(0,188,253,0.15)',
							}}
						>
							<LinearGradient
								colors={[
									'rgba(0,188,253,0.8)',
									'rgba(0,188,253,0.5)',
									'transparent',
								]}
								style={styles.playBtnOutline}
							>
								<RectButton style={styles.playBtn}>
									{false ? (
										<ActivityIndicator color={'#00BCFD'} />
									) : (
										<GradientIcon
											name={'play'}
											size={responsive(25)}
											color={'white'}
										/>
									)}
								</RectButton>
							</LinearGradient>
							<GradientText style={FontSizeColorStyle['heebo-600-14-dark-00181f']}>
								{`Play all  tracks`}
							</GradientText>
						</RectButton>
					</Animated.View>
				}
				renderItem={({ item }) => (
					<View
						style={styles.button}
						// onPress={() => navigation.navigate('MusicScreen')}
					>
						<View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
							<Image
								style={{ height: 50, width: 50, borderRadius: 3 }}
								source={{ uri: item?.banner }}
								resizeMode="contain"
							/>
							<Text style={FontSizeColorStyle['montserrat-600-12-white']}>
								{item?.title}
							</Text>
						</View>

						<View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
							<Text style={FontSizeColorStyle['montserrat-400-xs-light-dddddd']}>
								{`${item?.duration || 0} sec`}
							</Text>
						</View>
					</View>
				)}
			/>
		</Animated.View>
	);
};

const SingersScreen = () => {
	const queryClient = useQueryClient();
	const pastData = queryClient.getQueryData<HomeResponse>(['getHome']);
	const data = pastData?.singerData?.singer?.map((item) => ({
		...item,
		image: item?.icon,
	}));
	const scrollRef = useAnimatedRef<Animated.FlatList<typeof data>>();

	const translationX = useSharedValue(0);
	const isScrolling = useSharedValue(false);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			translationX.value = event.contentOffset.x;
		},
		onBeginDrag: (e) => {
			isScrolling.value = true;
		},
		onEndDrag: (e) => {
			isScrolling.value = false;
		},
	});

	return (
		<Animated.FlatList
			ref={scrollRef}
			scrollEventThrottle={16}
			data={data || []}
			onScroll={scrollHandler}
			renderItem={({ item, index }) => (
				<Singer {...item} index={index} sharedValue={translationX} />
			)}
			horizontal
			pagingEnabled
			style={{ flex: 1 }}
			// contentContainerStyle={{ gap: 20 }}
		/>
	);
};

export default SingersScreen;

const styles = StyleSheet.create({
	backgroundImage: {
		display: 'flex',
		flex: 1,
		height: '100%',
		width: '100%',
	},
	backgroundImageStyle: {
		backfaceVisibility: 'hidden',
		borderRadius: 20,
		opacity: 0.5,
	},
	button: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 7,
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'space-between',
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	buttonText: {
		...FontSizeColorStyle['montserrat-400-12-grey-8e8e8e'],
	},
	buttonsContainer: {
		gap: 10,
		marginTop: 30,
		paddingHorizontal: 20,
	},
	container: {
		flex: 1,
		paddingHorizontal: 40,
		paddingTop: 40,
	},
	contestText: {
		...FontSizeColorStyle['montserrat-700-16-white'],
		fontFamily: 'DigifaceWide-Italic',
	},
	followersBtn: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 0,
		gap: 10,
		justifyContent: 'center',
		paddingHorizontal: 12,
		paddingVertical: 6,
		transform: [{ skewX: '-5deg' }],
		width: 127,
	},
	followersBtn2: {
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 0,
		gap: 10,
		justifyContent: 'center',
		paddingHorizontal: 10,
		paddingVertical: 6,
		transform: [{ skewX: '-5deg' }],
		// width: '100%',
	},
	followersContainer: {
		flexDirection: 'row',
		flex: 1,
		gap: 5,
		justifyContent: 'center',
		position: 'relative',
	},
	followersText: {
		...FontSizeColorStyle['heebo-500-xxs-primary-text'],
		transform: [{ skewX: '5deg' }],
	},
	infoContainer: {
		alignSelf: 'flex-start',
		backgroundColor: 'rgba(0,0,0,0.7)',
		marginLeft: 20,
		marginTop: 20,
		opacity: 0,
		padding: 10,
		flex: 1,
		position: 'relative',
	},
	overlayGradient: {
		bottom: 0,
		height: '70%',
		left: 0,
		position: 'absolute',
		right: 0,
	},
	playBtn: {
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		borderRadius: responsive(25),
		flex: 1,
		justifyContent: 'center',
	},
	playBtnOutline: {
		alignSelf: 'center',
		borderRadius: responsive(25),
		height: responsive(50),
		padding: responsive(1),
		// position: 'absolute',
		// top: '48%',
		width: responsive(50),
	},
	playerContainer: {
		alignItems: 'center',
		overflow: 'hidden',
		gap: 20,
		marginTop: 20,
		width: '100%',
		borderRadius: 20,
	},
	playerDescription: {
		...FontSizeColorStyle['lato-300-13-white'],
		textAlign: 'center',
		width: 278,
	},
	playerImage: {
		height: 240,
		width: cardWidth,
		borderRadius: 20,
	},
	playerName: {
		...FontSizeColorStyle['montserrat-700-24-primary-text'],
		fontFamily: 'Moonwalk',
	},
	scrollContent: {
		gap: 10,
		paddingBottom: 100,
		alignItems: 'center',
		paddingTop: 0,
		// zIndex: 1,
		flexGrow: 1,
		width: cardWidth,
	},
	titleText: {
		...FontSizeColorStyle['montserrat-700-24-primary-text'],
		fontFamily: 'Moonwalk',
	},
} as const);
