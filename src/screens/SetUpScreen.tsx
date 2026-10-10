import { useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { shallow } from 'zustand/shallow';

import AppSlider from './AppSlider';

import { toastConfig } from '@/components/Common/ToastConfig';
import { QUERY_CLIENT } from '@/core/config/clients';
import { useAppStore } from '@/core/store';
import { Application } from '@/navigation';

const SetUp = () => {
	const [showOnboarding] = useAppStore(
		useCallback((state) => [!!state.showOnboarding], []),
		shallow
	);

	if (showOnboarding) {
		return <AppSlider />;
	}

	return (
		<QueryClientProvider client={QUERY_CLIENT}>
			<ThemeProvider value={DarkTheme}>
				<Application />
			</ThemeProvider>
			<Toast config={toastConfig} />
		</QueryClientProvider>
	);
};

export default SetUp;
