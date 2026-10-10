import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop, SvgProps } from 'react-native-svg';

import { PlayersHeaderSvgComponent } from './Svg';

import { ColorStyle, FontSizeColorStyle, responsive } from '@/styles';

type PickPLayerHeaderProps = { time?: string; prize?: string | number; criteria?: string };

function HeaderTitle({ width = 136, height = 74, ...props }: SvgProps) {
	return (
		<Svg
			width={responsive(typeof width === 'string' ? Number(width) : width)}
			height={responsive(typeof height === 'string' ? Number(height) : height)}
			viewBox="0 0 136 74"
			fill="none"
			{...props}
		>
			<Path
				d="M48.453 5.938V20h-5.86V.078h19.923V20h-5.86V5.937h-1.172V20h-5.859V5.937h-1.172zM69.547 20h-5.86V.078h5.86v13.149L77.75 8.48V.078h5.86V20h-5.86v-4.734L69.547 20zM104.703.078v5.86H90.641v1.171h14.062V20H84.781v-5.86h14.063V12.97H84.78V.079h19.922zM111.734 20h-5.859V.078h5.859V20zm1.172-14.063V.079h19.922v5.86H119.68l4.722 8.203h8.426V20H120.98l-8.074-14.063zM.406 27.078h19.922v12.89H6.266V47H.406V27.078zm5.86 5.86v1.171h8.203v-1.172H6.266zm21.093 0v1.171h8.203v-1.172H27.36zm0 5.859V47H21.5V27.078h19.922v12.89h-4.594L43.86 47h-8.297l-8.203-8.203zm21.094 2.344h14.063V47H42.594V27.078h19.922v5.86H48.453v1.171h14.063v5.86H48.453v1.172zm21.094-8.203V47h-5.86V27.078H83.61V47H77.75V32.937h-1.172V47h-5.86V32.937h-1.171zM90.64 47h-5.86V27.078h5.86V47zm7.03-5.86h14.063V47H91.813V27.078h19.921v5.86H97.672v1.171h14.062v5.86H97.672v1.172zm21.095-8.203v1.172h8.203v-1.172h-8.203zm0 5.86V47h-5.86V27.078h19.922v12.89h-4.594L135.266 47h-8.297l-8.203-8.203zM28.531 54.078h5.86v14.063h14.062V74H28.531V54.078zm26.953 14.063h14.063V74H49.625V54.078h19.922v5.86H55.484v1.171h14.063v5.86H55.484v1.172zm35.157-14.063v5.86H76.578v8.203h7.29l-4.055-7.032h6.773l4.055 7.032V74H70.719V54.078H90.64zM97.67 74h-5.859V54.078h5.86v13.149l8.203-4.747v-8.402h5.859V74h-5.859v-4.734L97.672 74zm21.095-5.86h14.062V74h-19.922V54.078h19.922v5.86h-14.062v1.171h14.062v5.86h-14.062v1.172z"
				fill="url(#paint0_linear_129_43)"
			/>
			<Defs>
				<LinearGradient
					id="paint0_linear_129_43"
					x1={34}
					y1={-2}
					x2={34}
					y2={137.95}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#00BCFD" />
					<Stop offset={1} stopColor="#00BCFD" stopOpacity={0} />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}

// const TEXT = { headeing: 'Music Premier Legue' } as const;

const PickPLayerHeader: React.FC<PickPLayerHeaderProps> = ({
	time = '7 Nov/10:00',
	prize = '100000',
	criteria = '18-90 Years',
}) => (
	<View style={styles.container}>
		<View style={styles.svg}>
			<PlayersHeaderSvgComponent />
		</View>
		<HeaderTitle />
		<View style={styles.textContainer}>
			<View style={styles.textWraper}>
				<Text style={[FontSizeColorStyle['heebo-600-16-white'], styles.text]}>{time}</Text>
			</View>
			<View style={styles.textWraper}>
				<Text style={[FontSizeColorStyle['heebo-600-16-white'], styles.text]}>
					{prize}
					<Text style={ColorStyle['text-primary-text']}> Tokens </Text>
				</Text>
			</View>
			<View style={styles.textWraper}>
				<Text style={[FontSizeColorStyle['heebo-600-16-white'], styles.text]}>
					{criteria}
				</Text>
			</View>
		</View>
	</View>
);

export default PickPLayerHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: responsive(10),
		justifyContent: 'flex-end',
		paddingHorizontal: responsive(15),
		paddingVertical: responsive(20),
		width: '100%',
		alignItems: 'center',
	},
	svg: {
		flex: 1,
		position: 'absolute',
		right: responsive(5),
	},
	heading: { textAlign: 'right', fontFamily: 'Moonwalk', width: responsive(200) },
	textContainer: {
		// flex: 1,
		gap: responsive(5),
		alignItems: 'center',
	},
	textWraper: {
		borderBottomColor: '#12343E',
		borderBottomWidth: responsive(1),
	},
	text: {
		fontFamily: 'DigifaceWide',
		lineHeight: responsive(22),
	},
} as const);
