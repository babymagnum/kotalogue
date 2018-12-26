import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import LibraryList from './LibraryList';

export default class Libraries extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isLoading: true
    }
  }
  

  render() {
    return (
      <View style={{marginTop: getStatusBarHeight()}}>            
          <LibraryList />
      </View>
    )
  }
}

const styles = StyleSheet.create({})
