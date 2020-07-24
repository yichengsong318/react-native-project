import React, { useRef } from 'react';
import AppInput from './AppInput';

const InputNumber = (props) => {
    const inputEl = useRef(null);

    const onChange = (text) => {
        if (!props.onChange) return;

        const value = Number.parseInt(text, 10);
        if (Number.isFinite(value)) {
            props.onChange(value);
        } else if (!value) {
            props.onChange(null);
        }
    }

    const displayValue = Number.isFinite(props.value) ? `${props.value}` : '';

    return (
        <AppInput
            ref={inputEl}
            value={displayValue}
            onChangeText={onChange}
            keyboardType="number-pad"
            {...props}
        />
    )
};

export default InputNumber;
