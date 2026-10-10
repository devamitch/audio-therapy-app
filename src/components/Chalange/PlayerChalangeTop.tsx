import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import Svg, { Defs, LinearGradient, Path, Stop, SvgProps } from 'react-native-svg';

import { MuxicXText } from '../Base/experimental/GradienText';
import { GradientIcon } from '../Base/GradientText';
import { PlayerChalangeHeaderSvg } from '../PickPlayers/Svg';

import { FontSizeColorStyle, responsive } from '@/styles';

const TEXT = { headeing: 'Choose Winner', vs: 'test World Cup' } as const;

function SvgComponent({ width = 248, height = 20, ...props }: SvgProps) {
	return (
		<Svg
			width={responsive(typeof width === 'string' ? Number(width) : width)}
			height={responsive(typeof height === 'string' ? Number(height) : height)}
			viewBox="0 0 248 20"
			fill="none"
			{...props}
		>
			<Path
				d="M.984 5.938V.077h19.922v5.86H7.758l4.722 8.203h8.426V20H9.06L.984 5.937zm26.953 7.03V20h-5.859V.078h5.86V7.11h8.203V.08H42V20h-5.86v-7.031h-8.203zM43.172.079h19.922V20H43.172V.078zm5.86 5.86v8.203h8.202V5.937h-8.203zM64.265.077h19.921V20H64.267V.078zm5.859 5.86v8.203h8.203V5.937h-8.203zm35.156-5.86v5.86H91.219v1.171h14.062V20H85.359v-5.86h14.063V12.97H85.359V.079h19.922zm7.031 14.063h14.063V20h-19.922V.078h19.922v5.86h-14.063v1.171h14.063v5.86h-14.063v1.172zm35.25 0V.078h5.86V20H133.5V.078h5.859v14.063h1.172V.078h5.86v14.063h1.171zM160.453 20h-5.859V.078h5.859V20zm7.031-13.148V20h-5.859V.078h5.859l8.204 4.734V.079h5.859V20h-5.859v-8.414l-8.204-4.734zm21.094 0V20h-5.859V.078h5.859l8.203 4.734V.079h5.86V20h-5.86v-8.414l-8.203-4.734zm21.094 7.289h14.062V20h-19.922V.078h19.922v5.86h-14.062v1.171h14.062v5.86h-14.062v1.172zm21.094-8.204V7.11h8.203V5.938h-8.203zm0 5.86V20h-5.86V.078h19.922v12.89h-4.594L247.266 20h-8.297l-8.203-8.203z"
				fill="url(#paint0_linear_133_576)"
			/>
			<Defs>
				<LinearGradient
					id="paint0_linear_133_576"
					x1={responsive(83)}
					y1={responsive(-2)}
					x2={responsive(83)}
					y2={responsive(44.65)}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#00BCFD" />
					<Stop offset={1} stopColor="#00BCFD" stopOpacity={0} />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}

const PlayerChalangeTop = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<View>
				<View style={styles.headingContainer}>
					<MuxicXText width={responsive(100)} />
				</View>
			</View>

			<View style={styles.content}>
				<RectButton
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						gap: 5,
						justifyContent: 'center',
						marginBottom: 4,
					}}
					onPress={() => navigation.navigate('WorldCupPreview')}
				>
					<Text style={FontSizeColorStyle['lato-700-16-light-e0e0e0']}>{TEXT.vs}</Text>
					<BorderlessButton
						style={{
							flexDirection: 'row',
							gap: responsive(3),
							alignItems: 'center',
						}}
						onPress={() => navigation.navigate('WorldCupPreview')}
					>
						<GradientIcon>
							<Fontisto name="world" size={16} color="black" />
						</GradientIcon>
					</BorderlessButton>
				</RectButton>

				<SvgComponent />
			</View>
			<RectButton
				style={styles.svgContainer}
				onPress={() => navigation.navigate('WorldCupPreview')}
			>
				<PlayerChalangeHeaderSvg />
			</RectButton>
		</View>
	);
};

export default PlayerChalangeTop;

const styles = StyleSheet.create({
	text: {
		fontFamily: 'DigifaceWide',
		lineHeight: responsive(22),
	},
	heading: { fontFamily: 'Moonwalk', textAlign: 'right' },
	headingContainer: {
		padding: responsive(40),
		paddingTop: responsive(40),
		paddingBottom: responsive(10),
	},
	content: {
		width: '100%',
		alignItems: 'flex-end',
		paddingHorizontal: responsive(40),
		paddingVertical: responsive(0),
	},
	svgContainer: {
		width: '100%',
		height: responsive(27),
		marginTop: responsive(-27),
		marginBottom: responsive(35),
	},
	container: {
		width: '100%',
		height: responsive(152),
	},
} as const);
