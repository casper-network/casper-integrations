// Paths.
export const PATH_TO_CONTRACT = `${process.env.NCTL}/assets/net-1/bin/eco/erc20.wasm`;
export const PATH_TO_CONTRACT_KEYS = `${process.env.NCTL}/assets/net-1/faucet`;
export const PATH_TO_USERS = `${process.env.NCTL}/assets/net-1/users`;

// Deploy parameters.
export const DEPLOY_CHAIN_NAME="casper-net-1";
export const DEPLOY_GAS_PAYMENT=10000000000000;
export const DEPLOY_GAS_PRICE=10;
export const DEPLOY_NODE_ADDRESS="http://localhost:11101/rpc";
export const DEPLOY_TTL_MS=1800000;
