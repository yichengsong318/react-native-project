import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import { storeContext } from '../store';
import Header from '../components/Header';
import AppScrollView from '../components/AppScrollView';
import AppInput from '../components/AppInput';
import UserAvatar from '../components/UserAvatar';
import * as appStyles from '../utils/styles';

const Settings = ({ navigation }) => {
    const store = useContext(storeContext);
    const { userStore } = store;
    const user = userStore.user || {};

    // const [currentPassword, setCurrentPassword] = useState();
    // const [password, setPassword] = useState();
    // const [password2, setPassword2] = useState();
    // const passwordIsValid = currentPassword && password && password.length > 5 && (password === password2);

    const handleSaveSettings = async () => {
        // ...
    };

    const handleLogout = async () => {
        await userStore.logout();

        // TODO: Clear storage on logout as a temporary developer hack.
        // This should be removed before release.
        await AsyncStorage.clear();
        await store.init();

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            }),
        );
    }

    return (
        <View style={styles.SettingsScreen}>
            <Header
                right={{
                    title: 'Save',
                    color: '#fff',
                    onPress: handleSaveSettings,
                }}
            />

            <AppScrollView>
                <View style={styles.container}>
                    <View style={[styles.formGroup, styles.avatarContainer]}>
                        <UserAvatar user={user} size="lg"/>
                    </View>

                    <View style={styles.formGroup}>
                        <AppInput value={`${user.firstName} ${user.lastName}`} title="Name" disabled/>
                    </View>

                    <View style={styles.formGroup}>
                        <AppInput value={user.email} title="Email" keyboardType="email-address" disabled/>
                    </View>
                    {/* <InputPassword value={currentPassword} onChange={setCurrentPassword} title="Current Password"/>
                    <InputPassword value={password} onChange={setPassword} title="New Password"/>
                    <InputPassword value={password2} onChange={setPassword2} title="Confirm Password"/> */}

                    <View style={styles.accountOptions}>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.logout}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </AppScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    SettingsScreen: {
        flex: 1,
        backgroundColor: appStyles.colors.bg10,
    },
    container: {
        padding: 15,
    },
    formGroup: {
        marginBottom: 15,
    },
    avatarContainer: {
        paddingTop: 30,
        paddingBottom: 15,
        alignItems: 'center',
    },
    accountOptions: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logout: {
        padding: 10,
        fontSize: 18,
        textDecorationLine: 'underline',
    },
});

export default Settings;
