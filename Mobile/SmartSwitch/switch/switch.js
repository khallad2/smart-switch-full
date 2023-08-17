import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';

const Switch = ({ onPress, switched }) => {
    const [deviceAddress, setDeviceAddress] = useState('');
    const [wifiName, setWifiName] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');

    const fetchData = async () => {
        try {
            const END_POINT = `http://${deviceAddress}/setAngle?switch=1`; // Build the END_POINT string with user-entered IP
            const response = await fetch(END_POINT);
            setSwitched((prevSwitched) => !prevSwitched);
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <View>
            <Card style={styles.card}>
                <Card.Content>
                    <TextInput
                        label="Device Address"
                        value={deviceAddress}
                        onChangeText={setDeviceAddress}
                    />
                    <TextInput
                        label="WiFi Name"
                        value={wifiName}
                        onChangeText={setWifiName}
                    />
                    <TextInput
                        label="WiFi Password"
                        value={wifiPassword}
                        onChangeText={setWifiPassword}
                        secureTextEntry
                    />
                </Card.Content>
                <Card.Actions style={styles.cardActions}>
                    <Button onPress={fetchData} mode="contained">
                        {switched ? 'Switched ON' : 'Switched OFF'}
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 10,
    },
    cardActions: {
        justifyContent: 'center',
    },
});

export default Switch;
