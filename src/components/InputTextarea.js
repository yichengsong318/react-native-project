import React from 'react';
import { TextInput, StyleSheet, Keyboard } from "react-native";
import * as appStyles from '../utils/styles';

const InputTextarea = React.forwardRef((props, ref) => (
    <TextInput
        ref={ref}
        underlineColorAndroid="transparent"
        returnKeyType="done"
        {...props}
        style={[styles.InputTextarea, props.style, props.disabled ? styles.disabled : null]}
        returnKeyType="done"
        blurOnSubmit={true}
        onSubmitEditing={()=>{Keyboard.dismiss()}}
        textAlignVertical="top"
        multiline={true}
        editable={!props.disabled}
    />
));

const styles = StyleSheet.create({
    InputTextarea: {
        height: 100,
        maxHeight: 100,
        borderWidth: 1,
        borderColor: appStyles.colors.divider,
        borderRadius: appStyles.general.borderRadius,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        color: '#444',
    },
    disabled: {
        backgroundColor: appStyles.colors.disabledInputBg,
    },
});

export default InputTextarea;
