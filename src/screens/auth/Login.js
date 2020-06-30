import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { storeContext } from '../../store';

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
        <View style={styles.LoginScreen}>
            <Text>Login</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    LoginScreen: {
        flex: 1,
    },
});

export default Login;
