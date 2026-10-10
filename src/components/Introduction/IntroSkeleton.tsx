import { useCallback } from 'react';
import { View } from 'react-native';
import { shallow } from 'zustand/shallow';

import { MotiWrapper, RoundSkeleton, Spacer } from '@/components';
import { useAppStore } from '@/core/store';

const justifyContent = 'center';

const alignSelf = 'flex-end';

const IntroSkeleton = () => {
	const userType = useAppStore(
		useCallback((state) => state?.userType, []),
		shallow
	);

	return (
		<MotiWrapper
			layout={userType === 'volunteer' ? 'volunteerIntro' : 'donorIntro'}
			style={{ justifyContent }}
		>
			<View style={{ alignSelf }}>
				<RoundSkeleton width={300} height={480} />
			</View>
			<Spacer height={50} />
			<View>
				<RoundSkeleton width="100%" height={70} />
				<Spacer height={20} />
				<RoundSkeleton width="100%" height={70} />
			</View>
		</MotiWrapper>
	);
};

export default IntroSkeleton;
