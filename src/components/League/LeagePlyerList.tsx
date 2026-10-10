/* eslint-disable no-warning-comments */
/* eslint-disable no-inline-styles/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { AntDesign, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';

import { IMAGES } from '@/assets';
import { ArtistType } from '@/lib/server/challange';
import { SEARCH_TITLE, SearchPlayerParam } from '@/navigation/types';
import { FontSizeColorStyle, responsive } from '@/styles';

export const SEARCH_COUNT: Record<SearchPlayerParam, number> = {
	headliners: 3,
	testStars: 5,
	risingStars: 3,
} as const;

export type Image = {
	height?: number;
	url?: string;
	width?: number;
};

export type LeagePlyerListProps = {
	type: SearchPlayerParam;
	header?: string;
	onEdit: (type: SearchPlayerParam) => void;
	onAction: (type: SearchPlayerParam, artist: ArtistType, action?: 'add' | 'remove') => void;
	singers?: ArtistType[];
};

export const Singer: React.FC<
	ArtistType & {
		type?: SearchPlayerParam;
		onAction?: (type: SearchPlayerParam, artist: ArtistType, action?: 'add' | 'remove') => void;
	}
> = ({ images, type, onAction, artistId, _id, ...props }) => (
	<RectButton
		style={{
			gap: responsive(3),
			marginBottom: responsive(10),
			alignItems: 'center',
			justifyContent: 'center',
		}}
		onPress={() => onAction && onAction(type, { ...props, _id, artistId }, 'add')}
	>
		<View
			style={{
				// width: 91,
				maxWidth: responsive(94),
				height: responsive(91),
				borderRadius: responsive(50),
				flexGrow: 1,
			}}
		>
			<FastImage
				source={
					props?.icon || images?.[0]?.url
						? { uri: props?.icon || images?.[0]?.url }
						: IMAGES.emptyUser
				}
				style={{
					height: responsive(91),
					borderRadius: responsive(50),
					width: responsive(91),
					flexGrow: 1,
				}}
				resizeMode="cover"
			/>
			{onAction && type ? (
				<RectButton
					style={{
						position: 'absolute',
						right: responsive(-5),
						top: responsive(5),
						height: responsive(24),
						width: responsive(24),
						borderRadius: responsive(12),
					}}
					underlayColor="#000000"
					rippleColor="#000000"
					onPress={() =>
						onAction(type, { ...props, _id, artistId }, _id ? 'remove' : 'add')
					}
				>
					<AntDesign
						name={_id || artistId || images?.[0]?.url ? 'minuscircle' : 'pluscircle'}
						size={20}
						color={_id || artistId || images?.[0]?.url ? 'red' : '#85E9FF'}
					/>
				</RectButton>
			) : null}
		</View>
		{props?.name ? (
			<Text
				style={FontSizeColorStyle['montserrat-600-xxs-white']}
				numberOfLines={1}
				adjustsFontSizeToFit
			>
				{`${props?.name ?? ''}`}
			</Text>
		) : null}

		<Text
			style={FontSizeColorStyle['montserrat-500-xxs-light-cbcbcb']}
			numberOfLines={1}
			adjustsFontSizeToFit
		>
			{`Credit: `}
			<Text
				style={FontSizeColorStyle['montserrat-600-xxs-white']}
				numberOfLines={1}
				adjustsFontSizeToFit
			>
				{` ${Number(props?.popularity || 0) % 10 ?? 'XX'}`}
			</Text>
		</Text>
	</RectButton>
);

const LeagePlyerList: React.FC<LeagePlyerListProps> = ({
	singers = [],
	type = 'headliners',
	onEdit,
	onAction,
}) => {
	const len = singers?.length || 0;

	const totalLen = SEARCH_COUNT[type];

	const remain = totalLen - len;

	const data = len < totalLen ? [...singers, ...new Array<ArtistType>(remain).fill({})] : singers;

	return (
		<View
			style={{
				borderRadius: responsive(30),
				borderTopWidth: responsive(0.75),
				borderLeftWidth: responsive(1),
				borderColor: '#0A7593',
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: -responsive(30),
				},
				shadowOpacity: 0.5,
				shadowRadius: responsive(50),
				elevation: responsive(25),
				marginTop: responsive(-45),
				backgroundColor: '#000000',
			}}
		>
			<LinearGradient
				colors={['rgba(225, 225, 225, 0.10)', 'rgba(34, 34, 34, 0.20)', 'black']}
				style={{
					borderRadius: responsive(30),
					display: 'flex',
					paddingTop: responsive(24),
					paddingBottom: responsive(80),
					gap: responsive(15),
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
				}}
			>
				<View
					style={{
						gap: responsive(15),
						width: '100%',

						maxWidth: responsive(315),
					}}
				>
					<View
						style={{
							width: '100%',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Text style={FontSizeColorStyle['montserrat-600-12-primary-text']}>
							{SEARCH_TITLE[type]}
						</Text>

						<RectButton
							style={{
								flexDirection: 'row',
								gap: responsive(5),
								alignItems: 'center',
							}}
							onPress={() => onEdit(type)}
						>
							<Text style={FontSizeColorStyle['montserrat-600-sm-white']}>
								Edit Profile
							</Text>
							<RectButton onPress={() => onEdit(type)}>
								<Entypo name="pencil" size={12} color="#85E9FF" />
							</RectButton>
						</RectButton>
					</View>
					<FlatList
						style={{
							paddingTop: responsive(10),
							width: '100%',
						}}
						numColumns={3}
						columnWrapperStyle={{ gap: responsive(10), paddingRight: responsive(40) }}
						contentContainerStyle={{
							gap: responsive(38),
							display: 'flex',

							paddingTop: responsive(15),
							paddingRight: responsive(40),
							width: '100%',
						}}
						data={data}
						renderItem={({ item }) => (
							<Singer onAction={onAction} type={type} {...item} />
						)}
					/>
				</View>
			</LinearGradient>
		</View>
	);
};

export default LeagePlyerList;

const styles = StyleSheet.create({});
