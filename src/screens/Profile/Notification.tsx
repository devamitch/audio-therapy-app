import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import { PrimaryButton } from '@/components';
import { getNotifications, NotificationResponse } from '@/lib/server/home';
import { MainStackRouteType } from '@/navigation/main/MainStack';
import { ALL_COLORS, FontSizeColorStyle } from '@/styles';

const notifications = [
	{
		id: '1',
		title: 'Payment Received',
		description: 'You have received a payment of $150 from John.',
		time: '2 mins ago',
		icon: 'money',
		avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SktbktFLN1uUanYdY525TsOy-Ujnzt4mPA&usqp=CAU',
	},
	{
		id: '2',
		title: 'Payment Received',
		description: 'You have received a payment of $50 from Anna.',
		time: '10 mins ago',
		icon: 'payment',
		avatar: 'https://images.news18.com/ibnlive/uploads/2023/11/upi-digital-payment-2023-11-9d189dd733be3203b69938dd62171e9f.png?impolicy=website&width=640&height=480',
	},
	{
		id: '3',
		title: 'Won Contest',
		description: 'You have won Arijit Vs Kumar Shanu Contest ',
		time: '30 mins ago',
		icon: 'star',
		avatar: 'https://salestechstar.com/wp-content/uploads/2021/06/STS_4-03-2021-11.jpg',
	},
];

// https://cdni.iconscout.com/illustration/premium/thumb/empty-notification-10929699-8779505.png?f=webp
const NotificationItem: React.FC<{ item: NotificationResponse; index: number }> = ({
	item,
	index,
}) => {
	return (
		<Animated.View
			style={styles.notificationWrapper}
			entering={FadeInDown.delay(index * 200)}
			exiting={FadeOut.delay(index * 100)}
		>
			<BlurView
				style={styles.notificationItem}
				intensity={30}
				tint="dark"
				experimentalBlurMethod={'dimezisBlurView'}
			>
				<Image
					source={{
						uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SktbktFLN1uUanYdY525TsOy-Ujnzt4mPA&usqp=CAU'",
					}}
					style={styles.avatar}
				/>
				<View style={styles.detailsContainer}>
					<Text style={FontSizeColorStyle['montserrat-600-16-white']}>{item.title}</Text>
					<Text style={FontSizeColorStyle['montserrat-600-sm-grey-bfbfbf']}>
						{item?.subtitle}
					</Text>
					<Text style={FontSizeColorStyle['montserrat-600-xxs-grey-8e8e8e']}>
						{item?.data}
					</Text>
				</View>
				<View style={styles.iconContainer}>
					<Icon name={'payment'} size={30} color={ALL_COLORS['primary-text']} />
				</View>
			</BlurView>
		</Animated.View>
	);
};

const NotificationList: React.FC<MainStackRouteType<'Transaction'>> = ({ navigation }) => {
	const [demo, setDemo] = useState();

	const { data, isLoading, isFetching, refetch } = useQuery({
		queryFn: getNotifications,
		queryKey: ['getNotifications'],
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
						Demo Notification
					</Text>
					<Switch
						trackColor={{ false: '#767577', true: 'rgba(201, 201, 201, 0.1)' }}
						thumbColor={demo ? ALL_COLORS['primary-text'] : ALL_COLORS.primary}
						ios_backgroundColor="#3e3e3e"
						onValueChange={() => setDemo((prev) => (prev ? undefined : notifications))}
						value={!!demo}
					/>
				</View>
			) : null}
			<FlatList
				data={data}
				keyExtractor={(item) => item._id}
				renderItem={({ item, index }) => <NotificationItem item={item} index={index} />}
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
					// experimentalBlurMethod={'dimezisBlurView'}
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
								Your notification history appears to be empty. Please check your
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
								// onPress={refetch}
							/>
						</LinearGradient>
					</Animated.View>
				</BlurView>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	avatar: {
		borderRadius: 25,
		height: 50,
		marginRight: 15,
		width: 50,
	},
	container: {
		// backgroundColor: '#f5f5f5',
		flex: 1,
		padding: 20,
	},
	description: {
		color: '#fff',
		fontSize: 14,
		marginVertical: 5,
	},
	detailsContainer: {
		flex: 1,
	},
	iconContainer: {
		marginLeft: 15,
	},
	notificationItem: {
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderRadius: 10,
		flexDirection: 'row',
		padding: 15,
	},
	notificationWrapper: {
		borderRadius: 10,
		marginBottom: 15,
		overflow: 'hidden',
	},
	time: {
		color: '#fff',
		fontSize: 12,
	},
	title: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default NotificationList;

// 0x3b862b74d5483cb94fbedcd0e7cb9df37f8f5fb098f7d6610e7a80ad4b1c6cfe

// 0x96ccef2367a81771cc62617ac6fed9b0d21cea96048d66fb668f2c38ecdcec65
