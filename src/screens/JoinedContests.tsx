import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { List } from '@/components';
import {
	CompetitionData,
	generateRandomCompetitionData,
	Musician,
} from '@/components/PickPlayers/data';
import { FontSizeColorStyle } from '@/styles';

interface CompetitionCardProps {
	competition: CompetitionData;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition }) => {
	const renderParticipant = (participant: Musician) => (
		<View style={styles.participantContainer}>
			<Image source={{ uri: participant.image }} style={styles.avatar} />
			<Text style={FontSizeColorStyle['heebo-600-12-white']}>{participant.name}</Text>
			<Text style={FontSizeColorStyle['heebo-600-12-white']}>
				{`Followers: ${participant.followers}`}
			</Text>
		</View>
	);

	return (
		<LinearGradient
			colors={['#2C3848', '#1E293B']}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={styles.cardContainer}
		>
			<View style={styles.participantsContainer}>
				{renderParticipant(competition.participant1)}
				<Text style={styles.vsText}>VS</Text>
				{renderParticipant(competition.participant2)}
			</View>

			<View style={styles.detailsContainer}>
				<Text style={FontSizeColorStyle['heebo-600-12-white']}>
					{`Tokens Bet: ${competition.numOfTokenBet}`}
				</Text>
				<Text style={FontSizeColorStyle['heebo-600-12-white']}>
					{`Description: ${competition.description}`}
				</Text>
				<Text style={FontSizeColorStyle['heebo-600-12-white']}>
					{`Total Bets: ${competition.totalBets}`}
				</Text>
			</View>

			<View style={styles.bottomContainer}>
				<Text style={FontSizeColorStyle['heebo-600-12-white']}>
					{`Winner: ${competition.winner}`}
				</Text>
				<Text style={FontSizeColorStyle['heebo-600-12-white']}>
					{`Claim Amount: ${competition.claimAmount}`}
				</Text>
				<Text style={FontSizeColorStyle['heebo-600-12-white']}>
					{`Created On: ${new Date(Number(competition.createdOn)).toDateString()}`}
				</Text>
			</View>
		</LinearGradient>
	);
};

const JoinedContests = () => {
	return (
		<List
			data={generateRandomCompetitionData(30)}
			keyExtractor={(item, index) => `${item.createdOn}-${index}`}
			renderItem={({ item }) => <CompetitionCard competition={item} />}
		/>
	);
};

export default JoinedContests;

const styles = StyleSheet.create({
	avatar: {
		borderRadius: 25,
		height: 50,
		marginVertical: 5,
		width: 50,
	},
	bottomContainer: {
		borderColor: '#fff',
		borderTopWidth: 1,
		paddingTop: 10,
	},
	cardContainer: {
		borderRadius: 8,
		margin: 10,
		padding: 10,
	},
	detailsContainer: {
		marginBottom: 10,
	},
	participantContainer: {
		alignItems: 'center',
		flex: 1,
	},
	participantsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	vsText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});
