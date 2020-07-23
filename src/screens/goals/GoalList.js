import _ from 'lodash';
import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { showMessage } from 'react-native-flash-message';
import { storeContext } from '../../store';
import RefreshableScrollView from '../../components/RefreshableScrollView';
import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import GoalItem from '../../components/GoalItem';
import * as appStyles from '../../utils/styles';

const GoalList = observer(({ navigation }) => {
    const { goalStore, userStore } = useContext(storeContext);
    const withinGoalLimits = userStore.isPremium || !userStore.isPremium && goalStore.getMyGoals.length < 5;

    const handleViewGoal = async (goal) => {
        goalStore.setCurrentGoal(goal);
        await goalStore.fetchCurrentGoal();

        if (goalStore.currentGoal.goalStrive && goalStore.currentGoal.goalStrive.inSetup) {
            navigation.navigate('GoalStriveSetup');
            return;
        }

        navigation.navigate('GoalView');
    }

    const handleReachedGoalLimit = () => {
        showMessage({ message: 'You reached the maximum limit of 5 Goals', type: 'warning'});

        navigation.navigate('Modal', { screen: 'PremiumModal' });
    };

    const goalsByType = [
        ['My Goals', goalStore.getMyGoals],
        ['Help Others', goalStore.getJoinedGoals],
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
                    onPress: withinGoalLimits ? () => navigation.navigate('GoalTypeSelection') : handleReachedGoalLimit,
                }}
            />

            <RefreshableScrollView>
                {goalStore.goals.length ?
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
