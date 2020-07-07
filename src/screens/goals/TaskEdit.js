import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { storeContext } from '../../store';
import RefreshableScrollView from '../../components/RefreshableScrollView';
import Header from '../../components/Header';
import AppInput from '../../components/AppInput';
import InputDate from '../../components/InputDate';
import CommentList from '../../components/CommentList';
import CommentAddBar from '../../components/CommentAddBar';
import * as appStyles from '../../utils/styles';

const TaskEdit = observer(({ navigation }) => {
    const { taskStore } = useContext(storeContext);
    const task = taskStore.currentTask;
    const [name, setName] = useState(task.name ? task.name : null);
    const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate : null);
    const [description, setDescription] = useState(task.description ? task.description : null);

    useEffect(() => {
        setName(task.name);
        setDueDate(task.dueDate);
        setDescription(task.description);
    }, [task]);

    const handleSaveTask = async () => {
        await taskStore.updateTask(task, {
            name,
            dueDate,
            description,
        });

        navigation.navigate('GoalView');
    };

    return (
        <View style={styles.TaskEditScreen}>
            <Header
                title="Edit Task"
                left={{
                    title: 'Cancel',
                    color: '#fff',
                    onPress: () => navigation.navigate('GoalView'),
                }}
                right={{
                    title: 'Save',
                    color: '#fff',
                    onPress: handleSaveTask,
                }}
            />

            <RefreshableScrollView style={styles.main} onRefresh="fetchCurrentTask">
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Name</Text>
                    <AppInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Task name..."
                        style={styles.input}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Due date</Text>
                    <InputDate
                        value={dueDate}
                        placeholder="Set due date..."
                        onChange={setDueDate}
                        style={styles.input}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Description</Text>
                    <AppInput
                        value={description}
                        placeholder="Write description..."
                        onChangeText={setDescription}
                        style={[styles.input, styles.textBox]}
                        multiline={true}
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Comments</Text>
                    <CommentList task={task}/>
                </View>

                <View style={styles.scrollMargin}/>
            </RefreshableScrollView>

            <View style={styles.footer}>
                <CommentAddBar/>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    TaskEditScreen: {
        flex: 1,
    },
    main: {
        marginBottom: 30,
    },
    formGroup: {
        marginTop: 15,
    },
    label: {
        marginHorizontal: 15,
        marginBottom: 3,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderRadius: 0,
    },
    textBox: {
        height: 100,
        maxHeight: 100,
    },
    scrollMargin: {
        marginBottom: 20,
    },
    footer: {
        flexDirection: 'row',
        padding: appStyles.goals.gutter,
        backgroundColor: appStyles.colors.bg00,
        borderTopWidth: 1,
        borderTopColor: appStyles.colors.divider,
    },
});

export default TaskEdit;
