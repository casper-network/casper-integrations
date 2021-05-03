# get-state-root-hash

## Overview

Like most blockchain systems the Casper node software batches sets of transactions into blocks.  When a block is executed it is added to the chain.  

Upon execution of the block, the chain is updated to a new global state root hash.  The state root hash represents the unique state of the chain's database just after block execution.

## JSON-RPC

The JSON-RPC API exposes the **chain_get_state_root_hash** endpoint.  It accepts the following parameters:

**block_identifier**

- if set to null, the returned state root hash relate to the most recent block;

- if set to a hash, the returned state root hash relates to a block with a matching hash;

- if set to an integer, the returned state root hash relates to a block with a matching height;