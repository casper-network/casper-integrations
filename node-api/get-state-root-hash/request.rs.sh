# -----------------------------------------------------------
# Retrieve state root hash at either a known or the most recent block.
# -----------------------------------------------------------

# NOTE: $CASPER_CLIENT = path to compiled casper-client binary.

# A known casper test-net node address.
_NODE_ADDRESS="http://3.136.227.9:7777/rpc"

# A known block hash.
_BLOCK_HASH="c7148e1e2e115d8fba357e04be2073d721847c982dc70d5c36b5f6d3cf66331c"

# A known block height.
_BLOCK_HEIGHT=20652

# Set latest state root hash.
_STATE_ROOT_HASH=$(
    "$CASPER_CLIENT" get-state-root-hash --node-address "$_NODE_ADDRESS" 
    ) | jq '.result.state_root_hash' | sed -e 's/^"//' -e 's/"$//'

# Set state root hash at a known block hash.
_STATE_ROOT_HASH_AT_BLOCK_HASH=$(
    "$CASPER_CLIENT" get-state-root-hash \
        --node-address "$_NODE_ADDRESS" \
        --block-identifier "$_BLOCK_HASH"
    ) | jq '.result.state_root_hash' | sed -e 's/^"//' -e 's/"$//'

## Set state root hash at a known block height.
_STATE_ROOT_HASH_AT_BLOCK_HEIGHT=$(
    "$CASPER_CLIENT" get-state-root-hash \
        --node-address "$_NODE_ADDRESS" \
        --block-identifier "$_BLOCK_HEIGHT"
    ) | jq '.result.state_root_hash' | sed -e 's/^"//' -e 's/"$//'

echo "-----------------------------------------------------------------------------------------------------"
echo "QUERIED TEST-NET NODE $_NODE_ADDRESS"
echo "-----------------------------------------------------------------------------------------------------"
echo "State root hash @ latest block = $_STATE_ROOT_HASH"
echo "State root hash @ known block hash = $_STATE_ROOT_HASH_AT_BLOCK_HASH"
echo "State root hash @ known block height = $_STATE_ROOT_HASH_AT_BLOCK_HEIGHT"
echo "-----------------------------------------------------------------------------------------------------"
