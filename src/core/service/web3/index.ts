import { getDefaultProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';

import { WEB3_LOG } from '@/core/config/logger';
import { useAppStore } from '@/core/store';
import type { WalletDataType } from '@/core/store/types/user';

export const createWallet = async () => {
	useAppStore.setState({
		_wallet_status: 'loading',
	});

	const provider = getDefaultProvider(
		'https://polygon-mumbai.g.alchemy.com/v2/7oBdHVD2TIpQairAl25rPkIICC2tAsPg'
	);

	const promise = new Promise(
		(resolve: (value: WalletDataType) => void, reject: (reason: Error) => void) => {
			setTimeout(() => {
				try {
					const walletData = Wallet.createRandom(provider);

					const wallet = {
						address: walletData.address,
						phrase: walletData.mnemonic.phrase,
						privateKey: walletData.privateKey,
					} satisfies WalletDataType;

					resolve(wallet);
				} catch (err) {
					WEB3_LOG.error(err);
					useAppStore.setState({
						_wallet_status: 'fail',
					});
					if (err instanceof Error) {
						reject(err);
					}
				}
			}, 300);
		}
	);

	return promise;
};

export const importWallet = async ({
	privatekey: privateKey,
}: {
	privatekey: string;
}): Promise<WalletDataType> => {
	useAppStore.setState({
		_wallet_status: 'loading',
	});

	const promise = new Promise(
		(resolve: (value: WalletDataType) => void, reject: (reason: Error) => void) => {
			setTimeout(() => {
				try {
					const walletData = new Wallet(privateKey);

					const wallet = {
						address: walletData.address,
						privateKey: walletData.privateKey,
					} satisfies WalletDataType;

					resolve(wallet);
				} catch (err) {
					WEB3_LOG.error(err);
					useAppStore.setState({
						_wallet_status: 'fail',
					});
					if (err instanceof Error) {
						reject(err);
					}
				}
			}, 300);
		}
	);

	return promise;
};
