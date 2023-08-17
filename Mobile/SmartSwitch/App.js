import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar, Button } from 'react-native-paper';

import Switch from './switch/switch'; // Import the Switch component

export default function App() {
  const [data, setData] = useState(null);
  const [switched, setSwitched] = useState(false);
  const [ipAddress, setIpAddress] = useState(''); // State to store the user-entered IP address

  const fetchData = async () => {
    try {
      const END_POINT = `http://${ipAddress}/setAngle?switch=1`; // Build the END_POINT string with user-entered IP
      const response = await fetch(END_POINT);
      setSwitched((prevSwitched) => !prevSwitched);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Appbar.Header style={styles.header}>
            <Appbar.Content title="Smart Switch" />
          </Appbar.Header>
          <View style={styles.middleContainer}>
            <TextInput
                style={styles.input}
                placeholder="Enter IP Address"
                value={ipAddress}
                onChangeText={setIpAddress}
            />
            <Switch onPress={fetchData} switched={switched} />
          </View>
        </View>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#FFA500',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dataText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
  },
});
