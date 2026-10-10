import { ImageBackground, StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';

import { BreathingAnimation, PointerHelper, PointerHelperBottom } from './CommonTutorialComponents';

import { IMAGES } from '@/assets';
import { Chip, PrimaryButton } from '@/components';
import GradientText from '@/components/Base/GradientText';
import { ContestButton } from '@/components/Contest';
import { AvatarGroup } from '@/components/Dashboard/DashboardSingersCards';
import { LeagueCard } from '@/components/League';
import { Singer } from '@/components/League/LeagePlyerList';
import BlurCard from '@/components/Winner/BlurCard';
import WinnerItem from '@/components/Winner/WinnerItem';
import WinnerTopSection from '@/components/Winner/WinnerTopSection';
import { FontSizeColorStyle } from '@/styles';

export const GameModeTutorial = () => {
	return (
		<ImageBackground
			style={{
				flex: 1,
				height: '100%',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				paddingTop: 100,
			}}
			source={IMAGES.gameMode}
		>
			<Animated.View style={{ height: '30%', width: '70%' }}>
				<BreathingAnimation flex={0}>
					<Animated.View style={{ height: 200, width: '100%' }} />
				</BreathingAnimation>
			</Animated.View>
			<Animated.View
				style={{ backgroundColor: 'rgba(0,0,0,0.6)', padding: 10, borderRadius: 10 }}
			>
				<PointerHelper
					title="Game Mode Options"
					subtitle="Open Leagues or Contests"
					description="Swipe down to close. Use the buttons below to open and join different leagues or contests."
					alignItems="flex-end"
				/>
			</Animated.View>
		</ImageBackground>
	);
};

export const LeaguesTutorial = () => {
	return (
		<ImageBackground
			style={{
				flex: 1,
				height: '100%',
				width: '100%',
				alignItems: 'center',
				// justifyContent: 'center',
				paddingTop: 100,
			}}
			source={IMAGES.legues}
			// imageStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', opacity: 0.9 }}
			blurRadius={10}
		>
			<Animated.View
				style={{
					backgroundColor: 'rgba(0,0,0,0.6)',
					flex: 1,
				}}
			>
				<BreathingAnimation flex={0}>
					<Animated.View
						style={{
							backgroundColor: 'rgba(0,0,0,0.0)',
							padding: 10,
							borderRadius: 10,
							height: 300,
						}}
					>
						<LeagueCard
							onPress={() => {}}
							contest={{
								entryFee: 100,
								leagueEnd: 10021312,
								// banner: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
							}}
							index={0}
							demo
						/>
					</Animated.View>
				</BreathingAnimation>
				<PointerHelper
					title="Leagues"
					subtitle="Explore and Join Leagues"
					description="Browse through various leagues. Tap on any league card to view more details or join the league."
					alignItems="flex-end"
				/>
			</Animated.View>
		</ImageBackground>
	);
};

export const LeaguesDetailsTutorial = () => {
	return (
		<ImageBackground
			style={{ flex: 1, height: '100%', width: '100%' }}
			source={IMAGES.leagueDetails}
			blurRadius={3}
		>
			<Animated.View
				style={{
					backgroundColor: 'rgba(0,0,0,0.6)',
					flex: 1,
					paddingTop: 260,
					padding: 20,
					gap: 20,
				}}
			>
				<BreathingAnimation flex={0}>
					<Animated.View
						style={{
							gap: 10,
							padding: 10,
							backgroundColor: 'rgba(0,0,0,0.6)',
						}}
					>
						<Animated.View
							style={{
								alignItems: 'center',
								justifyContent: 'space-between',
								flexDirection: 'row',
							}}
						>
							<GradientText
								style={FontSizeColorStyle['lato-900-24-light-f7f7f7']}
								colors={['#00BCFD', '#007097']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
							>
								{'League'}
							</GradientText>
							<Chip text={`Joined`} colors={['#052F3B', '#1e1e1e']} color="#f1f1f1" />
						</Animated.View>
						<Animated.View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
								// backgroundColor: 'white',
								// height: 30,
								position: 'relative',
								overflow: 'hidden',
							}}
						>
							<Animated.Text style={FontSizeColorStyle['heebo-500-12-primary-text']}>
								Starting on :{' '}
								<Animated.Text style={FontSizeColorStyle['heebo-500-12-white']}>
									{new Date().toDateString()}
								</Animated.Text>
							</Animated.Text>
						</Animated.View>

						<Animated.View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
								// backgroundColor: 'white',
								// height: 30,
								position: 'relative',
								overflow: 'hidden',
							}}
						>
							<Chip
								text={`0 D : 0 H : 0 M : 0 S`}
								colors={['#125B6F', '#052F3B', '#00212A']}
								color="#ffffff"
							/>

							<RectButton
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									gap: 5,
									paddingHorizontal: 5,
									transform: [{ scale: 0.8 }],
								}}
							>
								<AvatarGroup
									images={[
										'https://t3.ftcdn.net/jpg/02/57/27/20/360_F_257272034_PqpJ7rx0pqXHqB6RJ27w662p3FwY0r2G.jpg',
										'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOza36lSYO6bLPuiCEyN2qmG4MoMc_6TBew&usqp=CAU',
										'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsEWJ4QZwBu34arF-10mkTMXjl5p_S5QHEQ&usqp=CAU',
										'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsEWJ4QZwBu34arF-10mkTMXjl5p_S5QHEQ&usqp=CAU',
									]}
								/>
								<Animated.Text style={FontSizeColorStyle['heebo-500-20-white']}>
									+1k
								</Animated.Text>
							</RectButton>
						</Animated.View>
						<PrimaryButton
							label="Join This Legue "
							gradientType={'type2'}
							outlineStyle={{ width: '100%', zIndex: 1 }}
							endIcon={<Entypo name="chevron-right" size={24} color="white" />}
							style={{ justifyContent: 'space-between', zIndex: 1 }}
						/>
					</Animated.View>
				</BreathingAnimation>
				<PointerHelper
					title="League Details"
					subtitle="Join and View Participants"
					description="View all details about the selected league. You can join the league and see the list of participants."
					alignItems="flex-end"
				/>
			</Animated.View>
		</ImageBackground>
	);
};

export const LeaguesTeamsTutorial = () => {
	return (
		<Animated.View
			style={{
				backgroundColor: 'rgba(0,0,0,0.6)',
				flex: 1,
				// alignItems: 'flex-end',
				justifyContent: 'flex-end',
				paddingBottom: '10%',
			}}
		>
			<ImageBackground
				style={{ flex: 1, height: '90%', width: '100%' }}
				source={IMAGES.leguesTeam}
				blurRadius={2}
			>
				<Animated.View
					style={{
						backgroundColor: 'rgba(0,0,0,0.4)',
						flex: 1,
					}}
				>
					<BreathingAnimation flex={0}>
						<Animated.View
							style={{
								paddingTop: 50,
								flexDirection: 'row',
								gap: 20,
								paddingHorizontal: 20,
								backgroundColor: 'rgba(0,0,0,0.4)',
							}}
						>
							<Singer
								icon={
									'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2luZ2VyfGVufDB8fDB8fHww'
								}
								name="Demo Artist"
								popularity={100}
							/>
							<Singer
								icon={
									'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2luZ2VyfGVufDB8fDB8fHww'
								}
								name="Demo Artist"
								popularity={100}
							/>
							<Singer
								icon={
									'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2luZ2VyfGVufDB8fDB8fHww'
								}
								name="Demo Artist"
								popularity={100}
							/>
						</Animated.View>
					</BreathingAnimation>
					<Animated.View
						style={{
							paddingTop: 20,
							flexDirection: 'row',
							gap: 20,
							paddingHorizontal: 20,
							backgroundColor: 'rgba(0,0,0,0.4)',
						}}
					>
						<PointerHelper
							title="Create Your Team"
							subtitle="Select Players and Manage Credits"
							description="Choose players for your team by searching and selecting artists. Each player has a credit point; ensure you stay within the total credit limit for your team."
							alignItems="flex-end"
						/>
					</Animated.View>
				</Animated.View>
			</ImageBackground>
		</Animated.View>
	);
};

export const LeaguesConfirmTutorial = () => {
	const { bottom } = useSafeAreaInsets();

	return (
		<Animated.View
			style={{
				backgroundColor: 'rgba(0,0,0,0.6)',
				flex: 1,
				// alignItems: 'flex-end',
				justifyContent: 'flex-end',
				paddingBottom: bottom,
			}}
		>
			<ImageBackground
				style={{ flex: 1, height: '100%', width: '100%' }}
				source={IMAGES.confirm_team}
				blurRadius={2}
			>
				<Animated.View
					style={{
						backgroundColor: 'rgba(0,0,0,0.7)',
						flex: 1,
						justifyContent: 'flex-end',
						padding: 20,
						paddingBottom: 120,
						gap: 20,
					}}
				>
					<PointerHelperBottom
						title="Confirm League Selection"
						subtitle="Review and Confirm Your League Entry"
						description="Verify your league selection and confirm your entry to proceed."
						alignItems="flex-end"
					/>
					<BreathingAnimation flex={0}>
						<PrimaryButton
							label="Join This League By Confirm"
							gradientType="type4"
							size="md"
							style={{ justifyContent: 'space-between' }}
							endIcon={<Entypo name="chevron-right" size={24} color="white" />}
						/>
					</BreathingAnimation>
				</Animated.View>
			</ImageBackground>
		</Animated.View>
	);
};

export const LeaguesWinnersTutorial = () => {
	const { bottom } = useSafeAreaInsets();

	return (
		<Animated.View
			style={{
				backgroundColor: 'rgba(0,0,0,0.6)',
				flex: 1,
				// alignItems: 'flex-end',
				justifyContent: 'flex-end',
				paddingBottom: bottom,
			}}
		>
			<ImageBackground
				style={{ flex: 1, height: '100%', width: '100%' }}
				source={IMAGES.winners}
				blurRadius={2}
			>
				<Animated.View
					style={{
						backgroundColor: 'rgba(0,0,0,0.7)',
						flex: 1,
						// justifyContent: 'flex-end',
						padding: 20,
						paddingBottom: 120,
						gap: 30,
					}}
				>
					<Animated.View
						style={{
							// backgroundColor: 'rgba(0,0,0,0.7)',
							// flex: 1,
							justifyContent: 'flex-end',
							height: '70%',
							marginBottom: 100,
						}}
					>
						<BreathingAnimation flex={0}>
							<Animated.View
								style={{
									height: 300,
								}}
							>
								<BlurCard type={'winner'}>
									<Animated.View
										style={{
											width: '100%',
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'space-between',
										}}
									>
										<Animated.Text
											style={FontSizeColorStyle['poppins-400-20-white']}
										>
											{'Tournament Winner'}
										</Animated.Text>
										<Animated.Text
											style={
												FontSizeColorStyle['poppins-700-12-primary-text']
											}
										>
											{`${0} ${'Winners'}`}
										</Animated.Text>
									</Animated.View>

									{
										<WinnerTopSection
											topUsers={{
												first: {
													name: 'Jcob',
													image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2luZ2VyfGVufDB8fDB8fHww',
													amount: '200',
													points: '100',
												},
												second: {
													name: 'John',
													image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2luZ2VyfGVufDB8fDB8fHww',
													amount: '150',
													points: '70',
												},
												third: {
													name: 'Lull',
													image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2luZ2VyfGVufDB8fDB8fHww',
													amount: '100',
													points: '50',
												},
											}}
										/>
									}
									<FlashList
										data={[]}
										renderItem={({ item }) => <WinnerItem {...item} />}
										contentContainerStyle={{ gap: 10 }}
										style={{ flex: 1 }}
									/>
								</BlurCard>
							</Animated.View>
						</BreathingAnimation>
						<PointerHelper
							title="Winners & Participants"
							subtitle="Swipe to View Winners or Participants"
							description="Swipe from bottom to top to view the list of winners or participants in this league."
							alignItems="flex-end"
						/>
					</Animated.View>
				</Animated.View>
			</ImageBackground>
		</Animated.View>
	);
};

export const LeaguesContestsTutorial = () => {
	const { bottom } = useSafeAreaInsets();

	return (
		<Animated.View
			style={{
				backgroundColor: 'rgba(0,0,0,0.6)',
				flex: 1,
				// alignItems: 'flex-end',
				justifyContent: 'flex-end',
				paddingBottom: bottom,
			}}
		>
			<ImageBackground
				style={{ flex: 1, height: '100%', width: '100%' }}
				source={IMAGES.contests}
				blurRadius={2}
			>
				<Animated.View
					style={{
						backgroundColor: 'rgba(0,0,0,0.7)',
						flex: 1,
						// justifyContent: 'flex-end',
						paddingTop: 120,
						padding: 20,
						paddingBottom: 120,
					}}
				>
					<Animated.View
						style={{
							backgroundColor: 'rgba(0,0,0,0.7)',

							height: 200,
						}}
					>
						<BreathingAnimation flex={0}>
							<ContestButton
								artist1Detail={{
									artist: {
										name: 'Tanay',
										icon: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2luZ2VyfGVufDB8fDB8fHww',
									},
								}}
								artist2Detail={{
									artist: {
										name: 'Kartik',
										icon: 'https://images.unsplash.com/photo-1595422656857-ced3a4a0ce25?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbmdlcnxlbnwwfHwwfHx8MA%3D%3D',
									},
								}}
								amount="1000"
								totalVotes={'100'}
								bidAmount={'100'}
							/>
						</BreathingAnimation>
					</Animated.View>
					<PointerHelper
						title="Contests"
						subtitle="View Contest Details and Join"
						description="Explore contest details, such as participants, winners, prize amounts, and join contests to compete."
						alignItems="flex-end"
					/>
				</Animated.View>
				<Text>GameModeTutorial</Text>
			</ImageBackground>
		</Animated.View>
	);
};

export const LeaguesCongratsTutorial = () => {
	const { bottom } = useSafeAreaInsets();

	return (
		<Animated.View
			style={{
				backgroundColor: 'rgba(0,0,0,0.6)',
				flex: 1,
				// alignItems: 'flex-end',
				justifyContent: 'flex-end',
				paddingBottom: bottom,
			}}
		>
			<ImageBackground
				style={{ flex: 1, height: '100%', width: '100%' }}
				source={IMAGES.congrats}
			>
				<Text>GameModeTutorial</Text>
			</ImageBackground>
		</Animated.View>
	);
};

export default GameModeTutorial;

const styles = StyleSheet.create({});
