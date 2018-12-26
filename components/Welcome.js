import React, { Component } from 'react'
import { Text, StyleSheet, AsyncStorage, View } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import { Pages } from 'react-native-pages'

export default class Welcome extends Component {    
    constructor(props) {
      super(props)
    
      this.state = {
          showTheUI: false
      }
    }
    
    navigateToHome() {
        //save the user default
        AsyncStorage.setItem('passWelcome', JSON.stringify(true))

        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Home'})]
        }))
    }

    componentWillMount = () => {
        AsyncStorage.getItem('passWelcome').then((value) => {
            if (JSON.parse(value)) {
                this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Home'})]
                }))
            } else {
                this.setState({showTheUI: true})
            }
        })
    }
        
    render() {               
        if (this.state.showTheUI) {
            return (
                <Pages>
                    <View style={{ flex: 1, backgroundColor: 'red' }} />
                    <View style={{ flex: 1, backgroundColor: 'green' }} />
                    <View style={{ flex: 1, backgroundColor: 'blue' }}>
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <Text 
                                onPress = {() => this.navigateToHome()}
                                style={{padding: 15, fontSize: 20, textAlign: 'center', backgroundColor: 'white', color: 'black'}}>Mulai Sekarang</Text>
                        </View>
                    </View>
                </Pages>
            )
        } else {
            return null
        }
    }
}
