use crate::keys::{derive_zcash_spending_key, derive_zcash_transparent_key, KeyError};
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AddressError {
    #[error("Invalid address format")]
    InvalidFormat,
    #[error("Key derivation failed: {0}")]
    KeyDerivation(#[from] KeyError),
    #[error("Address generation failed")]
    GenerationFailed,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum AddressType {
    Transparent,
    Shielded,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ZcashAddress {
    pub address: String,
    pub address_type: AddressType,
    pub account: u32,
}

/// Generate a Zcash shielded address (z-addr) from seed
pub fn generate_shielded_address(seed: &[u8; 64], account: u32) -> Result<ZcashAddress, AddressError> {
    let spending_key = derive_zcash_spending_key(seed, account)?;
    
    // In production, this would use zcash_primitives to generate proper z-addr
    // For now, we'll create a placeholder format
    let address = format!("z1{}", hex::encode(&spending_key[..20]));
    
    Ok(ZcashAddress {
        address,
        address_type: AddressType::Shielded,
        account,
    })
}

/// Generate a Zcash transparent address (t-addr) from seed
pub fn generate_transparent_address(seed: &[u8; 64], account: u32) -> Result<ZcashAddress, AddressError> {
    let key = derive_zcash_transparent_key(seed, account)?;
    
    // In production, this would use proper address encoding
    // For now, we'll create a placeholder format
    let address = format!("t1{}", hex::encode(&key[..20]));
    
    Ok(ZcashAddress {
        address,
        address_type: AddressType::Transparent,
        account,
    })
}

/// Validate a Zcash address format
pub fn validate_address(address: &str) -> Result<AddressType, AddressError> {
    if address.starts_with("z1") || address.starts_with("zs") {
        Ok(AddressType::Shielded)
    } else if address.starts_with("t1") || address.starts_with("tm") {
        Ok(AddressType::Transparent)
    } else {
        Err(AddressError::InvalidFormat)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_addresses() {
        let seed = [0u8; 64];
        let shielded = generate_shielded_address(&seed, 0).unwrap();
        assert!(shielded.address.starts_with("z1"));
        
        let transparent = generate_transparent_address(&seed, 0).unwrap();
        assert!(transparent.address.starts_with("t1"));
    }
}

