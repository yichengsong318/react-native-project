import React from 'react';
import { StyleSheet, ActivityIndicator, Image, View } from 'react-native';

const Loading = () => (
    <View style={styles.LoadingScreen}>
        <View>
            <Image
                source={require('../assets/logo.png')}
                resizeMode="contain"
                style={styles.logo}
            />
            <ActivityIndicator size="large"/>
        </View>
    </View>
);

const styles = StyleSheet.create({
    LoadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 60,
        alignSelf: 'center',
        marginBottom: 30,
    },
});

export default Loading;
