/* eslint-disable react-native/no-color-literals */
import React, { forwardRef, useEffect } from 'react';
import { StyleSheet, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

import { responsive2 } from '@/lib/utils/responsive';
import { FontSizeColorStyle, responsive } from '@/styles';

type MaterialTextEditorProps = TextInputProps & {
	label?: string;
	containerStyle?: ViewStyle;
	labelStyle?: TextStyle;
	inputStyle?: TextStyle;
	clearButtonStyle?: ViewStyle;
	clearIconSize?: number;
	clearIconColor?: string;
	clearIconName?: string;
	onFocus?: () => void;
	onBlur?: () => void;
	onClearPress?: () => void;
	showClearButton?: boolean;
};

const defaultProps: MaterialTextEditorProps = {
	placeholder: 'Placeholder',
	showClearButton: true,
	clearIconSize: 24,
	clearIconColor: 'white',
	clearIconName: 'cancel',
};

const ReanimatedInput = Animated.createAnimatedComponent(TextInput);

const ClearButton = Animated.createAnimatedComponent(RectButton);

const MaterialTextEditorComponent = forwardRef<
	React.ElementRef<typeof TextInput>,
	MaterialTextEditorProps
>(
	(
		{
			style,
			placeholder,
			label = placeholder,
			value,
			onChangeText,
			containerStyle,
			labelStyle,
			inputStyle,
			clearButtonStyle,
			clearIconSize,
			clearIconColor,
			clearIconName,
			onFocus,
			onBlur,
			onClearPress,
			showClearButton,
			...props
		},
		ref
	) => {
		const isFocused = useSharedValue(!!value);

		const animatedLabelStyle = useAnimatedStyle(() => ({
			top: withTiming(isFocused.value || !!value ? responsive2(-20) : responsive2(10), {
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
		}));

		const animatedInputStyle = useAnimatedStyle(() => ({
			borderWidth: withTiming(isFocused.value || !!value ? responsive2(2) : responsive2(1), {
				duration: 300,
				easing: Easing.inOut(Easing.ease),
			}),
			borderColor: withTiming(isFocused.value || !!value ? '#ffff' : '#202020', {
				duration: 300,
				easing: Easing.inOut(Easing.ease),
			}),
		}));

		const animatedClearStyle = useAnimatedStyle(() => ({
			opacity: withSpring(showClearButton && (isFocused.value || !!value) ? 1 : 0, {
				damping: 10,
				stiffness: 100,
			}),
			transform: [
				{
					scale: withSpring(showClearButton && (isFocused.value || !!value) ? 1 : 0.8, {
						damping: 10,
						stiffness: 100,
					}),
				},
			],
		}));

		const animatedContainerStyle = useAnimatedStyle(() => ({
			marginVertical: responsive2(5),
			// marginVertical: withSpring(
			// 	isFocused.value || !!value ? responsive2(5) : responsive2(2),
			// 	{
			// 		damping: 10,
			// 		stiffness: 100,
			// 	}
			// ),
		}));

		const panGestureHandler = useAnimatedGestureHandler({
			onStart: () => {
				isFocused.value = value ? true : false;
				onFocus && onFocus();
			},
			onEnd: () => {
				isFocused.value = value ? true : false;
				onBlur && onBlur();
			},
		});

		useEffect(() => {
			if (value !== undefined && value !== null && value?.length > 0) {
				isFocused.value = true;
			}
		}, [value, isFocused]);

		return (
			<>
				<Animated.View
					style={[styles.inputContainer, animatedContainerStyle, containerStyle]}
				>
					<Animated.Text
						style={[
							FontSizeColorStyle['montserrat-600-12-white'],
							styles.label,
							animatedLabelStyle,
							labelStyle,
						]}
					>
						{label}
					</Animated.Text>
					<ReanimatedInput
						ref={ref}
						style={[
							FontSizeColorStyle['heebo-400-16-white'],
							styles.input,
							animatedInputStyle,
							style,
							inputStyle,
						]}
						onFocus={() => (isFocused.value = true)}
						onBlur={() => (isFocused.value = false)}
						placeholder={''}
						value={value}
						onChangeText={onChangeText}
						autoCapitalize="sentences"
						autoCorrect
						blurOnSubmit
						allowFontScaling
						collapsable
						clearButtonMode={'unless-editing'}
						adjustsFontSizeToFit
						{...props}
					/>
					{/* {showClearButton && value !== undefined && (
						<ClearButton
							style={[styles.clearButton, animatedClearStyle, clearButtonStyle]}
							onPress={() =>
								onClearPress ? onClearPress() : onChangeText(undefined)
							}
						>
							<MaterialIcons
								name={clearIconName}
								size={clearIconSize}
								color={clearIconColor}
							/>
						</ClearButton>
					)} */}
				</Animated.View>
			</>
		);
	}
);

MaterialTextEditorComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	clearButton: {
		alignItems: 'center',
		backgroundColor: 'transparent',
		borderRadius: responsive(12.5),
		height: responsive(25),
		justifyContent: 'center',
		padding: 0,
		position: 'absolute',
		right: responsive(10),
		top: responsive(8),
		width: responsive(25),
	},
	input: {
		borderRadius: responsive(7),
		color: '#c4c4c4',
		flex: 1,
		fontSize: responsive(16),
		paddingHorizontal: responsive(10),
		paddingVertical: responsive(10),
		width: '100%',
	},
	inputContainer: {
		flexDirection: 'row',
		marginVertical: responsive(5),
		position: 'relative',
		width: '100%',
	},
	label: {
		fontSize: responsive(16),
		left: 0,
		position: 'absolute',
		top: 0,
	},
});

export default MaterialTextEditorComponent;
