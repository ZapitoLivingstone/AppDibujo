// src/components/ColorPicker.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange }) => {
  const colors = ['black', 'red', 'blue', 'green', 'yellow'];

  return (
    <View style={styles.container}>
      {colors.map((color) => (
        <Button key={color} title=" " color={color} onPress={() => onColorChange(color)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default ColorPicker;
