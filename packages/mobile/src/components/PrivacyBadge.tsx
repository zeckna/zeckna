import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface PrivacyBadgeProps {
  isShielded: boolean;
}

export default function PrivacyBadge({isShielded}: PrivacyBadgeProps) {
  return (
    <View style={[styles.badge, isShielded ? styles.shielded : styles.transparent]}>
      <Text style={styles.badgeText}>
        {isShielded ? '🛡️ Shielded' : '👁️ Transparent'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  shielded: {
    backgroundColor: '#d4edda',
  },
  transparent: {
    backgroundColor: '#fff3cd',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#155724',
  },
});

