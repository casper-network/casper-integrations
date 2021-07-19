/**
 * @fileOverview CSPR JS SDK demo: ERC20 - install contract.
 */

import { 
    CasperClient,
    CLValueBuilder,
    DeployUtil,
    RuntimeArgs,
} from 'casper-js-sdk';
import * as constants from '../constants';
import * as utils from '../utils';

// Path to contract to be installed.
const PATH_TO_CONTRACT = constants.PATH_TO_CONTRACT_ERC_20;

// Token parameters.
const TOKEN_NAME = "Acme Token";
const TOKEN_SYMBOL = "ACME";
const TOKEN_DECIMALS = 11;
const TOKEN_SUPPLY = 1e15;

/**
 * Demonstration entry point.
 */
const main = async () => {
    // Step 1: Set casper node client.
    const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

    // Step 2: Set contract operator key pair.
    const keyPairOfContract = utils.getKeyPairOfContract(constants.PATH_TO_CONTRACT_KEYS);

    // Step 3: Set contract installation deploy (unsigned).
    let deploy = DeployUtil.makeDeploy(
        new DeployUtil.DeployParams(
            keyPairOfContract.publicKey,
            constants.DEPLOY_CHAIN_NAME,
            constants.DEPLOY_GAS_PRICE,
            constants.DEPLOY_TTL_MS
        ),
        DeployUtil.ExecutableDeployItem.newModuleBytes(
            utils.getBinary(PATH_TO_CONTRACT),
            RuntimeArgs.fromMap({
                token_decimals: CLValueBuilder.u8(TOKEN_DECIMALS),
                token_name: CLValueBuilder.string(TOKEN_NAME),
                token_symbol: CLValueBuilder.string(TOKEN_SYMBOL),
                token_total_supply: CLValueBuilder.u256(TOKEN_SUPPLY),
            })
        ),
        DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT)
    );

    // Step 4: Sign deploy.
    deploy = client.signDeploy(deploy, keyPairOfContract); 

    // Step 5: Dispatch deploy to node.
    const deployHash = await client.putDeploy(deploy);

    // Step 6: Render deploy details.
    logDetails(deployHash)
};

/**
 * Emits to stdout deploy details.
 * @param {String} deployHash - Identifer of dispatched deploy.
 */
const logDetails = (deployHash) => {
    console.log(`
---------------------------------------------------------------------
installed contract -> ERC20
... account = ${constants.PATH_TO_CONTRACT_KEYS}
... deploy chain = ${constants.DEPLOY_CHAIN_NAME}
... deploy dispatch node = ${constants.DEPLOY_NODE_ADDRESS}
... deploy gas payment = ${constants.DEPLOY_GAS_PAYMENT}
... deploy gas price = ${constants.DEPLOY_GAS_PRICE}
contract constructor args:
... token symbol = ${TOKEN_SYMBOL}
... token name = ${TOKEN_NAME}
... token supply = ${TOKEN_SUPPLY}
... token decimals = ${TOKEN_DECIMALS}
contract installation details:
... path = ${constants.PATH_TO_CONTRACT}
... deploy hash = ${deployHash}
---------------------------------------------------------------------
    `);    
};
  
main();
