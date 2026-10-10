import { ArtistType } from '@/lib/server/challange';
import { SearchPlayerParam } from '@/navigation/types';

export type SliceState = {
	pageIndex: number;
	bottomSheetOpen: boolean;
	socialLoading?: boolean;
	backendConnecting?: boolean;
	tempSelectedStars?: Partial<Record<SearchPlayerParam, ArtistType[]>>;
	tempAppleToken?: string;
};

export type StateSliceActions = {
	setPageIndex: (pageIndex: SliceState['pageIndex']) => void;
	setTempAppleToken: (tempAppleToken: SliceState['tempAppleToken']) => void;
	setBottomSheetOpen: (bottomSheetOpen: boolean) => void;
	setSocialLoading: (socialLoading?: boolean) => void;
	setBackendConnecting: (backendConnecting?: boolean) => void;
	selectTempStar: (type: SearchPlayerParam, artist: ArtistType) => void;
	clearStars: () => void;
	setTempStars: (tempSelectedStars: SliceState['tempSelectedStars']) => void;
	reset: () => void;
};

export type StateSliceType = SliceState & StateSliceActions;
