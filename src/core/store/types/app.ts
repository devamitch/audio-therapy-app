export type AppSliceState = {
	showOnboarding: boolean;
	hasWallet?: boolean;
	fcmToken?: string;
	takeTour?: boolean;
	_hydrate?: boolean;
	showIntro?: boolean;
	skipped?: boolean;
	deleted?: boolean;
	deletedSettingClosed?: boolean;
};

export type AppSliceActions = {
	setShowIntro: (showIntro: boolean) => void;
	setTakeTour: (takeTour?: boolean) => void;
	setShowOnboarding: (showOnboarding: boolean) => void;
	setHasWallet?: (hasWallet: boolean) => void;
	setSkipped: (skipped?: boolean) => void;
	hydrate: () => void;
};

export type AppSliceType = AppSliceState & AppSliceActions;
