Javascript ERC20 on CSPR demo
===============

Pre-Requisites 
--------------------------------------

0.  It is assumed that an [NCTL](https://github.com/casper-network/casper-node/tree/master/utils/nctl) network is up & running in your local environment.

1.  The following must be available: 

- node >= v12.18.2
- npm  >= v7.21.1
- yarn >= v1.22.11

2.  To install the above on a fresh Linux Debian box:

```
# Install node + npm.
sudo apt update
sudo apt install nodejs npm

# Update node + npm to latest.
npm cache clean -f
npm install -g n
n stable
npm install npm -g

# Install yarn.
npm install -g yarn
```

Setup
--------------------------------------

Clone the casper-integrations repo into your local working directory & initialise.

```
cd YOUR_WORKING_DIRECTORY
git clone https://github.com/casper-network/casper-integrations.git
cd casper-integrations
yarn init
```

Demo Workflow
--------------------------------------

```
# ---------------------------------------------------------------------------
# Step 0: Spinup NCTL network.
# ---------------------------------------------------------------------------

# Step 0.1: Launch local network.
nctl-assets-setup && nctl-start

# Step 0.2: Await for network to spinup.
nctl-view-chain-state-root-hash

# ---------------------------------------------------------------------------
# Step 01: Install Contract.
# ---------------------------------------------------------------------------

# Step 1.0: Install smart contract.
yarn erc20-install

# Step 1.1: View on-chain details.
yarn erc20-view-details

# ---------------------------------------------------------------------------
# Step 02: Fund users with ERC-20 tokens.
# ---------------------------------------------------------------------------

# Step 2.0: Fund users.
yarn erc20-exec-transfer

# Step 2.1: View on-chain erc-20 token balances.
yarn erc20-view-balances

# ---------------------------------------------------------------------------
# Step 03: Approve user ERC-20 transfers.
# ---------------------------------------------------------------------------

# Step 3.0: Approve user-to-user transfers.
yarn erc20-exec-approve

# Step 3.1: View user token allowances.
yarn erc20-view-allowances

# ---------------------------------------------------------------------------
# Step 04: Peer-to-peer transfers.
# ---------------------------------------------------------------------------

# Step 4.0: Transfer tokens from user 1 to other users.
yarn erc20-exec-transfer-from

# Step 4.1: View updated balances.
yarn erc20-view-balances
```
