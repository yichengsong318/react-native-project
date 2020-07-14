import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { observer } from "mobx-react-lite";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { storeContext } from '../../store';
import RefreshableScrollView from '../../components/RefreshableScrollView';
import GoalPartners from '../../components/GoalPartners';
import TaskList from '../../components/TaskList';
import TaskAddBar from '../../components/TaskAddBar';
import AppButton from '../../components/AppButton';
import * as appStyles from '../../utils/styles';

const GoalView = observer(({ navigation }) => {
    const store = useContext(storeContext);
    const goal = store.goalStore.currentGoal;
    const tasks = store.taskStore.tasks;
    const [showCompletedTasks, setShowCompletedTasks] = useState(true);

    const handleViewInvites = async () => {
        await store.inviteStore.refresh();
        navigation.navigate('GoalInvites');
    };

    const renameGoal = () => {
        navigation.navigate('Modal', { screen: 'RenameGoalModal' });
    };

    const deleteGoal = async () => {
        Alert.alert(
            'Delete Goal',
            'Are you sure you want to delete this goal?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await store.goalStore.removeGoal(goal);

                        navigation.navigate('Goals');
                    },
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <View style={styles.GoalViewScreen}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.headerTopMain}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.navigate('Goals')}
                        >
                            <Icon name="chevron-left" size={20} style={styles.backButtonIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.headerGoalName} numberOfLines={1}>{goal.name}</Text>
                    </View>

                    <Menu>
                        <MenuTrigger>
                            <View style={styles.goalOptions}>
                                <Icon name="ellipsis-h" size={20} style={styles.goalOptionsIcon}/>
                            </View>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={renameGoal}>
                                <Text>Rename Goal</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => setShowCompletedTasks(!showCompletedTasks)}>
                                <Text>{showCompletedTasks ? 'Hide' : 'Show'} Completed Tasks</Text>
                            </MenuOption>
                            <MenuOption onSelect={deleteGoal}>
                                <Text style={styles.danger}>Delete Goal</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
                <View style={styles.headerBottom}>
                    <GoalPartners goal={goal}/>
                    <AppButton
                        title="Invite"
                        style={styles.inviteButton}
                        color="#fff"
                        outline
                        onPress={handleViewInvites}
                    />
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.goalHeader}><Text>GoalHeader</Text></View>
                <RefreshableScrollView style={styles.goalMain} onRefresh="fetchCurrentGoal">
                    {store.goalStore.isFetchingCurrentGoal && !tasks ?
                        <Text>Loading...</Text> :
                        <TaskList tasks={showCompletedTasks ? tasks : store.taskStore.incompleteTasks} navigation={navigation}/>
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
    header: {
        height: 170,
        padding: appStyles.goals.gutter,
        backgroundColor: appStyles.colors.primary,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTopMain: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerGoalName: {
        marginRight: 15,
        flex: 1,
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    backButton: {
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButtonIcon: {
        color: '#fff',
    },
    headerBottom: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
    },
    inviteButton: {
        marginLeft: 10,
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
    danger: {
        color: appStyles.colors.danger,
    },
});

export default GoalView;
