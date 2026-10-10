import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BaseButtonProps } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import { formatVotes } from '@/lib/utils';
import { FontSizeColorStyle, responsive } from '@/styles';

const ContestPlayer = ({
	image,
	name,
	votes = 0,
	win,
	right,
	onPress,
	flag,
}: {
	image: string;
	name: string;
	votes: number;
	win?: boolean;
	right?: boolean;
	flag?: string;
	onPress: BaseButtonProps['onPress'];
}) => (
	<View
		style={styles.playerContainer}
		// onPress={onPress}
	>
		<View
			style={{
				position: 'relative',
				marginTop: responsive(5),
				marginRight: responsive(right ? 5 : 0),
				marginLeft: responsive(right ? 0 : 5),
			}}
		>
			<FastImage
				source={{
					uri:
						image ||
						'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
				}}
				style={styles.avatar}
			/>
			{votes ? (
				<LinearGradient
					colors={['#00252F', '#125B6F']}
					style={{
						height: responsive(20),
						minWidth: responsive(20),
						borderRadius: responsive(100),
						alignItems: 'center',
						justifyContent: 'center',
						position: 'absolute',
						left: right ? undefined : responsive(-5),
						right: right ? responsive(-5) : undefined,
						top: responsive(-5),
						padding: responsive(3),
					}}
					start={[0, 0.5]}
					end={[0.5, 1]}
				>
					<Text
						style={[
							FontSizeColorStyle['montserrat-600-xxs-white'],
							{ fontSize: responsive(6) },
						]}
					>
						{formatVotes(votes)}
					</Text>
				</LinearGradient>
			) : null}
		</View>

		<View style={{ gap: responsive(2) }}>
			<View style={{ gap: responsive(2), flexDirection: 'row', alignItems: 'center' }}>
				{flag ? (
					<FastImage
						source={{
							uri: flag,
						}}
						style={{ height: responsive(8), width: responsive(12) }}
					/>
				) : null}
				<Text
					style={[
						FontSizeColorStyle['montserrat-600-xxs-white'],
						{ fontSize: responsive(7) },
					]}
					numberOfLines={1}
					adjustsFontSizeToFit
				>
					{name ? name?.split(' ')?.[0] : 'name'}
				</Text>
			</View>
			{votes ? (
				<Text
					style={[
						FontSizeColorStyle['montserrat-600-xxs-primary-text'],
						{ fontSize: responsive(7) },
					]}
					numberOfLines={1}
				>
					{formatVotes(votes)}
					{' Vote'}
				</Text>
			) : null}
		</View>
	</View>
);

export default ContestPlayer;

const styles = StyleSheet.create({
	playerContainer: { alignItems: 'center', gap: responsive(4), width: responsive(55) },
	avatar: {
		height: responsive(49),
		width: responsive(49),
		borderRadius: responsive(22),
	},
	ml20: {
		marginLeft: -responsive(20),
	},
} as const);
