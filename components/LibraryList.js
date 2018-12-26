import React, { Component } from 'react'
import { Text, LayoutAnimation, TextInput, TouchableOpacity, FlatList, StyleSheet, View } from 'react-native'
import {connect, Provider} from 'react-redux'
import PublicFunctions from './PublicFunctions'
import * as actions from './actions/Actions'
//redux persist
import { PersistGate } from 'redux-persist/lib/integration/react';
//import store and persist store from store index
import {store, persistor} from './store'

//create const to get the state
const mapStateToProps = state => {
    return {
        libraries: state.libraries,
        selectedReducers: state.selectedReducers
    }
}

class LibraryList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
          librarieList: [],
          newLibrary: '',
          newDescription: ''    
      }
    }

    selectLibrary = (libraryID) => {  
        store
        this.props.selectLibrary(libraryID)
        console.log(this.props)
    }

    componentWillMount = () => {
        //this.setState({librarieList: this.props.libraries})
        console.log(this.props)        
    }

    componentWillUpdate = () => {
        LayoutAnimation.easeInEaseOut()
    }

    description(description){        
        return(
            <Text style={{flex: 1, padding: 10, fontFamily: 'roboto_reguler'}}>{description}</Text>
        )
    }
    
    render() {
        const {selectedReducers} = this.props
        console.log(selectedReducers)

        return (
        <View>
            {this.props.libraries.length > 0 ? 
            <FlatList 
            data={this.props.libraries}
            renderItem = {({item, index}) => (
                <View>
                    <TouchableOpacity 
                        onPress = {() => this.selectLibrary(item.id)}
                        style = {{backgroundColor: index % 2 == 0 ? '#74b9ff' : '#a29bfe'}}>
                        <Text style={{color: 'white', padding: 10, fontFamily: 'roboto_reguler'}}>{item.library}</Text>                    
                    </TouchableOpacity>
                    {selectedReducers.includes(item.id) ? this.description(item.description) : null}
                </View>
            )}
            keyExtractor = {(item) => item.id}
            /> : null}
            
            {/* 
            <TextInput 
                placeholder = 'Tap to add more library'
                placeholderTextColor = 'white'
                returnKeyType = 'next'
                onSubmitEditing = {() => this.refs.inputDescription.focus()}
                onChangeText = {(text) => this.setState({newLibrary: text})}                
                style = {{fontFamily: 'roboto_reguler', color: 'white', fontSize: 15, padding: 10, backgroundColor: '#74b9ff'}}
            />
            <TextInput 
                ref = {'inputDescription'}
                placeholder = 'Tap to add more description'
                placeholderTextColor = 'white'
                returnKeyType = 'done'
                onChangeText = {(text) => this.setState({newDescription: text})}
                style = {{fontFamily: 'roboto_reguler', color: 'white', fontSize: 15, padding: 10, backgroundColor: '#74b9ff'}}
            />
            <TouchableOpacity onPress={() => this.addNewLibrary()}>
                <Text style={{fontSize: 15, fontFamily: 'roboto_medium', color: 'white', textAlign: 'center', backgroundColor: '#a29bfe'}}>Add new Library</Text>
            </TouchableOpacity> 
            */}
        </View>
        )
    }
}

export default connect(mapStateToProps, actions)(LibraryList)

const styles = StyleSheet.create({})
