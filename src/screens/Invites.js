import _ from 'lodash';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { storeContext } from '../store';
import RefreshableScrollView from '../components/RefreshableScrollView';
import Header from '../components/Header';
import SectionHeader from '../components/SectionHeader';
import IncomingInviteItem from '../components/IncomingInviteItem';
import * as appStyles from '../utils/styles';

const Invites = observer(({ navigation }) => {
    const { inviteStore } = useContext(storeContext);

    const handleViewInvite = (invite) => {
        inviteStore.setCurrentInvite(invite);

        navigation.navigate('Invitation');
    };

    return (
        <View style={styles.InvitesScreen}>
            <Header/>

            <RefreshableScrollView>
                {inviteStore.incomingInvites.length ?
                    <View>
                        <SectionHeader title="My Invites"/>
                        {inviteStore.incomingInvites.map((invite) => (
                            <IncomingInviteItem onPress={() => handleViewInvite(invite)} key={invite.id} invite={invite}/>
                        ))}
                    </View> :
                    <View style={styles.noInvites}>
                        <Text style={styles.noInvitesTitle}>No invites</Text>
                        <Text style={styles.noInvitesDescription}>You can find them here when someone invites you to their goal.</Text>
                    </View>
                }
            </RefreshableScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    InvitesScreen: {
        flex: 1,
        backgroundColor: appStyles.colors.bg10,
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

export default Invites;
