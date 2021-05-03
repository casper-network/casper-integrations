# get-block

## Overview

Each on-chain Casper account is associated with a **purse**.  All purses are created by the system **mint** contract when the account is initially funded.

Each purse has a **system allocated** unique identifier, e.g. uref-b3a323e529dc59f3a1042ea89e60a66ecd8fc9ee0991398d7760e24e72b2f49d-007. 


## JSON-RPC

The JSON-RPC API exposes the **state_get_balance** endpoint.  It accepts the following parameters:

**purse_uref**

- the purse identifier, e.g. uref-b3a323e529dc59f3a1042ea89e60a66ecd8fc9ee0991398d7760e24e72b2f49d-007;

**state_root_hash**

- the state of the blockchain's database at which the node will perform a balance query;

## NOTES

- in order to get an account's purse identifier you must use  [get-account](../get-account/readme.md).
