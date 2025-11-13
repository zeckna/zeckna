import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useWallet} from '../hooks/useWallet';
import {useNavigation} from '@react-navigation/native';

export default function OnboardingScreen() {
  const [step, setStep] = useState<'welcome' | 'create' | 'import' | 'seed'>('welcome');
  const [mnemonic, setMnemonic] = useState('');
  const [importMnemonic, setImportMnemonic] = useState('');
  const [loading, setLoading] = useState(false);
  const {initializeNew, initializeFromMnemonic} = useWallet();
  const navigation = useNavigation();

  const handleCreateWallet = async () => {
    setLoading(true);
    try {
      const newMnemonic = await initializeNew();
      setMnemonic(newMnemonic);
      setStep('seed');
    } catch (error) {
      Alert.alert('Error', 'Failed to create wallet');
    } finally {
      setLoading(false);
    }
  };

  const handleImportWallet = async () => {
    if (!importMnemonic.trim()) {
      Alert.alert('Error', 'Please enter a valid seed phrase');
      return;
    }

    setLoading(true);
    try {
      await initializeFromMnemonic(importMnemonic.trim());
      navigation.reset({
        index: 0,
        routes: [{name: 'Wallet' as never}],
      });
    } catch (error) {
      Alert.alert('Error', 'Invalid seed phrase');
    } finally {
      setLoading(false);
    }
  };

  const handleSeedConfirmed = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Wallet' as never}],
    });
  };

  if (step === 'welcome') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Zeckna</Text>
        <Text style={styles.subtitle}>Privacy-first multi-chain wallet</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => setStep('create')}>
          <Text style={styles.buttonText}>Create New Wallet</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => setStep('import')}>
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
            Import Existing Wallet
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (step === 'create') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create New Wallet</Text>
        <Text style={styles.subtitle}>
          Your seed phrase will be generated. Keep it safe!
        </Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#4A90E2" />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateWallet}>
            <Text style={styles.buttonText}>Generate Seed Phrase</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => setStep('welcome')}>
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (step === 'import') {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Import Wallet</Text>
        <Text style={styles.subtitle}>Enter your seed phrase</Text>
        
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={8}
          placeholder="Enter your 24-word seed phrase"
          value={importMnemonic}
          onChangeText={setImportMnemonic}
          autoCapitalize="none"
          secureTextEntry
        />
        
        {loading ? (
          <ActivityIndicator size="large" color="#4A90E2" />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleImportWallet}>
            <Text style={styles.buttonText}>Import Wallet</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => setStep('welcome')}>
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (step === 'seed') {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Your Seed Phrase</Text>
        <Text style={styles.warning}>
          Write this down and keep it safe! You'll need it to restore your wallet.
        </Text>
        
        <View style={styles.seedContainer}>
          <Text style={styles.seedText}>{mnemonic}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.button}
          onPress={handleSeedConfirmed}>
          <Text style={styles.buttonText}>I've Saved It</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#4A90E2',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    minHeight: 150,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  seedContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  seedText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#333',
  },
  warning: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
});

