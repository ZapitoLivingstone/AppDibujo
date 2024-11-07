// src/components/Toolbar.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Animated } from 'react-native';

interface ToolbarProps {
  onClear: () => void;
  onColorChange: (color: string) => void;
  selectedColor: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ onClear, onColorChange, selectedColor }) => {
  const [expanded, setExpanded] = useState(false);
  const translateY = useState(new Animated.Value(0))[0];

  const toggleToolbar = () => {
    Animated.timing(translateY, {
      toValue: expanded ? 0 : -80,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setExpanded(!expanded);
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={[styles.toolbar, !expanded && styles.collapsedToolbar]}>
        {expanded && (
          <>
            <Button title="Clear" onPress={onClear} />
            <View style={styles.colorButtons}>
              <TouchableOpacity
                style={[styles.colorButton, selectedColor === 'black' && styles.selectedColorButton]}
                onPress={() => onColorChange('black')}
              >
                <View style={[styles.colorSwatch, { backgroundColor: 'black' }]} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorButton, selectedColor === 'red' && styles.selectedColorButton]}
                onPress={() => onColorChange('red')}
              >
                <View style={[styles.colorSwatch, { backgroundColor: 'red' }]} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorButton, selectedColor === 'blue' && styles.selectedColorButton]}
                onPress={() => onColorChange('blue')}
              >
                <View style={[styles.colorSwatch, { backgroundColor: 'blue' }]} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <TouchableOpacity onPress={toggleToolbar} style={styles.handle}>
        <View style={styles.handleIcon} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 10,
    width: '100%',
  },
  colorButtons: {
    flexDirection: 'row',
  },
  colorButton: {
    marginHorizontal: 8,
    padding: 4,
    borderRadius: 4,
  },
  selectedColorButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  handle: {
    width: '100%',
    height: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#999',
  },
  handleIcon: {
    width: 30,
    height: 4,
    backgroundColor: '#666',
    borderRadius: 2,
  },
  collapsedToolbar: {
    height: 0,
    overflow: 'hidden',
  },
});

export default Toolbar;