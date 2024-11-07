// src/screens/DrawingScreen.tsx
import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Toolbar from '../components/Toolbar';

const { width, height } = Dimensions.get('window');

const DrawingScreen: React.FC = () => {
  const [paths, setPaths] = useState<{ color: string; d: string }[]>([]);
  const [currentColor, setCurrentColor] = useState<string>('black');
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        const x = gestureState.x0.toFixed(3);
        const y = gestureState.y0.toFixed(3);
        setPaths((prevPaths) => [
          ...prevPaths,
          { color: currentColor, d: `M${x},${y}` }
        ]);
      },
      onPanResponderMove: (_, gestureState) => {
        const x = gestureState.moveX.toFixed(3);
        const y = gestureState.moveY.toFixed(3);
        setPaths((prevPaths) => {
          const newPaths = [...prevPaths];
          const lastPath = newPaths.pop();
          if (lastPath) {
            lastPath.d += ` L${x},${y}`;
            newPaths.push(lastPath);
          }
          return newPaths;
        });
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  const handleClear = () => setPaths([]);

  const handleColorChange = (color: string) => setCurrentColor(color);

  return (
    <View style={styles.container}>
      <Svg height={height} width={width} style={styles.svg} {...panResponder.panHandlers}>
        {paths.map((path, index) => (
          <Path
            key={index}
            d={path.d}
            stroke={path.color}
            strokeWidth={3}
            fill="none"
          />
        ))}
      </Svg>
      <Toolbar onClear={handleClear} onColorChange={handleColorChange} selectedColor={currentColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  svg: {
    flex: 1,
  },
});

export default DrawingScreen;
