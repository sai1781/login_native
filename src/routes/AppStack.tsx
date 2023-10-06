import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from '../screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeScreenContainer} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';

export type AppStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
