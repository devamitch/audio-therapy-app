import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Participant {
	id: number;
	name: string;
}

interface OpenMatchScreenProps {
	matchData: {
		id: number;
		name: string;
		date: string;
		participants: Participant[];
	};
	onJoinMatch: (matchId: number) => void;
}

const OpenMatchScreen: React.FC<OpenMatchScreenProps> = ({ matchData, onJoinMatch }) => {
	const renderParticipantItem = ({ item }: { item: Participant }) => {
		return (
			<View style={styles.participantItem}>
				<Text style={styles.participantName}>{item.name}</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.matchName}>{matchData.name}</Text>
			<Text style={styles.matchDate}>{matchData.date}</Text>

			<FlatList
				data={matchData.participants}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderParticipantItem}
				style={styles.participantList}
			/>

			<TouchableOpacity style={styles.joinButton} onPress={() => onJoinMatch(matchData.id)}>
				<Text style={styles.joinButtonText}>Join Battle</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f5f5f5',
		flex: 1,
		padding: 16,
	},
	joinButton: {
		alignItems: 'center',
		backgroundColor: '#3498db',
		borderRadius: 5,
		padding: 15,
	},
	joinButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	matchDate: {
		color: '#777',
		fontSize: 16,
		marginBottom: 20,
	},
	matchName: {
		color: '#333',
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	participantItem: {
		backgroundColor: '#fff',
		borderRadius: 10,
		elevation: 3,
		marginBottom: 12,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	participantList: {
		marginBottom: 20,
	},
	participantName: {
		color: '#333',
		fontSize: 18,
	},
});

// Example usage:
const openMatchData = {
	id: 1,
	name: 'Opened Match - Rapper Battle',
	date: '2023-03-10',
	participants: [
		{ id: 1, name: 'Rapper 1' },
		{ id: 2, name: 'Rapper 2' },
		{ id: 3, name: 'Rapper 3' },
		// Add more participant data as needed
	],
};

const MatchScreen = () => {
	const handleJoinMatch = (matchId: number) => {
		// Handle joining the match, e.g., navigate to match details screen
		console.log(`Joined match with ID: ${matchId}`);
	};

	return <OpenMatchScreen matchData={openMatchData} onJoinMatch={handleJoinMatch} />;
};

export default MatchScreen;
