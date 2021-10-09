# Path to folder containing keys with which to operate a smart contract.
export CSPR_INTS_PATH_TO_CONTRACT_KEYS="$NCTL/assets/net-1/faucet"

# Path to folder containing keys with which to act as a test faucet.
export CSPR_INTS_PATH_TO_FAUCET_KEYS="$NCTL/assets/net-1/faucet"

# Path to folder containing sub-folders named, user-1, user-2 ...etc.  Each sub-folder contains associated with the test user.
export CSPR_INTS_PATH_TO_USERS="$NCTL/assets/net-1/users"

# Path to folder containing sub-folders named, node-1, node-2 ...etc.  Each sub-folder contains associated with the test validator/node.
export CSPR_INTS_PATH_TO_VALIDATORS="$NCTL/assets/net-1/nodes"

# Path to an ERC20 smart contract wasm file.
export PATH_TO_CONTRACT_ERC_20="$NCTL/assets/net-1/bin/eco/erc20.wasm"

# Name of target chain.
export CSPR_INTS_DEPLOY_CHAIN_NAME="casper-net-1"

# Gas payment to be offered.
export CSPR_INTS_DEPLOY_GAS_PAYMENT=10000000000000

# Gas payment for native transfers to be offered.
export CSPR_INTS_DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER=100000

# Gas price to be offered.
export CSPR_INTS_DEPLOY_GAS_PRICE=1

# Address of target node.
export CSPR_INTS_DEPLOY_NODE_ADDRESS="http://localhost:11101/rpc"

# Time interval in milliseconds after which deploy will not be processed by a node.
export CSPR_INTS_DEPLOY_TTL_MS=1800000

# Location of the casper java sdk fat jar
export CSPR_JAVA_FAT_JAR=casper-java-sdk-0.2.1-jar-with-dependencies.jar

# Java command with classpath
export RUN_JAVA="java -cp $CSPR_JAVA_FAT_JAR"
