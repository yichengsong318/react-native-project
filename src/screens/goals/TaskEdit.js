import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { storeContext } from '../../store';
import AppScrollView from '../../components/AppScrollView';
import Header from '../../components/Header';
import AppInput from '../../components/AppInput';
import InputDate from '../../components/InputDate';
import * as appStyles from '../../utils/styles';

const TaskEdit = observer(({ navigation }) => {
    const { goalStore } = useContext(storeContext);
    const task = navigation.getParam('task');
    const [name, setName] = useState(task.name ? task.name : null);
    const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate : null);
    const [description, setDescription] = useState(task.description ? task.description : null);

    const handleSaveTask = async () => {
        await goalStore.updateTask(task, {
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

            <AppScrollView>
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
            </AppScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    TaskEditScreen: {
        flex: 1,
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
});

export default TaskEdit;
