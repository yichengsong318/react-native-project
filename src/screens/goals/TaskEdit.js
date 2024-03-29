import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storeContext } from '../../store';
import { formatRRule } from '../../utils/formatting';
import RefreshableScrollView from '../../components/RefreshableScrollView';
import Header from '../../components/Header';
import AppInput from '../../components/AppInput';
import InputTextarea from '../../components/InputTextarea';
import InputDate from '../../components/InputDate';
import CommentList from '../../components/CommentList';
import CommentAddBar from '../../components/CommentAddBar';
import AppButton from '../../components/AppButton';
import * as appStyles from '../../utils/styles';

const TaskEdit = observer(({ navigation }) => {
    const { taskStore, goalStore } = useContext(storeContext);
    const task = taskStore.currentTask;
    const [name, setName] = useState(task.name ? task.name : null);
    const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate : null);
    const [recurrence, setRecurrence] = useState(task.recurrence ? task.recurrence : null);
    const [description, setDescription] = useState(task.description ? task.description : null);
    const canEditTask = goalStore.isGoalOwner && goalStore.currentGoal.goalStrive || goalStore.currentGoal.type === 'todo';

    useEffect(() => {
        setName(task.name);
        setDueDate(task.dueDate);
        setDescription(task.description);
        setRecurrence(task.recurrence);
    }, [task]);

    const handleSaveTask = async () => {
        await taskStore.updateTask(task, {
            name,
            dueDate,
            description,
            recurrence,
        });

        navigation.navigate('GoalView');
    };

    const openLabelsModal = () => {
        if (!canEditTask) return;

        navigation.navigate('Modal', { screen: 'TaskLabelsModal' });
    };

    const openRecurringModal = () => {
        if (!canEditTask) return;

        navigation.navigate('Modal', { screen: 'TaskRecurringModal' });
    };

    const handleClearRecurrence = () => {
        Alert.alert(
            'Clear Repeat',
            'Are you sure you no longer want this task to repeat?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: async () => {
                        setRecurrence(null)
                        await taskStore.updateTask(task, { recurrence: null });
                    },
                },
            ],
            { cancelable: false },
        );
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
                right={canEditTask ? {
                    title: 'Save',
                    color: '#fff',
                    onPress: handleSaveTask,
                } : null}
            />

            <RefreshableScrollView style={styles.main} onRefresh="fetchCurrentTask">
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Name</Text>
                    <AppInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Task name..."
                        style={styles.input}
                        disabled={!canEditTask}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Due date</Text>
                    <InputDate
                        value={dueDate}
                        placeholder="Set due date..."
                        onChange={setDueDate}
                        style={styles.input}
                        disabled={!canEditTask}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Description</Text>
                    <InputTextarea
                        value={description}
                        placeholder="Write description..."
                        onChangeText={setDescription}
                        style={styles.input}
                        disabled={!canEditTask}
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
                                {canEditTask ? (
                                    <AppButton title="Add label" link onPress={openLabelsModal}/>
                                ) : null}
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Repeat</Text>

                    <View style={styles.formContent}>
                        {recurrence ? (
                            <View style={styles.recurringContent}>
                                <TouchableOpacity
                                    onPress={canEditTask ? openRecurringModal : () => {}}
                                >
                                    <Text>{formatRRule(recurrence)}</Text>
                                </TouchableOpacity>
                                {canEditTask ? (
                                    <AppButton title="Clear" link onPress={handleClearRecurrence}/>
                                ) : null}
                            </View>
                        ) : (
                            <View>
                                {canEditTask ? (
                                    <AppButton title="Set schedule" link onPress={openRecurringModal}/>
                                ) : null}
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
    recurringContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default TaskEdit;
