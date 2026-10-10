import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

import { ALL_COLORS, FontSizeColorStyle, responsive } from '@/styles';

type WinnerItemProps<T extends string> = Partial<
	Record<'image' | 'name' | 'amount' | 'date' | 'flag', T>
>;

const WinnerItem = <T extends string>({ image, name, amount, date, flag }: WinnerItemProps<T>) => (
	<Animated.View style={styles.border}>
		<BlurView style={styles.container} tint="dark" intensity={60}>
			<Animated.Image
				style={styles.image}
				source={{
					uri:
						image ??
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&s',
				}}
				resizeMode={'cover'}
			/>
			<Animated.View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
				{flag ? (
					<Animated.Image
						style={styles.image}
						source={{
							uri: flag,
						}}
						resizeMode={'cover'}
					/>
				) : null}
				<Animated.Text style={FontSizeColorStyle['montserrat-500-20-white']}>
					{name ?? 'Name'}
				</Animated.Text>
			</Animated.View>

			<Animated.View style={{ alignSelf: 'flex-end', marginLeft: 'auto' }}>
				<Animated.Text style={FontSizeColorStyle['montserrat-500-14-primary-text']}>
					{amount ?? ''}
				</Animated.Text>
				<Animated.Text style={FontSizeColorStyle['montserrat-300-xxs-white']}>
					{date ?? ''}
				</Animated.Text>
			</Animated.View>
		</BlurView>
	</Animated.View>
);

export default WinnerItem;

const styles = StyleSheet.create({
	border: {
		borderColor: ALL_COLORS['primary-006582'],
		borderLeftWidth: responsive(1),
		borderRadius: responsive(3),
		borderTopWidth: responsive(1),
		marginBottom: responsive(10),
		overflow: 'hidden',
		shadowColor: ALL_COLORS.black,
		shadowOffset: { width: responsive(1), height: responsive(1) },
		shadowOpacity: 0.25,
		shadowRadius: responsive(5),
	},
	container: {
		alignItems: 'center',

		borderRadius: responsive(3),
		flexDirection: 'row',
		gap: responsive(12),
		overflow: 'hidden',

		paddingHorizontal: responsive(12),
		paddingVertical: responsive(8),
		width: '100%',
	},
	image: {
		borderRadius: responsive(30),
		height: responsive(43),
		width: responsive(43),
	},
});
