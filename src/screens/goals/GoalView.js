import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { observer } from "mobx-react-lite";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storeContext } from '../../store';
import RefreshableScrollView from '../../components/RefreshableScrollView';
import AppInput from '../../components/AppInput';
import GoalPartners from '../../components/GoalPartners';
import * as appStyles from '../../utils/styles';

const GoalView = observer(({ navigation }) => {
    const store = useContext(storeContext);
    const goal = store.goalStore.currentGoal;

    const handleCreateTask = async () => {
        // ...
    };

    return (
        <View style={styles.GoalViewScreen}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerGoalName}>{goal.name}</Text>
                    <TouchableOpacity style={styles.goalOptions}>
                        <Icon name="ellipsis-h" size={20} style={styles.goalOptionsIcon}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.headerBottom}>
                    <GoalPartners goal={goal}/>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.goalHeader}><Text>GoalHeader</Text></View>
                <RefreshableScrollView style={styles.goalMain}>
                    <Text>Hi</Text>
                </RefreshableScrollView>
            </View>
            <View style={styles.footer}>
                <AppInput
                    style={styles.createTaskInput}
                    placeholder="I want to..."
                    onSubmitEditing={handleCreateTask}
                />
                <TouchableOpacity style={styles.createTaskButton}>
                    <Icon name="plus" size={20} style={styles.createTaskButtonIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    GoalViewScreen: {
        flex: 1,
        backgroundColor: appStyles.colors.bg10,
    },
    header: {
        height: 170,
        padding: appStyles.goals.gutter,
        backgroundColor: appStyles.colors.primary,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerGoalName: {
        color: '#fff',
        fontWeight: 'bold',
    },
    headerBottom: {
        marginTop: 10,
    },
    goalOptions: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    goalOptionsIcon: {
        color: '#fff',
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
    createTaskInput: {
        flex: 1,
        padding: appStyles.goals.gutter,
        marginRight: appStyles.goals.gutter,
        height: 40,
        borderRadius: 40,
    },
    createTaskButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: appStyles.colors.primary,
    },
    createTaskButtonIcon: {
        color: '#fff',
    },
});

export default GoalView;
