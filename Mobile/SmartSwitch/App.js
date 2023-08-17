import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Appbar } from 'react-native-paper';

const END_POINT = 'http://192.168.178.33/setAngle?switch=1';
var switchState = 0;
export default function App() {
  const [data, setData] = useState(null);
  const [switched, setSwitched] = useState(false); // Initialize with false


  const fetchData = async () => {
    try {
      const response = await fetch(END_POINT);
      console.log('response', response);
      if(response.status === 200){
        setSwitched((prevSwitched) => !prevSwitched); // Toggle the state
      }
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
            <TouchableOpacity
                style={styles.button}
                onPress={fetchData}
                activeOpacity={0.7}
            >
              <Text style={styles.buttonText}> {switched ? 'Switched ON' : 'Switched OFF'}</Text>
            </TouchableOpacity>
          </View>
          {/*{data ? (*/}
          {/*    <Text style={styles.dataText}>{JSON.stringify(data)}</Text>*/}
          {/*) : (*/}
          {/*    <Text style={styles.dataText}>No data fetched yet.</Text>*/}
          {/*)}*/}
        </View>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center', // Center content vertically
  },
  header: {
    backgroundColor: '#FFA500',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 50, // Make the button round
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  dataText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
  },
});
