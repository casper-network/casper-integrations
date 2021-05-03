#!/usr/bin/env bash

# -----------------------------------------------------------
# Retrieve deploy information.
# -----------------------------------------------------------

# NOTE: $CASPER_CLIENT = path to compiled casper-client binary.

# A known casper test-net node address.
_NODE_ADDRESS="http://3.136.227.9:7777/rpc"

# A known deploy hash.
_DEPLOY_HASH="6c4048f8ebd40a160e9df47e73680eda8ae8430309a9566655bb357a5967276b"

# Set deploy information.
_DEPLOY=$("$CASPER_CLIENT" get-deploy --node-address "$_NODE_ADDRESS" "$_DEPLOY_HASH")

# Render.
echo "$_DEPLOY" | jq '.result.deploy'
