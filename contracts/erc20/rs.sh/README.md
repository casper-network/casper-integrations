Javascript ERC20 on CSPR demo
===============

Pre-Requisites 
--------------------------------------

0.  It is assumed that an [NCTL](https://github.com/casper-network/casper-node/tree/master/utils/nctl) network is up & running in your local environment.

Workflow
--------------------------------------

The below workflow **must** be run from the casper-integrations root folder.  

```
# ---------------------------------------------------------------------------
# Step 0: Spinup NCTL network & cd into casper-integrations root folder.
# ---------------------------------------------------------------------------

# Step 0.1: Launch local network.
nctl-assets-setup && nctl-start

# Step 0.2: Await for network to spinup.
nctl-view-chain-state-root-hash

# Step 0.3: cd into casper-integrations root folder.
cd YOUR_WORKING_DIRECTORY/casper-integrations

# ---------------------------------------------------------------------------
# Step 01: Install Contract.
# ---------------------------------------------------------------------------

# Step 1.0: Install smart contract.
source ./contracts/rs.sh/erc20/install.sh contract=./contracts/rs.sh/erc20/erc20.wasm

# Step 1.1: View on-chain details.
source ./contracts/rs.sh/erc20/view_details.sh

# ---------------------------------------------------------------------------
# Step 02: Fund users with ERC-20 tokens.
# ---------------------------------------------------------------------------

# Step 2.0: Fund users.
source ./contracts/rs.sh/erc20/exec_transfer.sh

# Step 2.1: View on-chain erc-20 token balances.
source ./contracts/rs.sh/erc20/view_balances.sh

# ---------------------------------------------------------------------------
# Step 03: Approve user ERC-20 transfers.
# ---------------------------------------------------------------------------

# Step 3.0: Approve user-to-user transfers.
source ./contracts/rs.sh/erc20/exec_approve.sh

# Step 3.1: View user token allowances.
source ./contracts/rs.sh/erc20/view_allowances.sh

# ---------------------------------------------------------------------------
# Step 04: Set associated keys / action thresholds.
# ---------------------------------------------------------------------------

# Step 4.0: Transfer tokens from user 1 to other users.
source ./contracts/rs.sh/erc20/exec_transfer_from.sh

# Step 4.1: View updated balances.
source ./contracts/rs.sh/erc20/view_balances.sh
```
