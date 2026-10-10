/* eslint-disable no-warning-comments */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-inline-styles/no-inline-styles */
import { useCallback } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

import { Button } from '@/components';
import { authBottomSheetRef } from '@/constants/auth';
import { useAppStore } from '@/core/store';
import { RootStackNavigationType } from '@/navigation/types';
import { ColorStyle, FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';

const AuthBottomSheet: React.FC = () => {
	const [userType, setUserType] = useAppStore((state) => [state.userType, state.setUserType]);

	const navigation = useNavigation<RootStackNavigationType>();

	const handleSelect = useCallback(
		(key: 'artist' | 'user') => {
			setUserType(key);
			authBottomSheetRef?.current?.close();

			navigation.navigate('CompleteProfile');
		},
		[navigation, setUserType]
	);

	return (
		<BottomSheet
			ref={authBottomSheetRef}
			// bottomInset={46}
			// set `detached` to true
			detached={true}
			style={styles.sheetContainer}
			snapPoints={[1, 170]}
			index={0}
			onClose={() => {
				authBottomSheetRef?.current?.close();
			}}
			handleStyle={[
				Platform.OS === 'ios'
					? ColorStyle['bg-primary-button2']
					: ColorStyle['bg-primary-button2'],
				{ borderTopLeftRadius: 12, borderTopRightRadius: 12 },
			]}
			handleIndicatorStyle={
				Platform.OS === 'ios' ? ColorStyle['bg-primary'] : ColorStyle['bg-primary']
			}
		>
			<LinearGradient
				colors={['#002120', '#052F3B', '#00212A']}
				start={[0, 0.5]}
				end={[0.5, 1]}
				// @ts-ignore
				location={[0.25, 0.65, 1]}
				style={LayoutStyle.fill}
			>
				<View style={styles.wheelContainer}>
					<Text
						style={[
							FontSizeColorStyle['montserrat-500-18-white'],
							{ gap: 10, marginLeft: 20 },
						]}
					>
						Are you an artist?
					</Text>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',

							gap: 40,
						}}
					>
						<Button
							startIcon={
								<Feather
									name={userType === 'artist' ? 'check-circle' : 'circle'}
									size={20}
									color="white"
								/>
							}
							label="Yes"
							labelStyle={FontSizeColorStyle['montserrat-500-15-white']}
							onPress={() => handleSelect('artist')}
							style={{
								backgroundColor: 'rgba(0,0,0,0.2)',
								paddingLeft: 10,
								flex: 1,
							}}
						/>
						<Button
							startIcon={
								<Feather
									name={userType === 'user' ? 'check-circle' : 'circle'}
									size={20}
									color="white"
								/>
							}
							label="No"
							labelStyle={[FontSizeColorStyle['montserrat-500-15-white']]}
							onPress={() => handleSelect('user')}
							style={{
								backgroundColor: 'rgba(0,0,0,0.2)',
								paddingLeft: 10,
								flex: 1,
							}}
						/>
					</View>
				</View>
			</LinearGradient>
		</BottomSheet>
	);
};

export default AuthBottomSheet;

const styles = StyleSheet.create({
	sheetContainer: {
		marginHorizontal: 24,
	},
	wheelContainer: {
		flex: 1,
		flexGrow: 1,
		gap: responsive(0),
		height: '100%',
		paddingHorizontal: responsive(40),
		paddingVertical: responsive(15),
		width: '100%',
	},
});
