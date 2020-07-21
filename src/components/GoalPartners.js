import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import { storeContext } from '../store';
import UserAvatar from './UserAvatar';
import * as appStyles from '../utils/styles';

const GoalPartners = ({ goal, hideMenu }) => {
    const navigation = useNavigation();
    const { goalStore, userStore } = useContext(storeContext);

    const handleRemovePartner = (user) => {
        navigation.navigate('Modal', {
            screen: 'ConfirmModal',
            params: {
                title: 'Remove Partner',
                message: `Are you sure you want to remove ${user.firstName} ${user.lastName} from your goal?`,
                confirmText: 'Remove Partner',
                isDanger: true,
                onConfirm: () => goalStore.removePartner(goal, user),
            },
        });
    };

    const handleLeaveGoal = (user) => {
        navigation.navigate('Modal', {
            screen: 'ConfirmModal',
            params: {
                title: 'Leave Goal',
                message: `Are you sure you want to leave the goal "${goal.name}"?`,
                confirmText: 'Leave Goal',
                isDanger: true,
                onConfirm: async () => {
                    await goalStore.removePartner(goal, user);
                    navigation.navigate('GoalList');
                },
            },
        });
    };

    return (
        <View style={styles.GoalPartners}>
            {goal.partners ?
                goal.partners.map((partner) => (
                    partner.user ? (
                        <Menu key={partner.id}>
                            <MenuTrigger disabled={hideMenu}>
                                <UserAvatar
                                    user={partner.user}
                                    style={styles.avatar}
                                />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption
                                    customStyles={{
                                        OptionTouchableComponent: TouchableWithoutFeedback
                                    }}
                                >
                                    <View style={styles.menuHeader}>
                                        <Text style={styles.partnerName}>{partner.user.firstName} {partner.user.lastName}</Text>
                                        <Text>@{partner.user.username}</Text>
                                    </View>
                                </MenuOption>
                                {goalStore.isGoalOwner ? (
                                    <MenuOption onSelect={() => handleRemovePartner(partner.user)}>
                                        <Text style={styles.deleteLink}>Remove from Goal</Text>
                                    </MenuOption>
                                ) : partner.user.id === userStore.user.id ? (
                                    <MenuOption onSelect={() => handleLeaveGoal(partner.user)}>
                                        <Text style={styles.deleteLink}>Leave Goal</Text>
                                    </MenuOption>
                                ) : null}
                            </MenuOptions>
                        </Menu>
                    ) : null
                )) : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    GoalPartners: {
        flexDirection: 'row',
    },
    avatar: {
        marginLeft: 5,
    },
    partnerName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    menuHeader: {
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: appStyles.colors.divider,
    },
    deleteLink: {
        color: appStyles.colors.danger,
    },
});

export default GoalPartners
