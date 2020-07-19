import React, { useContext, useState, useEffect } from 'react';
import { storeContext } from '../store';
import { formatDateDistance } from '../utils/formatting';
import InfoBox from './InfoBox';
import AppButton from './AppButton';
import * as appStyles from '../utils/styles';

const OutgoingInviteItem = ({ onPress, invite }) => {
    const { inviteStore } = useContext(storeContext);
    const [isPending, setIsPending] = useState(false);

    const displayNameFromInvite = () => {
        if (invite.user) {
            return `${invite.user.firstName} ${invite.user.lastName}`;
        }

        return invite.email;
    };

    const handleCancelInvite = async () => {
        setIsPending(true);
        await inviteStore.cancelInvite(invite);
        setIsPending(false);
    };

    useEffect(() => {
        setIsPending(false);
    });

    return (
        <InfoBox
            onPress={onPress}
            title={`${displayNameFromInvite()} - ${invite.status}`}
            subtitle={formatDateDistance(invite.createdAt)}
        >
            {invite.status === 'pending' ? (
                <AppButton
                    title="Cancel"
                    color={appStyles.colors.muted}
                    outline
                    onPress={handleCancelInvite}
                    disabled={isPending}
                />
            ) : null}
        </InfoBox>
    );
};

export default OutgoingInviteItem;
