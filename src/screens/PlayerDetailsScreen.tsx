import { Image, StyleSheet, Text, View } from 'react-native';

// Player Details Screen
interface PlayerDetailsScreenProps {
	navigation: any;
}

const PlayerDetailsScreen: React.FC<PlayerDetailsScreenProps> = ({ navigation }) => {
	// const playerData = navigation.getParam('playerData', {});

	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvxFxh76un_iB0aNzFDGz3DggYunjHh3xwNw&usqp=CAU',
				}}
				style={styles.playerImage}
			/>
			<Text style={styles.playerName}>Dewmo 1</Text>
			<Text style={styles.playerPosition}>demo 2</Text>
		</View>
	);
};

export default PlayerDetailsScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		flex: 1,
		justifyContent: 'center',
	},
	playerImage: {
		borderRadius: 60,
		height: 120,
		marginBottom: 16,
		width: 120,
	},
	playerName: {
		color: '#333',
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	playerPosition: {
		color: '#777',
		fontSize: 16,
		marginBottom: 16,
	},
	sectionButton: {
		backgroundColor: '#3498db',
		borderRadius: 10,
		marginVertical: 10,
		padding: 20,
	},
	sectionButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});
