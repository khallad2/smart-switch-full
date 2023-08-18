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
            console.log(responseData);
            if (responseData.message === 'true') {
                setSwitched(true);
            } else if (responseData.message === 'false') {
                setSwitched(false);
            }

            setErrorMessage('');
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage('Please set up your device first');
        }
    };

    return (
        <View>
            <Card  onPress={fetchData}
                style={[
                    styles.card,
                    switched ? styles.cardSwitched : styles.cardNotSwitched,
                ]}
            >
                <Card.Title
                    title={device.name}
                    titleStyle={[
                        styles.cardTitle,
                        switched ? styles.cardTitleSwitched : styles.cardTitleNotSwitched,
                    ]}
                    right={() => (
                        <IconButton
                            icon="lightbulb-on-outline"
                            size={30}
                            mode="contained"
                            iconColor={switched ? '#FFA500' : '#312f2f'}
                        />
                    )}
                />
                <Card.Content>
                    <View style={styles.inputContainer}>
                        <TextInput
                            label="Device Address"
                            value={deviceAddress}
                            onChangeText={setDeviceAddress}
                            style={styles.inputField}
                        />
                    </View>
                </Card.Content>
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
        elevation: 2,
    },
    cardSwitched: {
        backgroundColor: '#FFA500',
    },
    cardNotSwitched: {
        backgroundColor: 'white',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white', // Set the default text color
    },
    cardTitleSwitched: {
        color: 'white',
    },
    cardTitleNotSwitched: {
        color: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    inputField: {
        flex: 1,
        marginRight: 10,
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
