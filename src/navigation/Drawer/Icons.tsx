/* eslint-disable no-warning-comments */
/* eslint-disable max-len */

import Svg, { Path, Rect, SvgXml } from 'react-native-svg';
import {
	AntDesign,
	FontAwesome5,
	MaterialCommunityIcons,
	MaterialIcons,
	Octicons,
} from '@expo/vector-icons';

import { ALL_COLORS, responsive } from '@/styles';

type DrawerIconProps = { focused?: boolean; size?: number; color?: string };

export const HomeIcon = ({ size = 7, color = '#fff' }: DrawerIconProps) => (
	<Octicons name="home" size={size} color={color} />
);
export const ProfileIcon = ({ size = 7, color }: DrawerIconProps) => (
	<MaterialIcons name="account-circle" size={size} color={color} />
);

export const SettingIcon = ({ size = 7, color }: DrawerIconProps) => (
	<AntDesign name="setting" size={size} color={color} />
);

export const HistoryIcon = ({ size = 7, color }: DrawerIconProps) => (
	<FontAwesome5 name="hand-holding-heart" size={size} color={color} />
);
export const DrawerRightIcon = ({ size = 20, color = '#C4C4C4' }: DrawerIconProps) => (
	<Svg
		width={responsive(size)}
		height={responsive(size)}
		viewBox="0 0 22 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Rect
			x={1.5}
			y={1.5}
			width={6.99849}
			height={6.99849}
			rx={3.49925}
			stroke={color}
			strokeWidth={3}
		/>
		<Rect
			x={13.2373}
			y={1.5}
			width={6.99849}
			height={6.99849}
			rx={3.49925}
			stroke={color}
			strokeWidth={3}
		/>
		<Rect
			x={1.5}
			y={13.2374}
			width={6.99849}
			height={6.99849}
			rx={3.49925}
			stroke={color}
			strokeWidth={3}
		/>
		<Rect
			x={13.2373}
			y={14.5415}
			width={6.99849}
			height={6.99849}
			rx={3.49925}
			stroke={color}
			strokeWidth={3}
		/>
	</Svg>
);

export const AccountIcon = ({ size = 7, color }: DrawerIconProps) => {
	return <MaterialCommunityIcons name="account-music" size={size} color={color} />;
};
export const CompetitonIcon = ({ size = 7, color }: DrawerIconProps) => {
	return <MaterialCommunityIcons name="gamepad-circle-left" size={size} color={color} />;
};

export const CricketSVG = ({ size = 7 }: DrawerIconProps) => {
	const svg = `<svg viewBox="0 0 24 24" width=${responsive(size)} height=${responsive(
		size
	)} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z" fill=#${
		ALL_COLORS.green
	}></path> <path d="M12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25Z" fill=#${
		ALL_COLORS.green
	}></path> </g></svg>
`;

	return <SvgXml xml={svg} />;
};
export const LogoutSVG = () => {
	const svg = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.4399 14.62L19.9999 12.06L17.4399 9.5" stroke=${ALL_COLORS.black} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9.76001 12.0601H19.93" stroke=${ALL_COLORS.error} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4" stroke=${ALL_COLORS['dark-717171']} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
`;

	return <SvgXml xml={svg} />;
};

export function BackIcon(props) {
	return (
		<Svg
			width={18}
			height={18}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<Path
				d="M9 0C4.037 0 0 4.037 0 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9zm2.03 12.22a.749.749 0 11-1.06 1.06L6.22 9.53a.75.75 0 010-1.06l3.75-3.75a.75.75 0 111.06 1.06L7.81 9l3.22 3.22z"
				fill="#C4C4C4"
			/>
		</Svg>
	);
}
