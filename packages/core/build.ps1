# PowerShell build script for Rust core library to WASM

Write-Host "Building Zeckna Core to WASM..." -ForegroundColor Green

# Check if wasm-pack is installed
$wasmPackInstalled = Get-Command wasm-pack -ErrorAction SilentlyContinue

if (-not $wasmPackInstalled) {
    Write-Host "Installing wasm-pack..." -ForegroundColor Yellow
    # Install wasm-pack via cargo if cargo is available
    if (Get-Command cargo -ErrorAction SilentlyContinue) {
        cargo install wasm-pack
    } else {
        Write-Host "Please install Rust and Cargo first, then run: cargo install wasm-pack" -ForegroundColor Red
        exit 1
    }
}

# Build for Node.js target (compatible with Jest / server usage)
wasm-pack build --target nodejs --out-dir pkg

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build complete! Output in pkg/ directory" -ForegroundColor Green
} else {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

