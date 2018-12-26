import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {StackActions, NavigationActions} from 'react-navigation'

export default class SplashScreen extends Component {    
    componentDidMount = () => {
        setTimeout(() => {
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Welcome'})]
            }))
        }, 1000);
    }
    
    render() {
        return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text> Splash Screen </Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({})
