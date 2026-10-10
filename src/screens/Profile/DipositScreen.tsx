// DepositScreen.tsx
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import { PrimaryButton } from '@/components';
import MaterialTextEditorComponent from '@/components/Base/experimental/BasicTextEditor';
import { FontSizeColorStyle } from '@/styles';

const DepositScreen: React.FC = () => {
	const [amount, setAmount] = useState<number>();

	const [account, setAccount] = useState<string>();

	return (
		<LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)']} style={styles.container}>
			<GestureHandlerRootView style={styles.blurContainer}>
				<BlurView
					intensity={50}
					style={styles.blurView}
					tint="dark"
					experimentalBlurMethod={'dimezisBlurView'}
				>
					<Text
						style={[
							FontSizeColorStyle['montserrat-500-20-white'],
							{ marginBottom: 15 },
						]}
					>
						Deposit Funds
					</Text>
					<MaterialTextEditorComponent
						placeholder="Amount"
						placeholderTextColor="#ccc"
						keyboardType="numeric"
						onChangeText={setAmount}
						value={amount}
					/>
					<MaterialTextEditorComponent
						placeholder="Account Number"
						placeholderTextColor="#ccc"
						onChangeText={setAccount}
						value={account}
					/>
					<View style={{ opacity: 0.2 }}>
						<PrimaryButton
							label="Coming  Soon ..."
							gradientType="type2"
							enabled={false}
						/>
					</View>
				</BlurView>
			</GestureHandlerRootView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	blurContainer: {
		backgroundColor: 'rgba(0,0,0,0.1)',
		borderRadius: 20,
		overflow: 'hidden',
		padding: 1,
		width: '90%',
	},
	blurView: {
		borderRadius: 20,
		gap: 15,
		padding: 20,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#e91e63',
		borderRadius: 10,
		padding: 15,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		paddingBottom: 100,
	},

	title: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		// textAlign: 'center',
	},
});

export default DepositScreen;
