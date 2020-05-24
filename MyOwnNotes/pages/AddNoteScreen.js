import React, { Component } from 'react';
import * as tudo from 'react-native';

import Realm from 'realm';
let realm;

class AddNoteScreen extends Component {


    constructor(props) {
        super(props);
        realm = new Realm({path: 'notas.realm'});
        this.state = {
            assunto:'',
            descricao:'',
        }
    }

    addRegisto=()=>{
        realm.write(() => {
            var ID = realm.objects('nota').length;
            var d = new Date();
            var date = d.getDate() + "/" + (d.getMonth()+1) + "/" +  d.getFullYear();
            realm.create('nota', {
                id: ID,
                assunto:this.state.assunto,
                descricao: this.state.descricao,
                data: date,
            })
        })
        tudo.Alert.alert("Nota adicionada com sucesso!");
        this.props.navigation.navigate('Notes')
    }

    render(){
        return(
            <tudo.View style={styles.full}>
                <tudo.Image 
                    style={styles.image}
                    source={require('../images/add_note.png')}
                />
                <tudo.TextInput
                    style={styles.textinput}
                    placeholder='Assunto'
                    onChangeText={(text) => {this.setState({assunto: text})}}>
                </tudo.TextInput>
                <tudo.TextInput
                    style={styles.textinput}
                    placeholder='Descrição'
                    onChangeText={(text) => {this.setState({descricao: text})}}>
                </tudo.TextInput>
                <tudo.Button
                    color='#ff660d'
                    title='Submeter'
                    onPress={this.addRegisto}
                />
            </tudo.View>
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
        justifyContent: 'center',
        alignItems: 'center',
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
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

export default AddNoteScreen;