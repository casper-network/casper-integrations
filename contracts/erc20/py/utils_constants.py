import os
import pathlib



# Path to folder containing NCTL assets.
PATH_TO_NCTL = pathlib.Path(os.getenv("NCTL")) / "assets" / "net-1"

# Path to folder containing keys with which to operate smart contract.
PATH_TO_CONTRACT_KEYS = os.getenv(
    "CSPR_INTS_PATH_TO_CONTRACT_KEYS", PATH_TO_NCTL / "faucet"
    )

# Path to folder containing keys with which to act as a test faucet.
PATH_TO_FAUCET_KEYS = os.getenv(
    "CSPR_INTS_PATH_TO_FAUCET_KEYS", PATH_TO_NCTL / "faucet"
    )

# Path to folder containing keys with which to act as test users.
PATH_TO_USERS = os.getenv(
    "CSPR_INTS_PATH_TO_USERS", PATH_TO_NCTL / "users"
    )

# Path to folder containing keys with which to act as test validators.
PATH_TO_VALIDATORS = os.getenv(
    "CSPR_INTS_PATH_TO_VALIDATORS", PATH_TO_NCTL / "nodes"
    )

# Path to an ERC20 samrt contract wasm file.
PATH_TO_CONTRACT_ERC_20 = pathlib.Path(__file__).parent.parent.absolute() / "erc20.wasm"

# Name of target chain.
DEPLOY_CHAIN_NAME = os.getenv(
    "CSPR_INTS_DEPLOY_CHAIN_NAME", "casper-net-1"
    )

# Gas payment to be offered.
DEPLOY_GAS_PAYMENT = int(os.getenv("CSPR_INTS_DEPLOY_GAS_PAYMENT", int(1e13)))

# Gas payment for native transfers to be offered.
DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER = \
    int(os.getenv("CSPR_INTS_DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER", int(1e5)))

# Gas price to be offered.
DEPLOY_GAS_PRICE = int(os.getenv("CSPR_INTS_DEPLOY_GAS_PRICE", 1));

# Target node host address.
DEPLOY_NODE_HOST = os.getenv("CSPR_INTS_DEPLOY_NODE_HOST", "localhost")

# Target node rpc port.
DEPLOY_NODE_PORT_RPC = os.getenv("CSPR_INTS_DEPLOY_NODE_PORT_RPC", "11101")

# Address of target node.
DEPLOY_NODE_ADDRESS = os.getenv("CSPR_INTS_DEPLOY_NODE_ADDRESS", "http:#localhost:11101/rpc")

# Time interval in milliseconds after which deploy will not be processed by a node.
DEPLOY_TTL_MS = int(os.getenv("CSPR_INTS_DEPLOY_TTL_MS", int(18e5)))
