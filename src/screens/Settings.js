import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { storeContext } from '../store';
import { NavigationActions } from 'react-navigation';

const Settings = ({ navigation }) => {
    const store = useContext(storeContext);
    const { userStore } = store;

    const user = userStore.user || {};

    const handleLogout = async () => {
        await userStore.logout();

        // TODO: Clear storage on logout as a temporary developer hack.
        // This should be removed before release.
        await AsyncStorage.clear();
        await store.init();

        navigation.reset([NavigationActions.navigate({ routeName: 'Auth' })], 0);
    }

    return (
        <View style={styles.SettingsScreen}>
            <Text>Settings</Text>

            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logout}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    SettingsScreen: {
        flex: 1,
    },
});

export default Settings;
