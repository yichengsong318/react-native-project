import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Settings = ({ navigation }) => {
    return (
        <View style={styles.SettingsScreen}>
            <Text>Settings</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    SettingsScreen: {
        flex: 1,
    },
});

export default Settings;
