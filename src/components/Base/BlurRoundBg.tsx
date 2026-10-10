import { StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import { IMAGES } from '@/assets';
import { responsive } from '@/styles';

const BlurRoundBg = () => (
	<Animated.Image
		entering={FadeInDown.delay(400)}
		exiting={FadeOutDown.delay(200)}
		source={IMAGES.blurRound}
		style={styles.image}
	/>
);

export default BlurRoundBg;

const styles = StyleSheet.create({
	image: {
		height: responsive(400),
		position: 'absolute',
		right: 0,
		top: responsive(100),
		width: responsive(200),
	},
});
