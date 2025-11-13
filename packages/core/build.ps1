# PowerShell build script for Rust core library to WASM

Write-Host "Building Zeckna Core to WASM..." -ForegroundColor Green

<<<<<<< HEAD
# Install wasm-pack if not already installed
=======
# Check if wasm-pack is installed
>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
$wasmPackInstalled = Get-Command wasm-pack -ErrorAction SilentlyContinue

if (-not $wasmPackInstalled) {
    Write-Host "Installing wasm-pack..." -ForegroundColor Yellow
<<<<<<< HEAD
=======
    # Install wasm-pack via cargo if cargo is available
>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
    if (Get-Command cargo -ErrorAction SilentlyContinue) {
        cargo install wasm-pack
    } else {
        Write-Host "Please install Rust and Cargo first, then run: cargo install wasm-pack" -ForegroundColor Red
        exit 1
    }
}

<<<<<<< HEAD
# Build for Node.js target so tests can require the module
wasm-pack build --target nodejs --out-dir pkg
=======
# Build for web target
wasm-pack build --target web --out-dir pkg
>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build complete! Output in pkg/ directory" -ForegroundColor Green
} else {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}
<<<<<<< HEAD
=======

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
