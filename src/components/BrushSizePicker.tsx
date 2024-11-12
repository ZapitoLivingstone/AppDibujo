import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface BrushSizePickerProps {
  onSizeChange: (size: number) => void;
}

const BrushSizePicker: React.FC<BrushSizePickerProps> = ({ onSizeChange }) => {
  const sizes = [2, 4, 6, 8, 10];

  return (
    <View style={styles.container}>
      {sizes.map((size) => (
        <Button key={size} title={`${size}`} onPress={() => onSizeChange(size)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default BrushSizePicker;
