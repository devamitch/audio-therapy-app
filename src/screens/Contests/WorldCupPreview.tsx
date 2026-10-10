// import { Image, SafeAreaView, SectionList, StyleSheet, Text, View } from 'react-native';
// import Animated, { FadeIn } from 'react-native-reanimated';
import { useMemo } from 'react';
import { SectionList, StyleSheet } from 'react-native';
import { GestureHandlerRootView, RectButton as RectButton2 } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import GradientText, { GradientIconFontisto } from '@/components/Base/GradientText';
// import GestureBu, { GradientIconFontisto }tton from '@/components/Base/buttons/GestureButton';
import { getSchedules } from '@/lib/server/challange';
import { formatDate, isAndroid } from '@/lib/utils';
import { MainStackRouteType } from '@/navigation/main/MainStack';
import { FontSizeColorStyle, LayoutStyle, responsive } from '@/styles';
// import { responsive } from '@/styles';

const RectButton = Animated.createAnimatedComponent(RectButton2);

export const FLAGS = {
	cn: 'https://flagcdn.com/w320/cn.png',
	us: 'https://flagcdn.com/w320/us.png',
	it: 'https://flagcdn.com/w320/it.png',
	nl: 'https://flagcdn.com/w320/nl.png',
	jp: 'https://flagcdn.com/w320/jp.png',
	co: 'https://flagcdn.com/w320/co.png',
	se: 'https://flagcdn.com/w320/se.png',
	pl: 'https://flagcdn.com/w320/pl.png',
	nz: 'https://flagcdn.com/w320/nz.png',
	dk: 'https://flagcdn.com/w320/dk.png',
	pe: 'https://flagcdn.com/w320/pe.png',
	ve: 'https://flagcdn.com/w320/ve.png',
	de: 'https://flagcdn.com/w320/de.png',
	vn: 'https://flagcdn.com/w320/vn.png',
	au: 'https://flagcdn.com/w320/au.png',
	br: 'https://flagcdn.com/w320/br.png',
	ar: 'https://flagcdn.com/w320/ar.png',
	fr: 'https://flagcdn.com/w320/fr.png',
	at: 'https://flagcdn.com/w320/at.png',
	kr: 'https://flagcdn.com/w320/kr.png',
	in: 'https://flagcdn.com/w320/in.png',
	es: 'https://flagcdn.com/w320/es.png',
	ch: 'https://flagcdn.com/w320/ch.png',
	ie: 'https://flagcdn.com/w320/ie.png',
	uy: 'https://flagcdn.com/w320/uy.png',
	sg: 'https://flagcdn.com/w320/sg.png',
	ng: 'https://flagcdn.com/w320/ng.png',
	ro: 'https://flagcdn.com/w320/ro.png',
	be: 'https://flagcdn.com/w320/be.png',
	ca: 'https://flagcdn.com/w320/ca.png',
	mx: 'https://flagcdn.com/w320/mx.png',
	gb: 'https://flagcdn.com/w320/gb.png',
};

const WorldCupPreview: React.FC<MainStackRouteType<'WorldCupPreview'>> = ({ navigation }) => {
	const padding = useSafeAreaInsets();

	const { data = [] } = useQuery({ queryFn: getSchedules, queryKey: ['getSchedules'] });

	const sections = useMemo(() => {
		return data?.map((item) => ({ title: item?.name || '', data: item?.matches || [] }));
	}, [data]);

	return (
		<GestureHandlerRootView style={LayoutStyle.fill}>
			<BlurView
				style={LayoutStyle.fill}
				tint="dark"
				intensity={60}
				experimentalBlurMethod={'dimezisBlurView'}
			>
				<SafeAreaView
					style={LayoutStyle.fill}
					edges={
						isAndroid ? ['top', 'bottom', 'left', 'right'] : ['bottom', 'left', 'right']
					}
				>
					<SectionList
						sections={sections}
						contentContainerStyle={[
							LayoutStyle.screenLayout,
							{ paddingBottom: responsive(200) },
						]}
						renderSectionHeader={({ section: { title } }) => (
							<BlurView
								tint="dark"
								intensity={100}
								experimentalBlurMethod={'dimezisBlurView'}
								style={{
									padding: responsive(20),
									borderRadius: responsive(4),
									overflow: 'hidden',
								}}
							>
								<GradientText
									colors={['#C2EBFF', '#59b3e3cc', '#f1f1f1']}
									style={[
										FontSizeColorStyle['lato-900-xl-primary-text'],
										{ textTransform: 'capitalize' },
									]}
									start={{ x: 1, y: 0 }}
								>
									{title}
								</GradientText>
							</BlurView>
						)}
						renderItem={({ item }) => (
							<RectButton style={{ borderRadius: 5, overflow: 'hidden', flex: 1 }}>
								<BlurView
									style={{ flex: 1 }}
									tint="dark"
									intensity={100}
									experimentalBlurMethod={'dimezisBlurView'}
								>
									<Animated.View
										style={{
											flex: 1,
										}}
									>
										{
											<Animated.View
												style={{
													position: 'absolute',
													top: responsive(8),
													left: -responsive(28),
													transform: [{ rotate: '-40deg' }],
													width: responsive(100),
												}}
											>
												<LinearGradient
													colors={
														item?.status
															? item?.status === 0
																? ['#5A9EFF', '#005CFF']
																: item?.status === 3
																	? ['#570987', '#5D3FD3']
																	: item?.status === 2
																		? [
																				'#E09B3D',

																				'#FF5A49',
																				'#dc143c',
																			]
																		: item?.status === 1
																			? ['#2DBC6F', '#09691c']
																			: ['#00BCFD', '#006582']
															: [
																	'rgba(0, 0, 0, 0.25)',
																	'rgba(0, 0, 0, 0.5)',
																]
													}
													style={{
														padding: responsive(3),
														alignItems: 'center',
														justifyContent: 'center',
													}}
													start={{ x: 1, y: 0 }}
												>
													<GradientText
														colors={['#EBEBEB', '#fff']}
														style={[
															FontSizeColorStyle[
																'heebo-600-xxs-white'
															],
															{
																fontSize: item?.status
																	? responsive(9)
																	: responsive(6),
															},
														]}
													>
														{item?.status
															? item?.status === 0
																? 'Upcoming'
																: item?.status === 1
																	? 'Live'
																	: item?.status === 1
																		? 'Completed'
																		: 'Declared'
															: 'Not Started'}
													</GradientText>
												</LinearGradient>
											</Animated.View>
										}
										<Animated.View
											style={{
												gap: responsive(10),
												alignItems: 'center',
												flexDirection: 'row',
												alignItems: 'center',
												padding: responsive(10),
												paddingHorizontal: responsive(20),

												backgroundColor: 'rgba(255,255,255,0.05)',
												minHeight: responsive(100),
											}}
										>
											<Animated.Text
												style={[
													FontSizeColorStyle['lato-900-18-white'],
													{
														textTransform: 'capitalize',
														width: responsive(30),
													},
												]}
												numberOfLines={1}
												adjustFontSizeToFit
											>
												{item?.matchNumber}
											</Animated.Text>
											<Animated.View
												style={{
													flex: 1,

													gap: responsive(5),
													justifyContent: 'space-between',
													alignItems: 'center',
													flexDirection: 'row',
												}}
											>
												{item?.flagA ? (
													<Animated.Image
														source={{ uri: item?.flagA }}
														style={{
															height: responsive(50),
															width: responsive(100),
															opacity: item?.winner?.country
																? item?.winner?.country ===
																	item?.teamA
																	? 1
																	: 0.5
																: 0.95,
														}}
													/>
												) : (
													<Animated.Text
														style={[
															FontSizeColorStyle[
																'lato-700-xxs-white'
															],
															{
																textTransform: 'capitalize',
																textAlign: 'flex-start',
																width: responsive(100),
																opacity: item?.winner?.country
																	? item?.winner?.country ===
																		item?.teamA
																		? 1
																		: 0.5
																	: 0.95,
															},
														]}
													>
														{item?.teamA}
													</Animated.Text>
												)}
												<GradientText
													style={[
														FontSizeColorStyle['lato-700-16-white'],
														{
															textAlign: 'center',
															width: responsive(30),
															fontFamily: 'Moonwalk',
														},
													]}
												>
													{'VS'}
												</GradientText>

												{item?.flagB ? (
													<Animated.Image
														source={{ uri: item?.flagB }}
														style={{
															height: responsive(50),
															width: responsive(100),
															opacity: item?.winner?.country
																? item?.winner?.country ===
																	item?.teamB
																	? 1
																	: 0.5
																: 0.95,
														}}
													/>
												) : (
													<Animated.Text
														style={[
															FontSizeColorStyle[
																'lato-700-xxs-white'
															],
															{
																textTransform: 'capitalize',
																textAlign: 'flex-end',
																width: responsive(100),
																opacity: item?.winner?.country
																	? item?.winner?.country ===
																		item?.teamB
																		? 1
																		: 0.5
																	: 0.95,
															},
														]}
													>
														{item?.teamB}
													</Animated.Text>
												)}
											</Animated.View>
										</Animated.View>
										{item?.startDate || item?.endDate ? (
											<LinearGradient
												colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.1)']}
												start={{ x: 0, y: 1 }}
												style={{
													padding: responsive(5),
													paddingHorizontal: responsive(20),
													alignItems: 'center',
													justifyContent: 'space-between',
													flexDirection: 'row',
												}}
											>
												<Animated.Text
													style={[
														FontSizeColorStyle['lato-700-xxs-white'],
														{
															textTransform: 'capitalize',
															textAlign: 'flex-end',
															width: responsive(200),
														},
													]}
												>
													{item?.startDate
														? ` Starting on: ${formatDate(item?.startDate)}`
														: ''}
												</Animated.Text>
												<Animated.Text
													style={[
														FontSizeColorStyle['lato-700-xxs-white'],
														{
															textTransform: 'capitalize',
															textAlign: 'flex-end',
															width: responsive(200),
														},
													]}
												>
													{item?.endDate
														? ` Ending on: ${formatDate(item?.endDate)}`
														: ''}
												</Animated.Text>
											</LinearGradient>
										) : null}
									</Animated.View>
								</BlurView>
							</RectButton>
						)}
						ListHeaderComponent={
							<>
								<GradientText
									style={FontSizeColorStyle['montserrat-900-xl-white']}
									start={{ x: 1, y: 0 }}
								>
									World Cup
								</GradientText>
								<RectButton
									style={styles.back}
									onPress={() => navigation?.goBack()}
								>
									<GradientIconFontisto
										name="close-circle"
										color="white"
										size={responsive(20)}
									/>
								</RectButton>
							</>
						}
						ListHeaderComponentStyle={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
						stickyHeaderIndices={[0]}
					/>
				</SafeAreaView>
			</BlurView>
		</GestureHandlerRootView>
	);
};

export default WorldCupPreview;
const styles = StyleSheet.create({
	back: {
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,0.1)',
		borderRadius: 15,
		height: 30,
		justifyContent: 'center',
		width: 30,
	},
});
