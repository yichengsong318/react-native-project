import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { observer } from "mobx-react-lite";
import { useNavigation } from '@react-navigation/native';
import { storeContext } from '../store';
import RefreshableScrollView from './RefreshableScrollView';
import GoalHeader from './GoalHeader';
import TaskList from './TaskList';
import TaskAddBar from './TaskAddBar';
import StriveProgressBar from './StriveProgressBar';
import AppButton from './AppButton';
import * as appStyles from '../utils/styles';

const GoalStrive = observer(() => {
    const navigation = useNavigation();
    const store = useContext(storeContext);
    const [isPending, setIsPending] = useState(false);

    const goal = store.goalStore.currentGoal;
    const tasks = store.taskStore.tasks;
    const isGoalOwner = store.goalStore.isGoalOwner;

    const handleStartGoal = () => {
        Alert.alert(
            'Ready to start?',
            'Are you sure you want to start your goal? Starting a goal will begin tracking your progress and involve your Accountability Partner(s) immediately. Once a goal is started, you cannot pause it.', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Start Goal',
                    onPress: async () => {
                        setIsPending(true);
                        await store.goalStore.startStriveGoal(goal);
                        setIsPending(false);
                    },
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <View style={styles.GoalStrive}>
            <GoalHeader goal={goal}/>

            <View style={styles.main}>
                <View style={styles.taskHeader}>
                    {goal.goalStrive.startedAt ? (
                        <View style={styles.progressBarContainer}>
                            <StriveProgressBar goal={goal} showDates/>
                        </View>
                    ) : (
                        <View>
                            {isGoalOwner ? (
                                <AppButton
                                    color={appStyles.colors.success}
                                    title="Start Goal"
                                    onPress={handleStartGoal}
                                    disabled={isPending}
                                />
                            ) : null}
                        </View>
                    )}
                    <Text style={styles.taskHeaderTitle}>
                        {isGoalOwner ? 'My Tasks' : 'Tasks'}
                    </Text>
                </View>

                <RefreshableScrollView style={styles.goalMain} onRefresh="fetchCurrentGoal">
                    {store.goalStore.isFetchingCurrentGoal && !tasks ?
                        <Text>Loading...</Text> :
                        <TaskList tasks={store.taskStore.showCompletedTasks ? tasks : store.taskStore.incompleteTasks} navigation={navigation}/>
                    }
                </RefreshableScrollView>
            </View>

            {isGoalOwner ? (
                <View style={styles.footer}>
                    <TaskAddBar/>
                </View>
            ) : null}
        </View>
    );
});

const styles = StyleSheet.create({
    GoalStrive: {
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

export default GoalStrive;
