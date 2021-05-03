# -----------------------------------------------------------
# Retrieve summary information of transfers included in either the latest or a known block.
# -----------------------------------------------------------

# NOTE: $CASPER_CLIENT = path to compiled casper-client binary.

# An adddress associated with a casper test-net node.
_NODE_ADDRESS="http://3.136.227.9:7777/rpc"

# A known block hash.
_BLOCK_HASH="c7148e1e2e115d8fba357e04be2073d721847c982dc70d5c36b5f6d3cf66331c"

# A known block height.
_BLOCK_HEIGHT=20652

# Set latest transfers.
_BLOCK_LATEST=$(
    $CASPER_CLIENT get-block-transfers \
        --node-address "$_NODE_ADDRESS" \
        | jq '.result'
    )

# Set transfers by known block hash.
_BLOCK_BY_HASH=$(
    $CASPER_CLIENT get-block-transfers \
        --node-address "$_NODE_ADDRESS" \
        --block-identifier "$_BLOCK_HASH" \
        | jq '.result'
    )

# Set transfers by known block height.
_BLOCK_BY_HEIGHT=$(
    $CASPER_CLIENT get-block-transfers \
        --node-address "$_NODE_ADDRESS" \
        --block-identifier $_BLOCK_HEIGHT \
        | jq '.result'
    )

# Render.
echo $_BLOCK_BY_HEIGHT | jq
