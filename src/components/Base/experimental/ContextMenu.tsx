import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  Easing,
  Extrapolate,
} from 'react-native-reanimated';

interface ContextMenuProps {
  content: string;
  onOpen: () => void;
  onClose: () => void;
  color: string;
}

const defaultProps: ContextMenuProps = {
  content: 'Menu Content',
  onOpen: () => {},
  onClose: () => {},
  color: 'lightblue',
};

const ContextMenuComponent: React.FC<ContextMenuProps> = (props) => {
  const { content, onOpen, onClose, color } = props;

  const translateY = useSharedValue(0);

  const panGestureHandler = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onOpen();
      translateY.value = withSpring(-100);
    } else if (event.nativeEvent.state === State.END) {
      translateY.value = withSpring(0);
    }
  };

  const menuStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={[styles.trigger, { backgroundColor: color }]}>
          <Text>Long-Press Me</Text>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.menu, menuStyle]}>
        <Text>{content}</Text>
        <TouchableOpacity onPress={() => onClose()}>
          <Text style={styles.closeButton}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

ContextMenuComponent.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trigger: {
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 200,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  closeButton: {
    marginTop: 10,
    color: 'blue',
  },
});

export default ContextMenuComponent;
