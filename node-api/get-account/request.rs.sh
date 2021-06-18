#!/usr/bin/env bash

# -----------------------------------------------------------
# Retrieve account information by account key.
# -----------------------------------------------------------

# NOTE: $CASPER_CLIENT = path to compiled casper-client binary.

# A known casper test-net node address.
_NODE_ADDRESS="http://3.136.227.9:7777/rpc"

# An on-chain account key.
_ACCOUNT_KEY="01cb99ab80325d73552c7c0b8d10d8cb2d19116b1f233431751fe82f9c25db51c1"

# Get latest state root hash.
_STATE_ROOT_HASH=$(
    "$CASPER_CLIENT" get-state-root-hash --node-address "$_NODE_ADDRESS" \
        | jq '.result.state_root_hash' \
        | sed -e 's/^"//' -e 's/"$//'
    ) 

# Render account information @ state root hash.
_ACCOUNT=$(
    $CASPER_CLIENT query-state \
        --node-address "$_NODE_ADDRESS" \
        --state-root-hash "$_STATE_ROOT_HASH" \
        --key "$_ACCOUNT_KEY"
    )

echo "$_ACCOUNT" | jq '.result'
