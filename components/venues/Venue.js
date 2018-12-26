import React, { Component } from 'react'
import {connect} from 'react-redux'
import { ActivityIndicator, TouchableOpacity, Dimensions, StatusBar, Alert, Image, SafeAreaView, Platform, View } from 'react-native'
import * as firebase from 'firebase'
//react redux
import * as actions from '../actions/Actions'
import 'firebase/firestore'
import MyToolbar from '../common/my_toolbar'
import VenueList from './venue_list'

const dimension = Dimensions.get('window')

class Venue extends Component {
    constructor(props) {
        super(props)  
        this.venueListRef = firebase.firestore().collection('Venue')

        this.state = {
            layoutContentMainHeight: 0,        
            isLoading: true,
        }
    }

    onCollectionUpdate = (querySnapshot) => {        
        //call action for remove existing data
        this.props.removeAllVenue()

        querySnapshot.forEach((doc) => {
            const {venueID, venueName, venueHeaderPhoto} = doc.data()
            const data = {
                venueID: venueID,
                venueName: venueName,
                venueHeaderPhoto: venueHeaderPhoto
            }
            
            //add to redux persist
            this.props.addNewVenue(data)            

            this.setState({isLoading: false})
        })        
    }

    componentDidMount = () => {        
        console.log(this.props)
        
        if (this.props.venues.length > 0) {            
            this.setState({isLoading: false})
            this.venueListRef.get().then(this.onCollectionUpdate)
        } else{            
            this.venueListRef.get().then(this.onCollectionUpdate)            
        } 
    }
    
    showAlert = (title, message) => {
        Alert.alert(
            title,
            message,
            [
                {text: 'Understand', onPress: () => console.log('understand pressed')}
            ],
            {cancelable: true}
        )
    }    
    
    render() {
        if (Platform.OS == 'ios') {
            return(
                <SafeAreaView>
                    {Platform.OS === 'ios' ? null : <StatusBar backgroundColor='white' barStyle='dark-content' />}        
                        
                    {/* toolbar */}
                    <MyToolbar />

                    {/* loading */}
                    {this.state.isLoading ?
                    <ActivityIndicator
                        style={{marginTop: 30}}
                        size = 'small'
                        color = '#ff7675'                    
                    /> : null}                

                    {/* venue list going here */}
                    <VenueList navigationNewPage = {this.props.navigation} dataSource = {this.props.venues} />

                    {/* floating button */}            
                    <TouchableOpacity style={{marginLeft: dimension.width - 70, marginTop: dimension.height - (49 + 50+ 20), position: 'absolute'}}>
                        <View style={{justifyContent: 'center', height: 50, width: 50, borderRadius: 50/2, backgroundColor: '#ff7675'}}>
                            <Image source={require('../assets/ico_marker_new.png')} style={{alignSelf: 'center', height: 25, width: 25, tintColor: 'white'}} />
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            )
        } else{
            return(
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    {Platform.OS === 'ios' ? null : <StatusBar backgroundColor='white' barStyle='dark-content' />}        
                    
                    {/* toolbar */}
                    <MyToolbar />

                    {/* loading */}
                    {this.state.isLoading ? 
                    <ActivityIndicator
                        style={{marginTop: 30}}
                        size = 'small'
                        color = '#ff7675'                    
                    /> : null}                

                    {/* venue list going here */}
                    <VenueList navigationNewPage = {this.props.navigation} dataSource = {this.props.venues} />

                    {/* floating button */}            
                    <TouchableOpacity style={{marginLeft: dimension.width - 70, marginTop: dimension.height - (49 + 50+ 20), position: 'absolute'}}>
                        <View style={{justifyContent: 'center', height: 50, width: 50, borderRadius: 50/2, backgroundColor: '#ff7675'}}>
                            <Image source={require('../assets/ico_marker_new.png')} style={{alignSelf: 'center', height: 25, width: 25, tintColor: 'white'}} />
                        </View>
                    </TouchableOpacity> 

                </View>
            )
        } 
    }
}

//create const to get the state
const mapStateToProps = state => {
    return {        
        venues: state.venues
    }
}

export default connect(mapStateToProps, actions)(Venue)
