import React, { Component } from 'react';
import * as tudo from 'react-native';
import axios from 'axios';

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
let markersURL = 'http://192.168.1.67:4000/pontos/getPontos'
let images = 'http://192.168.1.67:4000/'

class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.route.params,
            navigation: props.navigation,
            markers: [],
        }

    }

    getMarkers() {
        return axios.get('http://192.168.1.67:4000/pontos/getPontos')
            .then(function (response) {
                this.setState({ markers: response.data })
            }.bind(this))
            .catch((error) => {
                console.log(error);
            });
    }


    componentDidMount() {
        this.getMarkers()
        console.log('Map: ' + this.state.id);
    }

    render() {
        return (
            <tudo.View style={styles.container}>
                <tudo.View style={styles.header}>
                    <tudo.Text style={styles.text}>Map</tudo.Text>
                    <tudo.TouchableOpacity
                        style={styles.userProblems}
                        onPress={() => this.state.navigation.navigate('Problems', this.state.id)}>
                        <tudo.Image style={styles.imageButton}
                            source={require('../images/open-menu.png')} />
                    </tudo.TouchableOpacity>
                </tudo.View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: 41.6332,
                        longitude: -8.54328,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {
                        this.state.markers.map(marker =>
                            <Marker
                                key={marker.id_ponto}
                                coordinate={{
                                    latitude: marker.latitude,
                                    longitude: marker.longitude
                                }}>

                                <Callout >
                                    <tudo.View style={styles.callout}>
                                        <tudo.Image style={styles.image}
                                            source={{ uri: images + marker.imagem }} />

                                        <tudo.View style={styles.callout2}>
                                            <tudo.Text>
                                                Assunto: {marker.assunto}
                                            </tudo.Text>

                                            <tudo.Text>
                                                Descrição: {marker.descricao}
                                            </tudo.Text>
                                        </tudo.View>
                                    </tudo.View>


                                </Callout>
                            </Marker>

                        )
                    }
                </MapView>
            </tudo.View>

        )
    }
}

const styles = tudo.StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    callout: {
        flex: 1,
        flexDirection: 'row',
    },
    callout2: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        height: 100,
        width: 100,
    },
    header: {
        flex: 0.095,
        backgroundColor: '#ff660d',
    },
    userProblems: {
        alignItems: 'flex-end',
        marginRight: 10,
        bottom: "37%"
    },
    text: {
        color: 'black',
        fontSize: 20,
        marginTop: 13,
        marginLeft: 12,
    },
    imageButton: {
        width: 20,
        height: 20,
    },
});

export default Map;