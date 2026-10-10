import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	FadeInLeft,
	SharedTransition,
	SlideInUp,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';
import { BlurView } from 'expo-blur';
import { Skeleton } from 'moti/skeleton';

import { ArtistsResponse } from '@/lib/server/artists';
import { ProfileStackNavigationType } from '@/navigation/types';
import { FontSizeColorStyle, responsive } from '@/styles';

export const customTransition = SharedTransition.custom((values) => {
	('worklet');

	return {
		height: withTiming(values.targetHeight),
		width: withTiming(values.targetWidth),
		originX: withTiming(values.targetOriginX),
		originY: withTiming(values.targetOriginY),
	};
});

const AnimatedButton = Animated.createAnimatedComponent(RectButton);

export const AnimatedRandomPlayer: React.FC<{
	_id: string;
	name?: string;
	icon?: string;
	index: number;
	onPress?: RectButtonProps['onPress'];
}> = (item) => {
	const isPressed = useSharedValue(false);

	const animatedStyle = useAnimatedStyle(() => {
		const scale = withSpring(isPressed.value ? 0.9 : 1, { stiffness: 100 });

		const opacity = withTiming(isPressed.value ? 0.8 : 1, {
			duration: 150,
			easing: Easing.linear,
		});

		return {
			transform: [{ scale }],
			opacity,
			padding: 10,
			gap: 8,
			// backgroundColor: 'white',
		};
	});

	return (
		<AnimatedButton
			style={[styles.button, animatedStyle]}
			onPress={item?.onPress}
			entering={FadeInLeft.delay(item.index * 200)}
			onBegan={() => {
				isPressed.value = true;
			}}
			onActivated={() => {
				isPressed.value = true;
			}}
			onFailed={() => {
				isPressed.value = false;
			}}
			onCancelled={() => {
				isPressed.value = false;
			}}
			onEnded={() => {
				isPressed.value = false;
			}}
			onLongPress={() => {
				isPressed.value = false;
			}}
		>
			<BlurView style={styles.image} tint="dark" intensity={100}>
				<Animated.Image
					style={{ height: '100%', width: '100%' }}
					source={{ uri: item?.icon }}
					sharedTransitionTag={item?._id}
					resizeMode={'cover'}
				/>
			</BlurView>
			<Text style={FontSizeColorStyle['montserrat-500-12-white']}>
				{item?.name?.split(' ')?.[0]}
			</Text>
		</AnimatedButton>
	);
};

const DashboardTopPlayers: React.FC<{
	singerData?: ArtistsResponse[];
	refreshing?: boolean;
}> = ({ singerData }) => {
	const navigation = useNavigation<ProfileStackNavigationType>();

	// console.log({ singerData });

	return (
		<Animated.FlatList
			data={singerData}
			horizontal
			entering={SlideInUp.delay(200).duration(700)}
			overScrollMode="never"
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			style={styles.container}
			contentContainerStyle={{ paddingHorizontal: 20 }}
			renderItem={({ item, index }) => (
				<AnimatedRandomPlayer
					{...item}
					index={index}
					onPress={() =>
						navigation.navigate('Player', {
							id: item?._id,
							image:
								item?.icon ||
								'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
							name: item?.name || 'ASHGUARD MOMO',
						})
					}
				/>
			)}
			ListEmptyComponent={
				<View style={styles.footer}>
					<Skeleton
						colorMode="dark"
						width={responsive(80)}
						height={responsive(80)}
						radius={responsive(40)}
					/>
					<Skeleton
						colorMode="dark"
						width={responsive(80)}
						height={responsive(80)}
						radius={responsive(40)}
					/>
					<Skeleton
						colorMode="dark"
						width={responsive(80)}
						height={responsive(80)}
						radius={responsive(40)}
					/>
					<Skeleton
						colorMode="dark"
						width={responsive(80)}
						height={responsive(80)}
						radius={responsive(40)}
					/>
				</View>
			}
		/>
	);
};

export default DashboardTopPlayers;

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		// borderColor: '#000',
		borderRadius: responsive(10),
		// borderWidth: 1,
		gap: responsive(4),
		justifyContent: 'center',
		// overflow: 'hidden',

		// borderRadius: responsive(40),
	},
	container: {
		alignSelf: 'flex-start',
		flexGrow: 0,
		flex: 0,
		padding: responsive(20),
	},
	footer: { flexDirection: 'row', gap: responsive(18) },
	image: {
		borderRadius: responsive(50),
		height: responsive(90),
		overflow: 'hidden',
		width: responsive(90),
	},
});
