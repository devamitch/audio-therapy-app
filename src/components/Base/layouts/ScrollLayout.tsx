import { RefreshControl, type ScrollViewProps } from 'react-native';
import Animated, { SlideInDown, SlideOutUp } from 'react-native-reanimated';

// import AnimatedRefreshControl from '@/components/Base/AnimatedRefreshControl';
import { ALL_COLORS, LayoutStyle } from '@/styles';

type ScrollLayoutProps = ScrollViewProps & {
	refreshing?: boolean;
	onRefresh?: () => void;
};
const ScrollLayout = ({
	refreshing,
	onRefresh,
	children,
	contentContainerStyle,
	...props
}: ScrollLayoutProps) => (
	<Animated.ScrollView
		entering={SlideInDown.delay(200)}
		exiting={SlideOutUp.delay(200)}
		contentContainerStyle={[LayoutStyle.screenLayout, LayoutStyle.fill, contentContainerStyle]}
		refreshControl={
			<RefreshControl
				refreshing={!!refreshing}
				onRefresh={onRefresh}
				colors={[`${ALL_COLORS['primary-text']}`, `${ALL_COLORS.white}`]}
				tintColor={ALL_COLORS['primary-text']}
				progressBackgroundColor="#232323"
			/>
		}
		// refreshControl={<AnimatedRefreshControl loading={!!refreshing} onRefresh={refreshing} />}
		showsHorizontalScrollIndicator={false}
		showsVerticalScrollIndicator={false}
		overScrollMode="never"
		// @ts-ignore
		// initialNumToRender={10}
		removeClippedSubviews
		// @ts-ignore
		windowSize={20}
		decelerationRate="normal"
		// snapToAlignment="center"
		scrollEventThrottle={16}
		{...props}
	>
		{children}
	</Animated.ScrollView>
);

export default ScrollLayout;
