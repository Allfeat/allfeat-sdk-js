# 🚀 Allfeat JavaScript/TypeScript SDK (Alpha)

Welcome to the **Allfeat SDK**, a high-level JavaScript/TypeScript tool that simplifies interactions with the **MIDDS** and the **Allfeat** network. This SDK is currently in **Alpha**, and many features are still experimental, especially since the **MIDDS** is not yet fully finalized on-chain.

> **Note:** This SDK is **optimized for use with Bun** ⚡, a fast all-in-one JavaScript runtime. You can still use it with Node.js or other JavaScript runtimes if you prefer, but Bun support is provided out of the box for optimal performance.

---

## 📖 Table of Contents

- [Key Features](#key-features)
- [Installation](#installation)
- [Quick Usage](#quick-usage)
- [Integrated MIDDS](#integrated-midds)
- [Planned Features / Roadmap](#planned-features--roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## ⚙️ Key Features

- Abstracts several interactions with the **Allfeat** blockchain.
- Provides simple methods to handle your **MIDDS** (on-chain objects).
- Fully written in TypeScript, with strongly typed interfaces for a safer development experience.
- **Alpha release**: experimental features and implementations as on-chain development is ongoing.

---

## 🔨 Installation

> **Prerequisites**:
> - Bun, Node.js >= 16, or another JavaScript runtime.
> - Yarn or npm (if you are not using Bun’s built-in package manager).
> - A TypeScript-compatible project (if using TypeScript).

### Using Bun

```bash
bun install allfeat-sdk-js
```

### Using NPM

```bash
npm install allfeat-sdk-js
```

### Using Yarn

```bash
yarn install allfeat-sdk-js
```

## ⚡ Quick Usage

After installing the SDK, import it into your JavaScript or TypeScript project:

```typescript
import { AllfeatClient } from 'allfeat-sdk';
import { AllfeatProvider } from 'allfeat-sdk';

(async () => {
  // Use a specific provider to connect to (Development node, melodie testnet...)
  const provider = new AllfeatProvider('melodie')
  // Initialize your client
  const client = new AllfeatClient.new(provider)

  // Example: Retrieve a Stakeholder
  const stakeholder = await client.getStakeholder('midds hash id');
  console.log('Stakeholder:', stakeholder);

// Use other methods as needed
})();
```

> Note: The available methods and objects may change as this is an Alpha release.

## 🔗 Integrated MIDDS

The SDK currently integrates these MIDDS:

- **Stakeholder**
- **Musical Work**

These objects are already usable within the SDK (mostly for registration). Further objects are still being finalized on the on-chain side.

## 🌟 Planned Features / Roadmap

Below is the list of MIDDS and features to be implemented soon (pending on-chain code finalization):

- **Artist**
- **Master Owner**
- **Track**
- **Release**

We encourage you to check this repository frequently to see what’s new and test upcoming features.

## 🤝 Contributing

Contributions are welcome!

- For any **feature requests** or **issues** encountered while using the SDK, please **create an issue** on this repository.
- Feel free to **open a pull request** if you have any fixes or improvements to suggest.

Any help or suggestions are greatly appreciated to improve this SDK.

## 📄 License

This project is distributed under the MIT license. Please see the [LICENSE](./LICENSE) file for more information.