/**
 * @fileOverview CSPR JS SDK demo: ERC20 - fund users.
 */

import _ from 'lodash';
import { 
    CasperClient,
    CLValueBuilder,
    DeployUtil,
    Keys,
    RuntimeArgs,
} from 'casper-js-sdk';

// Paths.
const PATH_TO_CONTRACT_KEYS = `${process.env.NCTL}/assets/net-1/faucet`;
const PATH_TO_USERS = `${process.env.NCTL}/assets/net-1/users`;

// Deploy parameters - assumes NCTL network.
const DEPLOY_CHAIN_NAME="casper-net-1";
const DEPLOY_GAS_PAYMENT=10000000000000;
const DEPLOY_GAS_PRICE=10;
const DEPLOY_NODE_ADDRESS="http://localhost:11101/rpc";
const DEPLOY_TTL_MS=1800000;

// Amount with which to transfer between accounts.
const AMOUNT_TO_TRANSFER = 100000;

/**
 * Demonstration entry point.
 */
 const main = async () => {
    // Step 1: Set casper node client.
    const client = new CasperClient(DEPLOY_NODE_ADDRESS);

    // Step 2: Set contract operator key pair.
    const keyPairOfContract = Keys.Ed25519.parseKeyFiles(
        `${PATH_TO_CONTRACT_KEYS}/public_key.pem`,
        `${PATH_TO_CONTRACT_KEYS}/secret_key.pem`
        );   

    // Step 3: Set contract hash - should be cached upon installation.
    const contractHashAsByteArray = await getContractHashAsByteArray(client, keyPairOfContract);

    // Step 4: Invoke contract transfer_from endpoint.
    const userKeyPairSet = getKeyPairOfUserSet();
    for (const [userID, userKeyPair] of _.drop(userKeyPairSet).entries()) {
        const deployHash = await executeContractEndpoint(
            client,
            keyPairOfContract,
            contractHashAsByteArray,
            userKeyPairSet[0],
            userKeyPair
            );
        console.log(`transferring ${AMOUNT_TO_TRANSFER} tokens from user 1 -> user ${userID + 2} :: deploy hash = ${deployHash}`);
    }
};

/**
 * Executes target smart contract transfer_from function.
 * @param {Object} client - JS SDK client for interacting with a node.
 * @param {Object} keyPairOfContract - Assymmetric keys of an on-chain account acting as contract operator.
 * @param {U8IntArray} contractHash - Target smart contract on-chain identifier.
 * @param {Object} cp1 - Assymmetric keys of an on-chain account acting as counter-party 1.
 * @param {Object} cp1 - Assymmetric keys of an on-chain account acting as counter-party 2.
 * @return {String} Deploy hash.
 */
const executeContractEndpoint = async (client, keyPairOfContract, contractHash, cp1, cp2) => {
    // Step 4.1: Set deploy.
    let deploy = DeployUtil.makeDeploy(
        new DeployUtil.DeployParams(
            keyPairOfContract.publicKey,
            DEPLOY_CHAIN_NAME,
            DEPLOY_GAS_PRICE,
            DEPLOY_TTL_MS
        ),
        DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            contractHash,
            "transfer_from",
            RuntimeArgs.fromMap({
                amount: CLValueBuilder.u256(AMOUNT_TO_TRANSFER),
                owner: CLValueBuilder.byteArray(cp1.accountHash()),
                recipient: CLValueBuilder.byteArray(cp2.accountHash())
            })
        ),
        DeployUtil.standardPayment(DEPLOY_GAS_PAYMENT)
    );

    // Step 4.2: Sign deploy.
    deploy = client.signDeploy(deploy, keyPairOfContract); 

    // Step 4.3: Dispatch deploy to node.
    return await client.putDeploy(deploy);
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
