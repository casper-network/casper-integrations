import _ from 'lodash';
import * as fs from 'fs';
import { 
    Keys,
} from 'casper-js-sdk';


/**
 * Returns an on-chain account identifier.
 *
 * @param {Object} keyPair - Assymmetric keys of an on-chain account.
 * @return {String} Hexadecimal representation of an on-chain account identifier.
*/
export const getAccountHash = (keyPair) => {
    return Buffer.from(keyPair.accountHash()).toString('hex');
};

/**
 * Returns on-chain account information.
 * @param {Object} client - JS SDK client for interacting with a node.
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {Object} keyPair - Assymmetric keys of an on-chain account.
 * @return {Object} On-chain account information.
 */
export const getAccountInfo = async (client, stateRootHash, keyPair) => {
    const accountHash = getAccountHash(keyPair);
    const { Account: accountInfo } = await client.nodeClient.getBlockState(
        stateRootHash,
        `account-hash-${accountHash}`,
        []
    );

    return accountInfo;
};

/**
 * Returns on-chain account main purse unforgreable reference (uref).
 * @param {Object} client - JS SDK client for interacting with a node.
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {Object} keyPair - Assymmetric keys of an on-chain account.
 * @return {Object} On-chain account main purse uref.
 */
export const getAccountMainPurseURef = async (client, stateRootHash, keyPair) => {
    const {
        mainPurse
    } = await getAccountInfo(client, stateRootHash, keyPair);

    return mainPurse;
};

/**
 * Returns a value under an on-chain account's storage.
 * @param {Object} client - JS SDK client for interacting with a node.
 * @param {String} stateRootHash - Root hash of global state at a recent block.
 * @param {Object} keyPair - Assymmetric keys of an on-chain account.
 * @param {String} namedKey - A named key associated with an on-chain account.
 * @return {String} On-chain account storage item value.
 */
 export const getAccountNamedKeyValue = async (client, stateRootHash, keyPair, namedKey) => {
    // Chain query: get account information. 
    const accountInfo = await getAccountInfo(client, stateRootHash, keyPair);

    // Get value of contract v1 named key.
    const { 
        key: contractHash 
    } = _.find(accountInfo.namedKeys, (i) => { return i.name === namedKey });

    return contractHash;
};

/**
 * Returns a binary as u8 array.
 * @param {String} pathToBinary - Path to binary file to be loaded into memory.
 * @return {Uint8Array} Byte array.
 */
export const getBinary = (pathToBinary) => {
    return new Uint8Array(fs.readFileSync(pathToBinary, null).buffer);
};

/**
 * Returns an ECC key pair mapped to an NCTL faucet account.
 * @param {String} pathToFaucet - Path to NCTL faucet directory.
 * @return {Array} An assymmetric key pair.
 */
 export const getKeyPairOfContract = (pathToFaucet) => {
    return Keys.Ed25519.parseKeyFiles(
        `${pathToFaucet}/public_key.pem`,
        `${pathToFaucet}/secret_key.pem`
        );
};

/**
 * Returns a set ECC key pairs - one for each NCTL delegator account.
 * @param {String} pathToUsers - Path to NCTL user directories.
 * @return {Array} An array of assymmetric keys.
 */
 export const getKeyPairOfDelegatorSet = (pathToUsers) => {
    return _.range(1, 6).map((userID) => {
        return Keys.Ed25519.parseKeyFiles(
            `${pathToUsers}/user-${userID}/public_key.pem`,
            `${pathToUsers}/user-${userID}/secret_key.pem`
            );
    });
};

/**
 * Returns a set ECC key pairs - one for each NCTL user account.
 * @param {String} pathToUsers - Path to NCTL user directories.
 * @return {Array} An array of assymmetric keys.
 */
export const getKeyPairOfUserSet = (pathToUsers) => {
    return _.range(1, 11).map((userID) => {
        return Keys.Ed25519.parseKeyFiles(
            `${pathToUsers}/user-${userID}/public_key.pem`,
            `${pathToUsers}/user-${userID}/secret_key.pem`
            );
    });
};

/**
 * Returns a set ECC key pairs - one for each NCTL validator account.
 * @param {String} pathToValidators - Path to NCTL validator directories.
 * @return {Array} An array of assymmetric keys.
 */
 export const getKeyPairOfValidatorSet = (pathToValidators) => {
    return _.range(1, 6).map((nodeID) => {
        return Keys.Ed25519.parseKeyFiles(
            `${pathToValidators}/node-${nodeID}/keys/public_key.pem`,
            `${pathToValidators}/node-${nodeID}/keys/secret_key.pem`
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
export const getStateKeyValue = async (client, stateRootHash, stateKey, statePath) => {
    console.log(stateRootHash);
    console.log(stateKey);
    console.log(statePath);

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
export const getStateRootHash = async (client) => {
    const { 
        block: { 
            header: { 
                state_root_hash: stateRootHash 
            } 
        } 
    } = await client.nodeClient.getLatestBlockInfo();

    return stateRootHash;
};
