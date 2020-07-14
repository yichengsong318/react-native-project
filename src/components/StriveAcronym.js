import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import * as appStyles from '../utils/styles';

const StriveAcronym = ({ activeIndex }) => {
    const striveAcronym = [
        {
            letter: 's',
            name: 'Specific',
            definition: 'Specificity will help you avoid misunderstanding. Create a specific goal, and you will always know what you need to do.'
        },
        {
            letter: 't',
            name: 'Time-bound',
            definition: 'Deciding on a time frame will help you keep your eye on the finish line. STRIVE Goals are typically accomplished in 1 to 12 months.'
        },
        {
            letter: 'r',
            name: 'Results-focused',
            definition: 'Tying the results from goal achievement to your life will help your self-motivation and drive.'
        },
        {
            letter: 'i',
            name: 'Intentional',
            definition: 'Goal setting must come with a purpose. Make sure you know your why so you can properly set goals toward that cause. Don’t accidentally take the first step, do it with intention.'
        },
        {
            letter: 'v',
            name: 'Visible',
            definition: 'Working with an accountability partner makes it harder to fall back into bad habits. Your victories also feel more meaningful when you share them with others.'
        },
        {
            letter: 'e',
            name: 'Essential',
            definition: 'Choose a goal that is critical to your success. STRIVE Goals are life-changing and, when accomplished, can improve your quality of life.'
        },
    ];

    return (
        <View style={styles.StriveAcronym}>
            <View style={styles.word}>
                {striveAcronym.map((acronym, index) => (
                    <Text
                        key={index}
                        style={[styles.letter, index === activeIndex ? styles.active : null]}
                    >
                        {acronym.letter}
                    </Text>
                ))}
            </View>

            {striveAcronym.map((acronym, index) => {
                return index === activeIndex ? (
                    <View key={index} style={styles.definition}>
                        <Text style={styles.definitionName}>
                            {acronym.name} - <Text style={styles.definitionDesc}>{acronym.definition}</Text>
                        </Text>
                    </View>
                ) : null
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    StriveAcronym: {
        // ...
    },
    word: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    letter: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 32,
        color: appStyles.colors.muted,
    },
    active: {
        color: appStyles.colors.primary,
    },
    definition: {
        // ...
    },
    definitionName: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    definitionDesc: {
        fontWeight: 'normal',
        textAlign: 'center'
    },
});

export default StriveAcronym;
