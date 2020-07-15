import _ from 'lodash';
import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { storeContext } from '../../store';
import RefreshableScrollView from '../../components/RefreshableScrollView';
import Header from '../../components/Header';
import SectionHeader from '../../components/SectionHeader';
import OutgoingInviteItem from '../../components/OutgoingInviteItem';
import GoalInviteSearchBar from '../../components/GoalInviteSearchBar';
import * as appStyles from '../../utils/styles';

const GoalInvites = observer(({ navigation }) => {
    const { inviteStore, goalStore } = useContext(storeContext);

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
                {inviteStore.currentGoalInvites.length ? (
                    <View>
                        <SectionHeader title="Sent Invites"/>
                        {inviteStore.currentGoalInvites.map((invite) => (
                            <OutgoingInviteItem key={invite.id} invite={invite}/>
                        ))}
                    </View>
                ) : (
                    <View>
                        <Text style={styles.noInvites}>No invites</Text>
                    </View>
                )}
            </RefreshableScrollView>

            <View style={styles.footer}>
                <GoalInviteSearchBar goal={goalStore.currentGoal}/>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    GoalInvitesScreen: {
        flex: 1,
        backgroundColor: appStyles.colors.bg00,
    },
    footer: {
        flexDirection: 'row',
        padding: appStyles.goals.gutter,
        backgroundColor: appStyles.colors.bg00,
        borderTopWidth: 1,
        borderTopColor: appStyles.colors.divider,
    },
    noInvites: {
        margin: 15,
        fontSize: 24,
        textAlign: 'center',
    },
});

export default GoalInvites;
