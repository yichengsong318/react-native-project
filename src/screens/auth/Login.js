import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { storeContext } from '../../store';
import AppScrollView from '../../components/AppScrollView';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import * as appStyles from '../../utils/styles';

const Login = ({ navigation }) => {
    const store = useContext(storeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const passwordInput = useRef(null);

    const handleLogin = async () => {
        setIsPending(true);
        const success = await store.userStore.login(email, password);
        setIsPending(false);
        if (!success) return;

        navigation.dispatch(StackActions.reset({
            index: 0, key: null, actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
            ],
        }));
    }

    return (
        <LinearGradient
            colors={[appStyles.colors.primary, appStyles.colors.secondary]}
            style={styles.LoginScreen}
        >
            <AppScrollView>
                <Image source={require('../../assets/logo-white.png')}
                    resizeMode="contain"
                    style={styles.logo}/>

                <View style={styles.form}>
                    <AppInput
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
                        onSubmitEditing={handleLogin}
                        style={styles.input}
                        secureTextEntry
                    />

                    <View style={styles.buttonContainer}>
                        <AppButton onPress={handleLogin} title="Login" style={styles.button} disabled={isPending}/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.strive2goal.com/login/forgot')}>
                            <Text style={{ fontSize: 16, color: '#fff' }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    { isPending ? <ActivityIndicator size="large"/> : null }
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={{ fontSize: 16, color: '#fff' }}>Don't have an account? Signup</Text>
                    </TouchableOpacity>
                </View>
            </AppScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    LoginScreen: {
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    button: {
        flex: 1,
    },
});

export default Login;
