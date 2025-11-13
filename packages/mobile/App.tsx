import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, StyleSheet, View, ActivityIndicator} from 'react-native';
import {initWasm} from '@zeckna/sdk';
import OnboardingScreen from './src/screens/OnboardingScreen';
import WalletScreen from './src/screens/WalletScreen';
import SendScreen from './src/screens/SendScreen';
import ReceiveScreen from './src/screens/ReceiveScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import {useWallet} from './src/hooks/useWallet';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const [wasmInitialized, setWasmInitialized] = useState(false);
  const {isInitialized, checkWalletInitialized} = useWallet();

  useEffect(() => {
    const initializeWasm = async () => {
      try {
        await initWasm();
        setWasmInitialized(true);
        await checkWalletInitialized();
      } catch (error) {
        console.error('Failed to initialize WASM:', error);
      }
    };

    initializeWasm();
  }, [checkWalletInitialized]);

  if (!wasmInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4A90E2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {!isInitialized ? (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen name="Send" component={SendScreen} />
            <Stack.Screen name="Receive" component={ReceiveScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;

