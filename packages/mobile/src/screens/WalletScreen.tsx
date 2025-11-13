import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useWallet} from '../hooks/useWallet';
import {zatoshisToZEC} from '@zeckna/sdk';
import PrivacyBadge from '../components/PrivacyBadge';
import TransactionItem from '../components/TransactionItem';

export default function WalletScreen() {
  const navigation = useNavigation();
  const {balance, addresses, refreshBalance, isLoading} = useWallet();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    if (addresses.length > 0) {
      await refreshBalance(addresses[0].address);
    }
    setRefreshing(false);
  };

  const zecBalance = zatoshisToZEC(balance);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{zecBalance.toFixed(8)} ZEC</Text>
        <PrivacyBadge isShielded={true} />
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.sendButton]}
          onPress={() => navigation.navigate('Send' as never)}>
          <Text style={styles.actionButtonText}>Send</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.receiveButton]}
          onPress={() => navigation.navigate('Receive' as never)}>
          <Text style={styles.actionButtonText}>Receive</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addressesContainer}>
        <Text style={styles.sectionTitle}>Addresses</Text>
        {addresses.length === 0 ? (
          <Text style={styles.emptyText}>No addresses yet</Text>
        ) : (
          addresses.map((addr, index) => (
            <View key={index} style={styles.addressItem}>
              <Text style={styles.addressText}>{addr.address}</Text>
              <PrivacyBadge isShielded={addr.addressType === 'shielded'} />
            </View>
          ))
        )}
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <Text style={styles.emptyText}>No transactions yet</Text>
      </View>

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings' as never)}>
        <Text style={styles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  balanceContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#e74c3c',
  },
  receiveButton: {
    backgroundColor: '#27ae60',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addressesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
  },
  addressText: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    fontFamily: 'monospace',
  },
  transactionsContainer: {
    padding: 20,
  },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
  },
  settingsButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

