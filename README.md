# IDEP.JS

### Javascript library to facilitate and simplify interacting with the idep blockchain.

![chat](https://img.shields.io/discord/797223813480972289.svg)

![IDEPJS](idepjsbanner.png?raw=true "Title")

---
## Table of Contents

- [IDEP.JS](#idepjs)
		- [Javascript library to facilitate and simplify interacting with the idep blockchain.](#javascript-library-to-facilitate-and-simplify-interacting-with-the-idep-blockchain)
	- [Table of Contents](#table-of-contents)
	- [Features](#features)
	- [Installation](#installation)
	- [Quick Start Guide](#quick-start-guide)
- [Using idep.js](#using-idepjs)
	- [Idep.js client](#idepjs-client)
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

# Using idep.js

## Idep.js client
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

**Got any questions?** Feel free to ask on our discord in idep.js channel!


**Something doesn't work as expected?** Open a new issue!