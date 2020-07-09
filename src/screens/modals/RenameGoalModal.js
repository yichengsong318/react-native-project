import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const RenameGoalModal = ({ navigation }) => {
    return (
        <View style={styles.RenameGoalModalScreen}>
            <Text>RenameGoalModal</Text>

            <Button
                onPress={() => navigation.pop()}
                title="Dismiss"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    RenameGoalModalScreen: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RenameGoalModal;
