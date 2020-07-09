import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import { storeContext } from '../store';

const Settings = ({ navigation }) => {
    const store = useContext(storeContext);
    const { userStore } = store;

    const handleLogout = async () => {
        await userStore.logout();

        // TODO: Clear storage on logout as a temporary developer hack.
        // This should be removed before release.
        await AsyncStorage.clear();
        await store.init();

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            }),
        );
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
