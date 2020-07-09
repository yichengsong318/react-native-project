import { StatusBar } from 'react-native';
import React from 'react'
import { View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import FlashMessage from 'react-native-flash-message';
import Navigation from './navigation';

export default () => (
    <MenuProvider>
        <View style={{ height: '100%' }}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <Navigation/>
            <FlashMessage position="top"/>
        </View>
    </MenuProvider>
);
