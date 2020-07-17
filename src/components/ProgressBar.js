import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as appStyles from '../utils/styles';

const ProgressBar = ({ amount }) => {
    const progressAmount = amount ? amount : 0;
    const progressPercentage = `${progressAmount}%`;

    return (
        <View style={styles.ProgressBar}>
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[appStyles.colors.primary, appStyles.colors.vividPrimary]}
                style={[styles.bar, { width: progressPercentage }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    ProgressBar: {
        width: '100%',
        height: 10,
        borderRadius: 10,
        backgroundColor: appStyles.colors.bg10,
    },
    bar: {
        height: 10,
        maxWidth: '100%',
        borderRadius: 10,
    },
});

export default ProgressBar;
