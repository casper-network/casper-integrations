import * as utils from '../utils';
import * as constants from '../constants';
const { create } = require('ipfs-http-client')

const main = async () => {
    // Create IPFS client pointint at a specific node.
    const client = create(constants.IPFS_ENTRY_NODE)

    // IPwe sample data.
    let sample_a = '{"patentId":"EP-3420697-B1-CY","applicationId":"EP17707409.3","owner":"nChain Holdings Ltd","ownerStatus":"verified","familyId":55753050,"ipweFamilyRating":"AAA","insurancePolicyId":"123","anticipatedExpirationDate":"2037-02-14"}';

    let cid_a = await utils.ipfs_export(client, sample_a)

    // Import content.
    const content_a = await utils.ipfs_import(client, cid_a)

    console.log(`[${cid_a}] content: ${content_a.toString()}`)

    // Data can also be found on the local/test IPFS node, under:
    // http://0.0.0.0:8080/ipfs/{cid_a} 

    let sample_b = '{"patentId":"EP-3420697-B1-AL","applicationId":"EP17707409.3","owner":"nChain Holdings Ltd","ownerStatus":"verified","familyId":55753050,"ipweFamilyRating":"AAA","insurancePolicyId":"123","anticipatedExpirationDate":"2037-02-14"}';

    let cid_b = await utils.ipfs_export(client, sample_b)

    // Import content.
    const content_b = await utils.ipfs_import(client, cid_b)

    console.log(`[${cid_b}] content: ${content_b.toString()}`)
}

main();