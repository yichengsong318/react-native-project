import React, { useContext } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { storeContext } from '../store';
import TaskItem from './TaskItem';
import * as appStyles from '../utils/styles';

const TaskList = ({ tasks }) => {
    const { goalStore } = useContext(storeContext);

    return (<View style={styles.TaskList}>
        {tasks && Array.isArray(tasks) ?
            tasks.map((task) =>
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
