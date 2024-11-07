// src/components/Toolbar.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface ToolbarProps {
  onClear: () => void;
  onColorChange: (color: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onClear, onColorChange }) => {
  return (
    <View style={styles.container}>
      <Button title="Clear" onPress={onClear} />
      <Button title="Black" color="black" onPress={() => onColorChange('black')} />
      <Button title="Red" color="red" onPress={() => onColorChange('red')} />
      <Button title="Blue" color="blue" onPress={() => onColorChange('blue')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo semi-transparente
  },
});

export default Toolbar;
