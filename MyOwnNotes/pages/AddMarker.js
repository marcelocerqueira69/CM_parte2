import React, { Component } from 'react';
import * as tudo from 'react-native';
import axios from 'axios';

class AddMarker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.route.params.id,
            latitude: this.props.route.params.latitude,
            longitude: this.props.route.params.longitude,
            navigation: props.navigation,
            assunto: '',
            descricao: '',
        }

    }

    takePicture() {
        try {
            if (this.camera) {
                const options = {
                    quality: 0.5,
                    base64: true,
                    forceUpOrientation: true,
                    fixOrientation: true,
                }

                const data = this.camera.takePictureAsync(options);
            }
        } catch (err) {
            alert(err);
        }
    }

    addMarker = (assunto, descricao) => {
        if (assunto == '' && descricao == '') {
            tudo.Alert.alert(
                'Login',
                'Tem de inserir um assunto e uma descricao',
                [
                    { text: 'Ok', style: 'cancel' },
                ]
            )
        } else if (assunto != '' && descricao == '') {
            tudo.Alert.alert(
                'Login',
                'Tem de inserir uma descricao',
                [
                    { text: 'Ok', style: 'cancel' },
                ]
            )
        } else if (assunto == '' && descricao != '') {
            tudo.Alert.alert(
                'Login',
                'Tem de inserir um assunto',
                [
                    { text: 'Ok', style: 'cancel' },
                ]
            )
        }else {
            return axios.post("http://192.168.1.67:4000/pontos/createPonto/", {
                assunto: assunto,
                descricao: descricao,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                id_user: this.state.id
            })
                .then(function (response) {

                    tudo.Alert.alert(
                        'Adição de marcador',
                        'Ponto adicionado com sucesso',
                        [
                            { text: 'Ok', onPress: () => this.goToMapPage() },
                        ]
                    )

                }.bind(this))
                .catch((error) => {
                    console.log(error);
                });
        }

    }

    goToMapPage() {
        this.state.navigation.replace('Map', this.state.id);
    }

    componentDidMount() {
        console.log(this.state.latitude + " - " + this.state.longitude);
    }

    render() {
        return (/*
            <tudo.View style={styles.full}>
                <RNCamera style={styles.camera}
                    ref={camera => {
                        this.camera = camera;
                    }}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                > </RNCamera>

                <tudo.View style={styles.resto}>
                    <tudo.Button onPress={this.takePicture()}>Tirar Foto</tudo.Button>
                </tudo.View>
            </tudo.View>*/
            <tudo.View style={styles.full}>
                <tudo.View style={styles.imagePart}>
                    <tudo.TextInput
                        style={styles.textinput}
                        placeholder='Assunto'
                        onChangeText={(assunto) => this.setState({ assunto })}>
                    </tudo.TextInput>
                    <tudo.TextInput
                        style={styles.textinput}
                        placeholder='Descricao'
                        onChangeText={(descricao) => this.setState({ descricao })}>
                    </tudo.TextInput>
                    <tudo.View style={styles.buttonview}>
                        <tudo.Button
                            color='#ff660d'
                            title={'Submeter'}
                            onPress={() => this.addMarker(this.state.assunto, this.state.descricao)}
                        />
                    </tudo.View>

                </tudo.View>
            </tudo.View>
        )
    }

}

const styles = tudo.StyleSheet.create({
    full: {
        flex: 1,
    },
    imagePart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 0.3,
    },
    resto: {
        flex: 0.7
    },
    buttonview: {
        flex: 1,
        margin: 10,
        width: 250,
    },
    textinput: {
        height: 40,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
      },
})

export default AddMarker;