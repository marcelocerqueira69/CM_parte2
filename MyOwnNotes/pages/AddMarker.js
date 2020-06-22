import React, { Component } from 'react';
import * as tudo from 'react-native';
import axios from 'axios';

class AddMarker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: this.props.route.params.latitude,
            longitude: this.props.route.params.longitude,
            navigation: props.navigation,
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
                <tudo.Text>Halo guys</tudo.Text>
            </tudo.View>
        )
    }

}

const styles = tudo.StyleSheet.create({
    full: {
        flex: 1,
    },
    camera: {
        flex: 0.3,
    },
    resto: {
        flex: 0.7
    }
})

export default AddMarker;