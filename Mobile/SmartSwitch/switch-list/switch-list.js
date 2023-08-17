// SwitchList.js
import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import Switch from "../switch/switch";
export default function SwitchList ({ switches }) {
    return (
        <View style={styles.container}>
            <Switch />
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
