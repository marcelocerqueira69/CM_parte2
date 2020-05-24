/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
/*import {
  Image,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';*/

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

import HomeScreen from './pages/HomeScreen';
import NotesScreen from './pages/NotesScreen';
import AddNoteScreen from './pages/AddNoteScreen';

const Stack = createStackNavigator();

function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} 
          options={{
            headerStyle: {backgroundColor: '#ff660d'},
          }}
        />

        <Stack.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            header: () => null
            //headerStyle: {backgroundColor: '#ff660d'},
            /*headerRight: ({navigation}) => (
              <tudo.TouchableOpacity onPress={() => navigation.navigate('AddNote')}>
                  <tudo.Image style={styles.image}
                  source={require('./images/add_note.png')} />
              </tudo.TouchableOpacity> 
            ),*/
          }}
        />

      <Stack.Screen 
        name='AddNote' 
        component={AddNoteScreen} 
        options={{
          headerStyle: {backgroundColor: '#ff660d'},
        }}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = tudo.StyleSheet.create({
  underline: {
    textDecorationLine: 'underline'
  },
  full: {
    flex: 1,
    flexDirection: 'column',
  },
  imagePart: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insertAndButton: {
    margin: 40,
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  anonymous: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonview: {
    flex: 1,
    margin: 10,
    width: 250,
  },
  text: {
    color: 'black',
    fontSize: 25,
  },
  textinput: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
});

export default App;
