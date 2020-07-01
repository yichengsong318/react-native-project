import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import * as appStyles from '../utils/styles';

const SectionHeader = (props) => (
    <View
        {...props}
        style={[styles.SectionHeader, props.style]}
    >
        <Text style={styles.title}>{props.title}</Text>
        <View>{props.children}</View>
    </View>
);

const styles = StyleSheet.create({
    SectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: appStyles.colors.bg10,
        color: '#444',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default SectionHeader;
