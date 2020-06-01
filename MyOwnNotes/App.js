import React from 'react';
import * as tudo from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Navigator from './routes/Stack';

const Stack = createStackNavigator();

function App({ navigation }) {
  return (
    <Navigator/>
  );
}

export default App;
