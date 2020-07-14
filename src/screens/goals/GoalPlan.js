import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from "mobx-react-lite";
import { storeContext } from '../../store';
import Header from '../../components/Header';
import AppScrollView from '../../components/AppScrollView';
import StriveGoalPlan from '../../components/StriveGoalPlan';
import * as appStyles from '../../utils/styles';

const GoalPlan = observer(({ navigation }) => {
    const { goalStore } = useContext(storeContext);

    return (
        <View style={styles.GoalPlanScreen}>
            <Header
                title="STRIVE Goal Plan"
                left={{
                    title: 'Back',
                    icon: 'chevron-left',
                    onPress: () => navigation.navigate('GoalView'),
                }}
            />

            <AppScrollView>
                <View style={styles.main}>
                    {goalStore.currentGoal.goalStrive ? (
                        <StriveGoalPlan goal={goalStore.currentGoal}/>
                    ) : null}
                </View>
            </AppScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    GoalPlanScreen: {
        flex: 1,
        backgroundColor: appStyles.colors.bg00,
    },
    main: {
        padding: 15,
    },
});

export default GoalPlan;
