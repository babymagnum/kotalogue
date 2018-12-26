import React, { Component } from 'react'
import { TouchableOpacity, TextInput, Platform, Image, StyleSheet, View } from 'react-native'
import {getStatusBarHeight} from 'react-native-status-bar-height'

export default class my_toolbar extends Component {
  render() {
    return (      
      <View style={{marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(), height: 50, backgroundColor: 'white', paddingHorizontal: 10, justifyContent: 'center', flexDirection: 'row'}}>
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <Image source={require('../assets/icon_search_new.png')} style={{width: 25, height: 25, tintColor: '#b2bec3'}} />
        </TouchableOpacity>
        <TextInput
            placeholder = 'Discover Kotalogue'
            placeholderTextColor = 'gray'
            style={{flex: 1, color: 'gray', fontSize: 20, alignSelf: 'center', marginLeft: 20}}
            keyboardType = 'default'
            returnKeyType = 'search'
            onSubmitEditing = {() => this.showAlert('Development', 'This feature is in development')}
        />
        <Image source={require('../assets/icon_mic.png')} style={{width: 25, height: 25, alignSelf: 'center', tintColor: '#b2bec3'}} />
      </View> 
    )
  }
}

const styles = StyleSheet.create({})
