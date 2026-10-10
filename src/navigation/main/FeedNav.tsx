import { useCallback, useState } from 'react';
import {
	initialWindowMetrics,
	SafeAreaProvider,
	SafeAreaView,
} from 'react-native-safe-area-context';
import { SceneMap, TabView } from 'react-native-tab-view';
import { shallow } from 'zustand/shallow';

import { TopNav } from '@/components/Common';
import { useStateStore } from '@/core/store';
import { windowWidth } from '@/lib/utils';
import { DiscoverScreen, NewsScreen } from '@/screens';
import { LayoutStyle } from '@/styles';

const FeedNav = () => {
	const index = useStateStore(
		useCallback((state) => state.pageIndex, []),
		shallow
	);

	const setIndex = useStateStore(useCallback((state) => state.setPageIndex, []));

	const [routes] = useState([
		{
			key: 'first',
			title: 'Discover',
		},
		{
			key: 'second',
			title: 'News',
		},
	]);

	const renderScene = SceneMap({
		first: DiscoverScreen,
		second: NewsScreen,
	});

	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<SafeAreaView style={LayoutStyle.fill} edges={['top', 'left', 'right']}>
				<TabView
					navigationState={{
						index,
						routes,
					}}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={{
						width: windowWidth,
					}}
					renderTabBar={() => <TopNav index={index} setIndex={setIndex} />}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default FeedNav;
