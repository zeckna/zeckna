use crate::keys::{derive_seed_from_mnemonic, derive_zcash_spending_key, KeyError};
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ViewKeyError {
    #[error("Key derivation failed: {0}")]
    KeyDerivation(#[from] KeyError),
    #[error("View key generation failed")]
    GenerationFailed,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ViewKey {
    pub view_key: String, // Base58 encoded view key
    pub account: u32,
}

/// Derive a viewing key from seed for a specific account
/// Viewing keys allow viewing incoming transactions without spending capability
pub fn derive_view_key(seed: &[u8; 64], account: u32) -> Result<ViewKey, ViewKeyError> {
    // In production, this would use proper Zcash viewing key derivation
    // For now, we'll derive a key that can be used to view transactions
    let spending_key = derive_zcash_spending_key(seed, account)?;
    
    // View key is derived from spending key (simplified)
    // In real Zcash, viewing keys are derived differently
    let view_key_bytes = &spending_key[..16]; // Use first 16 bytes as view key
    let view_key_encoded = bs58::encode(view_key_bytes).into_string();
    
    Ok(ViewKey {
        view_key: view_key_encoded,
        account,
    })
}

/// Export view key for a wallet (for audit purposes)
pub fn export_view_key(mnemonic: &str, account: u32) -> Result<ViewKey, ViewKeyError> {
    let seed = derive_seed_from_mnemonic(mnemonic, None)?;
    derive_view_key(&seed, account)
}

/// Import and validate a view key
pub fn import_view_key(view_key: &str) -> Result<ViewKey, ViewKeyError> {
    // Validate base58 encoding
    let _decoded = bs58::decode(view_key)
        .into_vec()
        .map_err(|_| ViewKeyError::GenerationFailed)?;
    
    Ok(ViewKey {
        view_key: view_key.to_string(),
        account: 0, // Account not encoded in view key in this simplified version
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::keys::generate_seed_phrase;

    #[test]
    fn test_derive_view_key() {
        let seed = [0u8; 64];
        let view_key = derive_view_key(&seed, 0).unwrap();
        assert!(!view_key.view_key.is_empty());
    }

    #[test]
    fn test_export_view_key() {
        let mnemonic = generate_seed_phrase();
        let view_key = export_view_key(&mnemonic, 0).unwrap();
        assert!(!view_key.view_key.is_empty());
    }
}

