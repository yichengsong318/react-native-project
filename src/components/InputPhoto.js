import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const InputPhoto = (props) => {
    const [photo, setPhoto] = useState(props.value ? props.value : null);

    const handleTakePhoto = () => {
        const options = { storageOptions: { skipBackup: true, path: 'Strive2Goal' } };
        ImagePicker.showImagePicker(options, (res) => {
            if (res.didCancel || res.error) return;

            setPhoto(res);
        });
    };

    useEffect(() => {
        props.onChange(photo)
    }, [photo]);

    const handleClearPhoto = () => {
        setPhoto(null);
    }

    return (
        <TouchableOpacity onPress={handleTakePhoto}>
            {props.children}
        </TouchableOpacity>
    );
};

InputPhoto.defaultProps = {
    onChange: () => {}
};

export default InputPhoto;
