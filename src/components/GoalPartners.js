import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import UserAvatar from './UserAvatar';
import * as appStyles from '../utils/styles';

const GoalPartners = ({ goal }) => {
    return (
        <View style={styles.GoalPartners}>
            {goal.partners ?
                goal.partners.map((partner) => (
                    partner.user ? (
                        <Menu>
                            <MenuTrigger>
                                <UserAvatar
                                    key={partner.id}
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
                                <MenuOption>
                                    <Text style={styles.deleteLink}>Remove from Goal</Text>
                                </MenuOption>
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
