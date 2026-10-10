import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';

interface DateSelectorProps {
  dates: string[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  color: string;
}

const defaultProps: DateSelectorProps = {
  dates: [],
  selectedDate: '',
  color: 'lightblue',
  onDateChange: () => {},
};

const DateSelectorComponent: React.FC<DateSelectorProps> = (props) => {
  const { dates, selectedDate, color, onDateChange } = props;

  const dateWidth = 60;
  const selectedIndex = dates.indexOf(selectedDate);

  const translateX = useSharedValue(selectedIndex * dateWidth);

  const selectDate = (dateIndex: number) => {
    translateX.value = withSpring(dateIndex * dateWidth);
    onDateChange(dates[dateIndex]);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onEnd: (event) => {
      const newIndex = Math.min(dates.length - 1, Math.max(0, Math.round(event.translationX / dateWidth)));
      runOnJS(selectDate)(newIndex);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler} onHandlerStateChange={gestureHandler}>
        <Animated.View style={styles.dateSelector}>
          {dates.map((date, index) => (
            <Text
              key={index}
              style={[styles.date, { backgroundColor: date === selectedDate ? color : 'white' }]}
            >
              {date}
            </Text>
          )}
          <Animated.View style={[styles.selectedIndicator, { backgroundColor: color }, animatedStyle]} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

DateSelectorComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dateSelector: {
    flexDirection: 'row',
    height: 40,
  },
  date: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
  },
});

export default DateSelectorComponent;
