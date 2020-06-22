import React, { Component } from 'react';
import * as tudo from 'react-native';

import Realm from 'realm';
import { abs } from 'react-native-reanimated';
let realm;

class EditdeleteNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            id: this.props.route.params.id,
            assunto: this.props.route.params.assunto,
            descricao: this.props.route.params.descricao,
            orientation: '',
        }
        realm = new Realm({
            path: 'notas.realm'
        })
    }

    updateRegisto = () => {
        var that = this;
        if (this.state.assunto) {
            if (this.state.descricao) {
                realm.write(() => {
                    var obj = realm.objects('nota').filtered('id = ' + this.state.id)

                    var d = new Date();
                    var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

                    if (obj.length > 0) {
                        obj[0].assunto = this.state.assunto;
                        obj[0].descricao = this.state.descricao;
                        obj[0].data = date;

                        tudo.Alert.alert(
                            'Atualização',
                            'Nota atualizada!',
                            [{
                                text: 'Ok', onPress: () => that.props.navigation.navigate('Notes')
                            }],
                            { cancelable: false }
                        );
                    } else {
                        tudo.Alert.alert('Atualização falhou!');
                    }
                })
            } else {
                tudo.Alert.alert('Preencha a descrição!');
            }
        } else {
            tudo.Alert.alert('Preencha o assunto!');
        }
    }

    deleteRegisto = () => {
        tudo.Alert.alert(
            'Eliminação',
            'Tem a certeza que pretende remover esta nota?',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => { this.deleteNota(); } },
            ]
        )
    }

    deleteNota = () => {
        realm.write(() => {
            const id = this.props.route.params.id;
            let task = realm.objects('nota').filtered('id = ' + id)
            realm.delete(task);
        })
        this.props.navigation.navigate('Notes');
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
                        source={require('../images/edit.png')}
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
                    <tudo.Button color='#ff660d' title='Apagar' onPress={() => this.deleteRegisto()} />
                    <tudo.Button color='#ff660d' title='Atualizar' onPress={() => this.updateRegisto()} />
                </tudo.View>

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


export default EditdeleteNote;