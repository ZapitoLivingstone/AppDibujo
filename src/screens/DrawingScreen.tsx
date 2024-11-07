// src/screens/DrawingScreen.tsx
import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Toolbar from '../components/Toolbar';

const { width, height } = Dimensions.get('window');

const DrawingScreen: React.FC = () => {
  const [paths, setPaths] = useState<{ color: string; d: string }[]>([]);
  const [currentPath, setCurrentPath] = useState<string>(''); // Renderizado en tiempo real
  const [currentColor, setCurrentColor] = useState<string>('black');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        // Comienza un nuevo camino en la posición inicial
        const x = gestureState.x0.toFixed(0);
        const y = gestureState.y0.toFixed(0);
        setCurrentPath(`M${x},${y}`);
      },
      onPanResponderMove: (_, gestureState) => {
        const x = gestureState.moveX.toFixed(0);
        const y = gestureState.moveY.toFixed(0);
        setCurrentPath((prevPath) => `${prevPath} L${x},${y}`);
      },
      onPanResponderRelease: () => {
        // Guardar el camino final en `paths`
        setPaths((prevPaths) => [
          ...prevPaths,
          { color: currentColor, d: currentPath },
        ]);
        setCurrentPath(''); // Limpiar el trazo temporal
      },
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
        {/* Dibuja el trazo en curso sin actualizar el estado principal */}
        {currentPath ? (
          <Path d={currentPath} stroke={currentColor} strokeWidth={3} fill="none" />
        ) : null}
      </Svg>
      <Toolbar onClear={handleClear} onColorChange={handleColorChange} />
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
