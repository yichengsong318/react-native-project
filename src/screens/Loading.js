import React, { useContext, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Image, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { NavigationActions, StackActions } from 'react-navigation';
import { storeContext } from '../store';

const Loading = observer(({ navigation }) => {
    const store = useContext(storeContext);

    useEffect(() => {
        (async () => {
            if (!store.initialized) await store.init();
            navigation.dispatch(StackActions.reset({
                index: 0, key: null, actions: [
                    NavigationActions.navigate({ routeName: (store.userStore.user ? 'Home' : 'Home') }),
                ],
            }));
        })();
    });

    return (
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
});

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
