import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

import { SEARCH_TITLE, SearchPlayerParam } from '@/navigation/types';
import { FontSizeColorStyle, responsive } from '@/styles';

export type PlayerListContainerProps = {
	type?: SearchPlayerParam;

	header?: string;
	onSeeAll?: (type?: SearchPlayerParam) => void;
	children?: React.ReactNode | React.ReactNode[];
	hideHeader?: boolean;
};

const PlayerListContainer: React.FC<PlayerListContainerProps> = ({
	children,
	onSeeAll,
	type,
	header = type ? SEARCH_TITLE[type] : SEARCH_TITLE.headliners,
	hideHeader,
}) => (
	<View style={styles.container}>
		{hideHeader ? null : (
			<View style={styles.header}>
				<Text style={FontSizeColorStyle['montserrat-500-13-primary-text']}>{header}</Text>
				<RectButton onPress={() => onSeeAll && onSeeAll(type)}>
					<Text style={FontSizeColorStyle['montserrat-500-xxs-primary-text']}>
						See All
					</Text>
				</RectButton>
			</View>
		)}
		<ScrollView
			horizontal
			contentContainerStyle={styles.scrollView}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
		>
			{children}
		</ScrollView>
		<ExpoLinearGradient
			colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.8)']}
			style={styles.gradient}
			start={[0, 1]}
			end={[1, 1]}
			//@ts-ignore
			location={[0, 1]}
		/>
	</View>
);

export default PlayerListContainer;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingVertical: responsive(5),
		gap: responsive(24),
	},
	header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between' },
	scrollView: {
		gap: responsive(8),
	},
	gradient: {
		position: 'absolute',
		bottom: responsive(25),
		height: responsive(140),
		width: responsive(50),
		right: responsive(0),
	},
} as const);
