/** 
 * Fetches content of a file, found under `cid`.
 * 
 * @param {client} IPFS client instance from `ipfs-htt-client` library.
 * @param {cid} CID of the file.
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

/**
 * Exports an object to IPFS.
 * 
 * @param {client} IPFS client instance from `ipfs-htt-client` library.
 * @param {content} Object we wish to export to IPFS.
 * @returns CID of the document.
 */
export async function ipfs_export(client, sample_content) {
    const sample = {
        content: sample_content
    }

    let result = await client.add(sample)

    // Log the address of the document.
    console.log(result)

    return result.cid
}