use bip39::{Language, Mnemonic, MnemonicType};
use sha2::{Digest, Sha256};
use std::str::FromStr;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum KeyError {
    #[error("Invalid mnemonic phrase")]
    InvalidMnemonic,
    #[error("Invalid entropy")]
    InvalidEntropy,
    #[error("Key derivation failed")]
    DerivationFailed,
}

/// Generate a new BIP39 mnemonic seed phrase
pub fn generate_seed_phrase() -> String {
    let mnemonic = Mnemonic::new(MnemonicType::Words24, Language::English);
    mnemonic.phrase().to_string()
}

/// Validate a mnemonic seed phrase
pub fn validate_seed_phrase(phrase: &str) -> Result<(), KeyError> {
    Mnemonic::from_str(phrase)
        .map_err(|_| KeyError::InvalidMnemonic)?;
    Ok(())
}

/// Derive seed bytes from mnemonic phrase
pub fn derive_seed_from_mnemonic(phrase: &str, passphrase: Option<&str>) -> Result<[u8; 64], KeyError> {
    let mnemonic = Mnemonic::from_str(phrase)
        .map_err(|_| KeyError::InvalidMnemonic)?;
    
    let seed = mnemonic.to_seed(passphrase.unwrap_or(""));
    Ok(seed)
}

/// Derive spending key for Zcash shielded addresses (z-addr)
pub fn derive_zcash_spending_key(seed: &[u8; 64], account: u32) -> Result<[u8; 32], KeyError> {
    // Simplified key derivation - in production, use proper BIP44 derivation
    let mut hasher = Sha256::new();
    hasher.update(b"Zcash shielded spending key");
    hasher.update(seed);
    hasher.update(&account.to_le_bytes());
    
    let hash = hasher.finalize();
    let mut key = [0u8; 32];
    key.copy_from_slice(&hash[..32]);
    Ok(key)
}

/// Derive transparent address key (t-addr)
pub fn derive_zcash_transparent_key(seed: &[u8; 64], account: u32) -> Result<[u8; 32], KeyError> {
    // Simplified key derivation - in production, use proper BIP44 derivation
    let mut hasher = Sha256::new();
    hasher.update(b"Zcash transparent key");
    hasher.update(seed);
    hasher.update(&account.to_le_bytes());
    
    let hash = hasher.finalize();
    let mut key = [0u8; 32];
    key.copy_from_slice(&hash[..32]);
    Ok(key)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_seed_phrase() {
        let phrase = generate_seed_phrase();
        assert!(!phrase.is_empty());
        let words: Vec<&str> = phrase.split_whitespace().collect();
        assert_eq!(words.len(), 24);
    }

    #[test]
    fn test_validate_seed_phrase() {
        let phrase = generate_seed_phrase();
        assert!(validate_seed_phrase(&phrase).is_ok());
        assert!(validate_seed_phrase("invalid phrase").is_err());
    }
}

