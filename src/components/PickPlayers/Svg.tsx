import Svg, { Defs, LinearGradient, Path, Stop, SvgProps } from 'react-native-svg';

import { responsive } from '@/styles';

export function PlayersHeaderSvgComponent({
	width = 352,
	height = 99,
	xmlns = 'http://www.w3.org/2000/svg',
	...props
}: SvgProps) {
	return (
		<Svg
			width={responsive(width)}
			height={responsive(height)}
			viewBox="0 0 352 99"
			fill="none"
			//@ts-ignore
			xmlns={xmlns}
			{...props}
		>
			<Path d="M1 55.5L55.5 1h296v97.5" stroke="url(#paint0_linear_129_51)" />
			<Defs>
				<LinearGradient
					id="paint0_linear_129_51"
					x1={55.5}
					y1={-46.5}
					x2={373}
					y2={122.5}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#0A2C35" />
					<Stop offset={1} stopColor="#006582" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}

// import * as React from 'react';
// import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export function PlayerChalangeHeaderSvg(props: SvgProps) {
	return (
		<Svg
			width={430}
			height={826}
			viewBox="0 0 430 826"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<Path fill="url(#paint0_linear_0_1)" d="M-14 0H428V785H-14z" />
			<Path d="M107 93.5L161.5 39h296v97.5" stroke="url(#paint1_linear_0_1)" />
			<Path d="M108 96.5L162.5 42h296v97.5" stroke="url(#paint2_linear_0_1)" />
			<Path d="M109 99.5L163.5 45h296v97.5" stroke="url(#paint3_linear_0_1)" />
			<Path d="M110 102.5L164.5 48h296v97.5" stroke="url(#paint4_linear_0_1)" />
			<Path d="M111 105.5L165.5 51h296v97.5" stroke="url(#paint5_linear_0_1)" />
			<Path d="M112 108.5L166.5 54h296v97.5" stroke="url(#paint6_linear_0_1)" />
			<Path d="M113 111.5L167.5 57h296v97.5" stroke="url(#paint7_linear_0_1)" />
			<Path d="M136 728.5l54.5-54.5h296v97.5" stroke="url(#paint8_linear_0_1)" />
			<Path d="M265.5 782.5L211 728H-85v97.5" stroke="url(#paint9_linear_0_1)" />
			<Path d="M114 114.5L168.5 60h296v97.5" stroke="url(#paint10_linear_0_1)" />
			<Defs>
				<LinearGradient
					id="paint0_linear_0_1"
					x1={291.5}
					y1={674.587}
					x2={291.5}
					y2={76.2205}
					gradientUnits="userSpaceOnUse"
				>
					<Stop />
					<Stop offset={1} stopOpacity={0} />
				</LinearGradient>
				<LinearGradient
					id="paint1_linear_0_1"
					x1={161.5}
					y1={-8.49996}
					x2={479}
					y2={160.5}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#0A2C35" />
					<Stop offset={1} stopColor="#006582" />
				</LinearGradient>
				<LinearGradient
					id="paint2_linear_0_1"
					x1={162.5}
					y1={-5.49996}
					x2={480}
					y2={163.5}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#0A2C35" />
					<Stop offset={1} stopColor="#006582" />
				</LinearGradient>
				<LinearGradient
					id="paint3_linear_0_1"
					x1={163.5}
					y1={-2.49996}
					x2={481}
					y2={166.5}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#0A2C35" />
					<Stop offset={1} stopColor="#006582" />
				</LinearGradient>
				<LinearGradient
					id="paint4_linear_0_1"
					x1={164.5}
					y1={0.500037}
					x2={482}
					y2={169.5}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#0A2C35" />
					<Stop offset={1} stopColor="#006582" />
				</LinearGradient>
				<LinearGradient
					id="paint5_linear_0_1"
					x1={165.5}
					y1={3.50004}
					x2={483}
					y2={172.5}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#0A2C35" />
					<Stop offset={1} stopColor="#006582" />
				</LinearGradient>
				<LinearGradient
					id="paint6_linear_0_1"
					x1={166.5}
					y1={6.50004}
					x2={484}
					y2={175.5}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#0A2C35" />
					<Stop offset={1} stopColor="#006582" />
				</LinearGradient>
				<LinearGradient
					id="paint7_linear_0_1"
					x1={167.5}
					y1={9.50004}
					x2={485}
					y2={178.5}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#0A2C35" />
					<Stop offset={1} stopColor="#006582" />
				</LinearGradient>
				<LinearGradient
					id="paint8_linear_0_1"
					x1={190.5}
					y1={626.5}
					x2={508}
					y2={795.5}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#0A2C35" />
					<Stop offset={1} stopColor="#006582" />
				</LinearGradient>
				<LinearGradient
					id="paint9_linear_0_1"
					x1={211}
					y1={680.5}
					x2={-106.5}
					y2={849.5}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#0A2C35" />
					<Stop offset={1} stopColor="#006582" />
				</LinearGradient>
				<LinearGradient
					id="paint10_linear_0_1"
					x1={168.5}
					y1={12.5}
					x2={486}
					y2={181.5}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#0A2C35" />
					<Stop offset={1} stopColor="#006582" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}
