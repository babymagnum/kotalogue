import React, { Component } from 'react'
import {Dimensions, TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native'

const dimensions = Dimensions.get('window')

export default class LayoutPart extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
          <View style={{paddingHorizontal: 10, flexDirection: 'row', width: dimensions.width, height: 50, backgroundColor: '#FAFAFA'}}>        
            {/* layout main */}
            <View style={{flexDirection: 'row', height: 50, flex: 0.9}}>
                {/* layout icon */}
                <View style={{marginRight: 10, justifyContent: 'center', alignSelf: 'center', borderRadius: 5, backgroundColor: this.props.hexCode, height: 35, width: 35}}>
                    <Image style={{tintColor: 'white', alignSelf: 'center', height: 20, width: 20}} source = {this.props.icon} />
                </View>
                <Text style={{alignSelf: 'center', fontFamily: 'roboto_medium', fontSize: 18}}>{this.props.label}</Text>
            </View>
            {/* icon down and up */}
            <View style={{flex: 0.1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Image style={{alignSelf: 'center', width: 20, height: 20}} source={require('./assets/arrow_down.png')} />
            </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({})
