import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import  AudioProvider  from './app/context/AudioProvider';
import AppNavigator from './app/navigation/AppNavigator';
import { View } from 'react-native';
import AudioListItem from './app/components/AuidioListItem';

export default function App() {
  return( 
  <AudioProvider>
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
  </AudioProvider>)

  }