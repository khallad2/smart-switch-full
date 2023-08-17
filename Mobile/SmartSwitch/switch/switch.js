// Switch.js
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Switch = ({ onPress, switched }) => {
    return (
        <TouchableOpacity
            style={[styles.button, switched && styles.buttonActive]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>
                {switched ? 'Switched ON' : 'Switched OFF'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFA500',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 10,
    },
    buttonActive: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
    },
});

export default Switch;
