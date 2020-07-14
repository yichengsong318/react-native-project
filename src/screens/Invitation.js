import _ from 'lodash';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { storeContext } from '../store';
import AppScrollView from '../components/AppScrollView';
import Header from '../components/Header';
import * as appStyles from '../utils/styles';

const Invitation = observer(({ navigation }) => {
    const { inviteStore } = useContext(storeContext);
    const invite = inviteStore.currentInvite;

    return (
        <View style={styles.InvitationScreen}>
            <Header
                title="Invitation"
                left={{
                    title: 'Invites',
                    icon: 'chevron-left',
                    onPress: () => navigation.navigate('Invites'),
                }}
            />

            <AppScrollView>
                {invite.status !== 'pending' ? (
                    <View>
                        <Text>You've already {invite.status} this invitation</Text>
                    </View>) :
                invite.goal.goalStrive ? (
                    <View>
                        <Text>This is a STRIVE invite</Text>
                    </View>
                ) : (
                    <View>
                        <Text>This is a TODO invite</Text>
                    </View>
                )}
            </AppScrollView>
            <View style={styles.footer}>
                <Text>ACCEPT / DECLINE</Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    InvitationScreen: {
        flex: 1,
        backgroundColor: appStyles.colors.bg00,
    },
    noInvites: {
        marginTop: 80,
    },
    noInvitesTitle: {
        fontSize: 32,
        textAlign: 'center',
    },
    noInvitesDescription: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Invitation;
