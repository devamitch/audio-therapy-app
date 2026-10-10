/* eslint-disable no-inline-styles/no-inline-styles */
/* eslint-disable react-native/no-inline-styles */
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { useQuery } from '@tanstack/react-query';

import { List } from '@/components';
import { useAppStore } from '@/core/store';
import { ChalangesResponse, getChallanges } from '@/lib/server/challange';
import { NEWZ_NAV_PROPS_TYPES } from '@/navigation/types';
import { FontSizeColorStyle } from '@/styles';

interface Player {
	name: string;
	icon: string;
	level: string;
	rank: string;
}

type PvpCardProps = Partial<
	ChalangesResponse & {
		player1: Player;
		player2: Player;
		onPress?: RectButtonProps['onPress'];
	}
>;

const PvpCard: React.FC<PvpCardProps> = ({
	player1,
	player2,
	onPress,
	artist1,
	artist2,
	artist1Detail,
	artist2Detail,
}) => {
	return (
		<RectButton style={styles.cardContainer} onPress={onPress}>
			<View style={styles.playerContainer}>
				<FastImage
					source={{
						uri:
							artist1Detail?.icon ||
							artist1Detail?.artist?.icon ||
							player1?.icon ||
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj2MnHnabPJEwDC9RPSGdA4I6baM4KQ9MB3w&usqp=CAU',
					}}
					style={{
						borderRadius: 50,
						borderWidth: 1,
						height: 100,
						marginBottom: 10,
						width: 100,
					}}
				/>
				<Text style={FontSizeColorStyle['montserrat-500-16-white']}>
					{artist1Detail?.artist?.name || player1?.name || 'Name'}
				</Text>
			</View>

			<Text style={FontSizeColorStyle['montserrat-500-24-white']}>VS</Text>

			<View style={styles.playerContainer}>
				<FastImage
					source={{
						uri:
							artist2Detail?.icon ||
							artist2Detail?.artist?.icon ||
							player2?.icon ||
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkzwN_MUmq-jZnZNtjDJvvzoboc8A_tcdKx1yzq2Y-dPtPEygoDYSH-reLsVqR7FEUhUI&usqp=CAU',
					}}
					style={{
						borderRadius: 50,
						borderWidth: 1,
						height: 100,
						marginBottom: 10,
						width: 100,
					}}
				/>
				<Text style={FontSizeColorStyle['montserrat-500-16-white']}>
					{artist2Detail?.artist?.name || player2?.name || 'Name2'}
				</Text>
			</View>
		</RectButton>
	);
};

const Home = ({ navigation }: NEWZ_NAV_PROPS_TYPES<'Newz'>) => {
	const { data, isLoading, isFetching, refetch } = useQuery({
		queryFn: getChallanges,
		queryKey: ['getChallanges'],
	});

	const userType = useAppStore((state) => state?.userType);

	return (
		<>
			<ImageBackground
				source={{
					uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhsX96x4Cay4KFBA8erhKIx-kvwVEj06SS6A&usqp=CAU',
				}}
				// tintColor={'rgba(0,2,0,0.9)'}
				resizeMode="cover"
				// imageStyle={{ tintColor: 'rgba(0,2,0,0.9)' }}
				style={{ width: '100%', height: 250 }}
			>
				<View style={styles.overlay}>
					{/* Your content goes here */}
					{/* <Text style={styles.text}>Hello, World!</Text> */}
					{/* <RectButton
						style={{
							padding: 6,
							paddingHorizontal: 8,
							borderColor: '#fff',
							borderWidth: 2,
						}}
					>
						<Text style={{ color: '#ffffff' }}>View Players</Text>
					</RectButton> */}
					{userType === 'artist' ? (
						<RectButton
							style={{
								padding: 6,
								paddingHorizontal: 8,
								borderColor: '#fff',
								borderWidth: 2,
							}}
							onPress={() => navigation.navigate('Create')}
						>
							<Text style={{ color: '#ffffff' }}>Create Chalange</Text>
						</RectButton>
					) : null}
				</View>
			</ImageBackground>
			<List
				data={data || []}
				renderItem={({ item }) => (
					<PvpCard
						{...item}
						onPress={() => navigation.navigate('Chalange', { id: item?._id })}
					/>
				)}
				isRefetching={isFetching && !isLoading}
				refetch={refetch}
			/>
		</>
	);
};

export default Home;

const styles = StyleSheet.create({
	cardContainer: {
		alignItems: 'center',
		backgroundColor: '#232323',
		borderRadius: 10,
		elevation: 3,
		flexDirection: 'row',
		justifyContent: 'space-around',
		margin: 10,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
	},
	icon: {
		// borderColor: '#e1e1e1',
		borderRadius: 50,
		borderWidth: 1,
		height: 100,
		marginBottom: 10,
		width: 100,
	},
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		padding: 40,
		flexDirection: 'row',
	},
	playerContainer: {
		alignItems: 'center',
	},
	playerInfo: {
		color: '#ecf0f1',
		fontSize: 14,
	},
	playerName: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 600,
	},
	text: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold',
	},
	versusText: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
	},
});
