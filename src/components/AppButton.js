import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import * as appStyles from '../utils/styles';

const AppButton = (props) => {
    const color = props.color || appStyles.colors.primary;

    let buttonStyles = {};
    let textStyles = {};

    if (props.outline) {
        buttonStyles = { ...styles.outline, borderColor: color };
        textStyles = { color };
    } else {
        buttonStyles = { backgroundColor: color, borderColor: 'transparent' };
        textStyles = { color: '#fff' };
    }

    if (props.disabled) {
        buttonStyles.opacity = 0.5;
    }

    return (<TouchableOpacity
        onPress={props.onPress}
        style={[styles.AppButton, buttonStyles, props.style]}
        disabled={props.disabled}
    >
        <Text style={[styles.text, textStyles]}>{props.title}</Text>
    </TouchableOpacity>);
};

const styles = StyleSheet.create({
    AppButton: {
        alignItems: 'center',
        padding: 10,
        borderRadius: appStyles.general.borderRadius,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    outline: {
        borderWidth: 2,
        backgroundColor: 'transparent',
    },
});

export default AppButton;
