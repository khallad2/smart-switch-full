import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar, Button } from 'react-native-paper';

import Switch from './switch/switch';
import SwitchList from "./switch-list/switch-list"; // Import the Switch component

export default function App() {
  return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Appbar.Header style={styles.header}>
            <Appbar.Content title="Smart Switch" />
          </Appbar.Header>
           <SwitchList />
        </View>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'top',
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

// end of App.js
