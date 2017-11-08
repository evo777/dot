import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Audio, Camera, Permissions } from 'expo';

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
      const self = this;
      if (this.camera) {
        this.camera.takePictureAsync({base64: true}).then(image => {
          this.setState({response: image.base64.substring(0, 200)});
          fetch('https://dot.garagescript.com/predict', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: image.base64,
            }),
          }).then((res) => {
            return res.json()
          })
            .then((data) => {
              self.setState({response: JSON.stringify(data)});
              if(data.url && data.url.indexOf('https') > -1 ){
                Audio.setIsEnabledAsync(true);
                let sound = new Audio.Sound();
                sound.loadAsync({
                  uri: data.url,
                }).then(() => {
                  sound.playAsync();
                });;
              }
              return data;
            }).catch((err) => {
              self.setState({response: 'error' + err});
            });
        });
      }
    }, 10000);
  }

  _handlePlaySoundAsync = async () => {
  };

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
          <Text> {this.state.response|| "gygygygygyg"} </Text>
        </View>
      );
    }
  }
}
