import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/core';

import { GestureButton } from './DashboardStatusWrapper';

import { FontSizeColorStyle, responsive } from '@/styles';

const Avatar: React.FC<{ image?: string; first?: boolean }> = ({ image, first }) => (
	<FastImage
		style={styles[first ? 'firstAvatar' : 'avatar']}
		source={{
			uri: image,
			priority: FastImage.priority.normal,
			cache: FastImage.cacheControl.web,
		}}
		resizeMode="cover"
	/>
);

export const AvatarGroup: React.FC<{ images?: string[] }> = ({ images }) => (
	<View style={styles.avatarGroup}>
		<View style={styles.avatarGroupContent}>
			{images?.map((image, index) => (
				<Avatar image={image} first={index === 0} key={index} />
			))}
		</View>
	</View>
);

const DashboardSingersCards: React.FC<{ images?: string[]; count?: number }> = ({
	images,
	count = 0,
}) => {
	const navigation = useNavigation();

	return (
		<GestureButton
			gradientStyle={styles.gradientStyle}
			btnStyle={{ flex: 1 }}
			onPress={() => navigation?.navigate('SingersScreen')}
		>
			<View style={styles.content}>
				<Text style={FontSizeColorStyle['montserrat-600-xxs-white']}>SINGERS</Text>
				<Text style={FontSizeColorStyle['montserrat-500-xxl-white']}>{count}</Text>
			</View>
			<AvatarGroup images={images} />
		</GestureButton>
	);
};

export default DashboardSingersCards;

const styles = StyleSheet.create({
	avatar: {
		borderRadius: responsive(20),
		height: responsive(33),
		marginLeft: responsive(-10),
		width: responsive(33),
		borderWidth: responsive(2),
		borderColor: '#fff',
	},
	avatarGroup: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: responsive(10),
		justifyContent: 'space-between',
		// marginTop: responsive(20),
		// width: '100%',
	},
	avatarGroupContent: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
	firstAvatar: {
		borderRadius: responsive(20),
		height: responsive(33),
		width: responsive(33),
		borderWidth: responsive(2),
		borderColor: '#fff',
	},
	gradientStyle: {
		flex: 1,
		gap: responsive(10),
		paddingVertical: responsive(24),
		paddingHorizontal: responsive(17),
		borderRadius: responsive(23),
		// width: responsive(169),
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
} as const);
