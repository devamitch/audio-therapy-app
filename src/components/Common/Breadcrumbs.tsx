import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import type { ParamListBase } from '@react-navigation/core';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Skeleton } from 'moti/skeleton';

import { LayoutStyle, responsive } from '@/styles';

type BreadcrumbsProps<T extends ParamListBase, StringType extends string> = {
	navigation: StackNavigationProp<T> | DrawerNavigationProp<T> | MaterialTopTabNavigationProp<T>;
	list: {
		header?: StringType | keyof T;
		back?: boolean;
		screen?:
			| keyof T
			| {
					name: keyof T;
					params: T[keyof T];
			  };
		loading?: boolean;
	}[];
};

const Breadcrumbs = <T extends ParamListBase, StringType extends string>({
	navigation,
	list,
}: BreadcrumbsProps<T, StringType>) => {
	return (
		<View style={[LayoutStyle.row, LayoutStyle.centerV]}>
			{list.map((item, index) => (
				<TouchableOpacity
					onPress={() => {
						if (typeof item.screen === 'string') {
							// @ts-ignore
							return navigation.navigate(item.screen);
						} else if (
							typeof item.screen === 'object' &&
							item.screen.name &&
							item.screen.params
						) {
							// @ts-ignore
							navigation.navigate(item.screen.name, item.screen.params);
						} else if (item.back && navigation.canGoBack()) navigation.goBack();
					}}
					key={index.toString()}
					disabled={!item.screen && !item.back}
					style={[LayoutStyle.row, LayoutStyle.center, styles.header]}
				>
					{item.loading || !item.header ? (
						<Skeleton height={19 - index} width={60} radius={2} colorMode="light" />
					) : (
						<>
							<Text
								// @ts-ignore
								style={
									Fontstyles({
										index,
									}).header
								}
							>
								{item.header.toString()}
							</Text>
							{list.length !== index + 1 ? (
								<FontAwesome name="angle-right" size={17} color="#616161" />
							) : null}
						</>
					)}
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Breadcrumbs;

const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		gap: 4,
		padding: 5,
		textTransform: 'capitalize',
	},
});

const Fontstyles = StyleSheet.create(({ index }: { index: number }) => ({
	header: {
		fontSize: responsive(17 - index * 2),
		textTransform: 'capitalize',
	},
}));
