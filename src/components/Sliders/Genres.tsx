import { StyleSheet, Text, View } from 'react-native';

export default function Genres({ genres }: { genres: string[] }) {
	return (
		<View style={styles.genres}>
			{genres.map((genre, i) => {
				return (
					<View key={genre} style={styles.genre}>
						<Text style={styles.genreText}>{genre}</Text>
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	genre: {
		borderColor: '#ccc',
		borderRadius: 14,
		borderWidth: 1,
		marginBottom: 4,
		marginRight: 4,
		paddingHorizontal: 6,
		paddingVertical: 2,
	},
	genreText: {
		fontSize: 9,
		opacity: 0.4,
	},
	genres: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginVertical: 4,
	},
});
