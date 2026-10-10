import { StyleSheet } from 'react-native';
import type { PickerProps } from '@react-native-picker/picker';
import { Picker } from '@react-native-picker/picker';

import { ColorStyle, FontSizeColorStyle } from '@/styles';

type PickProps<T extends string> = Omit<PickerProps<T>, 'selectedValue'> & {
	data?: { value?: T; label?: string; _id?: T }[];
	selectedValue?: T;
};

const Pick = <T extends string>({ selectedValue, data, ...props }: PickProps<T>) => (
	<Picker
		selectedValue={selectedValue}
		itemStyle={[FontSizeColorStyle['montserrat-500-12-dark-343434'], styles.pickerItem]}
		style={ColorStyle['bg-white']}
		mode={'dropdown'}
		{...props}
	>
		{data?.map(({ label, value }, index) => (
			<Picker.Item label={label} value={value} key={index.toString()} />
		))}
	</Picker>
);

export default Pick;

const styles = StyleSheet.create({ pickerItem: { height: 140 } });
