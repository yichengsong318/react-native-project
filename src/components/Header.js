import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../utils/styles';

const HeaderLogo = () => (
    <Image source={require('../assets/logo-white.png')} resizeMode="contain" style={styles.logo} />
);

const HeaderTitle = ({ title }) => (
    <View style={styles.HeaderCenter}>
        {title ? <Text style={styles.title}>{title}</Text> : <HeaderLogo/>}
    </View>
);

const HeaderLink = ({ left, right, icon, color, title, onPress, disabled }) => {
    const linkColor = color ? {color} : {color: '#fff'};

    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={[styles.headerLinkInner, disabled ? { opacity: 0.4 } : null]}>
                {icon && left ? <Icon name={icon} size={20} style={linkColor}/> : <View/>}
                {title ? <Text style={[styles.headerLinkText, linkColor]}>{title}</Text> : <View/>}
                {icon && right ? <Icon name={icon} size={20} style={linkColor}/> : <View/>}
            </View>
        </TouchableOpacity>
    );
};

const Header = ({ title, left, right }) => (
    <SafeAreaView>
        <LinearGradient
            colors={[colors.primary, colors.vividPrimary]}
            style={styles.Header}
        >
            <HeaderTitle title={title} />
            {left ? <HeaderLink left {...left} /> : <View />}
            {right ? <HeaderLink right {...right} /> : <View />}
        </LinearGradient>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    Header: {
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    HeaderCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    logo: {
        height: 30,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    headerLinkInner: {
        flexDirection: 'row',
    },
    headerLinkText: {
        marginHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Header;
