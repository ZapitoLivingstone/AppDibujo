// src/components/BrushTypePicker.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface BrushTypePickerProps {
  onTypeChange: (type: 'round' | 'square' | 'butt') => void; 
}

const BrushTypePicker: React.FC<BrushTypePickerProps> = ({ onTypeChange }) => {
  const types: Array<'round' | 'square' | 'butt'> = ['round', 'square', 'butt']; // Ajuste a 'butt'

  return (
    <View style={styles.container}>
      {types.map((type) => (
        <Button key={type} title={type} onPress={() => onTypeChange(type)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default BrushTypePicker;
