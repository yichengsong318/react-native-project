import React from 'react';
import { StyleSheet } from "react-native";
import { formatDateDistance } from '../utils/formatting';
import InfoBox from './InfoBox';
import * as appStyles from '../utils/styles';

const IncomingInviteItem = ({ onPress, invite }) => (
    <InfoBox
        onPress={onPress}
        title={invite.goal.name}
        subtitle={formatDateDistance(invite.createdAt)}
    />
);

const styles = StyleSheet.create({
    // ...
});

export default IncomingInviteItem;
