import React, { useState, useRef, useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Toolbar from '../components/Toolbar';

const { width, height } = Dimensions.get('window');

type PathType = {
  color: string;
  strokeWidth: number;
  brushType: 'round' | 'square' | 'butt';
  d: string;
};

const DrawingScreen: React.FC = () => {
  const [paths, setPaths] = useState<PathType[]>([]); // Paths finales
  const currentPathRef = useRef<PathType | null>(null); // Path en progreso sin causar re-render
  const pathsRef = useRef<PathType[]>([]); // Guardamos los paths sin causar re-renders
  const [currentColor, setCurrentColor] = useState<string>('black');
  const [brushSize, setBrushSize] = useState<number>(2);
  const [brushType, setBrushType] = useState<'round' | 'square' | 'butt'>('round');

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(1)
        .onStart((event) => {
          // Inicia un nuevo path al comenzar el trazo
          currentPathRef.current = {
            color: currentColor,
            strokeWidth: brushSize,
            brushType: brushType,
            d: `M ${event.x} ${event.y}`,
          };
          // Agregar el nuevo path al estado para que se vea de inmediato
          setPaths([...pathsRef.current, currentPathRef.current]);
        })
        .onUpdate((event) => {
          // Actualizamos el path solo si hay un movimiento significativo
          if (currentPathRef.current) {
            const { x, y } = event;
            const [lastX, lastY] = currentPathRef.current.d.split(' ').slice(-2).map(Number);
            const distance = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);

            if (distance > 1) { // Reducir la distancia mínima para mayor fluidez
              currentPathRef.current.d += ` L ${x} ${y}`;
              // Actualizar el estado para reflejar el cambio en tiempo real
              setPaths([...pathsRef.current, currentPathRef.current]);
            }
          }
        })
        .onEnd(() => {
          // Una vez que el trazo ha terminado, agregamos el path al final
          if (currentPathRef.current) {
            pathsRef.current.push(currentPathRef.current);
            currentPathRef.current = null; // Reset para el siguiente trazo
          }
        })
        .runOnJS(true),
    [currentColor, brushSize, brushType]
  );

  const handleClear = () => {
    pathsRef.current = [];
    setPaths([]); // Limpiar todos los paths
  };

  const handleUndo = () => {
    pathsRef.current = pathsRef.current.slice(0, -1); // Eliminar el último path
    setPaths([...pathsRef.current]);
  };

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
  };

  const handleBrushSizeChange = (size: number) => {
    setBrushSize(size);
  };

  const handleBrushTypeChange = (type: 'round' | 'square' | 'butt') => {
    setBrushType(type);
  };

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <View style={styles.drawingArea}>
          <Svg height={height} width={width} style={styles.svg}>
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
            {/* Dibuja el path en progreso */}
            {currentPathRef.current && (
              <Path
                d={currentPathRef.current.d}
                stroke={currentPathRef.current.color}
                strokeWidth={currentPathRef.current.strokeWidth}
                strokeLinecap={currentPathRef.current.brushType}
                fill="none"
              />
            )}
          </Svg>
        </View>
      </GestureDetector>
      
      <Toolbar 
        onClear={handleClear}
        onColorChange={handleColorChange}
        onBrushSizeChange={handleBrushSizeChange}
        onBrushTypeChange={handleBrushTypeChange}
        onUndo={handleUndo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  drawingArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  svg: {
    flex: 1,
  }
});

export default DrawingScreen;