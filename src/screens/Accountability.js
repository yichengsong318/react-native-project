import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Accountability = ({ navigation }) => {
    return (
        <View style={styles.AccountabilityScreen}>
            <Text>Accountability</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    AccountabilityScreen: {
        flex: 1,
    },
});

export default Accountability;
