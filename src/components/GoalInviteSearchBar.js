import React, { useContext, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Keyboard } from 'react-native';
import { storeContext } from '../store';
import AppInput from './AppInput';
import * as appStyles from '../utils/styles';

const GoalInviteSearchBar = ({ goal }) => {
    const { inviteStore } = useContext(storeContext);
    const [isPending, setIsPending] = useState(false);
    const [email, setEmail] = useState(null);
    const emailInput = useRef(null);

    const handleSendInvite = async () => {
        setIsPending(true);
        await inviteStore.createInvite(goal, email);
        setIsPending(false);

        setEmail(null);
        emailInput.current.clear();
        Keyboard.dismiss();
    };

    return (
        <View style={styles.GoalInviteSearchBar}>
            <AppInput
                ref={emailInput}
                style={styles.input}
                onChangeText={setEmail}
                placeholder="Email address"
                onSubmitEditing={handleSendInvite}
            />
            <TouchableOpacity
                style={[styles.button, isPending || !email ? styles.disabled : null]}
                onPress={handleSendInvite}
                disabled={isPending || !email}
            >
                <Text style={styles.buttonText}>Send Invite</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    GoalInviteSearchBar: {
        flex: 1,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        padding: appStyles.goals.gutter,
        marginRight: appStyles.goals.gutter,
        height: 40,
        borderRadius: 40,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 40,
        backgroundColor: appStyles.colors.primary,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    disabled: {
        backgroundColor: appStyles.colors.muted,
    },
});

export default GoalInviteSearchBar;
