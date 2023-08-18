import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, TextInput, Button, IconButton } from 'react-native-paper';

const Switch = ({ device, onPress, onRemove }) => {
    const [switched, setSwitched] = useState(false);
    const [deviceAddress, setDeviceAddress] = useState('');

    const fetchData = async () => {
        try {
            // todo move to env file
            const END_POINT = `http://${deviceAddress}:9090/setAngle?switch=1`;
            const response = await fetch(END_POINT);
            setSwitched(prevSwitched => !prevSwitched);
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
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
                    <Button onPress={fetchData} mode="contained" color={switched ? 'green' : 'default'}>
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
});

export default Switch;
