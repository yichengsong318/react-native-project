import { StatusBar } from 'react-native';
import React from 'react'
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import FlashMessage from 'react-native-flash-message';
import Navigation from './navigation';

const AppContainer = createAppContainer(Navigation);

export default () => (
    <View style={{ height: '100%' }}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <AppContainer/>
        <FlashMessage position="top"/>
    </View>
);
