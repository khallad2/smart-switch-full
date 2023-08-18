import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Switch from "../switch/switch";

export default function SwitchList({ switches }) {
    const devices = [
        { id: 1, name: 'Living Room' },
        { id: 2, name: 'Bed Room' },
        // Add more devices here as needed
    ];

    const handleRemoveDevice = (deviceId) => {
        // Implement logic to remove the device from the list
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {devices.map(device => (
                <Switch
                    key={device.id}
                    device={device}
                    onRemove={handleRemoveDevice}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    switchItem: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
    },
});
