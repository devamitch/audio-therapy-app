import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop, SvgProps } from 'react-native-svg';

import ChalangePlayer, { ChalangePlayerType } from './ChalangePlayer';

import { responsive } from '@/styles';

export type ChalangePlayerWrapperType = {
	players?: ChalangePlayerType[];
	player1?: ChalangePlayerType;
	player2?: ChalangePlayerType;
	artist1Detail?: ChalangePlayerType;
	artist2Detail?: ChalangePlayerType;

	onPlay: (_id?: string) => Promise<void> | void;

	onBet: (_id?: string, chalangeId?: string) => void;
	chalangeId?: string;
	bidAmount?: number;
	shouldShowBet?: boolean;
	status?: 0 | 1 | 2 | 3;
};

function VsSvg({ width = 32, height = 15, ...props }: SvgProps) {
	return (
		<Svg
			width={responsive(typeof width === 'string' ? Number(width) : width)}
			height={responsive(typeof height === 'string' ? Number(height) : height)}
			viewBox="0 0 32 15"
			fill="none"
			{...props}
		>
			<Path
				d="M10.906 9.92V.059h4.395V15h-4.395L.36 8.944V.06h4.395v6.319l6.152 3.542zM31.121.059v4.394H20.574v.879h10.547V15H16.18v-4.395h10.547v-.878H16.18V.059H31.12z"
				fill="url(#paint0_linear_133_575)"
			/>
			<Defs>
				<LinearGradient
					id="paint0_linear_133_575"
					x1={responsive(-68)}
					y1={responsive(-2)}
					x2={responsive(-68)}
					y2={responsive(32.5556)}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#00BCFD" />
					<Stop offset={1} stopColor="#00BCFD" stopOpacity={0} />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}

const ChalangePlayerWrapper: React.FC<ChalangePlayerWrapperType> = ({
	players,
	artist1Detail,
	artist2Detail,
	player1 = artist1Detail || players?.[0],
	player2 = artist2Detail || players?.[1],
	bidAmount,
	onPlay,
	onBet,
	chalangeId,
	shouldShowBet,
}) => {
	return (
		<View style={styles.container}>
			<ChalangePlayer
				onPlay={async () => onPlay(player1?._id)}
				onBet={() => onBet(player1?._id, chalangeId)}
				{...player1}
				bet={bidAmount}
				shouldShowBet={shouldShowBet}
			/>
			<ChalangePlayer
				onBet={() => onBet(player2?._id, chalangeId)}
				onPlay={async () => onPlay(player2?._id)}
				bet={bidAmount}
				{...player2}
				right
				shouldShowBet={shouldShowBet}
			/>
			<View style={styles.textContainer}>
				<VsSvg />
			</View>
		</View>
	);
};

export default ChalangePlayerWrapper;

const styles = StyleSheet.create({
	container: { flexDirection: 'row', position: 'relative' },
	heading: { fontFamily: 'Moonwalk' },
	textContainer: {
		height: responsive(50),
		width: responsive(50),
		borderRadius: responsive(25),
		backgroundColor: '#000000',
		top: '49%',
		left: '45%',
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
	},
} as const);
