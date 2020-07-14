import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { isValid, parseISO } from 'date-fns';
import StriveAcronym from './StriveAcronym';
import { formatDate } from '../utils/formatting';
import * as appStyles from '../utils/styles';

const StriveGoalPlan = ({ goal }) => {
    useEffect(() => {
        // Format any STRIVE answer that is a Date
        if (goal.goalStrive) {
            for (const strive of goal.goalStrive.striveAnswers) {
                if (isValid(parseISO(strive.answer))) {
                    strive.answer = formatDate(strive.answer);
                }
            }
        }
    }, [goal]);

    return (
        <View style={styles.StriveGoalPlan}>
            <Text style={styles.subHeading}>Goal Name:</Text>
            <Text style={styles.description}>{goal.name}</Text>

            <Text style={styles.subHeading}>Completion Date:</Text>
            <Text style={styles.description}>{formatDate(goal.goalStrive.dueDate)}</Text>

            <View style={styles.striveContainer}>
                {goal.goalStrive.striveAnswers.map((strive, index) => (
                    <View style={styles.striveAnswer} key={strive.letter}>
                        <StriveAcronym activeIndex={index}/>

                        <Text style={styles.question}>{strive.question}</Text>
                        <Text style={styles.answer}>{strive.answer}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    StriveGoalPlan: {
        flex: 1,
    },
    heading: {
        textAlign: 'center',
        fontSize: 22,
    },
    subHeading: {
        marginTop: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    description: {
        textAlign: 'center',
        fontSize: 18,
    },
    striveContainer: {
        marginTop: 20,
    },
    striveAnswer: {
        paddingTop: 15,
        paddingBottom: 20,
        marginBottom: 15,
        borderTopWidth: 1,
        borderTopColor: appStyles.colors.divider,
    },
    question: {
        marginTop: 15,
        fontWeight: 'bold',
    },
    answer: {
        // ...
    },
});

export default StriveGoalPlan;
