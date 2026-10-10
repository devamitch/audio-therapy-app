import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { LANGUAGES_LABELS } from '@/constants/languages';
import { ColorStyle, FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const height = 40 as const;

const getItemLayout = (_: unknown, index: number) => ({
	index,
	length: height,
	offset: height * index,
});

const keyExtractor = (_: unknown, index: number) => index.toString();

const WheelPickerFlash = ({
	selectedValue,
	onValueChange,
}: {
	selectedValue: (typeof LANGUAGES_LABELS)[number]['value'];
	onValueChange: (value: (typeof LANGUAGES_LABELS)[number]['value']) => void;
}) => {
	const renderItem = useCallback(
		({ item }: { item: (typeof LANGUAGES_LABELS)[number] }) => {
			return (
				<TouchableOpacity
					bg-transparent
					style={[
						styles.contentContainer,
						ColorStyle[
							item.value === selectedValue
								? 'border-dark-717171'
								: 'border-transparent'
						],
						{
							height,
						},
					]}
					onPress={() => onValueChange(item.value)}
				>
					<Text
						style={
							FontSizeColorStyle[
								item.value === selectedValue
									? 'montserrat-700-14-orange'
									: 'montserrat-600-14-white'
							]
						}
					>
						{item.label}
					</Text>
				</TouchableOpacity>
			);
		},
		[onValueChange, selectedValue]
	);

	return (
		<View style={LayoutStyle.fill}>
			<FlatList
				contentContainerStyle={[ColorStyle['bg-dark-232323']]}
				// style={LayoutStyle.fill}
				showsVerticalScrollIndicator={false}
				snapToInterval={height}
				scrollEventThrottle={16}
				data={LANGUAGES_LABELS}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				decelerationRate="normal"
				getItemLayout={getItemLayout}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		alignItems: 'center',
		borderBottomWidth: 0.5,
		borderTopWidth: 0.5,
		justifyContent: 'center',
		paddingHorizontal: responsive(8),
		textAlign: 'center',
		width: '100%',
	},
});

export default WheelPickerFlash;
