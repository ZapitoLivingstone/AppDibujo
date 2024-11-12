// src/components/Toolbar.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ToolbarProps {
  onClear: () => void;
  onColorChange: (color: string) => void;
  onBrushSizeChange: (size: number) => void;
  onBrushTypeChange: (type: 'round' | 'square' | 'butt') => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onClear, onColorChange, onBrushSizeChange, onBrushTypeChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.toolbarContainer}>
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <Text style={styles.toggleButton}>{isVisible ? 'Hide Toolbar' : 'Show Toolbar'}</Text>
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.container}>
          <Button title="Clear" onPress={onClear} />
          
          <Text style={styles.label}>Color:</Text>
          <Button title="Red" onPress={() => onColorChange('red')} />
          <Button title="Blue" onPress={() => onColorChange('blue')} />

          <Text style={styles.label}>Brush Size:</Text>
          <Button title="Small" onPress={() => onBrushSizeChange(2)} />
          <Button title="Medium" onPress={() => onBrushSizeChange(5)} />

          <Text style={styles.label}>Brush Type:</Text>
          <Button title="Round" onPress={() => onBrushTypeChange('round')} />
          <Button title="Square" onPress={() => onBrushTypeChange('square')} />
          <Button title="Butt" onPress={() => onBrushTypeChange('butt')} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    padding: 10,
  },
  toggleButton: {
    fontSize: 16,
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

export default Toolbar;
