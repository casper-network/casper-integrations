/**
 * @fileOverview CSPR JS SDK demo: ERC20 - view contract balances.
 */

 import * as _ from 'lodash';
 import { 
     CasperClient,
     Keys,
 } from 'casper-js-sdk';
 
 // Paths.
 const PATH_TO_NCTL = process.env.NCTL;
 const PATH_TO_KEYS = `${PATH_TO_NCTL}/assets/net-1/faucet`;
 const PATH_TO_USERS = `${PATH_TO_NCTL}/assets/net-1/users`;
 
 // Deploy parameters - assumes NCTL network.
 const DEPLOY_NODE_ADDRESS="http://localhost:11101/rpc";
 
 
/**
 * Demonstration entry point.
 */
const main = async () => {
    // Step 1: Set casper node client + contract operator key pair.
    const client = new CasperClient(DEPLOY_NODE_ADDRESS);

    // Step 2: Set contract operator key pair.
    const contractKeyPair = Keys.Ed25519.parseKeyFiles(
        `${PATH_TO_KEYS}/public_key.pem`,
        `${PATH_TO_KEYS}/secret_key.pem`
        );    

    // Step 3: Set global state root hash against which to issue queries.
    const stateRootHash = await getStateRootHash(client);

    // Step 4: Set contract hash - should be cached upon installation.
    const contractHash = await getContractHash(client, stateRootHash, contractKeyPair);

    // Step 5: Render token balances.
    logBalances(
        contractHash,
        await getStateKeyValue(client, stateRootHash, contractHash, "symbol"),
        await getTokenBalance(client, stateRootHash, contractHash, contractKeyPair),
        await getTokenBalanceOfUserSet(client, stateRootHash, contractHash)
    )
};

/**
 * Returns account information associated with an on-chain account.
 * @param {String} contractHash - On chain contract identifer.
 * @param {String} tokenSymbol - Symbol of installed ERC-20 token.
 * @param {Number} balanceOfAvailableSupply - Currently available ERC-20 token supply.
 * @param {Array} balanceOfOfUsers - Set of user ERC-20 token balances.
 */
const logBalances = (contractHash, tokenSymbol, balanceOfAvailableSupply, balanceOfOfUsers) => {
    console.log(`
---------------------------------------------------------------------
ERC-20 ${tokenSymbol} contract:
---------------------------------------------------------------------
... contract hash = ${contractHash}
... token balances:
... ... available supply: ${balanceOfAvailableSupply}`);
    for (const userID of _.range(10)) {
        console.log(`... ... user ${userID + 1}: ${balanceOfOfUsers[userID]}`)
    }
};

/**
 * Returns on-chain account information.
 * @param {Object} client - JS SDK client for interacting with a node.
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {Object} keyPair - Assymmetric keys of an on-chain account.
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
};

/**
 * Returns an on-chain account identifier.
 *
 * @param {Object} keyPair - Assymmetric keys of an on-chain account.
 * @return {String} Hexadecimal representation of an on-chain account identifier.
*/
const getAccountHash = (keyPair) => {
    return Buffer.from(keyPair.accountHash()).toString('hex');
};

/**
 * Returns on-chain contract identifier.
 * @param {Object} client - JS SDK client for interacting with a node.
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {Object} keyPair - Assymmetric keys of an on-chain account.
 * @return {String} On-chain contract identifier.
 */
const getContractHash = async (client, stateRootHash, keyPair) => {
    // Chain query: get account information. 
    const accountInfo = await getAccountInfo(client, stateRootHash, keyPair);

    // Get value of contract v1 named key.
    const { 
        key: contractHash 
    } = _.find(accountInfo.namedKeys, (i) => { return i.name === "ERC20" });

    return contractHash;
};

/**
 * Returns a set ECC key pairs - one for each NCTL user account.
 * @return {Array} An array of assymmetric keys.
 */
const getKeyPairOfUserSet = () => {
    return _.range(1, 11).map((userID) => {
        return Keys.Ed25519.parseKeyFiles(
            `${PATH_TO_USERS}/user-${userID}/public_key.pem`,
            `${PATH_TO_USERS}/user-${userID}/secret_key.pem`
            );
    });
};

/**
 * Returns value of a key associated with global storage.
 * @param {Object} client - JS SDK client for interacting with a node.
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {String} stateKey - Key of an item within global state.
 * @param {String} statePath - Path of data associated with a key within a global state.
 * @return {Object} On-chain account information.
 */
 const getStateKeyValue = async (client, stateRootHash, stateKey, statePath) => {
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
 * @param {Object} client - JS SDK client for interacting with a node.
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

/**
 * Returns an ERC-20 contract token balance.
 * @param {Object} client - JS SDK client for interacting with a node.
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {String} contractHash - On-chain ERC-20 contract identifier.
 * @param {Object} keyPair - Assymmetric keys of an on-chain account.
 * @return {Object} ERC-20 contract token balance.
 */
const getTokenBalance = async (client, stateRootHash, contractHash, keyPair) => {
    const accountHash = Buffer.from(keyPair.accountHash()).toString('hex'); 
    const balanceKey = `balances_${accountHash}`

    return await getStateKeyValue(client, stateRootHash, contractHash, balanceKey);
};

/**
 * Returns array of ERC-20 contract user token balances.
 * @return {Array} An array of ERC-20 contract token balances.
 */
 const getTokenBalanceOfUserSet = async (client, stateRootHash, contractHash) => {
    const keyPairSet = getKeyPairOfUserSet();

    return Promise.all(keyPairSet.map((i) => {
        return getTokenBalance(client, stateRootHash, contractHash, i);
    }));
};

main();
 