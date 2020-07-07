import React, { useState, useContext } from 'react';
import { ScrollView, RefreshControl } from "react-native";
import { storeContext } from '../store';

const RefreshableScrollView = (props) => {
    const store = useContext(storeContext);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);

        switch (props.onRefresh) {
        case 'fetchCurrentGoal':
            await store.goalStore.fetchCurrentGoal();
            break;
        case 'fetchCurrentTask':
            await store.taskStore.fetchCurrentTask();
            break;
        default:
            await store.refresh();
        }

        setRefreshing(false);
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
        >
            {props.children}
        </ScrollView>
    )
};

export default RefreshableScrollView;
