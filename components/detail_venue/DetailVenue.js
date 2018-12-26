import React, { Component } from 'react'
import { Text, Alert, LayoutAnimation, TouchableOpacity, ScrollView, FlatList, Image, StyleSheet, Dimensions, ActivityIndicator, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import * as firebase from 'firebase'
import 'firebase/firestore'
import DetailHeader from '../DetailHeader'
import LayoutPart from '../LayoutPart'
import HappeningEventList from './happening_event';

const dimensions = Dimensions.get('window')

export default class DetailVenue extends Component {
    constructor(props) {
      super(props)
        
      this.state = {
        isLoading: true,
        venueID: '',
        modelVenue: null,        
      }
    }

    //life cycle
    componentDidMount = () => {
        //get the detail venue data
        firebase.firestore().collection('Venue').doc(this.state.venueID).onSnapshot(this.onUpdateData)        
    }
    
    componentWillMount = () => {
        this.setState({venueID: this.props.navigation.state.params.venueID})           
    }

    //funtion
    onUpdateData = (doc) => {
        const data = doc.data()
        const dataVenue = {
            venueName: data.venueName,
            venueID: data.venueID,
            venueHeaderPhoto: data.venueHeaderPhoto,
            venueAddress: data.venueAddress,
            venueFacebook: data.venueFacebook,
            venueTwitter: data.venueTwitter,
            venueInstagram: data.venueInstagram,
            venueWebsite: data.venueWebsite,
            venuePhoneNumber: data.venuePhoneNumber,
            venueWhatsapp: data.venueWhatsapp,
            venueEmail: data.venueEmail
        }
        
        this.updateState(dataVenue)
    }
    
    updateState = (dataVenue) => {
        this.setState({modelVenue: dataVenue, isLoading: false})
    }
    
    render() {
        const state = this.state

        return (
            <View style={{flex: 1, marginTop: getStatusBarHeight()}}>
                {state.isLoading ? 
                <ActivityIndicator 
                    color = 'red'
                    animating = {true}
                /> : null}
                    
                {/* toolbar */}
                <DetailHeader navigationDetailHeader={this.props.navigation}/>

                {/* content main */}
                {this.state.modelVenue == null ? null : 
                <ContentMain modelVenue = {this.state.modelVenue} socialMedia = {[
                    {
                        text: this.state.modelVenue.venueFacebook == 'https://www.facebook.com/' ? '' : this.state.modelVenue.venueFacebook,
                        imageUrl: this.state.modelVenue.venueFacebook == 'https://www.facebook.com/' ? '' : require('../assets/soc_facebook.png')
                    },
                    {
                        text: this.state.modelVenue.venueInstagram == 'https://www.instagram.com/' ? '' : this.state.modelVenue.venueInstagram,
                        imageUrl: this.state.modelVenue.venueInstagram == 'https://www.instagram.com/' ? '' : require('../assets/soc_instagram.png')
                    },
                    {
                        text: this.state.modelVenue.venueTwitter == 'https://www.twitter.com/' ? '' : this.state.modelVenue.venueTwitter,
                        imageUrl: this.state.modelVenue.venueTwitter == 'https://www.twitter.com/' ? '' : require('../assets/soc_twitter.png')
                    },
                    {
                        text: this.state.modelVenue.venueWhatsapp == '' ? '' : this.state.modelVenue.venueWhatsapp,
                        imageUrl: this.state.modelVenue.venueWhatsapp == '' ? '' : require('../assets/soc_wa.png')
                    },
                    {
                        text: this.state.modelVenue.venueWebsite == '' ? '' : this.state.modelVenue.venueWebsite,
                        imageUrl: this.state.modelVenue.venueWebsite == '' ? '' : require('../assets/soc_web.png')
                    },
                    {
                        text: this.state.modelVenue.venueEmail == '' ? '' : this.state.modelVenue.venueEmail,
                        imageUrl: this.state.modelVenue.venueEmail == '' ? '' : require('../assets/soc_email.png')
                    },
                    {
                        text: this.state.modelVenue.venuePhoneNumber == '' ? '' : this.state.modelVenue.venuePhoneNumber,
                        imageUrl: this.state.modelVenue.venuePhoneNumber == '' ? '' : require('../assets/icon_phone.png')
                    }
                ]} />}
            </View>
        )
    }
}

class ContentMain extends Component{
    constructor(props) {
        super(props)        

        this.state = {
            textAddressHeigth: 0,
            imageMainWidth: 0,
            imageSecondaryWidth: 0,
            imageGalleryShow: true,
            socialMedia: [],
            happeningEventList: [],
            upcomingEventList: [],
            socialMediaOpen: false,
            happeningEventOpen: false,
            upcomingEventOpen: false,
            socialMediaEmpty: true           
        }
    }

    //life cycle
    componentDidMount = () => {
        this.setState({socialMedia: this.props.socialMedia})        

        this.populateHappeningEvent()

        setTimeout(() => {
            console.log(this.state.happeningEventList)
        }, 100);

        //filter the array to remove empty value
        setTimeout(() => { 
            var filterArray = this.state.socialMedia.filter(function(params) {
                return params.text != ''
            })
            
            if (filterArray.length > 0) {
                this.setState({socialMediaEmpty: false})
            }

            this.setState({socialMedia: filterArray})
        }, 100);
    }

    componentWillUpdate = () => {
        LayoutAnimation.easeInEaseOut()
    }

    //function
    populateHappeningEvent = () => {
        var array = []
        for (let index = 0; index < 10; index++) {
            let data = {
                eventName: 'Test Venue',
                eventDate: 'Nov 20, 2018'
            }

            array.push(data)
        }

        this.setState({happeningEventList: array, upcomingEventList: array})
    }

    async printComponent(){
        //for item with handler if its done
        var arrayOfInt = [1, 2, 3, 4, 5, 6, 7]
        for (const item of arrayOfInt){
            await console.log(item)
        }
        console.log('for item of with handle is done')
    }
    
    openingHoursClick = () => {
        this.showAlert('In development', '*)This feature is in development, please check it later in the next update')
    }

    openSocialMedia = () => {
        this.setState({openSocialMedia: !this.state.openSocialMedia})
    }
    
    showAlert = (title, message) => {
        Alert.alert(
            title,
            message,
            [
                {text: 'Understand', onPress: () => console.log('pressed')}
            ],
            {cancelable: true}
        )
    }
        
    render(){
        const data = this.props.modelVenue
        if (data == null) {
            return null
        } else {
            return(
                <ScrollView>
                    <View style={{flex: 1, backgroundColor: '#FAFAFA'}}>
                    {/* image header */}
                    <Image source={{uri: data.venueHeaderPhoto}} style={{width: dimensions.width, height: 250}} />
                    
                    {/* title */}
                    <Text style={{marginTop: 20, marginHorizontal: 10, fontSize: 25, fontFamily: 'roboto_medium'}}>{data.venueName}</Text>
                    
                    {/* layout address */}
                    <View style={{marginTop: 15, flexDirection: 'row', marginHorizontal: 10}}>
                        <Text
                            onLayout={(event) => this.setState({textAddressHeigth: event.nativeEvent.layout.height})} 
                            numberOfLines = {4}
                            style={{fontSize: 15, fontFamily: 'roboto_reguler', flex: 0.75, marginRight: 5}}>{data.venueAddress}</Text>
                        <Image 
                            borderRadius={10}
                            source={require('../assets/static_maps.png')} 
                            style={{height: this.state.textAddressHeigth, marginLeft: 5, width: this.state.textAddressHeigth, flex: 0.25}} />
                    </View>

                    {/* layout gallery */}
                    {this.state.imageGalleryShow ? 
                    <View style={{marginHorizontal: 10, marginTop: 20, marginBottom: 10, flexDirection: 'row'}}>
                        <View 
                            onLayout = {(event) => this.setState({imageMainWidth: event.nativeEvent.layout.width})}
                            style={{flex: 0.70, marginRight: 5}}>
                            <Image
                                borderRadius = {10}
                                source={require('../assets/static_maps.png')}
                                style={{resizeMode: 'cover', width: this.state.imageMainWidth, height: 180}}
                            />
                        </View>
                        <View 
                            onLayout = {(event) => this.setState({imageSecondaryWidth: event.nativeEvent.layout.width})}
                            style={{flex: 0.30, marginLeft: 5}}>
                            <Image 
                                borderRadius={10}
                                style={{resizeMode: 'cover', marginBottom: 5, height: (180/2) - 5, width: this.state.imageSecondaryWidth}}
                                source={require('../assets/static_maps.png')} />
                            <Image 
                                borderRadius={10}
                                style={{resizeMode: 'cover', marginTop: 5, height: (180/2) - 5, width: this.state.imageSecondaryWidth}}
                                source={require('../assets/static_maps.png')} />
                        </View>
                    </View> : null}
                    
                    {/* layut opening hours */}
                    <LayoutPart onPress = {() => this.openingHoursClick()} label = 'Opening Hours' icon = {require('../assets/icon_time.png')} hexCode = '#74b9ff' />                                        

                    {/* layout social media */}
                    <LayoutPart onPress = {() => {
                        if (this.state.socialMediaEmpty) {
                            this.showAlert('Empty Social Media', 'This venue has no active social media')
                        } else {
                            this.setState({socialMediaOpen: !this.state.socialMediaOpen})
                        }
                    }} label = 'Social Media' icon = {require('../assets/icon_social_media.png')} hexCode = '#55efc4' />                            
                    {this.state.socialMediaOpen ? 
                    <FlatList 
                        contentContainerStyle = {{marginLeft: 60, marginRight: 10}}
                        data = {this.state.socialMedia}
                        renderItem = {({item, index}) => (
                            <TouchableOpacity style={{marginTop: index == 0 ? 10 : 5, marginBottom: index == this.state.socialMedia.length - 1 ? 10 : 5}}>
                                {/* content main */}
                                {item == '' ? null : 
                                    <View style={{flexDirection: 'row'}}>
                                        <Image source={item.imageUrl} style={{height: 20, width: 20, alignSelf: 'center'}} />
                                        <Text 
                                            numberOfLines = {1}
                                            style = {{alignSelf: 'center', fontFamily: 'roboto_reguler', marginLeft: 10, fontSize: 15}}>{item.text}</Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        )}
                        keyExtractor = {(item) => item}
                    /> : null}
                    
                    {/* happening event list */}
                    <LayoutPart
                        onPress = {() => this.setState({happeningEventOpen: !this.state.happeningEventOpen})}
                        label = 'Happening Event' icon = {require('../assets/ico_happening_event.png')} hexCode = '#a29bfe' />                    
                    {this.state.happeningEventOpen ? 
                    <HappeningEventList dataSource = {this.state.happeningEventList} /> : null}

                    {/* upcoming event */}
                    <LayoutPart 
                        onPress = {() => this.setState({upcomingEventOpen: !this.state.upcomingEventOpen})}
                        label = 'Upcoming Event' icon = {require('../assets/ico_upcoming_event.png')} hexCode = '#ff7675' />
                    {this.state.upcomingEventOpen ?
                    <HappeningEventList dataSource = {this.state.upcomingEventList} /> : null}

                    <LayoutPart label = 'Subvenue' icon = {require('../assets/ico_venue.png')} hexCode = '#ffbe76' />
                </View>
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({})
