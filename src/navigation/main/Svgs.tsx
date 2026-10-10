import Svg, { Defs, LinearGradient, Path, Stop, SvgProps } from 'react-native-svg';

import { responsive } from '@/styles';

export const ContestSvg = ({ width = 20, height = 20, ...props }: SvgProps) => {
	return (
		<Svg
			width={responsive(typeof width === 'string' ? Number(width) : width)}
			height={responsive(typeof height === 'string' ? Number(height) : height)}
			viewBox="0 0 25 26"
			fill="none"
			{...props}
		>
			<Path
				d="M15.625 20.531v-.781l-2.145-1.875a2.887 2.887 0 01-.98-2.164V13.5a1.563 1.563 0 013.125 0v.781"
				stroke="#00BCFD"
				strokeWidth={1.5}
				strokeLinejoin="round"
			/>
			<Path
				d="M14.063 11.938v-1.563a3.125 3.125 0 013.124-3.125h3.907a3.125 3.125 0 013.125 3.125v3.715a8.003 8.003 0 01-2.344 5.66v.781"
				stroke="#00BCFD"
				strokeWidth={1.5}
				strokeLinejoin="round"
			/>
			<Path
				d="M22.656 20.531h-7.812v3.907h7.812V20.53zM14.063 10.375h10.156"
				stroke="#00BCFD"
				strokeWidth={1.5}
				strokeLinejoin="round"
			/>
			<Path
				d="M14.844 22.094h2.344v2.343M9.375 20.531v-.781l2.145-1.875a2.887 2.887 0 00.98-2.164V13.5a1.563 1.563 0 00-3.125 0v.781"
				stroke="#00BCFD"
				strokeWidth={1.5}
				strokeLinejoin="round"
			/>
			<Path
				d="M10.938 11.938v-1.563A3.125 3.125 0 007.812 7.25H3.906a3.125 3.125 0 00-3.125 3.125v3.715a8.003 8.003 0 002.344 5.66v.781"
				stroke="#00BCFD"
				strokeWidth={1.5}
				strokeLinejoin="round"
			/>
			<Path
				d="M2.344 24.438h7.812V20.53H2.344v3.907zM10.938 10.375H.78"
				stroke="#00BCFD"
				strokeWidth={1.5}
				strokeLinejoin="round"
			/>
			<Path
				d="M10.156 22.094H7.812v2.343M9.375 6.078L7.422 4.125h2.734L8.984 1.781l2.735 1.172L12.5 1l1.172 1.953 1.953-1.172-.781 2.344h2.734l-1.953 1.953"
				stroke="#00BCFD"
				strokeWidth={1.5}
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
export const LeagueSvg = ({ width = 20, height = 20, ...props }: SvgProps) => {
	return (
		<Svg
			width={responsive(typeof width === 'string' ? Number(width) : width)}
			height={responsive(typeof height === 'string' ? Number(height) : height)}
			viewBox="0 0 26 26"
			fill="none"
			{...props}
		>
			<Path
				d="M14.463 17.063h-3.007c-1.868 0-3.412-1.544-3.412-3.413v-7.8c.081-1.869 1.625-3.412 3.494-3.412h3.006c1.787 0 3.331 1.543 3.331 3.412v7.881c0 1.788-1.544 3.332-3.412 3.332zM9.75 6.5H8.125M9.75 9.75H8.125M17.875 9.75H13M9.75 13H8.125M17.875 6.5H13M17.875 13H13"
				stroke="#00BCFD"
				strokeWidth={1.5}
				strokeMiterlimit={10}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M3.25 9.75h1.625v3.9a6.64 6.64 0 006.662 6.662h3.007a6.64 6.64 0 006.662-6.662v-3.9h1.625M17.875 23.563c-1.3-.488-3.006-.813-4.875-.813-1.869 0-3.575.325-4.875.813"
				stroke="#00BCFD"
				strokeWidth={1.5}
				strokeMiterlimit={10}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export const GameSvg = ({ width = 20, height = 20, ...props }: SvgProps) => {
	return (
		<Svg
			viewBox="0 0 24 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			width={responsive(typeof width === 'string' ? Number(width) : width)}
			height={responsive(typeof height === 'string' ? Number(height) : height)}
			{...props}
		>
			<Path
				d="M23.966 12.542v-.001-.007h-.001c-.313-4.155-1.273-7.237-2.623-9.32-.675-1.042-1.451-1.834-2.298-2.368-.846-.534-1.765-.806-2.69-.805-.682 0-1.265.123-1.76.31-.742.28-1.282.693-1.704.999-.21.154-.393.28-.541.356A.76.76 0 0112 1.81a.6.6 0 01-.212-.043c-.146-.054-.341-.175-.575-.344-.353-.251-.792-.598-1.37-.883a4.869 4.869 0 00-2.197-.5C6.721.04 5.802.31 4.956.846c-1.27.802-2.38 2.179-3.234 4.12C.869 6.906.269 9.418.035 12.534v.008c-.024.254-.035.5-.035.74 0 1.175.27 2.178.78 2.96a3.793 3.793 0 002.139 1.586c.301.088.612.131.926.131.911 0 1.83-.357 2.704-.973.876-.618 1.716-1.502 2.48-2.612.368-.536.867-1.163 1.406-1.634.269-.236.546-.432.814-.564.267-.132.52-.199.751-.198.231 0 .484.066.751.198.401.197.825.542 1.209.943.386.4.734.853 1.01 1.254.765 1.11 1.605 1.995 2.48 2.613.875.616 1.794.972 2.705.973.314 0 .625-.043.926-.131a3.79 3.79 0 002.138-1.586c.51-.782.781-1.785.781-2.96 0-.239-.011-.486-.034-.74zm-1.619 3.131c-.38.58-.902.96-1.56 1.156a2.23 2.23 0 01-.632.09c-.632 0-1.355-.255-2.104-.784-.749-.527-1.515-1.323-2.223-2.352-.401-.582-.94-1.266-1.577-1.826-.32-.28-.664-.53-1.038-.714A2.739 2.739 0 0012 10.937c-.43 0-.839.121-1.213.306-.56.278-1.058.698-1.497 1.154-.439.455-.818.95-1.118 1.386-.708 1.03-1.475 1.825-2.223 2.352-.75.53-1.473.784-2.104.783-.22 0-.429-.03-.632-.09a2.743 2.743 0 01-1.56-1.155c-.378-.58-.612-1.373-.612-2.39 0-.21.01-.428.03-.655v-.002l.001-.006c.301-4.039 1.24-6.964 2.459-8.84.609-.939 1.285-1.615 1.98-2.053.698-.438 1.413-.644 2.135-.645.558 0 1.005.098 1.391.243.58.218 1.026.551 1.46.868.219.158.434.312.675.437.24.125.517.222.828.222.206 0 .401-.044.576-.109.307-.116.562-.291.817-.472.38-.273.76-.569 1.223-.796a3.813 3.813 0 011.738-.393c.722 0 1.437.207 2.134.645 1.044.656 2.044 1.853 2.837 3.658.793 1.803 1.376 4.206 1.603 7.235v.008c.02.227.03.445.03.654 0 1.018-.233 1.812-.611 2.391z"
				fill="#fff"
			/>
			<Path
				d="M7.558 5.35H5.733v1.664H4.068v1.825h1.665v1.665h1.825V8.839h1.664V7.014H7.558V5.35zM17.281 4.828a.962.962 0 100 1.925.962.962 0 000-1.925zM17.281 9.48a.962.962 0 100 1.925.962.962 0 000-1.925zM19.607 7.155a.963.963 0 100 1.925.963.963 0 000-1.925zM14.956 7.155a.962.962 0 10-.001 1.924.962.962 0 000-1.924z"
				fill="#fff"
			/>
		</Svg>
	);
};

export function BarIcon({ width = 20, height = 20, ...props }: SvgProps) {
	return (
		<Svg
			width={responsive(typeof width === 'string' ? Number(width) : width)}
			height={responsive(typeof height === 'string' ? Number(height) : height)}
			viewBox="0 0 28 29"
			fill="none"
			{...props}
		>
			<Path d="M27.315 0H0v4.445h27.315V0z" fill="url(#paint0_linear_393_683)" />
			<Path d="M27.3 8.044H7.667v4.445H27.3V8.044z" fill="url(#paint1_linear_393_683)" />
			<Path d="M27.315 16.51H0v4.446h27.315v-4.445z" fill="url(#paint2_linear_393_683)" />
			<Path d="M27.3 24.555H7.667V29H27.3v-4.445z" fill="url(#paint3_linear_393_683)" />
			<Defs>
				<LinearGradient
					id="paint0_linear_393_683"
					x1={-9.84228}
					y1={-0.99635}
					x2={-7.65008}
					y2={15.4239}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#00BCFD" />
					<Stop offset={1} stopColor="#00BCFD" stopOpacity={0} />
				</LinearGradient>
				<LinearGradient
					id="paint1_linear_393_683"
					x1={0.5929}
					y1={7.04725}
					x2={3.59418}
					y2={23.2039}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#00BCFD" />
					<Stop offset={1} stopColor="#00BCFD" stopOpacity={0} />
				</LinearGradient>
				<LinearGradient
					id="paint2_linear_393_683"
					x1={-9.84228}
					y1={15.5143}
					x2={-7.64977}
					y2={31.9358}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#00BCFD" />
					<Stop offset={1} stopColor="#00BCFD" stopOpacity={0} />
				</LinearGradient>
				<LinearGradient
					id="paint3_linear_393_683"
					x1={0.5929}
					y1={23.5584}
					x2={3.59378}
					y2={39.714}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="#00BCFD" />
					<Stop offset={1} stopColor="#00BCFD" stopOpacity={0} />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}
