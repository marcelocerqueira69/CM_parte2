import * as React from 'react';
import * as tudo from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './../pages/HomeScreen';
import Notes from './../pages/NotesScreen';
import AddNote from './../pages/AddNoteScreen';
import EditDelete from './../pages/EditDeleteNote';

const Stack = createStackNavigator();

function NotasStack({ navigation }) {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home'
                    component={Home}
                    options={{
                        headerStyle: { backgroundColor: '#ff660d' },
                    }} />

                <Stack.Screen name="Notes"
                    component={Notes}
                    options={{
                        header: () => null
                    }} />

                <Stack.Screen name='AddNote'
                    component={AddNote}
                    options={{
                        headerStyle: { backgroundColor: '#ff660d' },
                    }} />
                
                <Stack.Screen name='EditDelete'
                    component={EditDelete}
                    options={{
                        headerStyle: { backgroundColor: '#ff660d' },
                    }}/>
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default NotasStack;