import React from 'react';
import * as tudo from 'react-native';

function HomeScreen({ navigation }) {
    return (
      <tudo.View style={styles.full}>
  
        <tudo.View style={styles.imagePart}>
          <tudo.Image
            style={styles.image}
            source={require('../images/marker.png')}
          />
          <tudo.Text style={styles.text}>Login</tudo.Text>
        </tudo.View>
  
        <tudo.View style={styles.insertAndButton}>
          <tudo.TextInput
            style={styles.textinput}
            placeholder='Username'>
          </tudo.TextInput>
          <tudo.TextInput
            style={styles.textinput} secureTextEntry={true}
            placeholder='Password'>
          </tudo.TextInput>
          <tudo.View style={styles.buttonview}>
            <tudo.Button
              color='#ff660d'
              title='Entrar'
            />
          </tudo.View>
        </tudo.View>
  
        <tudo.View style={styles.anonymous}>
          <tudo.Text
            style={styles.underline}
            onPress={() => navigation.navigate('Notes')}>Entrar como anónimo</tudo.Text>
        </tudo.View>
      </tudo.View >
    )
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
      flex: 1,
      width: 150,
      height: 100,
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

  export default HomeScreen;