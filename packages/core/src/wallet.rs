use crate::address::{generate_shielded_address, generate_transparent_address, ZcashAddress};
use crate::keys::{derive_seed_from_mnemonic, generate_seed_phrase};
use crate::transaction::{build_shielded_transaction, Transaction};
use std::collections::HashMap;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum WalletError {
    #[error("Wallet not initialized")]
    NotInitialized,
    #[error("Invalid mnemonic")]
    InvalidMnemonic,
    #[error("Address generation failed")]
    AddressGenerationFailed,
    #[error("Transaction error: {0}")]
    Transaction(#[from] crate::transaction::TransactionError),
}

#[derive(Debug, Clone)]
pub struct WalletState {
    pub mnemonic: String,
    pub seed: [u8; 64],
    pub shielded_addresses: Vec<ZcashAddress>,
    pub transparent_addresses: Vec<ZcashAddress>,
    pub transactions: Vec<Transaction>,
    pub balances: HashMap<String, u64>, // Address -> balance in zatoshis
}

pub struct Wallet {
    state: Option<WalletState>,
}

impl Wallet {
    pub fn new() -> Self {
        Self { state: None }
    }

    /// Initialize wallet with a new seed phrase
    pub fn initialize_new(&mut self) -> Result<String, WalletError> {
        let mnemonic = generate_seed_phrase();
        let seed = derive_seed_from_mnemonic(&mnemonic, None)
            .map_err(|_| WalletError::InvalidMnemonic)?;

        let shielded_addr = generate_shielded_address(&seed, 0)
            .map_err(|_| WalletError::AddressGenerationFailed)?;
        let transparent_addr = generate_transparent_address(&seed, 0)
            .map_err(|_| WalletError::AddressGenerationFailed)?;

        let mut balances = HashMap::new();
        balances.insert(shielded_addr.address.clone(), 0);
        balances.insert(transparent_addr.address.clone(), 0);

        self.state = Some(WalletState {
            mnemonic: mnemonic.clone(),
            seed,
            shielded_addresses: vec![shielded_addr],
            transparent_addresses: vec![transparent_addr],
            transactions: vec![],
            balances,
        });

        Ok(mnemonic)
    }

    /// Initialize wallet from existing mnemonic
    pub fn initialize_from_mnemonic(&mut self, mnemonic: &str) -> Result<(), WalletError> {
        let seed = derive_seed_from_mnemonic(mnemonic, None)
            .map_err(|_| WalletError::InvalidMnemonic)?;

        let shielded_addr = generate_shielded_address(&seed, 0)
            .map_err(|_| WalletError::AddressGenerationFailed)?;
        let transparent_addr = generate_transparent_address(&seed, 0)
            .map_err(|_| WalletError::AddressGenerationFailed)?;

        let mut balances = HashMap::new();
        balances.insert(shielded_addr.address.clone(), 0);
        balances.insert(transparent_addr.address.clone(), 0);

        self.state = Some(WalletState {
            mnemonic: mnemonic.to_string(),
            seed,
            shielded_addresses: vec![shielded_addr],
            transparent_addresses: vec![transparent_addr],
            transactions: vec![],
            balances,
        });

        Ok(())
    }

    /// Get the current wallet state
    pub fn get_state(&self) -> Result<&WalletState, WalletError> {
        self.state.as_ref().ok_or(WalletError::NotInitialized)
    }

    /// Generate a new shielded address
    pub fn generate_new_shielded_address(&mut self) -> Result<ZcashAddress, WalletError> {
        let state = self.state.as_mut().ok_or(WalletError::NotInitialized)?;
        let account = state.shielded_addresses.len() as u32;
        
        let addr = generate_shielded_address(&state.seed, account)
            .map_err(|_| WalletError::AddressGenerationFailed)?;
        
        state.shielded_addresses.push(addr.clone());
        state.balances.insert(addr.address.clone(), 0);
        
        Ok(addr)
    }

    /// Get balance for an address
    pub fn get_balance(&self, address: &str) -> Result<u64, WalletError> {
        let state = self.get_state()?;
        Ok(*state.balances.get(address).unwrap_or(&0))
    }

    /// Create a shielded transaction
    pub fn create_shielded_transaction(
        &self,
        to_address: &str,
        amount: u64,
        memo: Option<Vec<u8>>,
    ) -> Result<Transaction, WalletError> {
        let state = self.get_state()?;
        
        // Find a shielded address with sufficient balance
        let from_addr = state
            .shielded_addresses
            .first()
            .ok_or(WalletError::AddressGenerationFailed)?;

        let balance = self.get_balance(&from_addr.address)?;
        if balance < amount {
            return Err(WalletError::Transaction(
                crate::transaction::TransactionError::InsufficientBalance,
            ));
        }

        let to_addr = crate::address::validate_address(to_address)
            .map_err(|_| WalletError::Transaction(
                crate::transaction::TransactionError::InvalidAddress(to_address.to_string()),
            ))?;

        let to_zcash_addr = if to_addr == crate::address::AddressType::Shielded {
            // In production, parse the address properly
            ZcashAddress {
                address: to_address.to_string(),
                address_type: crate::address::AddressType::Shielded,
                account: 0,
            }
        } else {
            return Err(WalletError::Transaction(
                crate::transaction::TransactionError::InvalidAddress(
                    "To address must be shielded".to_string(),
                ),
            ));
        };

        build_shielded_transaction(from_addr, &to_zcash_addr, amount, memo)
            .map_err(WalletError::Transaction)
    }
}

impl Default for Wallet {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_wallet_initialization() {
        let mut wallet = Wallet::new();
        let mnemonic = wallet.initialize_new().unwrap();
        assert!(!mnemonic.is_empty());
        
        let state = wallet.get_state().unwrap();
        assert!(!state.shielded_addresses.is_empty());
        assert!(!state.transparent_addresses.is_empty());
    }
}

