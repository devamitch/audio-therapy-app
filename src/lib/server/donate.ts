import { URLS } from '@/constants/urls';
import axios from '@/core/service/axios';

type DonationSaveParam = {
	user?: { name?: string; email?: string; phone?: string; amount?: number; purpose?: string };
	_id?: string;
	amount?: number;
	purpose?: string;
	transactionId?: string;
};

type DonationHistoryParam = {
	donorType?: string;
	email?: string;
	phone_number?: string;
};

type DonationResponseParam = {
	success: boolean;
	message: string;
	data: DonationParams;
};
type DonationParams = {
	donationData?: DonationDataParams;
	karmaPoints?: { _id?: string; karmaPoints?: number };
	totalAmount?: number;
};

type DonationDataParams = {
	_id?: string;
	userId?: string;
	amount?: number;
	purpose?: string;
	transactionId?: string;
	donatedOn: string;
};

export const fetchDonationHistory = async (data: DonationHistoryParam) => {
	const { data: res } = (
		await axios.post<DonationHistoryParam, { data: DonationResponseParam }>(
			URLS.donationHistory,
			data
		)
	)?.data;

	return res;
};

export const donationSave = async (data: DonationSaveParam) => {
	(
		await axios.post<
			DonationSaveParam,
			{
				data: {
					success: boolean;
					message: string;
				};
			}
		>(URLS.donationSave, data)
	).data;
};
