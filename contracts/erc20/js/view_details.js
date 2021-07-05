/**
 * @fileOverview CSPR JS SDK demo: ERC20 - view contract details.
 */

import * as _ from 'lodash';
import { 
    CasperClient,
    Keys,
} from 'casper-js-sdk';

// Paths.
const PATH_TO_NCTL = process.env.NCTL;
const PATH_TO_KEYS = `${PATH_TO_NCTL}/assets/net-1/faucet`;

// Deploy parameters - assumes NCTL network.
const DEPLOY_NODE_ADDRESS="http://localhost:11101/rpc";


/**
 * Demonstration entry point.
 */
const main = async () => {
    // Step 1: Set casper node client + contract operator key pair.
    const client = new CasperClient(DEPLOY_NODE_ADDRESS);

    // Step 2: Set contract operator key pair.
    const keyPair = Keys.Ed25519.parseKeyFiles(
        `${PATH_TO_KEYS}/public_key.pem`,
        `${PATH_TO_KEYS}/secret_key.pem`
        );    

    // Step 3: Get global state root hash against which to issue queries.
    const stateRootHash = await getStateRootHash(client);

    // Step 4: Get hash of installed contract - should be cached.
    const contractHash = await getContractHash(client, stateRootHash, keyPair);

    // Step 5: Get on-chain token information.
    console.log({
        "name": await getContractKeyValue(client, stateRootHash, contractHash, "name"),
        "symbol": await getContractKeyValue(client, stateRootHash, contractHash, "symbol"),
        "totalSupply": await getContractKeyValue(client, stateRootHash, contractHash, "total_supply"),
        "decimals": await getContractKeyValue(client, stateRootHash, contractHash, "decimals")
    });
};

/**
 * Returns account information associated with an on-chain account.
 * @param {Object} client - Node interaction client .
 * @param {String} stateRootHash - Hexadecimal representation of global state's root hash.
 * @param {Object} keyPair - Assymmetric key of on-chain account.
 * @return {Object} On-chain account information.
 */
 const getAccountInfo = async (client, stateRootHash, keyPair) => {
    const accountHash = Buffer.from(keyPair.accountHash()).toString('hex');
    const { Account: accountInfo } = await client.nodeClient.getBlockState(
        stateRootHash,
        `account-hash-${accountHash}`,
        []
    );

    return accountInfo;
}

/**
 * Returns on-chain contract identifier.
 * @param {Object} client - Node interaction client .
 * @param {String} stateRootHash - Hexadecimal representation of global state's root hash.
 * @param {Object} keyPair - Assymmetric key of on-chain account.
 * @return {String} On-chain contract identifier.
 */
const getContractHash = async (client, stateRootHash, keyPair) => {
    // Chain query: get account information. 
    const accountInfo = await getAccountInfo(client, stateRootHash, keyPair);

    // Get value of contract v1 named key.
    const { key: contractHash } = _.find(accountInfo.namedKeys, (i) => { return i.name === "ERC20" });

    return contractHash;
};

/**
 * Returns account information associated with an on-chain account.
 * @param {Object} client - Node interaction client .
 * @param {String} stateRootHash - Hexadecimal representation of global state's root hash.
 * @param {String} stateKey - Key of an item within global state.
 * @param {String} statePath - Path of data associated with a key within a global state.
 * @return {Object} On-chain account information.
 */
const getContractKeyValue = async (client, stateRootHash, stateKey, statePath) => {
    // Chain query: get global state root hash. 
    stateRootHash = stateRootHash || await getStateRootHash(client);

    // Chain query: get global state key value. 
    const { 
        CLValue: { 
            parsed: value 
        } 
    } = await client.nodeClient.getBlockState(
        stateRootHash,
        stateKey,
        [statePath]
    );

    return value;
};

/**
 * Returns global state root hash at current block.
 * @param {Object} client - Node interaction client.
 * @return {String} Root hash of global state at most recent block.
 */
const getStateRootHash = async (client) => {
    const { 
        block: { 
            header: { 
                state_root_hash: stateRootHash 
            } 
        } 
    } = await client.nodeClient.getLatestBlockInfo();

    return stateRootHash;
};

main();
