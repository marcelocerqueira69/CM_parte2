import React, { Component } from 'react';
import * as tudo from 'react-native';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      navigation: props.navigation,
      id:'',
      email: '',
      password: '',
    }

  }

  login = (email, password) => {
    if (email == '' && password == '') {
      tudo.Alert.alert(
        'Login',
        'Tem de inserir um email e uma password',
        [
          { text: 'Ok', style: 'cancel' },
        ]
      )
    } else if (email != '' && password == '') {
      tudo.Alert.alert(
        'Login',
        'Tem de inserir uma password',
        [
          { text: 'Ok', style: 'cancel' },
        ]
      )
    } else if (email == '' && password != '') {
      tudo.Alert.alert(
        'Login',
        'Tem de inserir um email',
        [
          { text: 'Ok', style: 'cancel' },
        ]
      )
    } else {
      return axios.post("http://192.168.1.67:4000/user/login", {
        email: email,
        password: password
      })
        .then(function (response) {
          var token = response.data;
          var decoded = jwt_decode(token);
        
          this.state.id = decoded.id_user;
          if (email == decoded.email) {
            tudo.Alert.alert(
              'Login',
              'Login efetuado com sucesso',
              [
                { text: 'Ok', onPress: () =>  this.goToMapPage()},
              ]
            )
          } else {
            tudo.Alert.alert(
              'Login',
              'Login falhou',
              [
                { text: 'Não', style: 'cancel' },
              ]
            )
          }
        }.bind(this))
        .catch((error) => {
          console.log(error);
        });

      /*fetch('http://192.168.1.67:4000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })
        .then(response => {
          var token = response.data;
          var tokencoiso = 'token: ' + token;
          console.log(tokencoiso);
          
          var decoded = jwt_decode(token);
          var decodedcoiso = 'decoded: ' + decoded;
          console.log(decodedcoiso);

          if (email == decoded.email) {
            tudo.Alert.alert(
              'Login',
              'Login efetuado com sucesso',
              [
                { text: 'Ok', onPress: () => this.props.navigation.navigate('Map') },
              ]
            )
          } else {
            tudo.Alert.alert(
              'Login',
              'Login falhou',
              [
                { text: 'Não', style: 'cancel' },
              ]
            )
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }*/

    }
  }

  goToMapPage(){
    this.state.navigation.replace('Map', this.state.id);
    console.log('Home: ' + this.state.id)
  }

    render() {
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
              placeholder='Email'
              onChangeText={(email) => this.setState({ email })}>
            </tudo.TextInput>
            <tudo.TextInput
              style={styles.textinput} secureTextEntry={true}
              placeholder='Password'
              onChangeText={(password) => this.setState({ password })}>
            </tudo.TextInput>
            <tudo.View style={styles.buttonview}>
              <tudo.Button
                color='#ff660d'
                title='Entrar'
                onPress={() => this.login(this.state.email, this.state.password)}
              />
            </tudo.View>
          </tudo.View>

          <tudo.View style={styles.anonymous}>
            <tudo.Text
              style={styles.underline}
              onPress={() => this.props.navigation.navigate('Notes')}>Entrar como anónimo</tudo.Text>
          </tudo.View>
        </tudo.View >
      )
    }
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