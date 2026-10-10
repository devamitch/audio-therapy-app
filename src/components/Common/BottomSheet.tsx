import { useCallback } from 'react';
import { Platform, StyleSheet } from 'react-native';
import type { BottomSheetProps } from '@gorhom/bottom-sheet';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

import { useStateStore } from '@/core/store';
import { Colors, ColorStyle } from '@/styles';

interface props extends BottomSheetProps {
	innerRef: React.Ref<BottomSheetModal> | undefined;
}

const BottomSheet = ({ snapPoints, children, innerRef, index }: props) => {
	const setBottomSheetOpen = useStateStore((state) => state.setBottomSheetOpen);

	const closeBottomSheet = useCallback(() => {
		setBottomSheetOpen(false);
	}, [setBottomSheetOpen]);

	const renderBackdrop = useCallback(
		(props: BottomSheetDefaultBackdropProps) => (
			<BottomSheetBackdrop
				opacity={0.85}
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);

	return (
		<BottomSheetModal
			ref={innerRef}
			index={index}
			snapPoints={snapPoints}
			enablePanDownToClose
			backgroundStyle={ColorStyle['bg-black']}
			onDismiss={closeBottomSheet}
			handleStyle={
				Platform.OS === 'ios'
					? ColorStyle['bg-primary-button2']
					: ColorStyle['bg-primary-button2']
			}
			handleIndicatorStyle={
				Platform.OS === 'ios' ? ColorStyle['bg-primary'] : ColorStyle['bg-primary']
			}
			backdropComponent={renderBackdrop}
			style={styles.shadow}
		>
			{children}
		</BottomSheetModal>
	);
};

const styles = StyleSheet.create({
	shadow: {
		elevation: 12,
		...Colors['bg-primary-button2'],
		shadowColor: '#333333',
		shadowOffset: {
			height: 6,
			width: 0,
		},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,
	},
});

export default BottomSheet;
