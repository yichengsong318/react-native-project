import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import * as appStyles from '../utils/styles';

const TaskItem = ({ task }) => (
    <View style={styles.TaskItem}>
        <Text>{task.name}</Text>
    </View>
);

const styles = StyleSheet.create({
    TaskItem: {
        flex: 1,
    },
});

export default TaskItem;
