import _ from 'lodash';
import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { storeContext } from '../../store';
import RefreshableScrollView from '../../components/RefreshableScrollView';
import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import GoalItem from '../../components/GoalItem';
import * as appStyles from '../../utils/styles';

const GoalList = observer(({ navigation }) => {
    const store = useContext(storeContext);

    const handleViewGoal = async (goal) => {
        store.goalStore.setCurrentGoal(goal);
        await store.goalStore.fetchCurrentGoal();

        if (store.goalStore.currentGoal.goalStrive && store.goalStore.currentGoal.goalStrive.inSetup) {
            navigation.navigate('GoalStriveSetup');
            return;
        }

        navigation.navigate('GoalView');
    }

    const goalsByType = [
        ['My Goals', store.goalStore.getMyGoals],
        ['Help Others', store.goalStore.getJoinedGoals],
    ];

    const GoalTypeGroup = ({ type, goals }) => (
        <View>
            <SectionHeader title={type}/>
            {goals.map((goal) => (
                <GoalItem onPress={() => handleViewGoal(goal)} key={goal.id} goal={goal}/>
            ))}
        </View>
    );

    return (
        <View style={styles.GoalListScreen}>
            <Header
                right={{
                    title: 'Create',
                    icon: 'plus',
                    onPress: () => navigation.navigate('GoalTypeSelection'),
                }}
            />

            <RefreshableScrollView>
                {store.goalStore.goals.length ?
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
    GoalListScreen: {
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

export default GoalList;
