/**
 * @fileOverview CSPR JS SDK demo: create account.
 */

import _ from 'lodash';
import { 
    Keys
} from 'casper-js-sdk';
import * as constants from '../constants';
 
/**
 * Demonstration entry point.
 */
const main = async () => {
    setNewKeyPair();
    setExistingKeyPair();
};

/**
 * Generate a new key pair.
 */
const setNewKeyPair = () => {
    // Generate a key-pair - ED25519 is network's default.
    let accountKeyPair = Keys.Ed25519.new();

    // View account key & account hash.  The former should be stored in  a database, the latter can be derived.
    console.log(`
----------------------------------------------------------------------------------------
New Key Pair Details
----------------------------------------------------------------------------------------
ACCOUNT KEY = ${accountKeyPair.accountHex()}
ACCOUNT HASH (BYTES) = ${accountKeyPair.accountHash()}
ACCOUNT HASH (HEX) = ${Buffer.from(accountKeyPair.accountHash("hex")).toString("hex")}
----------------------------------------------------------------------------------------`);
};

/**
 * Loads a key pair from file system.
 */
 const setExistingKeyPair = () => {
    // Set path to secret key PEM file.
    const pathToPrivateKey = `${constants.PATH_TO_USERS}/user-1/secret_key.pem`;

    // Load key pair.
    const accountKeyPair = Keys.Ed25519.loadKeyPairFromPrivateFile(pathToPrivateKey);

    // View account key & account hash.  The former should be stored in  a database, the latter can be derived.
    console.log(`
----------------------------------------------------------------------------------------
Existing Key Pair Details
----------------------------------------------------------------------------------------
ACCOUNT KEY = ${accountKeyPair.accountHex()}
ACCOUNT HASH (BYTES) = ${accountKeyPair.accountHash()}
ACCOUNT HASH (HEX) = ${Buffer.from(accountKeyPair.accountHash("hex")).toString("hex")}
----------------------------------------------------------------------------------------`);    
};

main();
