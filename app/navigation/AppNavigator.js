import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AudioList from '../screens/AudioList';
import Player from '../screens/Player';
import PlayList from '../screens/PlayList';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'; 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return <Tab.Navigator>
        <Tab.Screen name='AudioList' component={AudioList} options = {{
            tabBarIcon: ({color, size}) =>{
                return <Ionicons name="headset" size={24} color="black" />
            }
        }}
        />
        <Tab.Screen name='Player' component={Player} options = {{
            tabBarIcon: ({color, size}) =>{
                return <FontAwesome6 name="compact-disc" size={24} color="black" />
            }
        }}
        />
        <Tab.Screen name='PlayList' component={PlayList}options = {{
            tabBarIcon: ({color, size}) =>{
                return <MaterialCommunityIcons name="playlist-music" size={24} color="black" />
            }
        }}
        />
        </Tab.Navigator>
        
    

}




export default AppNavigator;
