import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { storeContext } from '../store';
import GoalPartners from './GoalPartners';
import AppButton from './AppButton';
import * as appStyles from '../utils/styles';

const GoalHeader = ({ goal }) => {
    const navigation = useNavigation();
    const store = useContext(storeContext);
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
        <LinearGradient
            colors={goal.theme ? appStyles.goalThemes[goal.theme] : appStyles.goalThemes.default}
            style={styles.GoalHeader}
        >
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
                        {goal.goalStrive ? (
                            <MenuOption onSelect={() => navigation.navigate('GoalPlan')}>
                                <Text>View STRIVE Plan</Text>
                            </MenuOption>
                        ) : null}
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
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    GoalHeader: {
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
    danger: {
        color: appStyles.colors.danger,
    },
});

export default GoalHeader;
