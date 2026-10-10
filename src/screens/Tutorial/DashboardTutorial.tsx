import { FlatList, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient as ExpoLinear } from 'expo-linear-gradient';

import {
	BreathingAnimation,
	PointerHelper,
	PointerHelperBottom,
	TutorialLayout,
} from './CommonTutorialComponents';

import {
	DashboardAccountDetails,
	DashboardBalanceCard,
	DashoardDipositContainer,
} from '@/components/Dashboard';
import { AnimatedRandomPlayer } from '@/components/Dashboard/RandomPlayers';
import { windowWidth } from '@/lib/utils';
import { GameSvg } from '@/navigation/main/Svgs';
import { FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const LinearGradient = Animated.createAnimatedComponent(ExpoLinear);

const PLAYERS_DATA = [
	{
		icon: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
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

export const DashboardTutorialSinger = () => {
	const { top } = useSafeAreaInsets();

	return (
		<Animated.View style={{ flex: 1 }}>
			<TutorialLayout />
			<Animated.View
				style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' }}
			>
				<BlurView
					tint="dark"
					experimentalBlurMethod={'dimezisBlurView'}
					style={{ flex: 1, padding: 20, gap: 10 }}
					intensity={10}
				>
					<Animated.View
						style={{
							paddingTop: top + 50,
							backgroundColor: 'rgba(0,0,0,0.2)',
						}}
					>
						<BreathingAnimation flex={0}>
							<FlatList
								data={PLAYERS_DATA}
								horizontal
								overScrollMode="never"
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								// style={styles.container}
								renderItem={({ item, index }) => (
									<AnimatedRandomPlayer {...item} index={index} />
								)}
							/>
						</BreathingAnimation>
					</Animated.View>
					<Animated.View style={{ alignItems: 'flex-end' }}>
						<PointerHelper
							title="Singers"
							subtitle="Discover Top Artists"
							description="Browse through a list of top singers. Tap on any singer to view their details and listen to their playlist."
							alignItems="flex-end"
						/>
					</Animated.View>
				</BlurView>
			</Animated.View>
		</Animated.View>
	);
};

export const DashboardTutorialUser = () => {
	const { top } = useSafeAreaInsets();

	return (
		<Animated.View style={{ flex: 1 }}>
			<TutorialLayout>
				<Animated.View>
					<Animated.FlatList
						data={PLAYERS_DATA}
						horizontal
						overScrollMode="never"
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						// style={styles.container}
						renderItem={({ item, index }) => (
							<AnimatedRandomPlayer {...item} index={index} />
						)}
					/>
				</Animated.View>
				{/* <Animated.View style={[LayoutStyle.fill, styles.main]}>
					<BlurView
						style={[
							LayoutStyle.fill,
							styles.container,
							LayoutStyle.screenLayout,
							{ paddingHorizontal: 0, gap: 0 },
						]}
						tint="dark"
						experimentalBlurMethod={'dimezisBlurView'}
					>
						<Animated.View
							style={[
								styles.gap15,
								{ paddingHorizontal: 20, height: 220, flexGrow: 1, flex: 0 },
							]}
						>
							<DashboardAccountDetails
								name={'DEMO'}
								icon={
									'https://media.istockphoto.com/id/2149054566/photo/neon-blue-user-icon-outline-neon-community-icon-glowing-neon-person-sign-user-icon-for.webp?b=1&s=170667a&w=0&k=20&c=TGuRfMN1LFmelSg93gHTVM9xVYqiVcXr11cNPJ46CNk='
								}
								email={'email'}
								id={''}
								level={'Level 12'}
							/>
							<Animated.View style={{ width: '100%', height: 120 }}>
								<DashboardBalanceCard currentBalance={'00000'} />
							</Animated.View>
							<DashoardDipositContainer />
						</Animated.View>
					</BlurView>
				</Animated.View> */}
			</TutorialLayout>

			<Animated.View
				style={{
					...StyleSheet.absoluteFillObject,
					backgroundColor: 'rgba(0,0,0,0.4)',
					bottom: -10,
				}}
			>
				<BlurView
					tint={'dark'}
					style={{ flex: 1, paddingTop: top + 180, gap: 10, bottom: -2 }}
					intensity={10}
				>
					<Animated.View style={[LayoutStyle.fill, styles.main]}>
						<BlurView
							style={[
								LayoutStyle.fill,
								styles.container,
								LayoutStyle.screenLayout,
								{ paddingHorizontal: 0, gap: 0 },
							]}
							tint="dark"
						>
							<Animated.View
								style={[
									styles.gap15,
									{
										paddingHorizontal: 10,
										height: 220,
										flexGrow: 1,
										flex: 0,
									},
								]}
							>
								<BreathingAnimation flex={0} scale={0.9}>
									<Animated.View style={{ gap: 10, padding: 10 }}>
										<DashboardAccountDetails
											name={'DEMO'}
											icon={
												'https://media.istockphoto.com/id/2149054566/photo/neon-blue-user-icon-outline-neon-community-icon-glowing-neon-person-sign-user-icon-for.webp?b=1&s=170667a&w=0&k=20&c=TGuRfMN1LFmelSg93gHTVM9xVYqiVcXr11cNPJ46CNk='
											}
											email={'email'}
											id={''}
											level={'Level 12'}
										/>
										<Animated.View style={{ width: '100%', height: 120 }}>
											<DashboardBalanceCard currentBalance={'00000'} />
										</Animated.View>
										<DashoardDipositContainer />
									</Animated.View>
								</BreathingAnimation>
							</Animated.View>
						</BlurView>
					</Animated.View>
					<Animated.View
						style={{
							alignItems: 'flex-end',
							position: 'absolute',
							bottom: 200,
							right: 100,
							backgroundColor: 'rgba(0,0,0,0.4)',
							paddion: 10,
							borderRadius: 10,
						}}
					>
						<PointerHelper
							title="User Profile"
							subtitle="Manage Your Account"
							description="Update your user details, change app settings, and customize your profile."
							alignItems="flex-end"
						/>
					</Animated.View>
				</BlurView>
			</Animated.View>
		</Animated.View>
	);
};
export const DashboardGameModeTutorial = () => {
	const { bottom } = useSafeAreaInsets();

	return (
		<Animated.View style={{ flex: 1 }}>
			<TutorialLayout>
				<Animated.View>
					<Animated.FlatList
						data={PLAYERS_DATA}
						horizontal
						overScrollMode="never"
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						// style={styles.container}
						renderItem={({ item, index }) => (
							<AnimatedRandomPlayer {...item} index={index} />
						)}
					/>
				</Animated.View>
				<Animated.View style={[LayoutStyle.fill, styles.main]}>
					<BlurView
						style={[
							LayoutStyle.fill,
							styles.container,
							LayoutStyle.screenLayout,
							{ paddingHorizontal: 0, gap: 0 },
						]}
						tint="dark"
					>
						<Animated.View
							style={[
								styles.gap15,
								{ paddingHorizontal: 20, height: 220, flexGrow: 1, flex: 0 },
							]}
						>
							<DashboardAccountDetails
								name={'DEMO'}
								icon={
									'https://media.istockphoto.com/id/2149054566/photo/neon-blue-user-icon-outline-neon-community-icon-glowing-neon-person-sign-user-icon-for.webp?b=1&s=170667a&w=0&k=20&c=TGuRfMN1LFmelSg93gHTVM9xVYqiVcXr11cNPJ46CNk='
								}
								email={'email'}
								id={''}
								level={'Level 12'}
							/>
							<Animated.View style={{ width: '100%', height: 120 }}>
								<DashboardBalanceCard currentBalance={'00000'} />
							</Animated.View>
							<DashoardDipositContainer />
						</Animated.View>
					</BlurView>
				</Animated.View>
			</TutorialLayout>
			<Animated.View
				style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' }}
			>
				<BlurView
					tint="dark"
					experimentalBlurMethod={'dimezisBlurView'}
					style={{ flex: 1, padding: 20, gap: 10 }}
					intensity={10}
				>
					<Animated.View
						style={{
							alignItems: 'flex-end',
							position: 'absolute',
							bottom: 100 + bottom,
							right: 100,
							backgroundColor: 'rgba(0,0,0,0.4)',
							padding: 10,
							borderRadius: 10,
						}}
					>
						<PointerHelperBottom
							title="Game Mode"
							subtitle="Choose Your League or Contest"
							description="Select and join contests, play games, participate in leagues, and enter tournaments."
							alignItems="flex-end"
						/>
					</Animated.View>
					<Animated.View style={[styles.bottom_tab_tutorial, { bottom }]}>
						<BreathingAnimation flex={0}>
							{/* <Animated.Image
								source={IMAGES.bottom_tab_tutorial}
								style={{ width: '100%', height: 72 }}
								resizeMode={'stretch'}
								entering={SlideInDown.delay(200).duration(700)}
							/> */}
							<Animated.View
								style={{
									width: '100%',
									// paddingHorizontal: 24,
									alignItems: 'center',
									justifyContent: 'space-around',
									flexDirection: 'row',
									borderRadius: 6,
									overflow: 'hidden',
									height: 80,
								}}
							>
								<LinearGradient
									colors={['#125B6F', '#052F3B', '#00212A']}
									location={[0.25, 0.65, 1]}
									start={[0, 1]}
									end={[0.75, 1]}
									style={{
										// height: 60 + padding.bottom,
										overflow: 'hidden',

										flex: 1,
										alignItems: 'center',
										justifyContent: 'space-around',
										flexDirection: 'row',
										gap: 10,
										paddingBottom: bottom,
										paddingHorizontal: 12,
									}}
								>
									<LinearGradient
										colors={['transparent', 'rgba(0,0,0,0.05)']}
										location={[0, 1]}
										start={[0, 1]}
										end={[1, 0]}
										style={{
											// height: ,
											flex: 1,

											gap: 8,
											flexDirection: 'row',
											// borderRadius: 100,
											// paddingHorizontal: 20,
											// zIndex: -1,
											width: 167,
											alignItems: 'center',
											justifyContent: 'center',
											// paddingBottom: padding.bottom - 12,
										}}
									>
										<RectButton
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												gap: 5,

												alignItems: 'center',
												justifyContent: 'center',
												paddingLeft: 12,
												flex: 1,
												paddingVertical: 12,
											}}
										>
											<Animated.Image
												style={{
													height: 33,
													width: 33,
													borderRadius: 100,
												}}
												source={{
													uri: 'https://images.unsplash.com/photo-1526218626217-dc65a29bb444?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2luZ2VyfGVufDB8fDB8fHww',
												}}
											/>
											<Animated.View>
												<Animated.Text
													numberOfLines={1}
													style={
														FontSizeColorStyle[
															'montserrat-400-14-white'
														]
													}
												>
													{'Demo'}
												</Animated.Text>
												{false ? (
													<Animated.Text
														numberOfLines={1}
														style={
															FontSizeColorStyle[
																'poppins-400-xxs-primary-text'
															]
														}
													>
														{'Pro Level 12'}
													</Animated.Text>
												) : null}
											</Animated.View>
										</RectButton>
									</LinearGradient>
									<LinearGradient
										colors={['#00212A', '#007190']}
										location={[0, 1]}
										start={[0, 1]}
										end={[1, 0]}
										style={{
											alignItems: 'center',
											gap: 8,
											flexDirection: 'row',
											flex: 1,
											// zIndex: -1,
											width: 167,
											justifyContent: 'center',
											// paddingBottom: 0,
											borderRadius: 100,
										}}
									>
										<RectButton
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												gap: 5,
												flex: 1,
												justifyContent: 'center',
												paddingVertical: 12,
												paddingRight: 12,
											}}
										>
											<GameSvg />
											<Animated.Text
												numberOfLines={1}
												style={[
													FontSizeColorStyle[
														`montserrat-400-14-primary-text`
													],
													{ textTransform: 'capitalize' },
												]}
											>
												{`Game Mode`}
											</Animated.Text>
										</RectButton>
									</LinearGradient>
									{/* <BarIcon /> */}
								</LinearGradient>
							</Animated.View>
						</BreathingAnimation>
					</Animated.View>
				</BlurView>
			</Animated.View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	main: {
		position: 'relative',
		borderRadius: responsive(40),
		// borderBottomEndRadius: 0,
		// borderBottomLeftRadius: 0,
		overflow: 'hidden',
		// width: '90%',
		borderColor: '#0A7593',
		borderLeftWidth: responsive(1),
		borderTopWidth: responsive(1),
		elevation: responsive(25),
		shadowRadius: responsive(50),
		shadowColor: '#000',
		shadowOffset: {
			width: responsive(0),
			height: responsive(4),
		},
	},
	gap15: {
		gap: responsive(15),
		paddingHorizontal: responsive(2),
		paddingTop: responsive(5),
		flex: 1,
	},
	bottom_tab_tutorial: {
		position: 'absolute',
		bottom: 30,
		right: -50,
		left: 0,
		width: windowWidth,
		height: 80,
	},
	container: {
		// paddingTop: responsive(40),
		gap: responsive(5),
		// position: 'relative',
		overflow: 'hidden',
		position: 'relative',
		borderRadius: responsive(40),
		// borderBottomEndRadius: 0,
		// borderBottomLeftRadius: 0,
		// overflow: 'hidden',
		borderColor: '#0A7593',
		// borderLeftWidth: responsive(1),
		// borderTopWidth: responsive(1),
		elevation: responsive(25),
		shadowRadius: responsive(50),
		shadowColor: '#000',
		shadowOffset: {
			width: responsive(0),
			height: responsive(4),
		},
	},
} as const);
