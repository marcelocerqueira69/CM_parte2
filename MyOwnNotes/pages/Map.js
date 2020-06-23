import React, { Component } from 'react';
import * as tudo from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation'

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
            latitudeAtual: 0,
            longitudeAtual: 0,
            orientation: '',
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

    logout = () => {
        this.state.navigation.replace('Home')
        console.log("logout")
    }


    componentDidMount() {
        Geolocation.getCurrentPosition(position => {
            this.setState({
                latitudeAtual: position.coords.latitude,
                longitudeAtual: position.coords.longitude,
            })
        })

        this.getMarkers()
        console.log('Map: ' + this.state.id);

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
            <tudo.View style={styles.container}>
                <tudo.View style={this.state.orientation == 'Landscape' ? styles.headerL : styles.headerP}>
                    <tudo.Text style={styles.text}>Map</tudo.Text>
                    <tudo.TouchableOpacity
                        style={styles.userProblems}
                        onPress={() => this.state.navigation.navigate('Problems', this.state.id)}>
                        <tudo.Image style={styles.imageButton}
                            source={require('../images/open-menu.png')} />
                    </tudo.TouchableOpacity>
                    <tudo.TouchableOpacity
                        style={styles.Logout}
                        onPress={() => this.logout()}>
                        <tudo.Image style={styles.imageButton}
                            source={require('../images/logout.png')} />
                    </tudo.TouchableOpacity>
                </tudo.View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: 41.729655,
                        longitude: -8.53339,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    onLongPress={() => this.state.navigation.navigate('AddMarker', { latitude: this.state.latitudeAtual, longitude: this.state.longitudeAtual , id: this.state.id})}>
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
    headerP: {
        flex: 0.095,
        backgroundColor: '#ff660d',
    },
    headerL: {
        flex: 0.18,
        backgroundColor: '#ff660d',
    },
    userProblems: {
        alignItems: 'flex-end',
        marginRight: 10,
        bottom: "37%"
    },
    Logout: {
        alignItems: 'flex-end',
        marginRight: 40,
        bottom: "71%"
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