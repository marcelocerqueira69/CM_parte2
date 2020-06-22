import React, { Component } from 'react';
import * as tudo from 'react-native';
import axios from 'axios';

let url = 'http://192.168.1.67:4000/pontos/getPontosById/'
let images = 'http://192.168.1.67:4000/'

class Problems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            id: this.props.route.params,
            problemas: [],
        }
    }

    getProblems() {
        return axios.get(url + this.state.id)
            .then(function (response) {
                this.setState({ problemas: response.data })
            }.bind(this))
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getProblems()
    }

    render() {
        return (
            <tudo.View style={styles.full}>
                <tudo.FlatList
                style={styles.flatList}
                data={this.state.problemas}
                keyExtractor={(item) => item.id_ponto}
                renderItem={({ item }) => (
                    <tudo.TouchableWithoutFeedback onPress={() => this.state.navigation.navigate('EditDeleteProblem', {item: item, id_user: this.state.id})}>
                        <tudo.View style={{ backgroundColor: "#dedede", padding: 20, borderBottomWidth: 1, borderBottomColor: '#000000', flexDirection: 'row' }}>
                            <tudo.Image style={{ width: 90, height: 90, margin: 7 }} source={{uri: images + item.imagem}} />
                            <tudo.View style={{ flexDirection: 'column' }}>
                                <tudo.Text style={{ marginBottom: 5, fontSize:15 }}>Assunto: {item.assunto}</tudo.Text>
                                <tudo.Text style={{ marginBottom: 5, fontSize:15 }}>Descrição: {item.descricao}</tudo.Text>
                            </tudo.View>
                        </tudo.View>
                    </tudo.TouchableWithoutFeedback>
                )}

            />
            </tudo.View>
        )
    }
}

const styles = tudo.StyleSheet.create({
    full: {
        flex: 1,
        flexDirection: 'column',
    },
    flatList: {
        flex: 1,
    },
})

export default Problems;