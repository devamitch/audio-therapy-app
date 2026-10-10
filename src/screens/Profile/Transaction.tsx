import { AntDesign } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { FlatList, StyleSheet, Switch, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

import { Chip, PrimaryButton } from '@/components';
import { useAppStore } from '@/core/store';
import { getAllTransaction, TransactionResponse } from '@/lib/server/leagues';
import { MainStackRouteType } from '@/navigation/main/MainStack';
import { ALL_COLORS, FontSizeColorStyle, responsive } from '@/styles';

const BlurView = Animated.createAnimatedComponent(ExpoBlurView);

const transactions = [
	{
		id: '1',
		type: 'Income',
		amount: '+500',
		date: '2024-05-29',
		description: 'League Bonus',
		avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFPjcOAsf212H43YirErFsvB8SAO4-A7Dd4sOqOzyV_yPLYPPX9asljxoTPtY29BegL6U&usqp=CAU',
	},
	{
		id: '2',
		type: 'Expense',
		amount: '-100',
		date: '2024-05-28',
		description: 'League Entry Fee',
		avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI8ZOqQOKtzWzxQ1QkSjx5VkYksmsC5_ZqnwTtw9uyIjfCxenvTp6YQlh06W0EEIceXbQ&usqp=CAU',
	},
	{
		id: '3',
		type: 'Income',
		amount: '+200',
		date: '2024-05-27',
		description: 'Contest Win',
		avatar: 'https://t4.ftcdn.net/jpg/04/50/54/09/360_F_450540960_CpCqdAP0ZuF0kB6nacGUw7VnYDSk4pSQ.jpg',
	},
];

const TransactionItem: React.FC<TransactionResponse & { index: number }> = ({
	index = 0,
	...item
}) => {
	return (
		<BlurView
			style={styles.transactionItem}
			tint="dark"
			experimentalBlurMethod={'dimezisBlurView'}
			entering={FadeInDown.delay(index * 200)}
			exiting={FadeOut.delay(index * 100)}
		>
			{/* <Image source={{ uri: item.avatar }} style={styles.avatar} /> */}
			<View style={styles.detailsContainer}>
				<Text style={FontSizeColorStyle['montserrat-600-13-white']}>
					{item?.description}
				</Text>
				<Text style={FontSizeColorStyle['montserrat-600-xxs-grey-8e8e8e']}>
					{new Date(item?.createdAt)?.toLocaleDateString()}
				</Text>
			</View>
			<Chip
				outlined
				text={
					<Text style={{ textTransform: 'capitalize' }}>
						{`${item?.transactionType ?? 'Debit'}ed ${item?.amount ?? 0} test `}
						<AntDesign
							name={item.transactionType !== 'debit' ? 'arrowdown' : 'arrowup'}
							size={responsive(14)}
							color={ALL_COLORS['primary-text']}
						/>
					</Text>
				}
			/>
		</BlurView>
	);
};

const Transaction: React.FC<MainStackRouteType<'Transaction'>> = ({ navigation }) => {
	const [demo, setDemo] = useState();

	const user = useAppStore((state) => state?.user?._id);

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryFn: async () => getAllTransaction({ user }),
		queryKey: ['getAllTransaction'],
	});

	return (
		<View style={styles.container}>
			{false ? (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',

						padding: 10,
					}}
				>
					<Text style={FontSizeColorStyle['montserrat-700-18-primary-text']}>
						Demo Transactions
					</Text>
					<Switch
						trackColor={{ false: '#767577', true: 'rgba(201, 201, 201, 0.1)' }}
						thumbColor={demo ? ALL_COLORS['primary-text'] : ALL_COLORS.primary}
						ios_backgroundColor="#3e3e3e"
						onValueChange={() => setDemo((prev) => (prev ? undefined : transactions))}
						value={!!demo}
					/>
				</View>
			) : null}
			<FlatList
				data={data}
				keyExtractor={(item) => item._id}
				renderItem={({ item, index }) => <TransactionItem index={index} {...item} />}
			/>
			{!isFetching && data?.length === 0 ? (
				<BlurView
					style={{
						position: 'absolute',
						top: 20,
						bottom: 20,
						left: 20,
						right: 20,
						borderRadius: 5,
						overflow: 'hiden',
						backgroundColor: 'rgba(0,0,0,0.3)',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					entering={SlideInDown.delay(500)}
					exiting={SlideOutDown.delay(500)}
					intensity={20}
					tint="dark"
				>
					<Animated.View
						style={{
							borderLeftColor: '#000000',
							borderTopColor: '#006582',
							borderRadius: 18,
							borderWidth: 2,
							overflow: 'hidden',
						}}
					>
						<LinearGradient
							colors={['rgba(0,101,130, 0.5)', 'rgba(0,101,130, 0.2)']}
							style={{
								overflow: 'hidden',
								padding: 40,
								gap: 20,
								maxWidth: 327,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							start={{ x: 0.8, y: 0.7 }}
							end={{ x: 0.1, y: 0 }}
						>
							{/* <Image
								source={{
									uri: 'https://static.vecteezy.com/system/resources/thumbnails/021/975/492/small_2x/search-not-found-3d-render-icon-illustration-with-transparent-background-empty-state-png.png',
								}}
								style={{
									height: 200,
									width: 200,
									borderRadius: 5,
									backgroundColor: 'rgba(0,0,0,0.7)',
								}}
							/> */}
							<Animated.Text style={FontSizeColorStyle['heebo-700-xxl-white']}>
								{' '}
								Empty data
							</Animated.Text>
							<Animated.Text style={FontSizeColorStyle['heebo-400-16-white']}>
								{' '}
								Your transaction history appears to be empty. Please check your
								internet settings and join some contests.
							</Animated.Text>

							<PrimaryButton
								label="Return to dashboard"
								onPress={() => {
									navigation?.canGoBack
										? navigation?.goBack()
										: navigation?.navigate('Dashboard');
								}}
								gradientType="type4"
								outlineStyle={{
									width: '100%',
									borderRadius: 40,
									overflow: 'hidden',
								}}
								style={{
									paddingVertical: 10,
									height: 'auto',
									justifyContent: 'center',
								}}
								labelStyle={FontSizeColorStyle['montserrat-600-13-white']}
							/>
							<PrimaryButton
								labelStyle={FontSizeColorStyle['montserrat-600-13-white']}
								label="Retry"
								gradientType="type3"
								outlineStyle={{
									width: '100%',
									borderRadius: 40,
									overflow: 'hidden',
								}}
								style={{
									paddingVertical: 10,
									height: 'auto',
									justifyContent: 'center',
								}}
								onPress={refetch}
							/>
						</LinearGradient>
					</Animated.View>
				</BlurView>
			) : null}
		</View>
	);
};

export default Transaction;

const styles = StyleSheet.create({
	amount: {
		color: '#fff',
		fontSize: responsive(20),
		fontWeight: 'bold',
	},
	avatar: {
		borderRadius: responsive(25),
		height: responsive(50),
		marginRight: responsive(15),
		width: responsive(50),
	},
	container: {
		flex: 1,
		padding: responsive(20),
	},
	date: {
		color: '#fff',
		fontSize: responsive(14),
	},
	description: {
		color: '#fff',
		fontSize: responsive(16),
		marginVertical: responsive(5),
	},
	detailsContainer: {
		flex: 1,
	},
	iconContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		flex: 1,
		gap: responsive(2),
		justifyContent: 'center',
	},
	transactionItem: {
		alignItems: 'center',
		borderRadius: responsive(10),
		elevation: 5,
		flexDirection: 'row',
		marginBottom: responsive(15),
		overflow: 'hidden',
		padding: responsive(15),
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
});
