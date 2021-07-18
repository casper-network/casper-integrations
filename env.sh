# Path to folder containing keys with which to operate smart contract.
export CSPR_INTS_PATH_TO_CONTRACT_KEYS="$NCTL/assets/net-1/faucet"

# Path to folder containing keys with which to act as a test faucet.
export CSPR_INTS_PATH_TO_FAUCET_KEYS="$NCTL/assets/net-1/faucet"

# Path to folder containing keys with which to act as test users.
export CSPR_INTS_PATH_TO_USERS="$NCTL/assets/net-1/users"

# Path to folder containing keys with which to act as test validators.
export CSPR_INTS_PATH_TO_VALIDATORS="$NCTL/assets/net-1/nodes"

# Name of target chain.
export CSPR_INTS_DEPLOY_CHAIN_NAME="casper-net-1";

# Gas payment to be offered.
export CSPR_INTS_DEPLOY_GAS_PAYMENT=10000000000000;

# Gas payment for native transfers to be offered.
export CSPR_INTS_DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER=100000;

# Gas price to be offered.
export CSPR_INTS_DEPLOY_GAS_PRICE=10;

# Address of target node.
export CSPR_INTS_DEPLOY_NODE_ADDRESS="http://localhost:11101/rpc"

# Time interval in milliseconds after which deploy will not be processed by a node.
export CSPR_INTS_DEPLOY_TTL_MS=1800000;
