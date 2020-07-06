import _ from 'lodash';
import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
    const sortedTasks = _.orderBy(tasks, [(task) => task.completedAt], ['desc']);

    return (<View style={styles.TaskList}>
        {tasks && Array.isArray(tasks) ?
            sortedTasks.map((task) =>
                <TaskItem key={task.id} task={task}/>
            ) :
            <Text>No tasks</Text>
        }
    </View>);
};

const styles = StyleSheet.create({
    TaskList: {
        flex: 1,
    },
});

export default TaskList;
