// src/components/Toolbar.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import BrushTypePicker from './BrushTypePicker';
import BrushSizePicker from './BrushSizePicker';
import ColorPicker from './ColorPicker';

interface ToolbarProps {
  onClear: () => void;
  onColorChange: (color: string) => void;
  onBrushSizeChange: (size: number) => void;
  onBrushTypeChange: (type: 'round' | 'square' | 'butt') => void;
  onUndo: () => void; // Nueva función para deshacer
}

const Toolbar: React.FC<ToolbarProps> = ({ onClear, onColorChange, onBrushSizeChange, onBrushTypeChange, onUndo }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View style={styles.toolbarContainer}>
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <Text style={styles.toggleButtonText}>{isVisible ? 'Ocultar Herramientas' : 'Mostrar Herramientas'}</Text>
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.pickerContainer}>
          <Button title="Limpiar" onPress={onClear} />
          <Button title="Deshacer" onPress={onUndo} />
          <ColorPicker onColorChange={onColorChange} />
          <BrushSizePicker onSizeChange={onBrushSizeChange} />
          <BrushTypePicker onTypeChange={onBrushTypeChange} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  toggleButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Toolbar;