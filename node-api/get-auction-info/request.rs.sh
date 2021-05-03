#!/usr/bin/env bash

# -----------------------------------------------------------
# Retrieve current state of system auction contract.
# -----------------------------------------------------------

# NOTE: $CASPER_CLIENT = path to compiled casper-client binary.

# A known casper test-net node address.
_NODE_ADDRESS="http://3.136.227.9:7777/rpc"

# Get current auction information.
_AUCTION_INFO=$("$CASPER_CLIENT" get-auction-info --node-address "$_NODE_ADDRESS")

echo "$_AUCTION_INFO" | jq '.result'
