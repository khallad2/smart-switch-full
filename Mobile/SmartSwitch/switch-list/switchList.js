// SwitchList.js
import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

export default function SwitchList ({ switches }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Switch List</Text>
            <FlatList
                data={switches}
                renderItem={({ item }) => (
                    <View style={styles.switchItem}>
                        <Text>Device Name: {item.device_name}</Text>
                        <Text>Device IP: {item.device_ip}</Text>
                        <Text>State: {item.state ? 'ON' : 'OFF'}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.device_id}
            />
        </View>
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
