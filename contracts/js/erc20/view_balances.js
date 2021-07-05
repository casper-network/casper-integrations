/**
 * @fileOverview CSPR JS SDK demo: ERC20 - view contract balances.
 */

import _ from 'lodash';
import { 
    CasperClient,
} from 'casper-js-sdk';
import * as constants from '../constants';
import * as utils from '../utils';

/**
 * Demonstration entry point.
 */
const main = async () => {
    // Step 1: Set casper node client.
    const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

    // Step 2: Set contract operator key pair.
    const keyPairOfContract = utils.getKeyPairOfContract(constants.PATH_TO_CONTRACT_KEYS);

    // Step 3: Query node for global state root hash.
    const stateRootHash = await utils.getStateRootHash(client);

    // Step 4: Query node for contract hash.
    const contractHash = await utils.getAccountNamedKeyValue(client, stateRootHash, keyPairOfContract, "ERC20");

    // Step 5: Query node for token symbol.
    const tokenSymbol = await utils.getStateKeyValue(client, stateRootHash, contractHash, "symbol");

    // Step 6: Query node for contract balance - i.e. available supply.
    const balanceOfContract = await getTokenBalance(client, stateRootHash, contractHash, keyPairOfContract);

    // Step 7: Query node for user balances.
    const balanceOfUsers = await getTokenBalanceOfUserSet(client, stateRootHash, contractHash);

    // Step 8: Render token balances.
    logBalances(contractHash, tokenSymbol, balanceOfContract, balanceOfUsers);
};

/**
 * Returns account information associated with an on-chain account.
 * @param {String} contractHash - On chain contract identifer.
 * @param {String} tokenSymbol - Symbol of installed ERC-20 token.
 * @param {Number} balanceOfAvailableSupply - Currently available ERC-20 token supply.
 * @param {Array} balanceOfUsers - Set of user ERC-20 token balances.
 */
const logBalances = (contractHash, tokenSymbol, balanceOfAvailableSupply, balanceOfUsers) => {
    console.log(`
---------------------------------------------------------------------
ERC-20 ${tokenSymbol} contract:
---------------------------------------------------------------------
... contract hash = ${contractHash}
... token balances:
... ... available supply: ${balanceOfAvailableSupply}`);
    for (const userID of _.range(10)) {
        console.log(`... ... user ${userID + 1}: ${balanceOfUsers[userID]}`)
    }
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

    return await utils.getStateKeyValue(client, stateRootHash, contractHash, balanceKey);
};

/**
 * Returns array of ERC-20 contract user token balances.
 * @return {Array} An array of ERC-20 contract token balances.
 */
 const getTokenBalanceOfUserSet = async (client, stateRootHash, contractHash) => {
    const keyPairSet = utils.getKeyPairOfUserSet(constants.PATH_TO_USERS);

    return Promise.all(keyPairSet.map((i) => {
        return getTokenBalance(client, stateRootHash, contractHash, i);
    }));
};

main();
 