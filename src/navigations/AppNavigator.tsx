// src/navigations/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DrawingScreen from '../screens/DrawingScreen';

export type RootStackParamList = {
  Home: undefined;
  Drawing: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Drawing" component={DrawingScreen} options={{ title: 'Dibujo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
