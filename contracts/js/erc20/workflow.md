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