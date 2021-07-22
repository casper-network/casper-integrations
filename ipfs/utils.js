/** 
 * Fetches content of a file, found under `cid`.
 * 
 * @param {IPFS client from ipfs-http-client library} client 
 * @param {CID of the file} cid 
 * @returns content of a file found under CID.
 */
export async function ipfs_import(client, cid) {
    const content = []

    for await (let file of client.get(cid)) {
        // If there's a content, it's a file.
        if (!file.content) continue;


        for await (const chunk of file.content) {
            content.push(chunk)
        }
    }

    return content
}
