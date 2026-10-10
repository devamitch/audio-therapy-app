/* eslint-disable no-warning-comments */
/* eslint-disable no-inline-styles/no-inline-styles */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

import Button from './Button';

import { responsive2 } from '@/lib/utils/responsive';
import { FontSizeColorStyle, responsive } from '@/styles';

type DropdownProps<T extends string> = {
	options: T[];
	value?: T;
	onSelect: (option: T) => void;
	label: string;
};

export interface DropdownRef {
	toggleDropdown: () => void;
}

const DropdownComponent = <T extends string>({
	options,
	onSelect,
	label,
	value,
}: DropdownProps<T>) => {
	const isFocused = useSharedValue(false);

	const animatedLabelStyle = useAnimatedStyle(() => ({
		top: withTiming(isFocused.value || !!value ? -responsive2(10) : responsive2(35), {
			duration: 300,
			easing: Easing.inOut(Easing.ease),
		}),
		left: withTiming(isFocused.value || !!value ? 0 : responsive2(10), {
			duration: 300,
			easing: Easing.inOut(Easing.ease),
		}),
		fontSize: withTiming(isFocused.value || !!value ? responsive2(12) : responsive2(16), {
			duration: 300,
			easing: Easing.inOut(Easing.ease),
		}),
		color: withTiming(isFocused.value || !!value ? '#ffff' : '#CBCBCB', {
			duration: 300,
			easing: Easing.inOut(Easing.ease),
		}),
		textTransform: 'capitalize',
		zIndex: 1,
	}));

	const animatedContainerStyle = useAnimatedStyle(() => ({
		opacity: withSpring(isFocused.value ? 1 : 0),
		height: withTiming(isFocused.value ? responsive2(options?.length * 42) : 0, {
			duration: 300,
			easing: Easing.inOut(Easing.ease),
		}),

		zIndex: withTiming(isFocused.value ? 1 : 0, {
			duration: 300,
			easing: Easing.inOut(Easing.ease),
		}),
		gap: responsive2(5),
		marginTop: withTiming(isFocused.value ? responsive2(5) : 0, {
			duration: 300,
			easing: Easing.inOut(Easing.ease),
		}),
		display: withTiming(isFocused.value ? 'flex' : 'none', {
			duration: 300,
			easing: Easing.inOut(Easing.ease),
		}),
		width: '100%',
	}));

	return (
		<Animated.View style={styles.container}>
			<Animated.Text
				style={[FontSizeColorStyle['montserrat-600-12-white'], animatedLabelStyle]}
				onPress={() => {
					isFocused.value = !isFocused.value;
				}}
			>
				{label}
			</Animated.Text>
			<Button
				label={value}
				backgroundColor={'transparent'}
				outlineColor={value || isFocused?.value ? 'white' : 'dark-202020'}
				style={{ width: '100%', height: responsive(40) }}
				labelStyle={{
					color: value ? 'white' : 'transparent',
					textTransform: 'capitalize',
					position: 'relative',
				}}
				variant="outlined"
				size="md"
				onPress={() => {
					isFocused.value = !isFocused.value;
				}}
			/>

			<Animated.View style={animatedContainerStyle}>
				{options?.map((item) => (
					<Button
						key={item}
						label={item}
						style={{ width: '100%', backgroundColor: '#212121', position: 'relative' }}
						labelStyle={[
							FontSizeColorStyle['montserrat-600-12-white'],
							{ textTransform: 'capitalize', position: 'relative' },
						]}
						size="md"
						onPress={() => {
							onSelect && onSelect(item);
							isFocused.value = !isFocused.value;
						}}
					/>
				))}
			</Animated.View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: responsive(5),
	},
});

export default DropdownComponent;
