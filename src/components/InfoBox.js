import React from 'react';
import { StyleSheet, View, Text, Platform, TouchableHighlight } from "react-native";
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as appStyles from '../utils/styles';

const InfoBox = (props) => {
    let ButtonComponent = Platform.OS === 'ios' ? TouchableHighlight : RectButton;
    ButtonComponent = !props.disabled ? ButtonComponent : View;

    return (
        <ButtonComponent
            {...props}
            style={styles.InfoBox}
            underlayColor={appStyles.colors.bg10}
        >
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={{ flex: 1, alignSelf: 'flex-start' }}>
                        { typeof props.title === 'string' ?
                            <Text numberOfLines={1} style={styles.title}>{props.title}</Text> :
                            <View style={styles.title}>{props.title}</View>
                        }
                        <Text style={[styles.subtitle, props.disabled ? styles.disabled : '']}>{props.subtitle}</Text>
                    </View>
                    <View style={ props.icon && !props.children ? { alignSelf: 'flex-start' } : ''}>
                        {props.children}
                        {props.icon ?
                            <Icon
                                name={props.icon}
                                size={42}
                                style={[styles.icon, props.disabled ? styles.disabled : '']}
                            /> : null
                        }
                    </View>
                </View>
                { props.error ? <View style={styles.error}>
                    <Text style={styles.errorText}>{props.error}</Text>
                </View>: null }
                <View style={styles.divider}/>
                {props.overlay}
            </View>
        </ButtonComponent>
    )
};

const styles = StyleSheet.create({
    InfoBox: {
        position: 'relative',
        backgroundColor: appStyles.colors.bg00,
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    main: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subtitle: {
        marginBottom: 5,
        fontSize: appStyles.infoBox.subtitleFontSize,
    },
    title: {
        fontSize: appStyles.infoBox.titleFontSize,
        fontWeight: 'bold',
    },
    icon: {
        marginTop: 7,
        marginLeft: 20,
        color: appStyles.colors.divider,
    },
    divider: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        height: 1,
        backgroundColor: appStyles.colors.divider,
    },
    disabled: {
        opacity: 0.6,
    },
    error: {
        marginTop: 5,
    },
    errorText: {
        fontSize: 16,
        color: appStyles.colors.danger,
    },
});

export default InfoBox;
