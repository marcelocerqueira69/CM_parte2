import React, { Component } from 'react';
import * as tudo from 'react-native';
import axios from 'axios';

let urlUpdate = 'http://192.168.1.67:4000/pontos/update/'
let images = 'http://192.168.1.67:4000/'
let urlDelete = 'http://192.168.1.67:4000/pontos/deletePonto/'
let assuntoChanged;
let descricaoChanged;

class EditDeleteProblem extends Component {
    constructor(props) {
        super(props);
        console.log(props.route)
        this.state = {
            navigation: props.navigation,
            nota: this.props.route.params.item,
            assunto: this.props.route.params.item.assunto,
            descricao: this.props.route.params.item.descricao,
            id: this.props.route.params.id_user,
            orientation: '',
        }
    }



    deleteMarker() {
        return axios.delete(urlDelete + this.state.nota.id_ponto)
            .then(function (response) {
                tudo.Alert.alert(
                    'Apagar marcador',
                    'Deseja apagar o marcador?',
                    [
                        { text: 'Ok', onPress: () => { this.goToMap(); } },
                    ]
                )

            }.bind(this))
            .catch((error) => {
                console.log(error);
            });
    }

    goToMap() {
        this.state.navigation.pop(3);
        this.state.navigation.replace('Map', this.state.id);
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
                        { text: 'Ok', onPress: () => { this.goToMap(); } },
                    ]
                )

            }.bind(this))
            .catch((error) => {
                console.log(error);
            });
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
                        style={styles.image}
                        source={{ uri: images + this.state.nota.imagem }}
                    />
                </tudo.View>

                <tudo.View style={styles.insertAndButton}>
                    <tudo.TextInput
                        style={styles.textinput}
                        placeholder='Assunto'
                        value={this.state.assunto}
                        onChangeText={(text) => { this.setState({ assunto: text }) }}>
                    </tudo.TextInput>

                    <tudo.TextInput
                        style={styles.textinput}
                        placeholder='Descrição'
                        value={this.state.descricao}
                        onChangeText={(text) => { this.setState({ descricao: text }) }}>
                    </tudo.TextInput>


                    <tudo.Button color='#ff660d' title='Apagar' onPress={() => this.deleteMarker()} />
                    <tudo.Button color='#ff660d' title='Atualizar' onPress={() => this.updateMarker()} />
                </tudo.View>

            </tudo.View>
        )
    }
}

const styles = tudo.StyleSheet.create({
    fullP: {
        flex: 1,
        flexDirection: 'column',
    },
    fullL: {
        flex: 1,
        flexDirection: 'row',
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
})

export default EditDeleteProblem;