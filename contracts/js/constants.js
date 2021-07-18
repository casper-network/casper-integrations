// Path to folder containing keys with which to operate smart contract.
export const PATH_TO_CONTRACT_KEYS = process.env.CSPR_INTS_PATH_TO_CONTRACT_KEYS || 
                                     `${process.env.NCTL}/assets/net-1/faucet`;

// Path to folder containing keys with which to act as a test faucet.
export const PATH_TO_FAUCET_KEYS = process.env.CSPR_INTS_PATH_TO_FAUCET_KEYS || 
                                   `${process.env.NCTL}/assets/net-1/faucet`;

// Path to folder containing keys with which to act as test users.
export const PATH_TO_USERS = process.env.CSPR_INTS_PATH_TO_USERS || 
                             `${process.env.NCTL}/assets/net-1/users`;

// Path to folder containing keys with which to act as test validators.
export const PATH_TO_VALIDATORS = process.env.CSPR_INTS_PATH_TO_VALIDATORS || 
                                  `${process.env.NCTL}/assets/net-1/nodes`;

// Name of target chain.
export const DEPLOY_CHAIN_NAME = process.env.CSPR_INTS_CHAIN_NAME || "casper-net-1";

// Gas payment to be offered.
export const DEPLOY_GAS_PAYMENT = process.env.CSPR_INTS_DEPLOY_GAS_PAYMENT || 10000000000000;

// Gas payment for native transfers to be offered.
export const DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER = process.env.CSPR_INTS_DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER || 100000;

// Gas price to be offered.
export const DEPLOY_GAS_PRICE = process.env.CSPR_INTS_DEPLOY_GAS_PRICE || 10;

// Address of target node.
export const DEPLOY_NODE_ADDRESS = process.env.CSPR_INTS_DEPLOY_NODE_ADDRESS || "http://localhost:11101/rpc";

// Time interval in milliseconds after which deploy will not be processed by a node.
export const DEPLOY_TTL_MS = process.env.CSPR_INTS_DEPLOY_TTL_MS || 1800000;
