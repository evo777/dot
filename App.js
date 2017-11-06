import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import clarifai from 'clarifai';

const app1 = new clarifai.App({
  apiKey: 'dc9cbce1a5ae451ebd4097433b038d2f'
});

export default class CameraExample extends Component {

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted', response: '567876crfvfvtb'});
  }


  constructor(props) {
    super(props);
    this.state = {
      image: 'Hello',
      hasCameraPermission: null
    };

    setInterval(() => {
      if (this.camera) {
        let photo = this.camera.takePictureAsync({base64: true}).then(image => {
          this.setState({image: image.base64});
          return fetch('https://dot.garagescript.com/predict')
            .then(res => {
              res.json();
            })

              this.setState({response: resJson});
            })
            .catch(err => {
              this.setState({response: err});
            });
        });
      }
    }, 5000)
  }
      render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
            <View style={{ flex: 1 }}>
            <Camera ref={ref => { this.camera = ref; }} style={{ height: 200, width: 200  }} type={Camera.Constants.Type.front}>
              <View>
                <Text>{this.state.image}</Text>
              </View>
            </Camera>
            <Text> {this.state.response} </Text>
            </View>
          );
        }
      }
  }
