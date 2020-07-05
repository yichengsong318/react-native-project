import React from 'react';
import { StyleSheet, View } from 'react-native';
import UserAvatar from './UserAvatar';

const GoalPartners = ({ goal }) => {
    return (
        <View style={styles.GoalPartners}>
            {goal.partners.map((partner) => (
                partner.user ?
                    <UserAvatar
                        key={partner.id}
                        user={partner.user}
                        style={styles.avatar}
                    /> : null
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    GoalPartners: {
        flex: 1,
        flexDirection: 'row',
    },
    avatar: {
        marginLeft: 5,
    },
});

export default GoalPartners