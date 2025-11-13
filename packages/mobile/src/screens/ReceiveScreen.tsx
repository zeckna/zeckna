<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useWallet} from '../hooks/useWallet';
import PrivacyBadge from '../components/PrivacyBadge';

export default function ReceiveScreen() {
  const {addresses, generateNewShieldedAddress} = useWallet();
  const [currentAddress, setCurrentAddress] = useState<string>('');

  useEffect(() => {
    if (addresses.length > 0) {
      setCurrentAddress(addresses[0].address);
    } else {
      // Generate a new address if none exist
      generateNewShieldedAddress().then(addr => {
        setCurrentAddress(addr.address);
      });
    }
  }, [addresses, generateNewShieldedAddress]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: currentAddress,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share address');
    }
  };

  const handleCopy = () => {
    // In production, use Clipboard API
    Alert.alert('Copied', 'Address copied to clipboard');
  };

  const handleGenerateNew = async () => {
    try {
      const addr = await generateNewShieldedAddress();
      setCurrentAddress(addr.address);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate new address');
    }
  };

  if (!currentAddress) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading address...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode value={currentAddress} size={250} />
        <PrivacyBadge isShielded={true} />
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.label}>Your Address</Text>
        <Text style={styles.addressText}>{currentAddress}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCopy}>
          <Text style={styles.buttonText}>Copy Address</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.shareButton]}
          onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.generateButton]}
        onPress={handleGenerateNew}>
        <Text style={styles.buttonText}>Generate New Address</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Share this address to receive ZEC. For privacy, consider generating a
          new address for each transaction.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  qrContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 20,
  },
  addressContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  addressText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  button: {
    flex: 1,
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#27ae60',
  },
  generateButton: {
    backgroundColor: '#95a5a6',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#e8f4f8',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
});

=======
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useWallet} from '../hooks/useWallet';
import PrivacyBadge from '../components/PrivacyBadge';

export default function ReceiveScreen() {
  const {addresses, generateNewShieldedAddress} = useWallet();
  const [currentAddress, setCurrentAddress] = useState<string>('');

  useEffect(() => {
    if (addresses.length > 0) {
      setCurrentAddress(addresses[0].address);
    } else {
      // Generate a new address if none exist
      generateNewShieldedAddress().then(addr => {
        setCurrentAddress(addr.address);
      });
    }
  }, [addresses, generateNewShieldedAddress]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: currentAddress,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share address');
    }
  };

  const handleCopy = () => {
    // In production, use Clipboard API
    Alert.alert('Copied', 'Address copied to clipboard');
  };

  const handleGenerateNew = async () => {
    try {
      const addr = await generateNewShieldedAddress();
      setCurrentAddress(addr.address);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate new address');
    }
  };

  if (!currentAddress) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading address...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode value={currentAddress} size={250} />
        <PrivacyBadge isShielded={true} />
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.label}>Your Address</Text>
        <Text style={styles.addressText}>{currentAddress}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCopy}>
          <Text style={styles.buttonText}>Copy Address</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.shareButton]}
          onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.generateButton]}
        onPress={handleGenerateNew}>
        <Text style={styles.buttonText}>Generate New Address</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Share this address to receive ZEC. For privacy, consider generating a
          new address for each transaction.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  qrContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 20,
  },
  addressContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  addressText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  button: {
    flex: 1,
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#27ae60',
  },
  generateButton: {
    backgroundColor: '#95a5a6',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#e8f4f8',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
});

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
