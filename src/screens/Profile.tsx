import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import { Card, ScrollLayout } from '@/components';

const demoPosts = [
	{ id: '1', text: 'Hello, React Native!', date: '2 hours ago' },
	{ id: '2', text: 'Building awesome apps!', date: '1 day ago' },
	// Add more demo posts as needed
];

const demoMusics = [
	{ id: '1', title: 'Song 1', artist: 'Artist 1' },
	{ id: '2', title: 'Song 2', artist: 'Artist 2' },
	// Add more demo musics as needed
];

const demoLaborites = [
	{ id: '1', name: 'Laborite 1' },
	{ id: '2', name: 'Laborite 2' },
	// Add more demo laborites as needed
];

const demoSingers = [
	{ id: '1', name: 'Singer 1' },
	{ id: '2', name: 'Singer 2' },
	// Add more demo singers as needed
];

const demoCompositions = [
	{ id: '1', title: 'Composition 1', genre: 'Rock' },
	{ id: '2', title: 'Composition 2', genre: 'Pop' },
	// Add more demo compositions as needed
];

const demoOwnPosts = [
	{ id: '1', text: 'My first post!', date: '1 week ago' },
	{ id: '2', text: 'Exploring React Native!', date: '2 weeks ago' },
	// Add more demo own posts as needed
];

const Profile = () => {
	const translateY = useSharedValue(0);

	// Define animated gesture handler
	const gestureHandler = useAnimatedGestureHandler({
		onPanGestureEvent: (event) => {
			translateY.value = event.translationY;
		},
		onPanGestureStateChange: (event) => {
			if (event.state === State.END || event.state === State.CANCELLED) {
				translateY.value = withSpring(0);
			}
		},
	});

	// Define animated styles
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		};
	});

	return (
		<ScrollView style={styles.container}>
			<ImageBackground
				source={{
					uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcbEksjpfF4BBYnjCrNecTohl3uArRH45b-w&usqp=CAU',
				}}
				style={styles.coverImage}
			>
				<PanGestureHandler onGestureEvent={gestureHandler}>
					<Animated.View style={[styles.profileContainer, animatedStyle]}>
						<Animated.Image
							source={{
								uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDjLA_ACh8yXAu_8Rqj8S_fE1KCQnVjET53w&usqp=CAU',
							}}
							style={styles.profileImage}
						/>

						<View style={styles.userInfoContainer}>
							<Text style={styles.userName}>John Doe</Text>
							<Text style={styles.userBio}>Rappper</Text>
						</View>
					</Animated.View>
				</PanGestureHandler>
			</ImageBackground>
			<ScrollLayout>
				<ScrollView
					horizontal
					contentContainerStyle={{ gap: 10 }}
					style={{ padding: 10 }}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				>
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Posts</Text>
					</View>

					<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Recently Liked Musics</Text>
					</View>

					{/* Laborites Section */}
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Laborites</Text>
						{/* Render laborites here */}
						{/* Add your custom laborite components */}
					</View>

					{/* Laborite Singers Section */}
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Laborite Singers</Text>
						{/* Render laborite singers here */}
						{/* Add your custom laborite singer components */}
					</View>

					{/* Own Compositions Section */}
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Own Compositions</Text>
						{/* Render own compositions here */}
						{/* Add your custom composition components */}
					</View>

					{/* Own Posts Section */}
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionTitle}>Own Posts</Text>
						{/* Render own posts here */}
						{/* Add your custom post components */}
					</View>
				</ScrollView>
				{/* Posts Section */}

				{/* Posts Section */}
				<View style={styles.sectionContainer}>
					<Text style={styles.sectionTitle}>Posts</Text>
					<FlatList
						data={demoPosts}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Card>
								<Text>{item.text}</Text>
								<Text style={styles.postDate}>{item.date}</Text>
							</Card>
						)}
					/>
				</View>

				{/* Recently Liked Musics Section */}
				<View style={styles.sectionContainer}>
					<Text style={styles.sectionTitle}>Recently Liked Musics</Text>
					<FlatList
						data={demoMusics}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Card>
								<Text>{item.title}</Text>
								<Text style={styles.musicArtist}>{item.artist}</Text>
							</Card>
						)}
					/>
				</View>

				{/* Laborites Section */}
				<View style={styles.sectionContainer}>
					<Text style={styles.sectionTitle}>Laborites</Text>
					<FlatList
						data={demoLaborites}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Card>
								<Text>{item.name}</Text>
							</Card>
						)}
					/>
				</View>

				<View style={styles.sectionContainer}>
					<Text style={styles.sectionTitle}>Laborite Singers</Text>
					<FlatList
						data={demoSingers}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Card>
								<Text>{item.name}</Text>
							</Card>
						)}
					/>
				</View>

				<View style={styles.sectionContainer}>
					<Text style={styles.sectionTitle}>Own Compositions</Text>
					<FlatList
						data={demoCompositions}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Card>
								<Text>{item.title}</Text>
								<Text style={styles.compositionGenre}>{item.genre}</Text>
							</Card>
						)}
					/>
				</View>

				<View style={styles.sectionContainer}>
					<Text style={styles.sectionTitle}>Own Posts</Text>
					<FlatList
						data={demoOwnPosts}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Card>
								<Text>{item.text}</Text>
								<Text style={styles.postDate}>{item.date}</Text>
							</Card>
						)}
					/>
				</View>
			</ScrollLayout>
		</ScrollView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	compositionGenre: {
		color: 'gray',
	},
	container: {
		flex: 1,
	},
	coverImage: {
		height: 300,
		resizeMode: 'cover',
	},
	musicArtist: {
		color: 'gray',
	},
	postDate: {
		color: 'gray',
	},
	profileContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		flexDirection: 'column',
		// marginTop: -20,
		padding: 16,
		padding: 16,
		height: 300,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	profileImage: {
		borderColor: '#fff',
		borderRadius: 40,
		borderWidth: 2,
		height: 80,
		marginBottom: 16,
		width: 80,
	},
	sectionContainer: {
		backgroundColor: '#fff',
		borderRadius: 10,
		flex: 1,
		paddingHorizontal: 12,
		paddingVertical: 4,
		shadowColor: 'balck',
		shadowOffset: { height: 0, width: 0 },
		shadowOpacity: 0.1,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 8,
	},
	userBio: {
		color: '#e1e1e1',
		fontSize: 14,
		fontWeight: '700',
	},
	userInfoContainer: {
		alignItems: 'center',
	},
	userName: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	// Add styles for other components here
});
