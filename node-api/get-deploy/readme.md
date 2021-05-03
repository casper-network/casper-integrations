# get-deploy

## Overview

In the Casper blockchain system each transaction is known as a deploy.  A deploy may relate to a simple token transfer or a smart contract execution.

A deploy consists of: 

- a **hash** uniquely identifying the deploy;

- a **header** containing information such as sender account, gas-price, chain-name ...etc;

- a **payment** containing details of how the deploy was paid for;

- a **session** containing details of what on-chain code should be executed during deploy processing;

- a **set of approvals** containing deploy processing authorisation signatures;

- a **set of execution results** detailing how the deploy was processed by the system;

The lifetime of a deploy is as follows:

1. a user creates a deploy using either a casper SDK or a DApp;

2. the user signs the deploys;

3. the user sends the deploy to a node;

4. the node receives & validates the deploy;

5. the node gossips the deploy to the network;

6. the node executes the deploy when it is deemed finalised;

## JSON-RPC

The JSON-RPC API exposes the **info_get_deploy** endpoint.  It accepts the following parameter:

**deploy_hash**

- hash of a user deploy.
