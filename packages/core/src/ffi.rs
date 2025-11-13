use wasm_bindgen::prelude::*;
use crate::keys::{generate_seed_phrase, validate_seed_phrase};
use crate::address::{generate_shielded_address, generate_transparent_address, validate_address, AddressType};
use crate::wallet::Wallet;
use crate::view_key::export_view_key;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

// Convert Rust errors to JS errors
fn to_js_error<T: std::fmt::Display>(err: T) -> JsValue {
    JsValue::from_str(&err.to_string())
}

#[wasm_bindgen]
pub struct ZecknaWallet {
    inner: Wallet,
}

#[wasm_bindgen]
impl ZecknaWallet {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        console_log!("Creating new ZecknaWallet");
        Self {
            inner: Wallet::new(),
        }
    }

    /// Generate a new seed phrase
    #[wasm_bindgen]
    pub fn generate_seed_phrase(&self) -> String {
        generate_seed_phrase()
    }

    /// Validate a seed phrase
    #[wasm_bindgen]
    pub fn validate_seed_phrase(&self, phrase: &str) -> bool {
        validate_seed_phrase(phrase).is_ok()
    }

    /// Initialize wallet with a new seed phrase
    #[wasm_bindgen]
    pub fn initialize_new(&mut self) -> Result<String, JsValue> {
        self.inner.initialize_new().map_err(to_js_error)
    }

    /// Initialize wallet from existing mnemonic
    #[wasm_bindgen]
    pub fn initialize_from_mnemonic(&mut self, mnemonic: &str) -> Result<(), JsValue> {
        self.inner.initialize_from_mnemonic(mnemonic).map_err(to_js_error)
    }

    /// Generate a new shielded address
    #[wasm_bindgen]
    pub fn generate_new_shielded_address(&mut self) -> Result<JsValue, JsValue> {
        let addr = self.inner.generate_new_shielded_address().map_err(to_js_error)?;
        Ok(serde_wasm_bindgen::to_value(&addr).unwrap())
    }

    /// Get balance for an address
    #[wasm_bindgen]
    pub fn get_balance(&self, address: &str) -> Result<u64, JsValue> {
        self.inner.get_balance(address).map_err(to_js_error)
    }

    /// Create a shielded transaction
    #[wasm_bindgen]
    pub fn create_shielded_transaction(
        &self,
        to_address: &str,
        amount: u64,
        memo: Option<Vec<u8>>,
    ) -> Result<JsValue, JsValue> {
        let tx = self.inner.create_shielded_transaction(to_address, amount, memo).map_err(to_js_error)?;
        Ok(serde_wasm_bindgen::to_value(&tx).unwrap())
    }
}

/// Standalone function to generate a seed phrase
#[wasm_bindgen]
pub fn wasm_generate_seed_phrase() -> String {
    generate_seed_phrase()
}

/// Standalone function to validate a seed phrase
#[wasm_bindgen]
pub fn wasm_validate_seed_phrase(phrase: &str) -> bool {
    validate_seed_phrase(phrase).is_ok()
}

/// Standalone function to generate a shielded address from seed
#[wasm_bindgen]
pub fn wasm_generate_shielded_address(seed_bytes: &[u8], account: u32) -> Result<JsValue, JsValue> {
    if seed_bytes.len() != 64 {
        return Err(JsValue::from_str("Seed must be 64 bytes"));
    }
    
    let mut seed = [0u8; 64];
    seed.copy_from_slice(seed_bytes);
    
    let addr = generate_shielded_address(&seed, account)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    
    Ok(serde_wasm_bindgen::to_value(&addr).unwrap())
}

/// Standalone function to generate a transparent address from seed
#[wasm_bindgen]
pub fn wasm_generate_transparent_address(seed_bytes: &[u8], account: u32) -> Result<JsValue, JsValue> {
    if seed_bytes.len() != 64 {
        return Err(JsValue::from_str("Seed must be 64 bytes"));
    }
    
    let mut seed = [0u8; 64];
    seed.copy_from_slice(seed_bytes);
    
    let addr = generate_transparent_address(&seed, account)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    
    Ok(serde_wasm_bindgen::to_value(&addr).unwrap())
}

/// Export view key
#[wasm_bindgen]
pub fn wasm_export_view_key(mnemonic: &str, account: u32) -> Result<JsValue, JsValue> {
    let view_key = export_view_key(mnemonic, account)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(serde_wasm_bindgen::to_value(&view_key).unwrap())
}

/// Validate an address
#[wasm_bindgen]
pub fn wasm_validate_address(address: &str) -> Result<String, JsValue> {
    match validate_address(address) {
        Ok(AddressType::Shielded) => Ok("shielded".to_string()),
        Ok(AddressType::Transparent) => Ok("transparent".to_string()),
        Err(e) => Err(JsValue::from_str(&e.to_string())),
    }
}

#[wasm_bindgen(start)]
pub fn init() {
    console_log!("Zeckna Core WASM module initialized");
}

