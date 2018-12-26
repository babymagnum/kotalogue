import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import SplashScreen from './components/SplashScreen';
import Welcome from './components/Welcome';
import Home from './components/Home';
import DetailVenue from './components/detail_venue/DetailVenue';
import Libraries from './components/Libraries'
import {Font} from 'expo'
import * as firebase from 'firebase'
import 'firebase/firestore'

//redux
import {Provider} from 'react-redux'
//redux persist
import { PersistGate } from 'redux-persist/lib/integration/react';
//import store and persist store from store index
import {store, persistor} from './components/store'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAy-YWrt1BHt2F4yGZYFRGxdRCFmSQ3BQM',
  authDomain: 'kotalogue-project.firebaseapp.com',
  databaseURL: 'https://kotalogue-project.firebaseio.com/',
  storageBucket: 'gs://kotalogue-project.appspot.com',
  projectId: 'kotalogue-project'
}
firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)

export default class App extends React.Component {
  componentDidMount = () => {
    Font.loadAsync({
      'roboto_reguler': require('./components/fonts/roboto_reguler.ttf'),
      'roboto_light': require('./components/fonts/roboto_light.ttf'),
      'roboto_medium': require('./components/fonts/roboto_medium.ttf'),
      'roboto_bold': require('./components/fonts/roboto_bold.ttf'),
    });
  }
  
  render() {
    return (
      <Provider store = {store}>
          <PersistGate persistor = {persistor}>
            <Container/>
          </PersistGate>
      </Provider>
    );
  }
}

const Navigator = createStackNavigator({
  SplashScreen: SplashScreen,
  Welcome: Welcome,
  Home: Home,
  DetailVenue: DetailVenue,
  Libraries: Libraries
},
{
  initialRouteName: 'SplashScreen',
  headerMode: 'none'
})

const Container = createAppContainer(Navigator)

