import React from 'react'
import { Text, FlatList, ImageBackground, Image, TouchableOpacity, StyleSheet, View } from 'react-native'

export default class HappeningEventList extends React.PureComponent {
    constructor(props) {
      super(props)
    
      this.state = {
         textVenueNameHeight: 0
      }
    }
    
    render() {
        return (
        <FlatList            
            data = {this.props.dataSource}
            horizontal = {true}
            renderItem = {({item, index}) =>            
                <View style={{backgroundColor: 'white', borderRadius: 5, elevation: 2, shadowRadius: 3, shadowOpacity: 0.7, shadowColor: 'gray', shadowOffset: {width: 0, height: 2}, width: 140, marginLeft: index == 0 ? 10 : 5, marginRight: index == this.props.dataSource.length - 1 ? 10 : 5, marginVertical: 5}}>
                    {/* image top with text */}
                    <ImageBackground
                        resizeMethod = 'resize'
                        resizeMode = 'cover'
                        source = {require('../assets/new_icon.png')}
                        style={{width: 140, height: 170, resizeMode: 'cover', justifyContent: 'flex-end'}}>
                        <View style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', flexDirection: 'row', position: 'absolute', marginTop: 170 - this.state.textVenueNameHeight}}>
                            <Text
                                numberOfLines = {1}
                                onLayout = {(event) => this.setState({textVenueNameHeight: event.nativeEvent.layout.height})}
                                style={{padding: 10, color: 'white', textAlign: 'center', flex: 1}}
                            >{item.eventName}</Text>
                        </View>
                    </ImageBackground>
                    {/* view bottom */}
                    <View style={{flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 5, paddingVertical: 5}}>
                        <Text 
                            numberOfLines = {1}
                            style={{flex: 0.6, color: 'red', alignSelf: 'center', fontFamily: 'roboto_reguler'}}>{item.eventDate}</Text>
                        <View style={{flex: 0.4, paddingHorizontal: 5, flexDirection: 'row'}}>
                            <Image source={require('../assets/icon_bookmark_border.png')} style={{tintColor: 'gray', marginRight: 2.5, alignSelf: 'center', width: 20, height: 20, resizeMode: 'contain'}}/>
                            <Image source={require('../assets/icon_social_media.png')} style={{tintColor: 'gray', alignSelf: 'center', marginLeft: 2.5, width: 20, height: 20, resizeMode: 'contain'}}/>
                        </View>
                    </View>
                </View>
            }
            keyExtractor = {(index) => index.toString()}
        />
        )
    }
}

const styles = StyleSheet.create({})
