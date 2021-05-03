# get-block

## Overview

Like most blockchain systems the Casper node software batches sets of transactions into **blocks**.  

A block consists of: 

- a **hash** uniquely identifying the block;

- a **header** containing information such as height, timestamp, protocol_version ...etc;

- a **body** containing the public key of the validator that proposed the block plus a set of transactions hashes;

- a set of **proofs** representing validator signatures attesting to the validity of the block; 

The lifetime of a block is as follows:

1. the **lead validator** in the current consensus round **creates** a block;

2. the lead validator **gossips** the block to the other validators for **finalisation**;

3. once the block is deemed finalised it is **executed** by each node;

## JSON-RPC

The JSON-RPC API exposes the **chain_get_block** endpoint.

The chain_get_block endpoint accepts the following parameters:

**block_identifier**

- if set to null, then the most recent block is returned;

- if set to a hash, then the chain's database is searched for a block with a matching hash;

- if set to an integer, then the chain's database is searched for a block with a matching height;
