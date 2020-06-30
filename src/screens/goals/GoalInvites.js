import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const GoalInvites = ({ navigation }) => {
    return (
        <View style={styles.GoalInvitesScreen}>
            <Text>Invites</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    GoalInvitesScreen: {
        flex: 1,
    },
});

export default GoalInvites;
