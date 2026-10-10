import { Text, View } from 'react-native';

import { TernaryButton } from '../Base';

import { dataStyles } from './styles';

import { FontSizeColorStyle } from '@/styles';

type DataContainerProps = {
	volunteer?: boolean;
};

const VOLUNTEER_STATS = {
	volunteers: 500,
	programmes: 15,
	states: 5,
} as const;

const DONOR_STATS = {
	funds: '$ 123K',
	smiles: 5421,
} as const;

const DataContainer = ({ volunteer }: DataContainerProps) => (
	<TernaryButton fullWidth style={dataStyles.whiteContainer}>
		{volunteer ? (
			<>
				<View style={dataStyles.dataContainer}>
					<Text style={FontSizeColorStyle['montserrat-500-md-grey-a7a7a7']}>
						Volunteers
					</Text>
					<Text style={FontSizeColorStyle['montserrat-500-xl-primary']}>
						{VOLUNTEER_STATS.volunteers}
					</Text>
				</View>
				<View style={dataStyles.verticleLine} />
				<View style={dataStyles.dataContainer}>
					<Text style={FontSizeColorStyle['montserrat-500-md-grey-a7a7a7']}>
						Programmes
					</Text>
					<Text style={FontSizeColorStyle['montserrat-500-xl-primary']}>
						{VOLUNTEER_STATS.programmes}
					</Text>
				</View>
				<View style={dataStyles.verticleLine} />
				<View style={dataStyles.dataContainer}>
					<Text style={FontSizeColorStyle['montserrat-500-md-grey-a7a7a7']}>States</Text>
					<Text style={FontSizeColorStyle['montserrat-500-xl-primary']}>
						{VOLUNTEER_STATS.states}
					</Text>
				</View>
			</>
		) : (
			<>
				<View style={dataStyles.dataContainer}>
					<Text style={FontSizeColorStyle['montserrat-500-md-grey-a7a7a7']}>
						Funds Raised
					</Text>
					<Text style={FontSizeColorStyle['montserrat-500-xl-primary']}>
						{DONOR_STATS.funds}
					</Text>
				</View>
				<View style={dataStyles.verticleLine} />
				<View style={dataStyles.dataContainer}>
					<Text style={FontSizeColorStyle['montserrat-500-md-grey-a7a7a7']}>
						Smiles Spread
					</Text>
					<Text style={FontSizeColorStyle['montserrat-500-xl-primary']}>
						{DONOR_STATS.smiles}
					</Text>
				</View>
			</>
		)}
	</TernaryButton>
);

export default DataContainer;
