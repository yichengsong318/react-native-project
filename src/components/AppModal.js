import React, { forwardRef, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal, ScrollView, Dimensions } from "react-native";
import * as appStyles from '../utils/styles';

const AppModal = forwardRef((props, ref) => {
    const [modalVisible, setModalVisible] = useState(false);

    // useEffect(() => {
    //     console.log('props.visible', props.visible);
    //     setModalVisible(props.visible);
    // }, [props.visible]);


    // useEffect(() => {
    //     // console.log('props.visible', props.visible)
    //     // if (props.visible !== modalVisible) {
    //     //     setModalVisible(!modalVisible);
    //     //     console.log('modalVisible', modalVisible);
    //     //   }

    //     setModalVisible(true);
    // }, [props.visible]);

    const open = () => {
        setModalVisible(true);
    };


    const submit = (value) => {
        // setModalVisible(false);
        // props.onChange(value);
    };

    const cancel = () => {
        setModalVisible(false);
        // setValues(initialValues);
        // props.visible = false;
    };

    return (
        <Modal ref={ref} animationType="fade" visible={modalVisible} transparent>
            <View style={styles.modelOverlay}>
                {/* Transparent button to close the modal when you click on the backdrop */}
                <TouchableOpacity style={styles.modelOverlayAction} onPress={cancel}/>

                <View style={styles.modalContainer}>
                    <ScrollView>
                        {props.children}
                    </ScrollView>

                    <View style={styles.modalActions}>
                        <TouchableOpacity onPress={cancel}>
                            <Text style={styles.modalBtn}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => submit(values)}>
                            <Text style={[styles.modalBtn, styles.modalBtnPrimary]}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    modelOverlay: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080',
    },
    modelOverlayAction: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    modalContainer: {
        width: Dimensions.get('screen').width * 0.80,
        height: Dimensions.get('screen').height * 0.65,
        backgroundColor: '#fff',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: appStyles.colors.divider,
    },
    modalBtn: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    modalBtnPrimary: {
        color: appStyles.colors.linkDark,
        fontWeight: 'bold',
    },
});

export default AppModal;
