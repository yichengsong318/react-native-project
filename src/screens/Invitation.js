import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { observer } from "mobx-react-lite";
import { storeContext } from '../store';
import AppScrollView from '../components/AppScrollView';
import Header from '../components/Header';
import AppButton from '../components/AppButton';
import StriveGoalPlan from '../components/StriveGoalPlan';
import * as appStyles from '../utils/styles';

const Invitation = observer(({ navigation }) => {
    const { inviteStore } = useContext(storeContext);
    const invite = inviteStore.currentInvite;

    const handleAcceptInvite = async () => {
        await inviteStore.acceptInvite(invite);

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{
                    name: 'TabScreen',
                    params: {
                        screen: 'Goals',
                        params: {
                            screen: 'GoalView'
                        },
                    },
                }],
            },
        ));
    };

    const handleDeclineInvite = async () => {
        await inviteStore.declineInvite(invite);

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{
                    name: 'TabScreen',
                    params: {
                        screen: 'Invites',
                        params: {
                            screen: 'InviteList',
                        },
                    },
                }],
            },
        ));
    };

    return (
        <View style={styles.InvitationScreen}>
            <Header
                title="Invitation"
                left={{
                    title: 'Invites',
                    icon: 'chevron-left',
                    onPress: () => navigation.navigate('InviteList'),
                }}
            />

            { invite ? (
                <AppScrollView style={styles.main}>
                    {invite.status !== 'pending' ? (
                        <View style={styles.content}>
                            <Text style={styles.heading}>You've already {invite.status} this invitation</Text>
                        </View>) :
                    invite.goal.goalStrive ? (
                        <View style={styles.content}>
                            <Text style={styles.heading}>{invite.goal.user.firstName} {invite.goal.user.lastName} wishes you can be their Accountability Partner.</Text>

                            <StriveGoalPlan goal={invite.goal}/>
                        </View>
                    ) : (
                        <View style={styles.content}>
                            <Text style={styles.heading}>{invite.goal.user.firstName} {invite.goal.user.lastName} would like to share their Goal with you.</Text>

                            <Text style={styles.subHeading}>Goal Name:</Text>
                            <Text style={styles.description}>{invite.goal.name}</Text>
                        </View>
                    )}
                </AppScrollView>
            ) : (
                <View style={styles.noInvite}>
                    <Text style={styles.noInviteText}>
                        This invitation has already been accepted/declined
                    </Text>
                    <AppButton
                        title="See my invites"
                        onPress={() => navigation.navigate('InviteList')}
                    />
                </View>
            )}

            { invite ? (
                <View style={styles.footer}>
                    <AppButton
                        style={styles.button}
                        title="Accept"
                        color={appStyles.colors.success}
                        onPress={handleAcceptInvite}
                    />
                    <AppButton
                        style={styles.button}
                        title="Decline"
                        color={appStyles.colors.danger}
                        outline
                        onPress={handleDeclineInvite}
                    />
                </View>
            ) : null}
        </View>
    );
});

const styles = StyleSheet.create({
    InvitationScreen: {
        flex: 1,
        backgroundColor: appStyles.colors.bg00,
    },
    heading: {
        textAlign: 'center',
        fontSize: 22,
    },
    subHeading: {
        marginTop: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    content: {
        flex: 1,
        padding: 15,
    },
    description: {
        textAlign: 'center',
        fontSize: 18,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: appStyles.colors.divider,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appStyles.colors.bg00,
    },
    button: {
        flex: 1,
        margin: 5,
    },
    noInvite: {
        padding: 15,
    },
    noInviteText: {
        marginVertical: 30,
        textAlign: 'center',
        fontSize: 22,
    },
});

export default Invitation;
