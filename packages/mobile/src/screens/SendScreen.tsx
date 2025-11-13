<<<<<<< HEAD
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import {useWallet} from '../hooks/useWallet';
import {zecToZatoshis} from '@zeckna/sdk';
import PrivacyBadge from '../components/PrivacyBadge';

export default function SendScreen() {
  const {wallet} = useWallet();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [isShielded, setIsShielded] = useState(true);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!toAddress.trim()) {
      Alert.alert('Error', 'Please enter a recipient address');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setSending(true);
    try {
      const zatoshis = zecToZatoshis(parseFloat(amount));
      await wallet.createShieldedTransaction(
        toAddress.trim(),
        zatoshis,
        memo.trim() || undefined
      );
      
      Alert.alert('Success', 'Transaction created successfully');
      setToAddress('');
      setAmount('');
      setMemo('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create transaction');
    } finally {
      setSending(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Send ZEC</Text>
        <View style={styles.privacyToggle}>
          <Text style={styles.toggleLabel}>Shielded Transaction</Text>
          <Switch value={isShielded} onValueChange={setIsShielded} />
        </View>
        <PrivacyBadge isShielded={isShielded} />
      </View>

      {!isShielded && (
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            ⚠️ Transparent transactions reveal your balance and transaction history.
            Consider using shielded transactions for privacy.
          </Text>
        </View>
      )}

      <View style={styles.form}>
        <Text style={styles.label}>Recipient Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Zcash address"
          value={toAddress}
          onChangeText={setToAddress}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Amount (ZEC)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />

        {isShielded && (
          <>
            <Text style={styles.label}>Memo (Optional)</Text>
            <TextInput
              style={[styles.input, styles.memoInput]}
              placeholder="Encrypted memo (max 512 bytes)"
              value={memo}
              onChangeText={setMemo}
              multiline
              maxLength={512}
            />
          </>
        )}

        <TouchableOpacity
          style={[styles.sendButton, sending && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={sending}>
          <Text style={styles.sendButtonText}>
            {sending ? 'Sending...' : 'Send'}
          </Text>
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
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  privacyToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
  },
  warning: {
    margin: 20,
    padding: 15,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
  },
  warningText: {
    color: '#856404',
    fontSize: 14,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  memoInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

=======
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import {useWallet} from '../hooks/useWallet';
import {zecToZatoshis} from '@zeckna/sdk';
import PrivacyBadge from '../components/PrivacyBadge';

export default function SendScreen() {
  const {wallet} = useWallet();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [isShielded, setIsShielded] = useState(true);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!toAddress.trim()) {
      Alert.alert('Error', 'Please enter a recipient address');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setSending(true);
    try {
      const zatoshis = zecToZatoshis(parseFloat(amount));
      await wallet.createShieldedTransaction(
        toAddress.trim(),
        zatoshis,
        memo.trim() || undefined
      );
      
      Alert.alert('Success', 'Transaction created successfully');
      setToAddress('');
      setAmount('');
      setMemo('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create transaction');
    } finally {
      setSending(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Send ZEC</Text>
        <View style={styles.privacyToggle}>
          <Text style={styles.toggleLabel}>Shielded Transaction</Text>
          <Switch value={isShielded} onValueChange={setIsShielded} />
        </View>
        <PrivacyBadge isShielded={isShielded} />
      </View>

      {!isShielded && (
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            ⚠️ Transparent transactions reveal your balance and transaction history.
            Consider using shielded transactions for privacy.
          </Text>
        </View>
      )}

      <View style={styles.form}>
        <Text style={styles.label}>Recipient Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Zcash address"
          value={toAddress}
          onChangeText={setToAddress}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Amount (ZEC)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />

        {isShielded && (
          <>
            <Text style={styles.label}>Memo (Optional)</Text>
            <TextInput
              style={[styles.input, styles.memoInput]}
              placeholder="Encrypted memo (max 512 bytes)"
              value={memo}
              onChangeText={setMemo}
              multiline
              maxLength={512}
            />
          </>
        )}

        <TouchableOpacity
          style={[styles.sendButton, sending && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={sending}>
          <Text style={styles.sendButtonText}>
            {sending ? 'Sending...' : 'Send'}
          </Text>
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
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  privacyToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
  },
  warning: {
    margin: 20,
    padding: 15,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
  },
  warningText: {
    color: '#856404',
    fontSize: 14,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  memoInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
