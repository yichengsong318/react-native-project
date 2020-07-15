import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { storeContext } from '../../store';
import RefreshableScrollView from '../../components/RefreshableScrollView';
import GoalHeader from '../../components/GoalHeader';
import TaskList from '../../components/TaskList';
import TaskAddBar from '../../components/TaskAddBar';
import * as appStyles from '../../utils/styles';

const GoalView = observer(({ navigation }) => {
    const store = useContext(storeContext);
    const goal = store.goalStore.currentGoal;
    const tasks = store.taskStore.tasks;

    return (
        <View style={styles.GoalViewScreen}>
            <GoalHeader goal={goal}/>

            <View style={styles.main}>
                <View style={styles.goalHeader}><Text>GoalHeader</Text></View>
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
    GoalViewScreen: {
        flex: 1,
        backgroundColor: appStyles.colors.bg10,
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
    goalHeader: {
        padding: appStyles.goals.gutter,
    },
    footer: {
        flexDirection: 'row',
        padding: appStyles.goals.gutter,
        backgroundColor: appStyles.colors.bg00,
        borderTopWidth: 1,
        borderTopColor: appStyles.colors.divider,
    },
});

export default GoalView;
