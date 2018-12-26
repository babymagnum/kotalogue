import React from 'react'
import { Text, FlatList, TouchableOpacity, Image, Dimensions, View } from 'react-native'

const dimension = Dimensions.get('screen')

export default class EventList extends React.PureComponent{
    constructor(props) {
      super(props)
    
      this.state = {
            textHeight: 0,
            textEventStatusHeight: 0,
      }
    }
    
    render(){
        return(
            <FlatList                
                numColumns = {2}
                contentContainerStyle = {{margin: 5}}
                data = {this.props.dataSource}
                renderItem = {({item}) => 
                <TouchableOpacity
                    // onPress = {() => {
                    //     console.log(`Item pressed ${item.venueName}`)
                    //     this.props.navigationNewPage.navigate('DetailVenue', {venueID: item.venueID})
                    // }}
                    style={{margin: 5}}>
                    <View>
                        <Image
                            borderRadius = {10} 
                            resizeMethod = 'resize'
                            source={{uri: item.eventHeaderPhoto}} 
                            style={{width: (dimension.width / 2) - 15, height: 200, resizeMode: 'cover'}} />
                        <Text 
                            onLayout = {(event) => this.setState({textEventStatusHeight: event.nativeEvent.layout.height})}
                            style={{paddingVertical: 7, fontFamily: 'roboto_reguler', fontSize: 15}}>{item.eventName}</Text>
                        <View 
                            onLayout = {(event) => this.setState({
                                textHeight: event.nativeEvent.layout.height})}
                            style={{borderTopRightRadius: 10, borderBottomLeftRadius: 10, position: 'absolute', padding: 10, marginTop: 200 - this.state.textHeight, maxWidth: dimension.width / 2 - 50, backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                            <Text                                
                                numberOfLines = {1}                                                
                                style={{color: 'white'}}>{item.eventStatus}</Text>
                        </View>
                    </View> 
                </TouchableOpacity>}
                //keyExtractor = {(index) => index.toString()}
            />
        )
    }
}
