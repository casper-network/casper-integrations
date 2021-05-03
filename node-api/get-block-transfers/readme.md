# get-block-transfers

## Overview

Transactions that move CSPR token from one account to another are called **transfers**.  Each block may contain 0..N transfers.  

Each transfer is associated with **2 counter-parties** identified by their account hashes.

Each counter-party can decide which **purse** they wish to use for the transfer.

## JSON-RPC

The JSON-RPC API exposes the **chain_get_block_transfers** endpoint.  It accepts the following parameters:

**block_identifier**

- if set to null, the returned transfers relate to the most recent block;

- if set to a hash, the returned transfers relate to a block with a matching hash;

- if set to an integer, the returned transfers relate to a block with a matching height;
