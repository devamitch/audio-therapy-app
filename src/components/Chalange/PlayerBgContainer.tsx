import { useCallback, useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { BlurView } from 'expo-blur';

import { useAppStore } from '@/core/store';
import { addChallangeVote } from '@/lib/server/challange';
import { handleError, toast, windowHeight } from '@/lib/utils';
import { NewzStackNavigationType } from '@/navigation/types';
import { FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const IMAGE_HEIGHT = windowHeight * 0.4;

const backgroundColor = 'rgba(0, 0, 0, 0.4)';

type PlayerBgContainerProps = {
	image?: string;
	isFlipped?: boolean;
	name?: string;
	onLike?: RectButtonProps['onPress'];
	flexDirection?: 'row' | 'row-reverse';
	artist?: string;
	challange?: string;
	vote?: string | number;
};

const PlayerBgContainer: React.FC<PlayerBgContainerProps> = ({
	image: uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQIIEj1Fk0L3FVhHPIyyTpI5XMBP9gaf8Y6A&usqp=CAU',
	isFlipped,
	name = 'Player 1',
	onLike,
	flexDirection = !isFlipped ? 'row' : 'row-reverse',
	artist = '',
	challange = '',
	vote,
}) => {
	const navigation = useNavigation<NewzStackNavigationType>();

	const user = useAppStore((state) => state?.user);

	const [loading, setLoading] = useState(false);

	const handleVote = useCallback(async () => {
		try {
			setLoading(true);
			const { message } = await addChallangeVote({
				by: user?._id || user?.id,
				artist,
				challange,
			});

			setLoading(false);
			toast.success(message || 'Sucessfully voted');
		} catch (e) {
			setLoading(false);

			handleError(e);
		}
	}, [artist, challange, user?._id, user?.id]);

	return (
		<ImageBackground
			source={{
				uri,
			}}
			resizeMode="cover"
			style={styles.bgImage}
		>
			<RectButton style={styles.overlay} onPress={() => navigation.navigate('Player')}>
				<BlurView
					style={[
						LayoutStyle.fullWidth,
						LayoutStyle.row,
						LayoutStyle.center,
						LayoutStyle.between,
						styles.likeContainer,
						{ flexDirection },
					]}
					experimentalBlurMethod={'dimezisBlurView'}
				>
					<Text style={FontSizeColorStyle['montserrat-600-15-white']}>{name}</Text>

					<View style={[LayoutStyle.row, LayoutStyle.center, { gap: 2 }]}>
						<Text style={FontSizeColorStyle['montserrat-600-12-white']}>
							{vote || 0}
						</Text>
						{loading ? (
							<ActivityIndicator color="white" />
						) : (
							<RectButton style={styles.like} onPress={onLike || handleVote}>
								<Ionicons
									name={vote ? 'heart' : 'heart-outline'}
									size={24}
									color="white"
								/>
							</RectButton>
						)}
					</View>
				</BlurView>
			</RectButton>
		</ImageBackground>
	);
};

export default PlayerBgContainer;

const styles = StyleSheet.create({
	bgImage: { flex: 1, height: IMAGE_HEIGHT },
	like: {
		borderRadius: responsive(100),
		padding: responsive(4),
	},
	likeContainer: {
		backgroundColor,
		borderRadius: responsive(4),
		overflow: 'hidden',
		paddingLeft: responsive(8),
		paddingVertical: responsive(2),
	},
	overlay: {
		alignItems: 'flex-end',
		backgroundColor,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: responsive(20),
		paddingBottom: responsive(100),
	},
});
