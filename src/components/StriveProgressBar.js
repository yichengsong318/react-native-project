import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { differenceInDays, parseISO } from 'date-fns';
import { formatDateShort } from '../utils/formatting';
import ProgressBar from './ProgressBar';
import * as appStyles from '../utils/styles';

const StriveProgressBar = ({ goal, showDates }) => {
    const progress = () => {
        const { startedAt, dueDate } = goal.goalStrive;
        const total = differenceInDays(parseISO(dueDate), parseISO(startedAt));
        const completed = differenceInDays(new Date(), parseISO(startedAt));

        return total > 0 ? completed / total * 100 : 0;
    };

    return (
        <View style={styles.StriveProgressBar}>
            <ProgressBar amount={progress()}/>

            {showDates ? (
                <View>
                    {progress() < 100 ? (
                        <View style={styles.meta}>
                            <Text style={styles.date}>
                                {formatDateShort(goal.goalStrive.startedAt)}
                            </Text>
                            <Text style={styles.date}>
                                {formatDateShort(goal.goalStrive.dueDate)}
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.meta}>
                            <Text style={styles.goalComplete}>Goal completed!</Text>
                        </View>
                    )}
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    StriveProgressBar: {
        width: '100%',
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 3,
    },
    date: {
        color: appStyles.colors.muted,
    },
    goalComplete: {
        fontWeight: 'bold',
        color: appStyles.colors.success,
    },
});

export default StriveProgressBar;
