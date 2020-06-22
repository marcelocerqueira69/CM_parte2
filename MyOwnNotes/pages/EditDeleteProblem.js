import React, { Component } from 'react';
import * as tudo from 'react-native';
import axios from 'axios';

let urlUpdate = 'http://192.168.1.67:4000/pontos/update/'
let images = 'http://192.168.1.67:4000/'
let urlDelete = 'http://192.168.1.67:4000/pontos/deletePonto/'

class EditDeleteProblem extends Component {
    constructor(props) {
        super(props);
        console.log(props.route)
        this.state = {
            navigation: props.navigation,
            nota: this.props.route.params.item,
            assunto: this.props.route.params.item.assunto,
            descricao: this.props.route.params.item.descricao,
            id: this.props.route.params.id_user
        }

    }



    deleteMarker() {
        return axios.delete(urlDelete + this.state.nota.id_ponto)
            .then(function (response) {
                tudo.Alert.alert(
                    'Apagar marcador',
                    'Deseja apagar o marcador?',
                    [
                        { text: 'Ok', onPress: () => this.state.navigation.replace('Problems', this.state.id) },
                    ]
                )

            }.bind(this))
            .catch((error) => {
                console.log(error);
            });
    }

    updateMarker() {
        return axios.post(urlUpdate + this.state.nota.id_ponto, {
            assunto: this.state.assunto,
            descricao: this.state.descricao
        })
            .then(function (response) {
                tudo.Alert.alert(
                    'Atualizar marcador',
                    'Deseja atualizar o marcador?',
                    [
                        { text: 'Ok', onPress: () => this.state.navigation.replace('Problems', this.state.id) },
                    ]
                )
            }.bind(this))
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        console.log(this.state.nota.id_ponto);
    }

    render() {
        return (
            <tudo.View style={styles.full}>
                <tudo.Image
                    style={styles.image}
                    source={{ uri: images + this.state.nota.imagem }}
                />
                <tudo.TextInput
                    style={styles.textinput}
                    placeholder='Assunto'
                    value={this.state.nota.assunto}
                    onChangeText={(text) => { this.setState({ assunto: text }) }}>
                </tudo.TextInput>

                <tudo.TextInput
                    style={styles.textinput}
                    placeholder='Descrição'
                    value={this.state.nota.descricao}
                    onChangeText={(text) => { this.setState({ descricao: text }) }}>
                </tudo.TextInput>
                

                <tudo.Button color='#ff660d' title='Apagar' onPress={() => this.deleteMarker()}/>
                <tudo.Button color='#ff660d' title='Atualizar' onPress={() => this.updateMarker()}/>
            </tudo.View>
        )
    }
}

const styles = tudo.StyleSheet.create({
    full: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textinput: {
        height: 40,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
    },
    image: {
        width: 150,
        height: 150,
    },
})

export default EditDeleteProblem;