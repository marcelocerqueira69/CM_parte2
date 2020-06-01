import React, { Component, useEffect, useState } from 'react';
import * as tudo from 'react-native';

import Realm from 'realm';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const realm = new Realm({
    path: 'notas.realm',
    schema: [{
        name: 'nota',
        properties: {
            id: { type: 'int', default: 0 },
            assunto: 'string',
            descricao: 'string',
            data: 'string',
        }
    }]
});

const query = () => realm.objects('nota');

function getupdateddata(query) {
    const [data, setData] = useState(query());

    useEffect(
        () => {
            function handleChange(newData) {
                setData([...newData]);
            }
            const dataQuery = query();
            dataQuery.addListener(handleChange);
            return () => {
                dataQuery.removeAllListeners();
            };
        },
        [query]
    );
    
    return data;
}


function NotesScreen({ navigation }) {

    /*ListViewSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
        );
    };*/
    function actionOnRow(item){
        navigation.navigate('EditDelete', item);
    }

    const notas = getupdateddata(query);
    return (
        <tudo.View style={styles.full}>
            <tudo.View style={styles.header}>
                <tudo.Text style={styles.text}>Notes</tudo.Text>
                <tudo.TouchableOpacity
                    style={styles.addNote}
                    onPress={() => navigation.navigate('AddNote')}>
                    <tudo.Image style={styles.image}
                        source={require('../images/add_note_transaction.png')} />
                </tudo.TouchableOpacity>
            </tudo.View>
            <tudo.FlatList
                style={styles.flatList}
                data={notas}
                //ItemSeparatorComponent={ListViewSeparator}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <tudo.TouchableWithoutFeedback onPress={() => actionOnRow(item)}>
                        <tudo.View style={{ backgroundColor: "#dedede", padding: 20, borderBottomWidth: 1, borderBottomColor: '#000000', flexDirection: 'row' }}>
                            <tudo.Image style={{ width: 70, height: 70, margin: 7 }} source={require('../images/notepad.png')} />
                            <tudo.View style={{ flexDirection: 'column' }}>
                                <tudo.Text style={{ marginBottom: 5 }}>Assunto: {item.assunto}</tudo.Text>
                                <tudo.Text style={{ marginBottom: 5 }}>Descrição: {item.descricao}</tudo.Text>
                                <tudo.Text style={{ marginBottom: 5 }}>Data: {item.data}</tudo.Text>
                            </tudo.View>
                        </tudo.View>
                    </tudo.TouchableWithoutFeedback>
                )}

            />
        </tudo.View>
    )
}


const styles = tudo.StyleSheet.create({
    underline: {
        textDecorationLine: 'underline'
    },
    flatList: {
        flex: 1,
    },
    header: {
        flex: 0.095,
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
        marginTop: 13,
        marginLeft: 12,
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
        bottom: "37%"
    },
});

export default NotesScreen;