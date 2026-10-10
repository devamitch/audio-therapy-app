import { StyleProp, ViewStyle } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
//
import Svg, { Defs, LinearGradient, Path, Stop, SvgProps, Text } from 'react-native-svg';

import { responsive } from '@/styles';

export interface GradientStrokeTextProps {
	text: string;
	height?: number;
	width?: number;
	gradientColors?: [string, string];
	borderColors?: [string, string];
	locations?: { x: number; y: number };
	start?: { x: number; y: number };
	end?: { x: number; y: number };
	isGradientFill?: boolean;
	fillColor?: string;
	isGradientStroke?: boolean;
	strokeColor?: string;
	strokeWidth?: number;
	fontSize?: number;
	fontFamily?: string;
	fontWeight?: string | number;
	style?: StyleProp<ViewStyle>;
}

export const GradientText = ({
	text = '',
	height = 100,
	width = 300,
	gradientColors = ['#810955', '#533483'],
	borderColors = ['#b429f9', '#26c5f3'],
	locations = { x: 150, y: 80 },
	start = { x: 0, y: 0 },
	end = { x: 1, y: 1 },
	isGradientFill = false,
	fillColor = '#FFFFFF',
	isGradientStroke = false,
	strokeColor = '#000000',
	strokeWidth = 0,
	fontSize = 18,
	fontFamily = 'Moonwalk',
	fontWeight = 900,
	style = {},
}: GradientStrokeTextProps) => {
	return (
		<Svg height={height} width={width} style={style}>
			<Defs>
				<LinearGradient id="Gradient" x1={start.x} y1={start.y} x2={end.x} y2={end.y}>
					<Stop stopColor={borderColors[0]} offset="0" stopOpacity="1" />
					<Stop stopColor={borderColors[1]} offset="1" stopOpacity="1" />
				</LinearGradient>
				<LinearGradient id="GradientFill" x1={start.x} y1={start.y} x2={end.x} y2={end.y}>
					<Stop stopColor={gradientColors[0]} offset="0" stopOpacity="1" />
					<Stop stopColor={gradientColors[1]} offset="1" stopOpacity="1" />
				</LinearGradient>
			</Defs>
			<Text
				fill={isGradientFill ? 'url(#GradientFill)' : fillColor}
				stroke={isGradientStroke ? 'url(#Gradient)' : strokeColor}
				strokeWidth={strokeWidth}
				fontSize={fontSize}
				fontWeight={fontWeight}
				fontFamily={'DigifaceWide'}
				x={locations.x}
				y={locations.y}
				textAnchor="middle"
			>
				{text}
			</Text>
		</Svg>
	);
};

export const PrimaryGradientText = ({
	children,
	text,
	...props
}: Partial<GradientStrokeTextProps> & {
	start?: number[];
	end?: number[];
	children?: string;
	text?: string;
}) => {
	return (
		<GradientText
			text={children || text || 'test'}
			fontFamily="Lato-Black"
			fontSize={24}
			width={154}
			locations={{ x: 75, y: 60 }}
			isGradientFill
			gradientColors={['#00BCFD', 'rgba(0,188,253,0.4)']}
			{...props}
		/>
	);
};

export default PrimaryGradientText;


export const MuxicXText2 = () => (
	<GradientText
		text={'test'}
		fontFamily="DigifaceWide"
		fontSize={24}
		width={154}
		locations={{ x: 40, y: 83 }}
		isGradientFill
		gradientColors={['#0A7593', 'white']}
	/>
);
export const MuxicXText = ({ width = 154, height = 24, ...props }: SvgProps) => (
	<Svg
		width={responsive(typeof width === 'string' ? Number(width) : width)}
		height={responsive(typeof height === 'string' ? Number(height) : height)}
		viewBox="0 0 81 20"
		fill="none"
		{...props}
	>
		<Path
			d="M20.348 1.516V19h-3.576V8.944c0-.232.004-.484.012-.756.016-.272.04-.548.072-.828l-4.644 8.988c-.144.28-.34.492-.588.636-.24.144-.516.216-.828.216h-.552c-.312 0-.592-.072-.84-.216a1.54 1.54 0 01-.576-.636L4.184 7.336c.024.288.044.572.06.852.016.272.024.524.024.756V19H.692V1.516h3.096c.176 0 .328.004.456.012.136.008.256.032.36.072a.72.72 0 01.276.192c.088.08.172.196.252.348l4.5 8.868c.16.304.312.62.456.948.152.328.296.664.432 1.008.136-.352.276-.696.42-1.032.152-.336.312-.656.48-.96l4.488-8.832c.08-.152.16-.268.24-.348a.827.827 0 01.288-.192c.104-.04.22-.064.348-.072.136-.008.292-.012.468-.012h3.096zm13.877 5.04V19H31.92c-.464 0-.768-.208-.912-.624l-.216-.72c-.24.232-.488.444-.744.636a4.969 4.969 0 01-.828.48 4.699 4.699 0 01-.948.3c-.336.08-.704.12-1.104.12-.68 0-1.284-.116-1.812-.348-.52-.24-.96-.572-1.32-.996a4.318 4.318 0 01-.816-1.5 6.204 6.204 0 01-.276-1.896V6.556h3.72v7.896c0 .616.14 1.092.42 1.428.28.336.692.504 1.236.504.408 0 .788-.084 1.14-.252a4.72 4.72 0 001.044-.708V6.556h3.72zM44.66 9.28a.936.936 0 01-.312.324.77.77 0 01-.408.096c-.176 0-.352-.036-.528-.108-.176-.08-.368-.164-.576-.252a5.2 5.2 0 00-.684-.24 2.936 2.936 0 00-.876-.12c-.472 0-.836.092-1.092.276a.86.86 0 00-.372.744c0 .232.08.424.24.576.168.152.388.288.66.408.272.112.58.22.924.324.344.104.696.22 1.056.348.36.128.712.28 1.056.456.344.168.652.38.924.636a2.7 2.7 0 01.648.912c.168.36.252.792.252 1.296 0 .616-.112 1.184-.336 1.704-.224.52-.56.968-1.008 1.344-.44.376-.988.668-1.644.876-.648.208-1.396.312-2.244.312-.424 0-.848-.04-1.272-.12a9.043 9.043 0 01-1.236-.324 7.144 7.144 0 01-1.092-.48 4.981 4.981 0 01-.864-.612l.864-1.368c.096-.16.216-.284.36-.372a1.06 1.06 0 01.576-.144c.216 0 .408.048.576.144.176.096.364.2.564.312.2.112.432.216.696.312.272.096.612.144 1.02.144.288 0 .532-.028.732-.084.2-.064.36-.148.48-.252a.982.982 0 00.264-.348.978.978 0 00.084-.396.808.808 0 00-.252-.612 2.111 2.111 0 00-.66-.408 6.686 6.686 0 00-.936-.324c-.344-.104-.696-.22-1.056-.348a9.515 9.515 0 01-1.068-.456 3.9 3.9 0 01-.924-.684 3.252 3.252 0 01-.66-1.02c-.168-.4-.252-.884-.252-1.452 0-.528.1-1.028.3-1.5.208-.48.516-.9.924-1.26.408-.36.92-.644 1.536-.852.616-.216 1.336-.324 2.16-.324.448 0 .88.04 1.296.12.424.08.82.192 1.188.336.368.144.704.316 1.008.516.304.192.572.404.804.636l-.84 1.308zm6.584-2.724V19h-3.72V6.556h3.72zm.384-3.408c0 .296-.06.576-.18.84-.12.256-.284.484-.492.684a2.548 2.548 0 01-.732.468 2.278 2.278 0 01-.876.168c-.304 0-.588-.056-.852-.168-.264-.12-.5-.276-.708-.468-.2-.2-.36-.428-.48-.684a2.128 2.128 0 01-.168-.84c0-.304.056-.588.168-.852.12-.264.28-.496.48-.696.208-.2.444-.356.708-.468.264-.112.548-.168.852-.168.312 0 .604.056.876.168a2.249 2.249 0 011.224 1.164c.12.264.18.548.18.852zm11.354 6.36c-.112.136-.22.244-.324.324-.104.08-.252.12-.444.12a.988.988 0 01-.504-.132 16.878 16.878 0 00-.492-.288 3.493 3.493 0 00-.648-.3c-.248-.088-.556-.132-.924-.132-.456 0-.852.084-1.188.252-.328.168-.6.408-.816.72-.216.312-.376.696-.48 1.152a6.765 6.765 0 00-.156 1.524c0 1.192.228 2.108.684 2.748.464.64 1.1.96 1.908.96.432 0 .772-.052 1.02-.156.256-.112.472-.232.648-.36l.48-.372a.925.925 0 01.564-.168c.296 0 .52.108.672.324l1.08 1.332c-.384.44-.788.8-1.212 1.08-.424.272-.86.488-1.308.648-.44.152-.884.256-1.332.312a9.246 9.246 0 01-1.308.096c-.76 0-1.488-.144-2.184-.432a5.454 5.454 0 01-1.824-1.248c-.52-.552-.936-1.228-1.248-2.028-.304-.8-.456-1.712-.456-2.736 0-.896.132-1.732.396-2.508a5.756 5.756 0 011.188-2.028 5.559 5.559 0 011.944-1.356c.776-.328 1.672-.492 2.688-.492.976 0 1.832.156 2.568.468.736.312 1.4.768 1.992 1.368l-.984 1.308zM80.942 19h-4.056c-.264 0-.48-.064-.648-.192a1.498 1.498 0 01-.384-.456l-3.504-6.12a2.424 2.424 0 01-.216.456l-3.264 5.664c-.112.16-.244.308-.396.444a.849.849 0 01-.588.204h-3.792l5.628-9-5.412-8.484h4.056c.264 0 .456.036.576.108.128.064.24.176.336.336l3.48 5.892c.04-.104.084-.204.132-.3.056-.096.116-.196.18-.3l3.048-5.232c.112-.176.228-.304.348-.384a.866.866 0 01.468-.12h3.888l-5.484 8.316L80.942 19z"
			fill="url(#paint0_linear_1_156)"
		/>
		<Defs>
			<LinearGradient
				id="paint0_linear_1_156"
				x1={21.3548}
				y1={-11.6042}
				x2={95.743}
				y2={56.182}
				gradientUnits="userSpaceOnUse"
			>
				<Stop stopColor="#0A7593" />
				<Stop offset={1} stopColor="#fff" />
			</LinearGradient>
		</Defs>
	</Svg>
);
