#!/bin/bash
# Build script for Rust core library to WASM

set -e

echo "Building Zeckna Core to WASM..."

# Install wasm-pack if not already installed
if ! command -v wasm-pack &> /dev/null; then
    echo "Installing wasm-pack..."
    curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
fi

<<<<<<< HEAD
# Build for Node.js target so tests can require the module
wasm-pack build --target nodejs --out-dir pkg

echo "Build complete! Output in pkg/ directory"
=======
# Build for web target
wasm-pack build --target web --out-dir pkg

echo "Build complete! Output in pkg/ directory"

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
