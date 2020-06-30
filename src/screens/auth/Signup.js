import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Signup = ({ navigation }) => {
    return (
        <View style={styles.SignupScreen}>
            <Text>Signup</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    SignupScreen: {
        flex: 1,
    },
});

export default Signup;
