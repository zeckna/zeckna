<<<<<<< HEAD
import {AddressType, validateAddress} from '@zeckna/sdk';

export interface PrivacyRecommendation {
  level: 'high' | 'medium' | 'low';
  message: string;
  recommendation: string;
}

/**
 * Analyze transaction privacy and provide recommendations
 */
export async function analyzePrivacy(
  fromAddressType: AddressType,
  toAddressType: AddressType,
  amount: number
): Promise<PrivacyRecommendation> {
  // Both addresses are shielded - highest privacy
  if (fromAddressType === AddressType.Shielded && toAddressType === AddressType.Shielded) {
    return {
      level: 'high',
      message: 'Shielded to Shielded',
      recommendation: 'Excellent privacy! Your transaction is fully shielded.',
    };
  }
  
  // From shielded to transparent - privacy leak
  if (fromAddressType === AddressType.Shielded && toAddressType === AddressType.Transparent) {
    return {
      level: 'low',
      message: 'Privacy Warning',
      recommendation: 'You are sending from a shielded address to a transparent address. This will reveal your balance. Consider using a shielded recipient address.',
    };
  }
  
  // From transparent to shielded - good for recipient
  if (fromAddressType === AddressType.Transparent && toAddressType === AddressType.Shielded) {
    return {
      level: 'medium',
      message: 'Good Recipient Privacy',
      recommendation: 'Recipient address is shielded, which protects their privacy. Consider using a shielded sending address for full privacy.',
    };
  }
  
  // Both transparent - no privacy
  return {
    level: 'low',
    message: 'No Privacy',
    recommendation: 'Both addresses are transparent. Your transaction amount and addresses will be visible on the blockchain. Use shielded addresses for privacy.',
  };
}

/**
 * Check if an address should use shielded transactions
 */
export async function shouldUseShielded(address: string): Promise<boolean> {
  const addressType = await validateAddress(address);
  return addressType === AddressType.Shielded;
}

/**
 * Get privacy score for a transaction
 */
export function getPrivacyScore(
  fromShielded: boolean,
  toShielded: boolean
): number {
  if (fromShielded && toShielded) return 100;
  if (fromShielded || toShielded) return 50;
  return 0;
}

/**
 * Warn user about transparent transactions
 */
export function getTransparentWarning(): PrivacyRecommendation {
  return {
    level: 'low',
    message: 'Transparent Transaction Warning',
    recommendation: 'Transparent transactions reveal your balance and transaction history on the public blockchain. Shielded transactions provide full privacy.',
  };
}

=======
import {AddressType, validateAddress} from '@zeckna/sdk';

export interface PrivacyRecommendation {
  level: 'high' | 'medium' | 'low';
  message: string;
  recommendation: string;
}

/**
 * Analyze transaction privacy and provide recommendations
 */
export async function analyzePrivacy(
  fromAddressType: AddressType,
  toAddressType: AddressType,
  amount: number
): Promise<PrivacyRecommendation> {
  // Both addresses are shielded - highest privacy
  if (fromAddressType === AddressType.Shielded && toAddressType === AddressType.Shielded) {
    return {
      level: 'high',
      message: 'Shielded to Shielded',
      recommendation: 'Excellent privacy! Your transaction is fully shielded.',
    };
  }
  
  // From shielded to transparent - privacy leak
  if (fromAddressType === AddressType.Shielded && toAddressType === AddressType.Transparent) {
    return {
      level: 'low',
      message: 'Privacy Warning',
      recommendation: 'You are sending from a shielded address to a transparent address. This will reveal your balance. Consider using a shielded recipient address.',
    };
  }
  
  // From transparent to shielded - good for recipient
  if (fromAddressType === AddressType.Transparent && toAddressType === AddressType.Shielded) {
    return {
      level: 'medium',
      message: 'Good Recipient Privacy',
      recommendation: 'Recipient address is shielded, which protects their privacy. Consider using a shielded sending address for full privacy.',
    };
  }
  
  // Both transparent - no privacy
  return {
    level: 'low',
    message: 'No Privacy',
    recommendation: 'Both addresses are transparent. Your transaction amount and addresses will be visible on the blockchain. Use shielded addresses for privacy.',
  };
}

/**
 * Check if an address should use shielded transactions
 */
export async function shouldUseShielded(address: string): Promise<boolean> {
  const addressType = await validateAddress(address);
  return addressType === AddressType.Shielded;
}

/**
 * Get privacy score for a transaction
 */
export function getPrivacyScore(
  fromShielded: boolean,
  toShielded: boolean
): number {
  if (fromShielded && toShielded) return 100;
  if (fromShielded || toShielded) return 50;
  return 0;
}

/**
 * Warn user about transparent transactions
 */
export function getTransparentWarning(): PrivacyRecommendation {
  return {
    level: 'low',
    message: 'Transparent Transaction Warning',
    recommendation: 'Transparent transactions reveal your balance and transaction history on the public blockchain. Shielded transactions provide full privacy.',
  };
}

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
