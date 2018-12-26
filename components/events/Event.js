import React, { Component } from 'react'
import { LayoutAnimation, Platform, ActivityIndicator, Dimensions, StatusBar, SafeAreaView, TouchableOpacity, Image, TextInput, StyleSheet, View } from 'react-native'
import MyToolbar from '../common/my_toolbar';
import EventList from './event_list' 
import {connect} from 'react-redux'
import * as actions from '../actions/Actions'

const dimension = Dimensions.get('window')

class Event extends Component {
  constructor(props) {
    super(props)
  
    this.state = {       
       indicatorShow: true
    }
  }

  componentDidMount = () => {
    console.log(this.props.events.length)
    if (this.props.events.length > 0) {
        this.setState({indicatorShow: false})
    } else{
        this.populateData()
    }
  }

  componentWillUpdate = () => {
    LayoutAnimation.easeInEaseOut()
  }
  
  populateData() {
    this.props.removeAllEvent()

    for (let index = 0; index < 350; index++) {
        let data =  {
          eventID: 1,
          eventName: 'Test Event Name',
          eventStatus: 'Happening now',
          eventHeaderPhoto: 'https://firebasestorage.googleapis.com/v0/b/kotalogue-project.appspot.com/o/Venue%2F024321af-9eda-4c78-ae34-1a9c8ec75bd7%2F024321af-9eda-4c78-ae34-1a9c8ec75bd7?alt=media&token=abe25576-46da-4607-a4fd-1c3766dde0c4'
        }
        
        this.props.addNewEvent(data)

        this.setState({indicatorShow: false})
    }
  }
  
  render() {
    if (Platform.OS == 'ios') {
        return(
          <SafeAreaView>          
            {/* toolbar */}
            <MyToolbar />
            {this.state.indicatorShow ? 
            <ActivityIndicator 
              style={{marginTop: 30}}
              size = 'small'
              color = '#ff7675'  
            /> : null}

            <EventList 
              navigationNewPage = {this.props.navigation}
              dataSource = {this.props.events} />            

            {/* floating button */}
            <TouchableOpacity style={{marginLeft: dimension.width - 70, marginTop: dimension.height - (49 + 50 + 20), position: 'absolute'}}>
              <View style={{justifyContent: 'center', height: 50, width: 50, borderRadius: 50/2, backgroundColor: '#ff7675'}}>
                  <Image source={require('../assets/ico_marker_new.png')} style={{alignSelf: 'center', height: 25, width: 25, tintColor: 'white'}} />
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        )
    } else{
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <StatusBar backgroundColor='white' barStyle='dark-content' />
          
          {/* toolbar */}
          <MyToolbar />          
          
          {this.state.indicatorShow ? 
          <ActivityIndicator 
            style={{marginTop: 30}}
            size = 'small'
            color = '#ff7675'  
          /> : null}
          
          {/* event list */}
          <EventList 
              navigationNewPage = {this.props.navigation}
              dataSource = {this.props.events} />         

          {/* floating button */}
          <TouchableOpacity style={{marginLeft: dimension.width - 70, marginTop: dimension.height - (49 + 50 + 20), position: 'absolute'}}>
            <View style={{justifyContent: 'center', height: 50, width: 50, borderRadius: 50/2, backgroundColor: '#ff7675'}}>
                <Image source={require('../assets/ico_marker_new.png')} style={{alignSelf: 'center', height: 25, width: 25, tintColor: 'white'}} />
            </View>
          </TouchableOpacity>        
        </View>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps, actions)(Event)