import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, TextInput, Button, IconButton, Text } from 'react-native-paper';

const Switch = ({ device, onPress, onRemove }) => {
    const [switched, setSwitched] = useState(false);
    const [deviceAddress, setDeviceAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const fetchData = async () => {
        try {
            const END_POINT = `http://${deviceAddress}:9090/control?switch=1`;
            const response = await fetch(END_POINT);
            const responseData = await response.json();

            if (responseData.message === 'true') {
                setSwitched(true);
            } else if (responseData.message === 'false') {
                setSwitched(false);
            }

            setErrorMessage('');
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage('Please setup your device first');
        }
    };

    return (
        <View>
            <Card style={styles.card}>
                <Card.Title
                    title={device.name}
                    titleStyle={styles.cardTitle}
                    right={() => (
                        <IconButton
                            icon="delete"
                            color="red"
                            onPress={() => onRemove(device.id)}
                        />
                    )}
                />
                <Card.Content>
                    <TextInput
                        label="Device Address"
                        value={deviceAddress}
                        onChangeText={setDeviceAddress}
                        style={styles.inputField}
                    />
                </Card.Content>
                <Card.Actions style={styles.cardActions}>
                    <IconButton
                        onPress={fetchData}
                        icon="lightbulb-on-outline"
                        size={30}
                        mode="contained"
                        iconColor={switched ? '#FFA500' : '#312f2f'}
                    />
                </Card.Actions>
                {errorMessage ? (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null}
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
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputField: {
        marginBottom: 10,
    },
    cardActions: {
        justifyContent: 'center',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Switch;
