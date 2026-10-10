import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TabBarProps {
	tabs: string[];
	color: string;
}

const defaultProps: TabBarProps = {
	tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
	color: 'lightblue',
};

const TabBarComponent: React.FC<TabBarProps> = (props) => {
	const { tabs, color } = props;

	const [activeTab, setActiveTab] = useState(0);

	const changeTab = (index: number) => {
		setActiveTab(index);
	};

	return (
		<View style={styles.container}>
			<View style={styles.tabContainer}>
				{tabs.map((tab, index) => (
					<TouchableOpacity key={index} onPress={() => changeTab(index)}>
						<View
							style={[
								styles.tab,
								index === activeTab ? { backgroundColor: color } : {},
							]}
						>
							<Text
								style={[
									styles.tabText,
									index === activeTab ? { color: 'white' } : {},
								]}
							>
								{tab}
							</Text>
						</View>
					</TouchableOpacity>
				))}
			</View>
			<View style={styles.tabContent}>
				<Text>{tabs[activeTab]} content goes here</Text>
			</View>
		</View>
	);
};

TabBarComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	tab: {
		alignItems: 'center',
		borderRadius: 20,
		height: 40,
		justifyContent: 'center',
		margin: 5,
		width: 80,
	},
	tabContainer: {
		flexDirection: 'row',
	},
	tabContent: {
		marginTop: 10,
	},
	tabText: {
		fontSize: 16,
	},
});

export default TabBarComponent;
