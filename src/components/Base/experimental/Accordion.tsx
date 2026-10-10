import { StyleSheet, Text, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface AccordionProps {
	title: string;
	content: string;
	color: string;
}

const defaultProps: AccordionProps = {
	title: 'Accordion Title',
	content: 'Accordion Content',
	color: 'lightblue',
};

const AccordionComponent: React.FC<AccordionProps> = (props) => {
	const { title, content, color } = props;

	const isOpen = useSharedValue(false);

	const toggleAccordion = () => {
		isOpen.value = withSpring(!isOpen.value);
	};

	const gestureHandler = useAnimatedGestureHandler({
		onEnd: () => {
			runOnJS(toggleAccordion)();
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			height: isOpen.value ? withSpring(120) : withSpring(40),
		};
	});

	return (
		<View style={styles.container}>
			<TapGestureHandler onHandlerStateChange={gestureHandler}>
				<Animated.View style={[styles.title, { borderColor: color }]}>
					<Text style={styles.titleText}>{title}</Text>
				</Animated.View>
			</TapGestureHandler>
			<Animated.View style={[styles.content, animatedStyle]}>
				<Text style={styles.contentText}>{content}</Text>
			</Animated.View>
		</View>
	);
};

AccordionComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	content: {
		overflow: 'hidden',
		width: 200,
	},
	contentText: {
		fontSize: 18,
		paddingHorizontal: 10,
	},
	title: {
		alignItems: 'center',
		borderWidth: 2,
		height: 40,
		justifyContent: 'center',
		width: 200,
	},
	titleText: {
		fontSize: 18,
	},
});

export default AccordionComponent;
