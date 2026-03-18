# 📦 Node.js Installation Guide

This project requires **Node.js version 22.21.1** as specified in `.tool-versions`.

## Quick Installation

### Option 1: Using asdf (Recommended - Auto-reads .tool-versions)

**macOS / Linux:**
```bash
# 0. Install Homebrew first (if not installed)
# macOS/Linux: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# Or visit: https://brew.sh

# 1. Install asdf
brew install asdf
# Or follow: https://asdf-vm.com/guide/getting-started.html

# 2. Add to your shell (choose one)
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ~/.zshrc    # for zsh
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ~/.bashrc   # for bash

# 3. Restart terminal, then install nodejs plugin
asdf plugin add nodejs

# 4. Go to project folder and install
cd /path/to/mfe-workshop
asdf install    # Reads .tool-versions automatically!

# 5. Verify
node --version  # Should show: v22.21.1
```

**Windows:**
```bash
# Install asdf for Windows
# Follow: https://asdf-vm.com/guide/getting-started.html#windows

# Then in project folder:
cd C:\path\to\mfe-workshop
asdf install
node --version
```

### Option 2: Using nvm

**macOS / Linux:**
```bash
# 1. Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 2. Restart terminal, then:
nvm install 22.21.1
nvm use 22.21.1
node --version
```

**Windows:**
```bash
# Download nvm-windows from:
# https://github.com/coreybutler/nvm-windows/releases

# Then:
nvm install 22.21.1
nvm use 22.21.1
node --version
```

### Option 3: Direct Download (Not Recommended)

Download Node.js v22.21.1 from [nodejs.org/download/release/v22.21.1/](https://nodejs.org/download/release/v22.21.1/)

## Next Steps

Once Node.js is installed:

```bash
# 1. Go to project folder
cd /path/to/mfe-workshop

# 2. Install all dependencies
cd header && npm install    # Terminal 1
cd products && npm install  # Terminal 2
cd cart && npm install      # Terminal 3
cd home && npm install      # Terminal 4
cd host && npm install      # Terminal 5


# 3. Start all services (in separate terminals)
cd header && npm start    # Terminal 1
cd products && npm start  # Terminal 2
cd cart && npm start      # Terminal 3
cd home && npm start      # Terminal 4
cd host && npm start      # Terminal 5
```

That's it! 🎉

---

**Full guide:** [README.md](./README.md)
