import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from "mobx-react-lite";
import { storeContext } from '../../store';
import GoalTodo from '../../components/GoalTodo';
import GoalStrive from '../../components/GoalStrive';
import * as appStyles from '../../utils/styles';

const GoalView = observer(({ navigation }) => {
    const { goalStore } = useContext(storeContext);
    const goal = goalStore.currentGoal;

    return (
        <View style={styles.GoalViewScreen}>
            {goal.type === 'todo' ? (<GoalTodo/>) : null}
            {goal.type === 'strive' ? (<GoalStrive/>) : null}
        </View>
    );
});

const styles = StyleSheet.create({
    GoalViewScreen: {
        flex: 1,
        backgroundColor: appStyles.colors.bg10,
    },
});

export default GoalView;
