import React, {Component, PureComponent} from 'react'
import { Text, FlatList, Dimensions, TouchableOpacity, Image, StyleSheet, View } from 'react-native'

const dimension = Dimensions.get('screen')

export default class VenueList extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         textHeight: 0
      }
    }
    
    render() {
        return (
        <FlatList
            contentContainerStyle = {{marginLeft: 5}}
            numColumns = {2}
            data = {this.props.dataSource}
            renderItem = {({item}) => 
                <Item item = {item} navigationNewPage = {this.props.navigationNewPage} />
            }            
        />
        )
    }
}

class Item extends PureComponent{
    constructor(props) {
      super(props)
    
      this.state = {
         textHeight: 0
      }
    }
    
    render(){
        const item = this.props.item
        return(
            <TouchableOpacity 
                onPress = {() => {
                    console.log(`Item pressed ${item.venueName}`)
                    this.props.navigationNewPage.navigate('DetailVenue', {venueID: item.venueID})
                }}
                style={{margin: 5}}>
                <View>
                    <Image
                        borderRadius = {10} 
                        resizeMethod = 'resize'
                        source={{uri: item.venueHeaderPhoto}} 
                        style={{width: (dimension.width / 2) - 15, height: 200, resizeMode: 'cover'}} />
                    <View 
                        onLayout = {(event) => this.setState({textHeight: event.nativeEvent.layout.height})}
                        style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, position: 'absolute', padding: 10, marginTop: 200 - this.state.textHeight, width: (dimension.width / 2) - 15, backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                        <Text                                         
                            numberOfLines = {1}                                                
                            style={{textAlign: 'center', color: 'white'}}>{item.venueName}</Text>
                    </View>
                </View> 
            </TouchableOpacity>
        )
    }
}
