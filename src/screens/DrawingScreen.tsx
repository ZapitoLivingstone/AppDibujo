// src/screens/DrawingScreen.tsx
import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Toolbar from '../components/Toolbar';

const { width, height } = Dimensions.get('window');

type PathType = {
  color: string;
  strokeWidth: number;
  brushType: 'round' | 'square' | 'butt'; 
  d: string;
};

const DrawingScreen: React.FC = () => {
  const [paths, setPaths] = useState<PathType[]>([]);
  const [currentColor, setCurrentColor] = useState<string>('black');
  const [brushSize, setBrushSize] = useState<number>(3);
  const [brushType, setBrushType] = useState<'round' | 'square' | 'butt'>('round'); // Ajuste a 'butt'
  const [currentPath, setCurrentPath] = useState<string>('');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        const x = gestureState.x0.toFixed(2);
        const y = gestureState.y0.toFixed(2);
        setCurrentPath(`M${x},${y}`);
      },
      onPanResponderMove: (_, gestureState) => {
        const x = gestureState.moveX.toFixed(2);
        const y = gestureState.moveY.toFixed(2);
        setCurrentPath((prevPath) => `${prevPath} L${x},${y}`);
      },
      onPanResponderRelease: () => {
        if (currentPath) {
          setPaths((prevPaths) => [
            ...prevPaths,
            { color: currentColor, strokeWidth: brushSize, brushType, d: currentPath },
          ]);
          setCurrentPath('');
        }
      },
    })
  ).current;

  const handleClear = () => setPaths([]);

  return (
    <View style={styles.container}>
      <Svg height={height} width={width} style={styles.svg} {...panResponder.panHandlers}>
        {paths.map((path, index) => (
          <Path
            key={index}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.strokeWidth}
            strokeLinecap={path.brushType} 
            fill="none"
          />
        ))}
        {currentPath && (
          <Path
            d={currentPath}
            stroke={currentColor}
            strokeWidth={brushSize}
            strokeLinecap={brushType} 
            fill="none"
          />
        )}
      </Svg>
      <Toolbar
        onClear={handleClear}
        onColorChange={setCurrentColor}
        onBrushSizeChange={setBrushSize}
        onBrushTypeChange={setBrushType}
      />
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
