<<<<<<< HEAD
use crate::address::{AddressType, ZcashAddress};
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum TransactionError {
    #[error("Invalid amount")]
    InvalidAmount,
    #[error("Insufficient balance")]
    InsufficientBalance,
    #[error("Invalid address: {0}")]
    InvalidAddress(String),
    #[error("Transaction building failed")]
    BuildFailed,
    #[error("Transaction signing failed")]
    SignFailed,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TransactionMemo {
    pub encrypted: bool,
    pub memo: Vec<u8>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Transaction {
    pub id: String,
    pub from_address: String,
    pub to_address: String,
    pub amount: u64, // Amount in zatoshis (smallest unit)
    pub fee: u64,
    pub memo: Option<TransactionMemo>,
    pub is_shielded: bool,
    pub timestamp: u64,
}

/// Build a shielded Zcash transaction
pub fn build_shielded_transaction(
    from_address: &ZcashAddress,
    to_address: &ZcashAddress,
    amount: u64,
    memo: Option<Vec<u8>>,
) -> Result<Transaction, TransactionError> {
    if amount == 0 {
        return Err(TransactionError::InvalidAmount);
    }

    // Validate addresses
    if from_address.address_type != AddressType::Shielded {
        return Err(TransactionError::InvalidAddress(
            "From address must be shielded".to_string(),
        ));
    }

    if to_address.address_type != AddressType::Shielded {
        return Err(TransactionError::InvalidAddress(
            "To address must be shielded".to_string(),
        ));
    }

    // In production, this would use zcash_client_backend to build proper shielded transactions
    // For now, we'll create a placeholder transaction structure
    let transaction = Transaction {
        id: format!("tx_{}", hex::encode(&rand::random::<[u8; 32]>())),
        from_address: from_address.address.clone(),
        to_address: to_address.address.clone(),
        amount,
        fee: 10000, // Default fee in zatoshis
        memo: memo.map(|m| TransactionMemo {
            encrypted: true,
            memo: m,
        }),
        is_shielded: true,
        timestamp: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
    };

    Ok(transaction)
}

/// Build a transparent Zcash transaction
pub fn build_transparent_transaction(
    from_address: &ZcashAddress,
    to_address: &ZcashAddress,
    amount: u64,
) -> Result<Transaction, TransactionError> {
    if amount == 0 {
        return Err(TransactionError::InvalidAmount);
    }

    // Transparent transactions don't support memos
    let transaction = Transaction {
        id: format!("tx_{}", hex::encode(&rand::random::<[u8; 32]>())),
        from_address: from_address.address.clone(),
        to_address: to_address.address.clone(),
        amount,
        fee: 10000,
        memo: None,
        is_shielded: false,
        timestamp: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
    };

    Ok(transaction)
}

/// Sign a transaction with the spending key
pub fn sign_transaction(
    transaction: &mut Transaction,
    _spending_key: &[u8; 32],
) -> Result<(), TransactionError> {
    // In production, this would use zcash_primitives to sign the transaction
    // For now, we'll just mark it as signed by updating the ID
    transaction.id = format!("signed_{}", transaction.id);
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::address::generate_shielded_address;

    #[test]
    fn test_build_shielded_transaction() {
        let seed = [0u8; 64];
        let from = generate_shielded_address(&seed, 0).unwrap();
        let to = generate_shielded_address(&seed, 1).unwrap();
        
        let tx = build_shielded_transaction(&from, &to, 1000000, None).unwrap();
        assert!(tx.is_shielded);
        assert_eq!(tx.amount, 1000000);
    }
}

=======
use crate::address::{AddressType, ZcashAddress};
use serde::{Deserialize, Serialize};
use std::str::FromStr;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum TransactionError {
    #[error("Invalid amount")]
    InvalidAmount,
    #[error("Insufficient balance")]
    InsufficientBalance,
    #[error("Invalid address: {0}")]
    InvalidAddress(String),
    #[error("Transaction building failed")]
    BuildFailed,
    #[error("Transaction signing failed")]
    SignFailed,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TransactionMemo {
    pub encrypted: bool,
    pub memo: Vec<u8>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Transaction {
    pub id: String,
    pub from_address: String,
    pub to_address: String,
    pub amount: u64, // Amount in zatoshis (smallest unit)
    pub fee: u64,
    pub memo: Option<TransactionMemo>,
    pub is_shielded: bool,
    pub timestamp: u64,
}

/// Build a shielded Zcash transaction
pub fn build_shielded_transaction(
    from_address: &ZcashAddress,
    to_address: &ZcashAddress,
    amount: u64,
    memo: Option<Vec<u8>>,
) -> Result<Transaction, TransactionError> {
    if amount == 0 {
        return Err(TransactionError::InvalidAmount);
    }

    // Validate addresses
    if from_address.address_type != AddressType::Shielded {
        return Err(TransactionError::InvalidAddress(
            "From address must be shielded".to_string(),
        ));
    }

    if to_address.address_type != AddressType::Shielded {
        return Err(TransactionError::InvalidAddress(
            "To address must be shielded".to_string(),
        ));
    }

    // In production, this would use zcash_client_backend to build proper shielded transactions
    // For now, we'll create a placeholder transaction structure
    let transaction = Transaction {
        id: format!("tx_{}", hex::encode(&rand::random::<[u8; 32]>())),
        from_address: from_address.address.clone(),
        to_address: to_address.address.clone(),
        amount,
        fee: 10000, // Default fee in zatoshis
        memo: memo.map(|m| TransactionMemo {
            encrypted: true,
            memo: m,
        }),
        is_shielded: true,
        timestamp: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
    };

    Ok(transaction)
}

/// Build a transparent Zcash transaction
pub fn build_transparent_transaction(
    from_address: &ZcashAddress,
    to_address: &ZcashAddress,
    amount: u64,
) -> Result<Transaction, TransactionError> {
    if amount == 0 {
        return Err(TransactionError::InvalidAmount);
    }

    // Transparent transactions don't support memos
    let transaction = Transaction {
        id: format!("tx_{}", hex::encode(&rand::random::<[u8; 32]>())),
        from_address: from_address.address.clone(),
        to_address: to_address.address.clone(),
        amount,
        fee: 10000,
        memo: None,
        is_shielded: false,
        timestamp: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
    };

    Ok(transaction)
}

/// Sign a transaction with the spending key
pub fn sign_transaction(
    transaction: &mut Transaction,
    spending_key: &[u8; 32],
) -> Result<(), TransactionError> {
    // In production, this would use zcash_primitives to sign the transaction
    // For now, we'll just mark it as signed by updating the ID
    transaction.id = format!("signed_{}", transaction.id);
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::address::generate_shielded_address;

    #[test]
    fn test_build_shielded_transaction() {
        let seed = [0u8; 64];
        let from = generate_shielded_address(&seed, 0).unwrap();
        let to = generate_shielded_address(&seed, 1).unwrap();
        
        let tx = build_shielded_transaction(&from, &to, 1000000, None).unwrap();
        assert!(tx.is_shielded);
        assert_eq!(tx.amount, 1000000);
    }
}

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
