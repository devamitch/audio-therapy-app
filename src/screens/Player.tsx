import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Player {
	id: number;
	name: string;
	position: string;
	image: string;
}

interface PlayerListProps {
	players: Player[];
	onPlayerPress: (playerId: number) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onPlayerPress }) => {
	const renderPlayerItem = ({ item }: { item: Player }) => {
		return (
			<TouchableOpacity style={styles.playerItem} onPress={() => onPlayerPress(item.id)}>
				<Image source={{ uri: item.image }} style={styles.playerImage} />
				<View style={styles.playerInfo}>
					<Text style={styles.playerName}>{item.name}</Text>
					<Text style={styles.playerPosition}>{item.position}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<FlatList
			data={players}
			keyExtractor={(item) => item.id.toString()}
			renderItem={renderPlayerItem}
			style={styles.listContainer}
		/>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		backgroundColor: '#f5f5f5',
		flex: 1,
		padding: 16,
	},
	playerImage: {
		borderRadius: 40,
		height: 80,
		marginRight: 16,
		width: 80,
	},
	playerInfo: {
		flex: 1,
	},
	playerItem: {
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 10,
		elevation: 3,
		flexDirection: 'row',
		marginBottom: 12,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	playerName: {
		color: '#333',
		fontSize: 18,
		fontWeight: 'bold',
	},
	playerPosition: {
		color: '#777',
		fontSize: 14,
		marginTop: 4,
	},
});

// Example usage:
const playersData: Player[] = [
	{
		id: 1,
		name: 'John Doe',
		position: 'Rapper',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq6X16THk0oEvVVj5h_yxenZ91oCfi71GW9A&usqp=CAU',
	},
	{
		id: 2,
		name: 'Jane Smith',
		position: 'Singer',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXjBYxhladR8Nb1JWgg8j4vOZiA0Bd0eW4Ig&usqp=CAU',
	},
	// Add more player data as needed
];

const PlayerListScreen = ({ navigation }: { navigation: any }) => {
	const handlePlayerPress = (playerId: number) => {
		// Handle press, e.g., navigate to player details screen
		// console.log(`Pressed player with ID: ${playerId}`);
		navigation.navigate('Player');
	};

	return <PlayerList players={playersData} onPlayerPress={handlePlayerPress} />;
};

export default PlayerListScreen;
