import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { useNavigation } from '@react-navigation/native';
import { storeContext } from '../store';
import RefreshableScrollView from './RefreshableScrollView';
import GoalHeader from './GoalHeader';
import TaskList from './TaskList';
import TaskAddBar from './TaskAddBar';
import * as appStyles from '../utils/styles';

const GoalTodo = observer(() => {
    const navigation = useNavigation();
    const store = useContext(storeContext);
    const goal = store.goalStore.currentGoal;
    const tasks = store.taskStore.tasks;

    return (
        <View style={styles.GoalTodo}>
            <GoalHeader goal={goal}/>

            <View style={styles.main}>
                <View style={styles.taskHeader}>
                    <Text style={styles.taskHeaderTitle}>My Tasks</Text>
                </View>

                <RefreshableScrollView style={styles.goalMain} onRefresh="fetchCurrentGoal">
                    {store.goalStore.isFetchingCurrentGoal && !tasks ?
                        <Text>Loading...</Text> :
                        <TaskList tasks={store.taskStore.showCompletedTasks ? tasks : store.taskStore.incompleteTasks} navigation={navigation}/>
                    }
                </RefreshableScrollView>
            </View>

            <View style={styles.footer}>
                <TaskAddBar/>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    GoalTodo: {
        flex: 1,
    },
    main: {
        flex: 1,
        marginLeft: appStyles.goals.gutter,
        marginRight: appStyles.goals.gutter,
        marginTop: -60,
        borderTopLeftRadius: appStyles.general.borderRadius,
        borderTopRightRadius: appStyles.general.borderRadius,
        backgroundColor: appStyles.colors.bg00,
    },
    taskHeader: {
        borderBottomWidth: 1,
        borderBottomColor: appStyles.colors.divider,
        padding: appStyles.goals.gutter,
    },
    taskHeaderTitle: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 18,
    },
    footer: {
        flexDirection: 'row',
        padding: appStyles.goals.gutter,
        backgroundColor: appStyles.colors.bg00,
        borderTopWidth: 1,
        borderTopColor: appStyles.colors.divider,
    },
    progressBarContainer: {
        width: 200,
        marginBottom: 10,
    }
});

export default GoalTodo;
