/**
 * @fileOverview CSPR JS SDK demo: Native transfers.
 */

import _ from 'lodash';
import { 
    CasperClient,
    DeployUtil,
} from 'casper-js-sdk';
import * as constants from '../constants';
import * as utils from '../utils';
 
// Amount with which to fund each account.
const AMOUNT_TO_TRANSFER = 2500000000;
 
/**
 * Demonstration entry point.
 */
const main = async () => {
    // Step 1: Set casper node client.
    const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

    // Step 2: Set faucet key pair.
    const keyPairOfFaucet = utils.getKeyPairOfContract(constants.PATH_TO_FAUCET_KEYS);

    // Step 3: Invoke contract transfer endpoint.
    const deployHashes = [];
    for (const userKeyPair of utils.getKeyPairOfUserSet(constants.PATH_TO_USERS)) {
        // // Step 5.1: Set deploy.
        let deploy = DeployUtil.makeDeploy(
            new DeployUtil.DeployParams(
            keyPairOfFaucet.publicKey,
                constants.DEPLOY_CHAIN_NAME,
                constants.DEPLOY_GAS_PRICE,
                constants.DEPLOY_TTL_MS
            ),
            DeployUtil.ExecutableDeployItem.newTransfer(
                AMOUNT_TO_TRANSFER,
                userKeyPair.publicKey, 
                null,
                _.random()
            ),
            DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_NATIVE_TRANSFER)
        );

        // Step 5.2: Sign deploy.
        deploy = client.signDeploy(deploy, keyPairOfFaucet); 

        // Step 5.3: Dispatch deploy to node.
        deployHashes.push(await client.putDeploy(deploy));
    }

    // Step 6: Render details.
    for (const [userID, deployHash] of deployHashes.entries()) {
        console.log(`transferring ${AMOUNT_TO_TRANSFER} tokens -> user ${userID + 1} :: deploy hash = ${deployHash}`);
    }
};

main();
