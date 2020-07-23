import React, { useContext, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { storeContext } from '../store';
import AppInput from './AppInput';
import * as appStyles from '../utils/styles';

const GoalInviteSearchBar = ({ goal }) => {
    const navigation = useNavigation();
    const { inviteStore, userStore } = useContext(storeContext);
    const [isPending, setIsPending] = useState(false);
    const [email, setEmail] = useState(null);
    const emailInput = useRef(null);
    const withinPartnerLimits = userStore.isPremium && goal.partners.length < 3 || !userStore.isPremium && goal.partners.length < 1;

    const handleSendInvite = async () => {
        setIsPending(true);
        await inviteStore.createInvite(goal, email);
        setIsPending(false);

        setEmail(null);
        emailInput.current.clear();
        Keyboard.dismiss();
    };

    const handleReachedPartnerLimit = () => {
        showMessage({ message: 'You reached the maximum number of Partners on your Goal', type: 'warning' });

        navigation.navigate('Modal', { screen: 'PremiumModal' });
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
                onPress={withinPartnerLimits ? handleSendInvite : handleReachedPartnerLimit}
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
