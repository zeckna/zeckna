import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PrivacyBadge from './PrivacyBadge';
import {Transaction} from '@zeckna/sdk';
import {zatoshisToZEC} from '@zeckna/sdk';

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({transaction}: TransactionItemProps) {
  const amount = zatoshisToZEC(transaction.amount);
  const isSent = transaction.amount < 0; // Simplified - in production, check direction properly

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.address}>
          {isSent ? 'To: ' : 'From: '}
          {transaction.toAddress.slice(0, 10)}...
        </Text>
        <Text style={[styles.amount, isSent && styles.amountSent]}>
          {isSent ? '-' : '+'}
          {Math.abs(amount).toFixed(8)} ZEC
        </Text>
      </View>
      <View style={styles.footer}>
        <PrivacyBadge isShielded={transaction.isShielded} />
        <Text style={styles.timestamp}>
          {new Date(transaction.timestamp * 1000).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  address: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27ae60',
  },
  amountSent: {
    color: '#e74c3c',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
});

