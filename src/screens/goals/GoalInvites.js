import _ from 'lodash';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { storeContext } from '../../store';
import RefreshableScrollView from '../../components/RefreshableScrollView';
import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import OutgoingInviteItem from '../../components/OutgoingInviteItem';
import * as appStyles from '../../utils/styles';

const GoalInvites = observer(({ navigation }) => {
    const { inviteStore } = useContext(storeContext);

    return (
        <View style={styles.GoalInvitesScreen}>
            <Header
                title="Goal Invites"
                left={{
                    title: 'Back',
                    icon: 'chevron-left',
                    onPress: () => navigation.navigate('GoalView'),
                }}
            />

            <RefreshableScrollView>
                <SectionHeader title="My Invites"/>
                {inviteStore.currentGoalInvites.map((invite) => (
                    <OutgoingInviteItem key={invite.id} invite={invite}/>
                ))}
            </RefreshableScrollView>

            <View>
                <Text>Search user...</Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    GoalInvitesScreen: {
        flex: 1,
        backgroundColor: appStyles.colors.bg00,
    },
});

export default GoalInvites;
