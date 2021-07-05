/**
 * @fileOverview CSPR JS SDK demo: ERC20 - fund users.
 */

import _ from 'lodash';
import { 
    CasperClient,
    CLValueBuilder,
    DeployUtil,
    RuntimeArgs,
} from 'casper-js-sdk';
import * as constants from './constants';
import * as utils from './utils';

// Amount that each user account will be approved  to withdraw.
const AMOUNT_TO_APPROVE = 1000000000;

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
    const contractHashAsByteArray = [...Buffer.from(contractHash.slice(5), "hex")];

    // Step 5: Invoke contract approve endpoint.
    const deployHashes = [];
    const userKeyPairSet = utils.getKeyPairOfUserSet(constants.PATH_TO_USERS);
    for (const userKeyPair of userKeyPairSet) {
        // Step 5.1: Set deploy.
        let deploy = DeployUtil.makeDeploy(
            new DeployUtil.DeployParams(
                keyPairOfContract.publicKey,
                constants.DEPLOY_CHAIN_NAME,
                constants.DEPLOY_GAS_PRICE,
                constants.DEPLOY_TTL_MS
            ),
            DeployUtil.ExecutableDeployItem.newStoredContractByHash(
                contractHashAsByteArray,
                "approve",
                RuntimeArgs.fromMap({
                    amount: CLValueBuilder.u256(AMOUNT_TO_APPROVE),
                    spender: CLValueBuilder.byteArray(userKeyPair.accountHash()),
                })
            ),
            DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT)
        );

        // Step 5.2: Sign deploy.
        deploy = client.signDeploy(deploy, keyPairOfContract); 

        // Step 5.3: Dispatch deploy to node.
        deployHashes.push(await client.putDeploy(deploy))
    }

    // Step 6: Render details.
    for (const [userID, deployHash] of deployHashes.entries()) {
        console.log(`approving ${AMOUNT_TO_APPROVE} tokens -> user ${userID + 1} :: deploy hash = ${deployHash}`);
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
 * Returns on-chain contract identifier.
 * @param {Object} client - JS SDK client for interacting with a node.
 * @param {Object} keyPair - Assymmetric keys of an on-chain account.
 * @return {String} On-chain contract identifier.
 */
 const getContractHash = async (client, keyPair) => {
    // Set root hash of global state at a recent block.
    const stateRootHash = await getStateRootHash(client);

    // Chain query: get account information. 
    const accountInfo = await getAccountInfo(client, stateRootHash, keyPair);

    // Get value of contract v1 named key.
    const { 
        key: contractHash 
    } = _.find(accountInfo.namedKeys, (i) => { return i.name === "ERC20" });

    return contractHash;
};

/**
 * Returns on-chain contract identifier as a byte array.
 * @param {Object} client - JS SDK client for interacting with a node.
 * @param {Object} keyPair - Assymmetric keys of an on-chain account.
 * @return {Array} On-chain contract identifier.
 */
const getContractHashAsByteArray = async (client, keyPair) => {
    const contractHash = await getContractHash(client, keyPair);

    return [...Buffer.from(contractHash.slice(5), "hex")];
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

main();
