import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { observer } from "mobx-react-lite";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storeContext } from '../../store';
import RefreshableScrollView from '../../components/RefreshableScrollView';
import Header from '../../components/Header';
import AppInput from '../../components/AppInput';
import InputTextarea from '../../components/InputTextarea';
import InputDate from '../../components/InputDate';
import CommentList from '../../components/CommentList';
import CommentAddBar from '../../components/CommentAddBar';
import * as appStyles from '../../utils/styles';
import AppButton from '../../components/AppButton';

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

    const openLabelsModal = () => {
        navigation.navigate('Modal', { screen: 'TaskLabelsModal' });
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
                    <Text style={styles.formLabel}>Name</Text>
                    <AppInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Task name..."
                        style={styles.input}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Due date</Text>
                    <InputDate
                        value={dueDate}
                        placeholder="Set due date..."
                        onChange={setDueDate}
                        style={styles.input}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Description</Text>
                    <InputTextarea
                        value={description}
                        placeholder="Write description..."
                        onChangeText={setDescription}
                        style={styles.input}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Labels</Text>

                    <View style={styles.formContent}>
                        {task.labels && task.labels.length ? (
                            <View style={styles.labelList}>
                                {task.labels.map((label) => (
                                    <TouchableOpacity
                                        key={label}
                                        style={[styles.label, { backgroundColor: appStyles.labelColors[label]}]}
                                        onPress={openLabelsModal}
                                    />
                                ))}
                                <TouchableOpacity onPress={openLabelsModal}>
                                    <Icon name="plus" size={16} style={styles.addLabelIcon}/>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <AppButton title="Add label" link onPress={openLabelsModal}/>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Comments</Text>
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
    formLabel: {
        marginHorizontal: 15,
        marginBottom: 3,
        fontSize: 16,
        fontWeight: 'bold',
    },
    formContent: {
        padding: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: appStyles.colors.divider,
        backgroundColor: appStyles.colors.bg00,
    },
    input: {
        borderRadius: 0,
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
    labelList: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        width: 50,
        height: 20,
        borderRadius: 20,
        marginRight: 5,
    },
    addLabelIcon: {
        marginLeft: 5,
        color: appStyles.colors.muted,
    },
});

export default TaskEdit;
