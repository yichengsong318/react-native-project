import React, { useState } from 'react';
import { StyleSheet, Platform, View, TouchableOpacity, Text } from "react-native";
import DatePicker from 'react-native-datepicker'
import { isToday } from 'date-fns';
import { formatTime, formatDate, formatDateTime } from '../utils/formatting';
import * as appStyles from '../utils/styles';

const InputDate = (props) => {
    const [dateStr, setDateStr] = useState(props.value);

    const handleDateChange = (dateStr) => {
        setDateStr(dateStr);
        props.onChange(dateStr);
    }

    const handleClearDate = () => {
        handleDateChange(null);
    }

    let format = formatDate;
    if (props.mode === 'time') {
        format = isToday(new Date(dateStr)) ? formatTime : formatDateTime;
    }

    let mode = props.mode === 'date' ? 'date' : 'datetime';
    if (Platform.OS === 'android' && mode === 'datetime' && !dateStr) {
        mode = 'time';
    }

    return (
        <View style={[styles.InputDate, props.style]}>
            <View style={styles.main}>
                {dateStr ?
                    <Text>{format(new Date(dateStr))}</Text> :
                    props.placeholder ?
                        <Text style={styles.placeholder}>{props.placeholder}</Text> :
                        <Text></Text>
                }

                { dateStr ?
                    <TouchableOpacity style={styles.clearButton} onPress={handleClearDate}>
                        <Text style={styles.clearText}>Clear</Text>
                    </TouchableOpacity> : null
                }
            </View>

            <DatePicker
                style={styles.DatePicker}
                onDateChange={handleDateChange}
                date={dateStr ? new Date(dateStr) : new Date()}
                mode={mode}
                is24Hour={false}
                getDateStr={date => date.toISOString()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    btnTextCancel: {
                        fontWeight: 'bold',
                    },
                    btnTextConfirm: {
                        fontWeight: 'bold',
                        color: appStyles.colors.linkDark,
                    },
                }}
            />
        </View>
    );
};

InputDate.defaultProps = {
    mode: 'date',
    onChange: () => {},
};

const styles = StyleSheet.create({
    InputDate: {
        height: 50,
        borderWidth: 1,
        justifyContent: 'center',
        borderColor: appStyles.colors.divider,
        borderRadius: appStyles.general.borderRadius,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        color: '#444',
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    clearButton: {
        position: 'relative',
        zIndex: 2,
    },
    clearText: {
        color: appStyles.colors.danger,
    },
    placeholder: {
        color: appStyles.colors.muted,
    },
    DatePicker: {
        width: '120%',
        height: '200%',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0,
    },
});

export default InputDate;
