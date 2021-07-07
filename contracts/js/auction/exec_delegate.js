/**
 * @fileOverview CSPR JS SDK demo: AUCTION - delegate.
 */

import _ from 'lodash';
import { 
    CasperClient,
    CLValueBuilder,
    DeployUtil,
    RuntimeArgs,
} from 'casper-js-sdk';
import * as constants from '../constants';
import * as utils from '../utils';
 
// Path to contract to be installed.
const PATH_TO_CONTRACT = `${process.env.NCTL}/assets/net-1/bin/auction/delegate.wasm`;

// Amount with which to delegate from each account.
const AMOUNT_TO_DELEGATE = 2000000000;
 
/**
 * Demonstration entry point.
 */
const main = async () => {
    // Step 1: Set casper node client.
    const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

    // Step 2: Set delegator to validator pairings.
    const targets = _.zip(
        utils.getKeyPairOfDelegatorSet(constants.PATH_TO_USERS),
        utils.getKeyPairOfValidatorSet(constants.PATH_TO_VALIDATORS)
    );

    // Step 3: Dispatch delegate session deploys.
    const deployHashes = [];
    for (const [keyPairOfDelegator, keyPairOfValidator] of targets) {
        // Step 3.1: Set deploy.
        let deploy = DeployUtil.makeDeploy(
            new DeployUtil.DeployParams(
                keyPairOfDelegator.publicKey,
                constants.DEPLOY_CHAIN_NAME,
                constants.DEPLOY_GAS_PRICE,
                constants.DEPLOY_TTL_MS
            ),
            DeployUtil.ExecutableDeployItem.newModuleBytes(
                utils.getBinary(PATH_TO_CONTRACT),
                RuntimeArgs.fromMap({
                    amount: CLValueBuilder.u512(AMOUNT_TO_DELEGATE),
                    delegator: CLValueBuilder.publicKey([...keyPairOfDelegator.publicKey.data], 1),
                    validator: CLValueBuilder.publicKey([...keyPairOfValidator.publicKey.data], 1),
                })
            ),
            DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT)
        );

        // Step 3.2: Sign deploy.
        deploy = client.signDeploy(deploy, keyPairOfDelegator); 

        // Step 3.3: Dispatch deploy to node.
        deployHashes.push(await client.putDeploy(deploy));
    }

    // Step 6: Render details.
    for (const [idx, deployHash] of deployHashes.entries()) {
        console.log(`delegating ${AMOUNT_TO_DELEGATE} CSPR from user ${idx + 1} -> validator ${idx + 1} :: deploy hash = ${deployHash}`);
    }
};
 
main();
