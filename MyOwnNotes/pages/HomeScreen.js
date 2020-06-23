import React, { Component } from 'react';
import * as tudo from 'react-native';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { onChange } from 'react-native-reanimated';
import {translations} from '../services/translations'

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: props.navigation,
      id: '',
      email: '',
      password: '',
      orientation: '',
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
                { text: 'Ok', onPress: () => this.goToMapPage() },
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

  goToMapPage() {
    this.state.navigation.replace('Map', this.state.id);
    console.log('Home: ' + this.state.id)
  }

  componentDidMount() {
    tudo.Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      if (width < height) {
        this.setState({ orientation: 'Portrait' });
      } else {
        this.setState({ orientation: 'Landscape' });
      }
    })
  }

  render() {
    return (
      <tudo.View style={this.state.orientation == 'Landscape' ? styles.fullL : styles.fullP}>

        <tudo.View style={styles.imagePart}>
          <tudo.Image
            style={this.state.orientation == 'Landscape' ? styles.imageP : styles.imageL}
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
              title={translations.btn_entrar}
              onPress={() => this.login(this.state.email, this.state.password)}
            />
          </tudo.View>

          <tudo.Text
            style={styles.underline}
            onPress={() => this.props.navigation.navigate('Notes')}>{translations.anonimo}</tudo.Text>


        </tudo.View>
      </tudo.View>

      
    )
  }
}

const styles = tudo.StyleSheet.create({
  underline: {
    textDecorationLine: 'underline'
  },
  fullP: {
    flex: 1,
    flexDirection: 'column',
  },
  fullL: {
    flex: 1,
    flexDirection: 'row',
  },
  imagePart: {
    flex: 1.5,
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
    //flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageL: {
    flex: 1,
    width: 130,
    height: 30,
  },
  imageP: {
    flex: 0.5,
    width: 130,
    height: 30,
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