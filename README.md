![IDEPJS](https://i.imgur.com/LJZpIbl.png "Title")
<h1 align="center">
The JavaScript SDK for IDEP Network
❗❗DEPRECATED❗❗
</h1>
<p align="center">
IDEP.js is a javascript SDK that allows browsers and node.js clients to interact with IDEP Network blockchain.
</p>
<p align="center">
  <a href="https://lgtm.com/projects/g/IDEP-network/IDEP.js/"><img alt="lgtm" src="https://img.shields.io/lgtm/grade/javascript/g/IDEP-network/IDEP.js.svg?logo=lgtm&logoWidth=18"></a>
  <a href="https://github.com/IDEP-network/IDEP.js/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/License-Apache_2.0-blue.svg"></a>
  <a href="https://github.com/IDEP-network/IDEP.js"><img alt="Last commit" src="https://badgen.net/github/last-commit/IDEP-network/IDEP.js/main"></a>
  <a href="https://www.npmjs.com/package/idep.js"><img alt="Npm downloads" src="https://badgen.net/npm/dw/idep.js"></a>
  <img alt="Beta release" src="https://badgen.net/github/release/idep-network/idep.js">
  <img alt="Types included" src="https://badgen.net/npm/types/idep.js">
  <a href="https://nodejs.org/en/blog/release/v16.13.2/"><img alt="Node version" src="https://badgen.net/npm/node/idep.js"></a>
</p>
<p align="center">
<a href="https://nodei.co/npm/idep.js/"><img src="https://nodei.co/npm/idepjs.png"></a>
</p>

----

## Table of Contents

- [Using IDEP.js](#using-idepjs)
  - [IDEP.js client](#idepjs-client)
  - [Wallet](#wallet)
    - [Create new wallet](#create-new-wallet)
    - [Retrieving wallet from storage](#retrieving-wallet-from-storage)
    - [Wallet restoration](#wallet-restoration)
  - [Query the account's balance](#query-the-accounts-balance)
  - [Create and send a simple transaction, that sends coins](#create-and-send-a-simple-transaction-that-sends-coins)
    - [Check tx status](#check-tx-status)
- [Possible queries and transactions](#possible-queries-and-transactions)
    - [Auth src/x/auth](#auth-srcxauth)
    - [Bank src/x/bank](#bank-srcxbank)
    - [NFT src/x/nft](#nft-srcxnft)
  - [Appendix and FAQ](#appendix-and-faq)
    - [❓ More Questions?](#-more-questions)



---

## Features
 - Works both in node.js and in browser environments.
 - Written in Typescript.
 - Wallet creation, persistence, restoration (from the mnemonic phrase or a private key). Can be used to create wallets for other blockchains.
 - Querying the idep blockchain, sending transactions.
 - Safe encryption, based on the native APIs (crypto in node, subtleCrypto in a browser).
 - Uses protocol buffers.

---

## Installation
##### `yarn add idep.js`
or
##### `npm install idep.js`

---

## Quick Start Guide

If you are in a hurry, start here.

1. Install idep.js with either yarn or npm.
2. Create client's instance.
```typescript
  import {createNewClient} from 'idep.js';

  const client = createNewClient(); // uses default configuration
```
3. Create new wallet. Password is used to encrypt the private key. You will need it to make a transaction. Name is used for persistence.
```typescript
const wallet = await client.wallet.createNew('encryptionPwd', 'walletName');
```
4. After creating your wallet successfully, you can start making queries and transactions! Below[^1] you can find a list with possible ones that you can make with the idep.js.

---

# Using IDEP.js

`Disclaimer: Using await in a global scope is only supported with node versions higher than 17. If using older versions, wrap examples below in async functions.`

## IDEP.js client
To start, import and create the client.
```typescript
import {createNewClient} from 'idep.js';

const client = createNewClient({
  nodeUrl: 'http://159.89.84.111:26657',
  chainId: 'SanfordNetwork',
  fee: {
    gas: '7000',
    amount: [{ denom: 'idep', amount: '500' }],
  },
});  // default config
```

Configuration can be omitted, in that case the default one is going to be used.
```typescript
const client = createNewClient()
```

---

## Wallet

After wallet is created, retrieved, or restored; it's stored on the client's instance. Private key is encrypted with provided password.

### Create new wallet

```typescript
const wallet = await client.wallet.createNew('encryptionPwd', 'walletName');
const {mnemonic, publicKey, address} = wallet;
```
This is the only time when mnemonic phrase can be accessed. Make sure to store it securely.
Naming a wallet is optional (it defaults to the wallet's address).

### Retrieving wallet from storage
```typescript
const wallet = await client.wallet.retrieveSavedWallet('name');
const {publicKey, address} = wallet;
```

### Wallet restoration

With a mnemonic phrase:
```typescript
const mnemonic = 'power thing inmate obscure rubber frequent grit hair below museum notable reopen spoon prize family caught axis host';
const wallet = await client.wallet.restoreWithSeed(mnemonic, 'password');
```

With private key:
```typescript
const privateKey = 'hexEncodedPrivateKeyString';
const wallet = await client.wallet.restoreWithPrivateKey(privateKey, 'password')
```

---

## Query the account's balance

```typescript
const address = 'idep126dfeu0d6awmdjy29e4f04eg0g3kvcpz9dazru';
const denom = 'idep'
const response = await client.bank.checkBalance(address, denom);
console.log(response); // {balance: {amount: '10000000150', denom: 'idep'}}
```

---

## Create and send a simple transaction, that sends coins

```typescript
const txResult = await client.bank.msgSend({
    recipient: 'idep126dfeu0d6awmdjy29e4f04eg0g3kvcpz9dazru',
    amount: [{
        denom: 'idep',
        amount: '25'
    }],
}, {
    from: client.wallet.address, // optional
    pub_key: client.wallet.publicKey, // optional
    fee: {
        gas: '7000',
        amount: [{
            denom: 'idep',
            amount: '700'
        }],
    }, // optional
    simulate: false, // optional
    password: 'password', // needed to decrypt a private key, which is needed to sign the tx
});
console.log(txResult); // 'Tx hash 26919CA117C5D5240AF144D6A7765AE31372D9E167CB596A46210AC986F28C03'
```
You also can simulate the transaction beforehand so you get required gas estimate. To do it, simply change the **simulate** flag to *true*.

### Check tx status
```typescript
const txHash = '26919CA117C5D5240AF144D6A7765AE31372D9E167CB596A46210AC986F28C03';
const status = await client.rpc.checkTx(txHash);
```
[Check status](https://demo.hedgedoc.org/s/qXX1fpwFb)

---
[^1]:
# Possible queries and transactions

### Auth src/x/auth
 - checkAccountInfo (queryAccount)
 - checkAuthParams (queryParams)

### Bank src/x/bank
 - checkBalance (queryBalance)
 - checkALlBalances (queryAllBalances)
 - checkSupply (querySupplyOf)
 - checkParams (queryParams)
 - checkBalance (queryAllBalances)
 - checkALlBalances (queryAllBalances)
 - msgSend
 - msgMultiSend

### NFT src/x/nft
- checkSupply (querySupply)
- checkOwner (queryOwner)
- checkCollection (queryCollection)
- checkDenom (queryDenom)
- checkMultipleDenoms (queryDenoms)
- checkNft (queryNFT)
- msgIssueDenom
- msgMintNFT
- msgEditNFT
- msgTransferNFT
- msgBurnNFT

---

## Appendix and FAQ

### ❓ More Questions?

Chat with the team on the [IDEP Discord server](https://discord.gg/Jrarctk4hG) IDEP.js channel!

**Something doesn't work as expected?** [Open a new issue!](https://github.com/IDEP-network/IDEP.js/issues)
