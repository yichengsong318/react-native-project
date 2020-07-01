import _ from 'lodash';
import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { storeContext } from '../../store';
import RefreshableScrollView from '../../components/RefreshableScrollView';
import Header from '../../components/Header';
// import GoalItem from '../../components/GoalItem';
import * as appStyles from '../../utils/styles';

const Goals = observer(({ navigation }) => {
    const store = useContext(storeContext);
    const goals = store.goalStore.goals;

    const handleEditGoal = (goal) => {
        // store.goalStore.setCurrentGoal(goal);
        // navigation.navigate('CreateGoal');
    }

    const goalsByType = [
        ['My Goals', store.goalStore.getMyGoals()],
        ['Help Others', store.goalStore.getJoinedGoals()],
    ];

    const GoalTypeGroup = ({ type, goals }) => (
        <View>
            <Text>{type}</Text>
            {goals.map((goal) => (
                <Text key={goal.id}>{goal.name}</Text>
            ))}

            {/* {goals.map((goal) => (
                <GoalItem onPress={() => handleEditGoal(goal)} key={goal._id} goal={goal}/>
            ))} */}
        </View>
    );

    return (
        <View style={styles.GoalsScreen}>
            <Header
                right={{
                    title: 'Add',
                    icon: 'plus',
                    color: appStyles.colors.linkLight,
                    onPress: () => navigation.navigate('GoalTypeSelection'),
                }}
            />

            <RefreshableScrollView>
                {goals.length ?
                    goalsByType.map(([type, goals]) => (
                        <GoalTypeGroup key={type} type={type} goals={goals}/>
                    )) :
                    <View style={styles.noGoals}>
                        <Text style={styles.noGoalsTitle}>No goals</Text>
                        <Text style={styles.noGoalsDescription}>Press the Add + button to create a Goal.</Text>
                    </View>
                }
            </RefreshableScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    GoalsScreen: {
        flex: 1,
        backgroundColor: appStyles.colors.bg10,
    },
    headerTitle: {
        backgroundColor: 'red',
        textAlign: 'center',
    },
    noGoals: {
        marginTop: 80,
    },
    noGoalsTitle: {
        fontSize: 32,
        textAlign: 'center',
    },
    noGoalsDescription: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Goals;
