import React, { useContext, useRef } from 'react';
import { StyleSheet, Animated, Alert, Platform, TouchableOpacity, View, Text } from "react-native";
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storeContext } from '../store'
import { formatDateShort } from '../utils/formatting';
import * as appStyles from '../utils/styles';

const AnimatedIcon = Animated.createAnimatedComponent(Icon, { useNativeDriver: true });

const TaskItem = ({ navigation, task }) => {
    const store = useContext(storeContext);
    const swipeableTask = useRef(null);
    const goal = store.goalStore.currentGoal;
    const canCompleteTask = store.goalStore.isGoalOwner && (goal.goalStrive && goal.goalStrive.startedAt) || goal.type === 'todo';
    const canDeleteTask = store.goalStore.isGoalOwner && goal.goalStrive || goal.type === 'todo';

    const handleTaskCompletion = () => {
        if (task.completedAt) {
            store.taskStore.updateTask(task, { completedAt: null });
        } else {
            store.taskStore.updateTask(task, { completedAt: new Date() });
        }

        swipeableTask.current.close();
    }

    const handleViewTask = async () => {
        store.taskStore.setCurrentTask(task);
        await store.taskStore.fetchCurrentTask();

        navigation.navigate('TaskEdit');
    }

    const deleteTask = () => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => swipeableTask.current.close(),
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => store.taskStore.removeTask(task),
                },
            ],
            { cancelable: false },
        );
    }

    const renderLeftActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });

        return (
            <View
                style={[styles.leftAction, !task.completedAt ? styles.leftActionComplete : null]}
                onPress={handleTaskCompletion}
            >
                <AnimatedIcon
                    name={task.completedAt ? 'undo' : 'check'}
                    size={20}
                    color="#fff"
                    style={[styles.actionIcon, { transform: [{ scale }] }]}
                />
            </View>
        );
    }

    const renderRightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        const ButtonComponent = Platform.OS === 'ios' ? TouchableOpacity : RectButton;
        return (
            <ButtonComponent style={styles.rightAction} onPress={deleteTask}>
                <AnimatedIcon
                    name="trash"
                    size={20}
                    color="#fff"
                    style={[styles.actionIcon, { transform: [{ scale }] }]}
                />
            </ButtonComponent>
        );
    }

    return (
        <Swipeable
            ref={swipeableTask}
            friction={3}
            renderLeftActions={canCompleteTask ? renderLeftActions : null}
            leftThreshold={30}
            onSwipeableLeftOpen={canCompleteTask ? handleTaskCompletion : null}
            renderRightActions={canDeleteTask ? renderRightActions : null}
            rightThreshold={60}
        >
            <TouchableOpacity style={styles.TaskItem} activeOpacity={1} onPress={handleViewTask}>
                <View style={styles.main}>
                    <Text
                        style={[styles.name, task.completedAt ? styles.nameComplete : null]}
                        numberOfLines={1}
                    >
                        {task.name}
                    </Text>
                    <View style={styles.meta}>
                        {task.recurrence ? (<Icon name="sync" style={styles.metaIcon}/>) : null}
                        {task.attachmentCount > 0 ? (<Icon name="paperclip" style={styles.metaIcon}/>) : null}
                        {task.commentCount > 0 ? (<Icon name="comment-dots" style={styles.metaIcon}/>) : null}
                        {task.dueDate ? (<Text style={styles.dueDate}>{formatDateShort(task.dueDate)}</Text>) : null}
                    </View>
                </View>
                <View style={styles.labelList}>
                    {task.labels && task.labels.map((label) => (
                        <View
                            key={label}
                            style={[styles.label, { backgroundColor: appStyles.labelColors[label]}]}
                        />
                    ))}
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
};

const styles = StyleSheet.create({
    TaskItem: {
        borderBottomWidth: 1,
        borderBottomColor: appStyles.colors.divider,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: appStyles.colors.bg00,
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    meta: {
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaIcon: {
        marginLeft: 10,
        fontSize: 16,
        color: appStyles.colors.muted,
    },
    dueDate: {
        marginLeft: 10,
        borderWidth: 1,
        borderColor: appStyles.colors.muted,
        borderRadius: appStyles.general.borderRadius,
        paddingHorizontal: 6,
        fontSize: 13,
        textAlign: 'center',
        color: appStyles.colors.muted,
    },
    name: {
        flex: 1,
        fontWeight: 'bold',
    },
    nameComplete: {
        textDecorationLine: 'line-through',
        color: appStyles.colors.muted,
    },
    actionIcon: {
        width: 20,
        marginHorizontal: 10,
    },
    leftAction: {
        flex: 1,
        alignItems: 'flex-end',
        backgroundColor: appStyles.colors.warning,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    leftActionComplete: {
        backgroundColor: appStyles.colors.success,
    },
    rightAction: {
        alignItems: 'flex-end',
        backgroundColor: appStyles.colors.danger,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    labelList: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    label: {
        width: 30,
        height: 6,
        borderRadius: 6,
        marginRight: 5,
    },
});

export default TaskItem;
