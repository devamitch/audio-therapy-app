import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface TabsProps {
	tabs: string[];
	activeTab: string;
	onTabChange: (tab: string) => void;
	color: string;
}

const defaultProps: TabsProps = {
	tabs: [],
	activeTab: '',
	color: 'lightblue',
	onTabChange: () => {},
};

const TabsComponent: React.FC<TabsProps> = (props) => {
	const { tabs, activeTab, color, onTabChange } = props;

	const tabWidth = 200 / tabs.length;

	const activeTabIndex = tabs.indexOf(activeTab);

	const translateX = useSharedValue(activeTabIndex * tabWidth);

	const switchTab = (tabIndex: number) => {
		translateX.value = withSpring(tabIndex * tabWidth);
		onTabChange(tabs[tabIndex]);
	};

	const gestureHandler = useAnimatedGestureHandler({
		onEnd: (event) => {
			const newIndex = Math.min(tabs.length - 1, Math.max(0, Math.floor(event.x / tabWidth)));

			runOnJS(switchTab)(newIndex);
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		};
	});

	return (
		<View style={styles.container}>
			<TapGestureHandler onHandlerStateChange={gestureHandler}>
				<Animated.View style={styles.tabsContainer}>
					{tabs.map((tab, index) => (
						<TouchableOpacity key={index} onPress={() => switchTab(index)}>
							<View style={styles.tab}>
								<Text
									style={[
										styles.tabText,
										{ color: tab === activeTab ? 'white' : 'black' },
									]}
								>
									{tab}
								</Text>
							</View>
						</TouchableOpacity>
					))}
					<Animated.View
						style={[
							styles.activeTabIndicator,
							{ backgroundColor: color },
							animatedStyle,
						]}
					/>
				</Animated.View>
			</TapGestureHandler>
		</View>
	);
};

TabsComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	activeTabIndicator: {
		bottom: 0,
		height: 2,
		position: 'absolute',
	},
	container: {
		alignItems: 'center',
	},
	tab: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	tabText: {
		fontSize: 18,
	},
	tabsContainer: {
		flexDirection: 'row',
		height: 40,
	},
});

export default TabsComponent;
