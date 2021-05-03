# get-era-by-switch-block

## Overview

In the Casper blockchain system the underlying consensus process proceeds in a linear sequence of **eras**.  At the end of each era a special block is produced by the chain, this block is called the **switch block**.  The switch block contains CSPR token reward information of special interest to validators.

## JSON-RPC

The JSON-RPC API exposes the **chain_get_era_info_by_switch_block** endpoint.  It accepts the following parameter:

**block_identifier**

- if set to null, the returned era information relates to the most recent switch block;

- if set to a hash, the returned era information relates to a switch block with a matching hash;

- if set to an integer, the returned era information relates to a switch block with a matching height;

## NOTES

- If setting block_identifier = null, then information is returned **if and only if** the last block was a switch block.  If the last block was not a switch block then null is returned.