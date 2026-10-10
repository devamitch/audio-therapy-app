import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Rating({ rating }: { rating: number }) {
	const filledStars = Math.floor(rating / 2);

	const maxStars = Array(5 - filledStars).fill('staro');

	const r = [...Array(filledStars).fill('star'), ...maxStars];

	return (
		<View style={styles.rating}>
			<Text style={styles.ratingNumber}>{rating}</Text>
			{r.map((type, index) => {
				return <AntDesign key={index} name={type} size={12} color="tomato" />;
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	rating: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 4,
	},
	ratingNumber: { fontFamily: 'Menlo', fontSize: 14, marginRight: 4 },
});
