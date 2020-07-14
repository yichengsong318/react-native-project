import React from 'react';
import { StyleSheet } from "react-native";
import { formatDateDistance } from '../utils/formatting';
import InfoBox from './InfoBox';
import * as appStyles from '../utils/styles';

const OutgoingInviteItem = ({ onPress, invite }) => (
    <InfoBox
        onPress={onPress}
        title={`${invite.user.firstName} ${invite.user.lastName}`}
        subtitle={formatDateDistance(invite.createdAt)}
    />
);

const styles = StyleSheet.create({
    // ...
});

export default OutgoingInviteItem;
