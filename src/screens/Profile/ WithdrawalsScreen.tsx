// WithdrawalsScreen.tsx
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import { PrimaryButton } from '@/components';
import MaterialTextEditorComponent from '@/components/Base/experimental/BasicTextEditor';

const WithdrawalsScreen: React.FC = () => {
	const [amount, setAmount] = useState<number>();

	const [account, setAccount] = useState<string>();

	const [selectedChain, setSelectedChain] = useState<string>('Ethereum');

	return (
		<LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)']} style={styles.container}>
			<GestureHandlerRootView style={styles.blurContainer}>
				<BlurView
					intensity={50}
					style={styles.blurView}
					tint="dark"
					experimentalBlurMethod={'dimezisBlurView'}
				>
					<View style={styles.header}>
						<Text style={styles.title}>Withdraw Funds</Text>
						<Text style={styles.subtitle}>Securely withdraw your assets</Text>
						<View style={styles.chainPickerContainer}>
							<Text style={styles.chainPickerLabel}>Select Blockchain:</Text>
							<Picker
								selectedValue={selectedChain}
								style={styles.chainPicker}
								onValueChange={(itemValue) => setSelectedChain(itemValue)}
							>
								<Picker.Item label="Ethereum" value="Ethereum" />
								<Picker.Item label="Binance Smart Chain" value="BSC" />
								<Picker.Item label="Polygon" value="Polygon" />
								{/* Add more chains as needed */}
							</Picker>
						</View>
					</View>
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
							label="Coming Soon ..."
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
	chainPicker: {
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderRadius: 10,
		color: '#fff',
	},
	chainPickerContainer: {
		marginBottom: 15,
	},
	chainPickerLabel: {
		color: '#ccc',
		fontSize: 16,
		marginBottom: 5,
	},
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		paddingBottom: 100,
	},
	header: {
		marginBottom: 20,
	},
	subtitle: {
		color: '#ccc',
		fontSize: 16,
		marginBottom: 15,
	},
	title: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 5,
	},
});

export default WithdrawalsScreen;
