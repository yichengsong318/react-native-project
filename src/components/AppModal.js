import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as appStyles from '../utils/styles';

const AppModal = (props) => {
    const navigation = useNavigation();
    const title = props.title ? props.title : '';
    const confirmText = props.confirmText ? props.confirmText : 'Save';
    const cancelText = props.cancelText ? props.cancelText : 'Cancel';
    const hideConfirmBtn = props.hideConfirmBtn ? props.hideConfirmBtn : false;

    const handleConfirm = () => {
        if (props.onConfirm) {
            props.onConfirm();
        }

        navigation.pop();
    };

    return (
        <View style={styles.AppModal}>
            <TouchableOpacity style={styles.overlay} onPress={() => navigation.pop()}/>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.main}>
                    {props.children}
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Text style={styles.button}>{cancelText}</Text>
                    </TouchableOpacity>
                    {!hideConfirmBtn ? (
                        <TouchableOpacity onPress={handleConfirm} disabled={props.disabled}>
                            <Text style={[styles.button, styles.buttonPrimary, props.disabled ? styles.disabled : null]}>{confirmText}</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    AppModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    container: {
        width: Dimensions.get('window').width - 20,
        backgroundColor: appStyles.colors.bg00,
    },
    main: {
        backgroundColor: appStyles.colors.bg00,
        padding: 15,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: appStyles.colors.divider,
        backgroundColor: appStyles.colors.bg00,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: appStyles.colors.divider,
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    buttonPrimary: {
        color: appStyles.colors.linkDark,
        fontWeight: 'bold',
    },
    disabled: {
        color: appStyles.colors.muted,
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});

export default AppModal;
