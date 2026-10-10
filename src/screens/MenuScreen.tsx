import { BlurView } from 'expo-blur';
import {
    Button,
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Card {
	id: string;
	title: string;
	details: string;
	rewards: string;
}

interface Section {
	id: string;
	title: string;
	details?: string;
	data?: Array<{ id: string; label: string; onPress: () => void }>;
}

const cardData: Card[] = [
	{
		id: '1',
		title: 'Platinum Card',
		details: 'Enjoy exclusive perks',
		rewards: 'Double points on every purchase',
	},
	{
		id: '2',
		title: 'Diamond Card',
		details: 'Unlimited luxury benefits',
		rewards: 'Complimentary spa treatments',
	},
	{
		id: '3',
		title: 'Gold Card',
		details: 'Luxury at its finest',
		rewards: 'Free access to premium lounges',
	},
	// Add more cards as needed
	// Add more cards as needed
	{
		id: '4',
		title: 'Silver Card',
		details: 'Elegance with great benefits',
		rewards: 'Priority customer support',
	},
	{
		id: '5',
		title: 'Bronze Card',
		details: 'Affordable luxury',
		rewards: 'Discounts at partner stores',
	},
];

const sections: Section[] = [
	{
		id: 'privacyPolicy',
		title: 'Privacy Policy',
		details:
			'Your privacy is important to us. Please read our privacy policy for more information.',
	},
	{ id: 'topCards', title: 'Top Cards' },
	{ id: 'quickActions', title: 'Quick Actions' },
	{ id: 'moreOptions', title: 'More Options' },
	{ id: 'additionalSection', title: 'Additional Section', details: 'Explore more features' },
	{ id: 'specialOffers', title: 'Special Offers', details: 'Exclusive discounts and promotions' },
	{
		id: 'accountSettings',
		title: 'Account Settings',
		details: 'Manage your account preferences',
	},
	{ id: 'featuredItems', title: 'Featured Items' },
	// Add more sections as needed
	{
		id: 'additionalButtons',
		title: 'Additional Buttons',
		data: [
			{
				id: 'termsConditions',
				label: 'Terms & Conditions',
				onPress: () => console.log('Terms & Conditions'),
			},
			{ id: 'appInfo', label: 'App Info', onPress: () => console.log('App Info') },
			// Add more buttons as needed
		],
	},
];

const MenuScreen = () => {
	const renderCard = ({ item }: { item: Card }) => (
		<TouchableOpacity style={styles.card}>
			<Text style={styles.cardTitle}>{item.title}</Text>
			<Text style={styles.cardDetails}>{item.details}</Text>
			<Text style={styles.cardRewards}>{item.rewards}</Text>
		</TouchableOpacity>
	);

	const renderSectionHeader = ({ item }: { item: Section }) => (
		<View style={styles.sectionContainer}>
			<Text style={styles.sectionTitle}>{item.title}</Text>
			{item.details && <Text style={styles.sectionDetails}>{item.details}</Text>}
			{item.data && (
				<View style={styles.buttonContainer}>
					{item.data.map((button) => (
						<Button key={button.id} title={button.label} onPress={button.onPress} />
					))}
				</View>
			)}
		</View>
	);

	return (
		<ImageBackground
			source={{
				uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy1kNspVGcF7twPmDr2Wli_fcYTO_yGsuatA&usqp=CAU',
			}}
			style={styles.backgroundImage}
		>
			<BlurView intensity={70} style={StyleSheet.absoluteFill} tint="dark">
				<SafeAreaView style={styles.container} edges={['top']}>
					<View style={styles.header}>
						<Text style={styles.headerText}>test</Text>
						<Text style={styles.balanceText}>Available Balance: $500</Text>
					</View>

					<FlatList
						data={sections}
						keyExtractor={(item) => item.id}
						renderItem={renderSectionHeader}
						contentContainerStyle={styles.contentContainer}
					/>

					<FlatList
						data={cardData}
						keyExtractor={(card) => card.id}
						renderItem={renderCard}
						horizontal
						showsHorizontalScrollIndicator={false}
					/>
				</SafeAreaView>
			</BlurView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover',
	},
	balanceText: {
		color: '#FFD369',
		fontSize: 16,
		marginBottom: 10,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10,
	},
	card: {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderRadius: 15,
		marginHorizontal: 10,
		padding: 20,
		width: 250,
	},
	cardDetails: {
		color: '#F8F8F8',
		fontSize: 16,
		marginBottom: 8,
	},
	cardRewards: {
		color: '#61dafb',
		fontSize: 14,
	},
	cardTitle: {
		color: '#FFD369',
		fontSize: 20,
		marginBottom: 10,
	},
	container: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		paddingBottom: 80,
	},
	contentContainer: {
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	header: {
		alignItems: 'center',
		paddingVertical: 20,
	},
	headerText: {
		color: '#F8F8F8',
		fontSize: 24,
		fontWeight: 'bold',
	},
	sectionContainer: {
		marginBottom: 20,
	},
	sectionDetails: {
		color: '#F8F8F8',
		fontSize: 16,
		marginBottom: 10,
	},
	sectionTitle: {
		color: '#FFD369',
		fontSize: 22,
		marginBottom: 5,
	},
});

export default MenuScreen;
