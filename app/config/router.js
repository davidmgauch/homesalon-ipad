import React from 'react';
import {
  TouchableOpacity, 
  StyleSheet,
} from 'react-native';
import {
  StackNavigator, 
  HeaderBackButton,
} from 'react-navigation';


import Login from '../screens/Login';
import FacebookLoading from '../screens/FacebookLoading';
import FacebookAuth from '../screens/FacebookAuth';
import GetStarted from '../screens/GetStarted';
import HairGoals from '../screens/HairGoals';

import Home from '../screens/Home';

// import HairCare from '../screens/HairCare';
// import TestSlide from '../screens/TestSlide';

import Profile from '../screens/Profile';
import LinkApps from '../screens/LinkApps';
import AddProducts from '../screens/AddProducts';
import HairData from '../screens/HairData';
import ProductDetailsCare from '../screens/ProductDetailsCare';
import ArProductView from '../screens/ArProductView';
import ProductDetailsColor from '../screens/ProductDetailsColor';
import TutorialVideo from '../screens/TutorialVideo';

// const {goBack} = this.props.navigation;

// const navigationOptions = ({ navigation }) => ({
//     headerLeft: <HeaderBackButton style={styles.backButtonPosition} onPress={() => navigation.goBack(null)} />,
// })

export const FeedStack = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      header: null,
      
    }),
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  
  
  
  
  

  AddProducts: {
    screen: AddProducts,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  
  
  ProductDetailsColor: {
    screen: ProductDetailsColor,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  TutorialVideo: {
    screen: TutorialVideo,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  
  
  
  
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  
  
  

  ProductDetailsCare: {
    screen: ProductDetailsCare,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  ArProductView: {
    screen: ArProductView,
    
    navigationOptions: ({ navigation }) => ({
      header: null,


    }),
  },
  
  HairGoals: {
    screen: HairGoals,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },

  

  LinkApps: {
    screen: LinkApps,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },

  
  
  HairData: {
    screen: HairData,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
 
  FacebookLoading: {
    mode: 'modal',
    screen: FacebookLoading,

    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  GetStarted: {
    screen: GetStarted,
    navigationOptions: ({ navigation }) => ({
    	header: null,
    }),
  },

  FacebookAuth: {
    mode: 'modal',
    screen: FacebookAuth,
    navigationOptions: ({ navigation }) => ({
    	header: null,
    }),
  },

});

const styles = StyleSheet.create({
  backButtonPosition: {
    opacity: hotspotOpacity,
    position: 'absolute',
    left:0,
    top: 0,
    height: 100,
    width: 100,
    backgroundColor: hotspotColor,
  },
});
