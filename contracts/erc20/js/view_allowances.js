/**
 * @fileOverview CSPR JS SDK demo: ERC20 - view contract balances.
 */

import _ from 'lodash';
import { 
    CasperClient,
} from 'casper-js-sdk';
import * as constants from './utils_constants';
import * as utils from './utils';

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

    // Step 6: Query node for approved token allowances.
    const allowances = await getTokenAllowanceOfUserSet(client, stateRootHash, contractHash, keyPairOfContract);

    // Step 7: Render.
    logAllowances(contractHash, tokenSymbol, allowances);
};

/**
 * Returns account information associated with an on-chain account.
 * @param {String} contractHash - On chain contract identifer.
 * @param {String} tokenSymbol - Symbol of installed ERC-20 token.
 * @param {Number} balanceOfAvailableSupply - Currently available ERC-20 token supply.
 * @param {Array} approvalOfUsers - Set of user ERC-20 token balances.
 */
const logAllowances = (contractHash, tokenSymbol, approvalOfUsers) => {
    console.log(`
---------------------------------------------------------------------
ERC-20 ${tokenSymbol} contract:
---------------------------------------------------------------------
... contract hash = ${contractHash}
... contract to user account approvals:`);
    for (const userID of _.range(10)) {
        console.log(`... Main User allows user ${userID + 1} to spend: ${approvalOfUsers[userID]}`)
    }
};

/**
 * Returns an ERC-20 contract token balance.
 * @param {Object} client - JS SDK client for interacting with a node.
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {String} contractHash - On-chain ERC-20 contract identifier.
 * @param {Object} cp1KeyPair - Assymmetric keys of an on-chain account.
 * @param {Object} cp2KeyPair - Assymmetric keys of an on-chain account.
 * @return {Object} ERC-20 contract token allowance.
 */
const getTokenAllowance = async (client, stateRootHash, contractHash, cp1KeyPair, cp2KeyPair) => {
    const cp1AccountHash = utils.getAccountHash(cp1KeyPair); 
    const cp2AccountHash = utils.getAccountHash(cp2KeyPair); 
    const approvalKey = `allowances_${cp1AccountHash}_${cp2AccountHash}`

    return await utils.getStateKeyValue(client, stateRootHash, contractHash, approvalKey);
};

/**
 * Returns array of ERC-20 contract user token allowances.
 * @param {Object} client - JS SDK client for interacting with a node.
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {String} contractHash - On-chain ERC-20 contract identifier.
 * @param {Object} keyPairOfContract - Assymmetric keys of an on-chain account under which contract was installed.
 * @return {Array} An array of ERC-20 contract token allowances.
 */
const getTokenAllowanceOfUserSet = async (client, stateRootHash, contractHash, keyPairOfContract) => {
    const keyPairSetOfUsers = utils.getKeyPairOfUserSet(constants.PATH_TO_USERS);

    return Promise.all(keyPairSetOfUsers.map((keyPairOfUser) => {
        return getTokenAllowance(client, stateRootHash, contractHash, keyPairOfContract, keyPairOfUser);
    }));
};

main();
 
