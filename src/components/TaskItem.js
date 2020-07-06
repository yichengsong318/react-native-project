import React, { useContext, useRef } from 'react';
import { StyleSheet, Animated, Alert, Platform, TouchableOpacity, View, Text } from "react-native";
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storeContext } from '../store'
import * as appStyles from '../utils/styles';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const TaskItem = ({ onPress, task }) => {
    const store = useContext(storeContext);
    const swipeableTicket = useRef(null);

    const handleTaskCompletion = () => {
        if (task.completedAt) {
            store.goalStore.setCompletedAtTask(task, null);
        } else {
            store.goalStore.setCompletedAtTask(task, new Date());
        }

        swipeableTicket.current.close();
    }

    const deleteTask = () => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => swipeableTicket.current.close(),
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => store.goalStore.removeTask(task),
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
            ref={swipeableTicket}
            friction={3}
            renderLeftActions={renderLeftActions}
            leftThreshold={30}
            onSwipeableLeftOpen={handleTaskCompletion}
            renderRightActions={renderRightActions}
            rightThreshold={60}
        >
            <View style={styles.TaskItem}>
                <Text style={[styles.name, task.completedAt ? styles.nameComplete : null]} numberOfLines={1}>{task.name}</Text>
            </View>
        </Swipeable>
    )
};

const styles = StyleSheet.create({
    TaskItem: {
        borderTopWidth: 1,
        borderTopColor: appStyles.colors.divider,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: appStyles.colors.bg00,
    },
    name: {
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
});

export default TaskItem;
