/**
 * @fileOverview CSPR JS SDK demo: ERC20 - view contract details.
 */

import _ from 'lodash';
import { 
    CasperClient,
} from 'casper-js-sdk';
import * as utils from './utils';

// Paths.
const PATH_TO_CONTRACT_KEYS = `${process.env.NCTL}/assets/net-1/faucet`;

// Deploy parameters - assumes NCTL network.
const DEPLOY_NODE_ADDRESS="http://localhost:11101/rpc";


/**
 * Demonstration entry point.
 */
const main = async () => {
    // Step 1: Set casper node client + contract operator key pair.
    const client = new CasperClient(DEPLOY_NODE_ADDRESS);

    // Step 2: Set contract operator key pair.
    const keyPairOfContract = utils.getKeyPairOfContract(PATH_TO_CONTRACT_KEYS);   

    // Step 3: Query node for global state root hash.
    const stateRootHash = await utils.getStateRootHash(client);

    // Step 4: Query node for contract hash.
    const contractHash = await utils.getAccountNamedKeyValue(client, stateRootHash, keyPairOfContract, "ERC20");

    // Step 5: Query node for token symbol.
    const tokenName = await utils.getStateKeyValue(client, stateRootHash, contractHash, "name");

    // Step 6: Query node for token symbol.
    const tokenSymbol = await utils.getStateKeyValue(client, stateRootHash, contractHash, "symbol");

    // Step 7: Query node for token total supply.
    const tokenTotalSupply = await utils.getStateKeyValue(client, stateRootHash, contractHash, "total_supply");

    // Step 8: Query node for token decimals.
    const tokenDecimals = await utils.getStateKeyValue(client, stateRootHash, contractHash, "decimals");

    // Step 8: Render token details.
    console.log({
        "name": tokenName,
        "symbol": tokenSymbol,
        "totalSupply": tokenTotalSupply,
        "decimals": tokenDecimals
    });
};

main();
