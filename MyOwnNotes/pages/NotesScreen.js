import React, { Component } from 'react';
import * as tudo from 'react-native';

import AddNoteScreen from './AddNoteScreen';

import Realm from 'realm';
let realm;

export default class NotesScreen extends Component {
    constructor(props) {
        super(props);
        realm = new Realm({
            path: 'notas.realm',
            schema: [{
                name: 'notas',
                properties: {
                    id: { type: 'int', default: 0 },
                    assunto: 'string',
                    descricao: 'string',
                    data: 'string',
                }
            }]
        })
        var notas = realm.objects('notas');
        this.state = {
            FlatListItems: notas,
        }
    }


ListViewSeparator = () => {
    return (
        <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
    );
};

render() {
    //const info = this.state.realm ? 'Number of dogs in this Realm: ' + this.state.realm.objects('notes').length: 'Loading...';
    const info = this.state.realm;
    return (
        <tudo.View style={styles.full}>
            <tudo.View style={styles.header}>
                <tudo.Text style={styles.text}>Notes</tudo.Text>
                <tudo.TouchableOpacity 
                    style={styles.addNote}
                    onPress={() => this.props.navigation.navigate('AddNote')}>
                    <tudo.Image style={styles.image}
                    source={require('../images/add_note_transaction.png')} />
                </tudo.TouchableOpacity>
            </tudo.View>
            <tudo.FlatList
                style={styles.flatList}
                data={this.state.FlatListItems}
                ItemSeparatorComponent={this.ListViewSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <tudo.View style={{backgroundColor: 'white', padding: '20'}}>
                        <tudo.Text>Assunto: {item.assunto}</tudo.Text>
                        <tudo.Text>Descrição: {item.descricao}</tudo.Text>
                        <tudo.Text>Data: {item.data}</tudo.Text>
                    </tudo.View>
                )}
            />
        </tudo.View>
    )
}
}

const styles = tudo.StyleSheet.create({
    underline: {
        textDecorationLine: 'underline'
    },
    flatList:{
        flex:1,
    },
    header:{
        flex:0.095,
        backgroundColor: '#ff660d',
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 20,
        height: 20,
    },
    buttonview: {
        flex: 1,
        margin: 10,
        width: 250,
    },
    text: {
        color: 'black',
        fontSize: 20,
        marginTop:13,
        marginLeft:12,
    },
    textinput: {
        height: 40,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
    },
    addNote: {
        //justifyContent: 'center',
        //position:"relative",
        alignItems: 'flex-end',
        marginRight: 10,
        bottom:"37%"
    },
});
