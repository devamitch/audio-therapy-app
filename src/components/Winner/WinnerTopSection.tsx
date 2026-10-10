import { StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import { IMAGES } from '@/assets';
import { FontSizeColorStyle, responsive } from '@/styles';

type User = Partial<{ image: string; name: string; amount: string; points: string; date: string }>;

const Winner: React.FC<{ user: User; position: 1 | 2 | 3 }> = ({ user, position }) => (
	<Animated.View
		style={{
			position: 'absolute',
			top:
				position === 1 ? responsive(50) : position === 3 ? responsive(100) : responsive(80),
			left:
				position === 1
					? responsive(150)
					: position === 3
						? responsive(240)
						: responsive(70),
			gap: responsive(6),
			alignItems: 'center',
			transform: [{ scale: position === 1 ? 1 : position === 3 ? 0.55 : 0.7 }],
		}}
	>
		<Animated.Text
			style={[
				FontSizeColorStyle['montserrat-800-48-primary-text'],
				{ fontSize: responsive(38) },
			]}
		>
			{position}
		</Animated.Text>
		<Animated.Image source={{ uri: user?.image }} style={styles.avatar} />
		<Animated.Text style={FontSizeColorStyle['montserrat-600-14-primary']}>
			{user?.name?.split(' ')?.[0]}
		</Animated.Text>
		<Animated.Text style={FontSizeColorStyle['montserrat-500-sm-white']}>
			{user?.points} Pts
		</Animated.Text>
	</Animated.View>
);

const WinnerTopSection: React.FC<{
	topUsers: Partial<
		Record<
			'first' | 'second' | 'third',
			Partial<{ image: string; name: string; amount: string; points: string; date: string }>
		>
	>;
}> = ({ topUsers }) => (
	<Animated.View
		style={styles.imageContainer}
		entering={FadeInDown.delay(400)}
		exiting={FadeOutDown.delay(200)}
	>
		<Animated.Image source={IMAGES.winnerBoard} style={styles.image} />
		<Winner user={topUsers?.first} position={1} />
		<Winner user={topUsers?.second} position={2} />
		<Winner user={topUsers?.third} position={3} />
	</Animated.View>
);

export default WinnerTopSection;

const styles = StyleSheet.create({
	avatar: {
		borderRadius: 100,
		height: responsive(43),
		width: responsive(43),
	},
	image: {
		height: responsive(255),
		width: responsive(313),
	},
	imageContainer: { alignItems: 'center', paddingVertical: responsive(10), width: '100%' },
});
