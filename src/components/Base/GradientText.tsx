import { TextProps, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { AnimateProps } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Slider, { SliderProps } from '@react-native-community/slider';
import MaskedView from '@react-native-masked-view/masked-view';

const GradientText: React.FC<
	AnimateProps<TextProps> & {
		colors?: string[];
		start?: {
			x: number;
			y: number;
		};
		end?: {
			x: number;
			y: number;
		};
	}
> = ({
	colors = ['#125B6F', '#00BCFD', '#7CD0E8'],
	start = { x: 0, y: 0 },
	end = { x: 0, y: 1 },
	...props
}) => {
	return (
		<MaskedView maskElement={<Animated.Text {...props} />}>
			<LinearGradient colors={colors} start={start} end={end}>
				<Animated.Text {...props} style={[props.style, { opacity: 0 }]} />
			</LinearGradient>
		</MaskedView>
	);
};

export const GradientIcon = (props) => {
	return (
		<MaskedView maskElement={<Ionicons {...props} />}>
			<LinearGradient
				colors={['#125B6F', '#00BCFD', '#7CD0E8']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
			>
				<Ionicons
					{...props}
					// name="back"
					style={{
						opacity: 0,
					}}
				/>
			</LinearGradient>
		</MaskedView>
	);
};
export const GradientIconFontisto = (props) => {
	return (
		<MaskedView maskElement={<MaterialCommunityIcons {...props} />}>
			<LinearGradient
				colors={['#125B6F', '#00BCFD', '#7CD0E8']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
			>
				<MaterialCommunityIcons
					{...props}
					name="forward"
					style={{
						opacity: 0,
					}}
				/>
			</LinearGradient>
		</MaskedView>
	);
};

export const GradientIcon2: React.FC<{
	children: React.ReactNode;
	colors?: (string | number)[];
}> = ({ children, colors = ['#125B6F', '#00BCFD', '#7CD0E8'] }) => {
	return (
		<MaskedView maskElement={children}>
			<LinearGradient colors={colors} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}>
				<View style={{ opacity: 0 }}>{children}</View>
			</LinearGradient>
		</MaskedView>
	);
};

export const GradientSlider = (props: SliderProps) => {
	return (
		<MaskedView maskElement={<Slider {...props} />}>
			<LinearGradient
				colors={['#125B6F', '#00BCFD', '#7CD0E8']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
			>
				<Slider
					thumbTintColor={'transparent'}
					minimumTrackTintColor={'transparent'}
					{...props}
					style={{
						opacity: 0,
					}}

					// name="play"
				/>
			</LinearGradient>
		</MaskedView>
	);
};
export default GradientText;
