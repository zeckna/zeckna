import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {StorageService} from '../services/StorageService';
import {wasm_export_view_key} from '@zeckna/sdk/src/wasm-loader';
import {useWallet} from '../hooks/useWallet';

export default function SettingsScreen() {
  const {wallet} = useWallet();
  const [viewKey, setViewKey] = useState<string>('');
  const [showViewKey, setShowViewKey] = useState(false);

  const handleExportViewKey = async () => {
    try {
      const mnemonic = await StorageService.getMnemonic();
      if (!mnemonic) {
        Alert.alert('Error', 'Wallet not initialized');
        return;
      }

      const vk = await wasm_export_view_key(mnemonic, 0);
      setViewKey(vk.view_key);
      setShowViewKey(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to export view key');
    }
  };

  const handleClearWallet = () => {
    Alert.alert(
      'Clear Wallet',
      'This will delete all wallet data. Are you sure?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await StorageService.clearAll();
            Alert.alert('Success', 'Wallet cleared');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>
        
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleExportViewKey}>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Export View Key</Text>
            <Text style={styles.settingDescription}>
              Export your view key for audit purposes
            </Text>
          </View>
        </TouchableOpacity>

        {showViewKey && viewKey && (
          <View style={styles.viewKeyContainer}>
            <Text style={styles.viewKeyLabel}>View Key:</Text>
            <TextInput
              style={styles.viewKeyText}
              value={viewKey}
              editable={false}
              multiline
            />
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Zeckna Wallet v0.1.0{'\n'}
          Privacy-first multi-chain wallet
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Danger Zone</Text>
        <TouchableOpacity
          style={[styles.settingItem, styles.dangerItem]}
          onPress={handleClearWallet}>
          <Text style={styles.dangerText}>Clear Wallet Data</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  settingItem: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  viewKeyContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  viewKeyLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  viewKeyText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
    minHeight: 60,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  dangerItem: {
    backgroundColor: '#fee',
  },
  dangerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c',
  },
});

