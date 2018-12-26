import React, { Component } from 'react'
import { Text, Platform, TouchableOpacity, Dimensions, Image, StyleSheet, View } from 'react-native'

const dimensions = Dimensions.get('window')

export default class DetailHeader extends Component {

    backButtonClick = () => {
        this.props.navigationDetailHeader.goBack()
    }

    render() {
        return (
        <View style={{flexDirection: 'row', height: 56, width: dimensions.width}}>
            {/* left side toolbar */}
            <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 10, flexDirection: 'row'}}>
                <TouchableOpacity 
                    style={{alignSelf: 'center'}}
                    onPress={() => this.backButtonClick()}>
                    {Platform.OS === 'ios' ? 
                    <Image source={require('./assets/back_ios.png' )} style={styles.backStyle}/> : 
                    <Image source={require('./assets/back_android.png' )} style={styles.backStyle}/> }
                </TouchableOpacity>
            </View>

            {/* right side toolbar */}
            <View style={{flex: 1, paddingHorizontal: 10, justifyContent: 'flex-end', flexDirection: 'row', backgroundColor: 'white'}}>
                {/* icon social media */}
                <TouchableOpacity style={{alignSelf: 'center'}}>
                    <Image source={require('./assets/icon_thumbs_up_border.png')} style={{...styles.backStyle, marginRight: 10}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: 'center'}}>
                    <Image source={require('./assets/icon_thumbs_down_border.png')} style={{...styles.backStyle, marginHorizontal: 10}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: 'center'}}>
                    <Image source={require('./assets/icon_bookmark_border.png')} style={{...styles.backStyle, marginHorizontal: 10}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: 'center'}}>
                    <Image source={require('./assets/icon_social_media.png')} style={{...styles.backStyle, marginLeft: 10}}/>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    backStyle: {
        height: 22,
        width: 22,
        tintColor: 'gray'        
    }
})
