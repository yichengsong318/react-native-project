import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Goals = ({ navigation }) => {
    return (
        <View style={styles.GoalsScreen}>
            <Text>Goals</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    GoalsScreen: {
        flex: 1,
    },
});

export default Goals;
