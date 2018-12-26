import React, { Component } from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator, TabBarBottom, createAppContainer } from 'react-navigation'
import FeaturedEvent from './FeaturedEvent'
import Event from './events/Event'
import Brand from './Brand'
import More from './More'
import Venue from './venues/Venue'

const tab = createBottomTabNavigator({
    Featured: FeaturedEvent,
    Event: Event,
    Venue: Venue,
    Brand: Brand,
    More: More
},
{
    initialRouteName: 'Venue',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            const { routeName } = navigation.state;            
            switch (routeName) {
                case "Featured":
                    return <Image style={{tintColor: tintColor, height: 20, width: 20}} source={require('./assets/ico_happening_event.png')} />            
                case "Event":
                    return <Image style={{tintColor: tintColor, height: 20, width: 20}} source={require('./assets/ico_calendar_new.png')} />
                case "Venue":
                    return <Image style={{tintColor: tintColor, height: 20, width: 20}} source={require('./assets/ico_marker_new.png')} />
                case "Brand":
                    return <Image style={{tintColor: tintColor, height: 20, width: 20}} source={require('./assets/icon_management.png')} />
                case "More":
                    return <Image style={{tintColor: tintColor, height: 20, width: 20}} source={require('./assets/icon_menu.png')} />
                default:
                    return <Image style={{tintColor: tintColor, height: 20, width: 20}} source={require('./assets/ico_calendar_new.png')} />
            }
        },
    }),
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,    
    tabBarOptions: {
        activeTintColor: '#ff7675',
        inactiveTintColor: '#b2bec3'        
    },
    animationEnabled: true,
    swipeEnabled: false
})

export default createAppContainer(tab)
