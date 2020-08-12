/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';


const remote = require('./app/assets/banbutsu_bg_img.png');

export default class Login extends Component<{}> {
  render() {
    const welcomeText = 'BANBUTSU';

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}
      >
        
        <View style={styles.imgContainer}>
          <Image
            style={styles.imgBackground}
            blurRadius={0}
            source={require('./app/assets/banbutsu_bg_img.png')}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            // width: '100%',
            // height: '100%',

          }}
        >


            <View style={styles.imgLogoContainer}>
              <Image
                style={styles.imgLogo}
                source={require('./app/assets/banbutsu_logo.png')}
              />
            </View>

        </View>
      </View>
  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imgContainer: {
    flex: 1,

    // alignItems: 'stretch',

    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBackground: {
    flex:1,
    resizeMode: 'contain',
    opacity: .9,
    // marginLeft: 400,

  },
  imgLogoContainer: {
    // flex:1,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    position: 'absolute',
    left:-400,
    bottom: 50,
    // padding: 100,

  },
  imgLogo: {
    // flex:1,
    // margin: 500,
    // width: 50,
    height: 250,
    resizeMode: 'contain',
    opacity: 1,
  },
  welcome: {
    fontSize: 90,
    textAlign: 'center',
    color: 'white',
    // marginTop: 200,
    fontWeight: 'bold',
        shadowOffset:{  width: .5,  height: .5,  },
    shadowColor: 'black',
    shadowOpacity: .2,
  },

});
