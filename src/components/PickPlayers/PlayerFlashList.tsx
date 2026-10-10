import { FlatList, StyleSheet } from 'react-native';

import Player, { PlayerProps } from './Player';

import { LayoutStyle, responsive } from '@/styles';

type PlayerFlashListProps = { players?: PlayerProps[]; onClick: (id?: string) => void };

const PlayerFlashList: React.FC<PlayerFlashListProps> = ({ players, onClick }) => {
	return (
		<FlatList
			contentContainerStyle={[LayoutStyle.screenLayout, styles.pt10, LayoutStyle.center]}
			style={LayoutStyle.fill}
			columnWrapperStyle={[
				styles.container,
				{ alignItems: 'space-between', justifyContent: 'center' },
			]}
			data={players}
			renderItem={({ item }) => <Player {...item} onPress={onClick} />}
			numColumns={3}
		/>
	);
};

export default PlayerFlashList;

const styles = StyleSheet.create({
	container: { gap: responsive(20) },
	pt10: {
		gap: responsive(20),
		paddingHorizontal: responsive(5),
		paddingTop: responsive(10),
	},
});
