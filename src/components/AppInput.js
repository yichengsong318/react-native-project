import React from 'react';
import { TextInput, StyleSheet } from "react-native";
import * as appStyles from '../utils/styles';

const AppInput = React.forwardRef((props, ref) => (
    <TextInput
        ref={ref}
        underlineColorAndroid="transparent"
        returnKeyType="done"
        {...props}
        style={[styles.AppInput, props.style]}
    />
));

const styles = StyleSheet.create({
    AppInput: {
        height: 50,
        borderWidth: 1,
        borderColor: appStyles.colors.divider,
        borderRadius: appStyles.general.borderRadius,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        color: '#444',
    },
});

export default AppInput;
