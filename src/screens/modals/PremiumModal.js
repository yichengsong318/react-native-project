import React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppModal from '../../components/AppModal';
import * as appStyles from '../../utils/styles';

const PremiumModal = ({ navigation }) => {
    const handleViewPremium = () => {
        Linking.openURL('https://www.strive2goal.com/premium');
    };

    const features = [
        {
            name: 'Color\nLabels',
            icon: 'tag',
        },
        {
            name: 'Custom\nThemes',
            icon: 'paint-roller',
        },
        {
            name: 'Recurring\nTasks',
            icon: 'redo',
        },
        {
            name: 'Image\nUploads',
            icon: 'paperclip',
        },
        {
            name: 'Unlimited\nGoals',
            icon: 'rocket',
        },
        {
            name: 'More\nAccountability',
            icon: 'users',
        },
    ];

    return (
        <AppModal
            style={styles.PremiumModal}
            title="Strive2Goal Premium"
            cancelText="Close"
            confirmText="Learn More"
            onConfirm={handleViewPremium}
        >
            <Text style={styles.description}>Take your Goals to the next level</Text>
            <View style={styles.featureList}>
                {features.map(({ name, icon }) => (
                    <View key={name} style={styles.featureItem}>
                        <Icon name={icon} size={24} style={styles.featureIcon}/>
                        <Text style={styles.featureText}>{name}</Text>
                    </View>
                ))}
            </View>
        </AppModal>
    );
};

const styles = StyleSheet.create({
    PremiumModal: {
        flex: 1,
    },
    description: {
        marginBottom: 15,
        fontSize: 18,
    },
    featureList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    featureItem: {
        width: `${100 / 3}%`,
        alignItems: 'center',
        marginVertical: 20,
    },
    featureIcon: {
        marginBottom: 10,
        color: appStyles.colors.primary,
    },
    featureText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default PremiumModal;
