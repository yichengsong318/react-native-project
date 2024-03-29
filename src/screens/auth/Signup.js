import React, { useState, useContext, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { storeContext } from '../../store';
import AppScrollView from '../../components/AppScrollView';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import * as appStyles from '../../utils/styles';

const Signup = ({ navigation }) => {
    const store = useContext(storeContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const lastNameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    useEffect(() => {
        setIsPending(false);
    });

    const handleSignup = async () => {
        setIsPending(true);
        const success = await store.userStore.signup(firstName, lastName, email, password);
        setIsPending(false);
        if (!success) return;

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'GoalList' }],
            }),
        );
    }

    return (
        <LinearGradient
            colors={[appStyles.colors.primary, appStyles.colors.secondary]}
            style={styles.SignupScreen}
        >
            <AppScrollView>
                <Image
                    source={require('../../assets/logo-white.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />

                <View style={styles.form}>
                    <View style={styles.formGroup}>
                        <AppInput
                            onChangeText={setFirstName}
                            placeholder="First name"
                            returnKeyType="next"
                            onSubmitEditing={() => lastNameInput.current.focus()}
                            blurOnSubmit={false}
                            style={[styles.input, styles.formGroupInput]}
                        />
                        <AppInput
                            ref={lastNameInput}
                            onChangeText={setLastName}
                            placeholder="Last name"
                            returnKeyType="next"
                            onSubmitEditing={() => emailInput.current.focus()}
                            blurOnSubmit={false}
                            style={[styles.input, styles.formGroupInput]}
                        />
                    </View>
                    <AppInput
                        ref={emailInput}
                        onChangeText={setEmail}
                        placeholder="Email address"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordInput.current.focus()}
                        blurOnSubmit={false}
                        keyboardType="email-address"
                        style={styles.input}
                    />
                    <AppInput
                        ref={passwordInput}
                        onChangeText={setPassword}
                        placeholder="Password"
                        onSubmitEditing={handleSignup}
                        style={styles.input}
                        secureTextEntry
                    />

                    <View style={styles.buttonContainer}>
                        <AppButton onPress={handleSignup} title="Signup" style={styles.button} disabled={isPending}/>
                    </View>

                    { isPending ? <ActivityIndicator size="large"/> : null }
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontSize: 16, color: '#fff' }}>Already have an account? Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.buttonContainer, styles.legalContainer]}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.strive2goal.com/terms')}>
                        <Text style={{ fontSize: 16, color: '#fff' }}>Terms of Service</Text>
                    </TouchableOpacity>
                    <Text style={{ marginHorizontal: 10, color: '#fff' }}>|</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.strive2goal.com/privacy')}>
                        <Text style={{ fontSize: 16, color: '#fff' }}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            </AppScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    SignupScreen: {
        flex: 1,
    },
    logo: {
        height: 60,
        alignSelf: 'center',
        marginTop: 120,
    },
    form: {
        margin: 30,
    },
    input: {
        marginBottom: 15,
    },
    formGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    formGroupInput: {
        flex: 0.48,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    button: {
        flex: 1,
    },
    legalContainer: {
        marginTop: 30,
    },
});

export default Signup;
