# -----------------------------------------------------------
# Retrieve account balance by purse.
# -----------------------------------------------------------

# NOTE: $CASPER_CLIENT = path to compiled casper-client binary.

# An adddress associated with a casper test-net node.
_NODE_ADDRESS="http://3.136.227.9:7777/rpc"

# A known block hash.
_BLOCK_HASH="c7148e1e2e115d8fba357e04be2073d721847c982dc70d5c36b5f6d3cf66331c"

# A known block height.
_BLOCK_HEIGHT=20652

# Set latest block.
_BLOCK_LATEST=$(
    $CASPER_CLIENT get-block \
        --node-address "$_NODE_ADDRESS" \
        | jq '.result.block'
    )

# Set block by known hash.
_BLOCK_BY_HASH=$(
    $CASPER_CLIENT get-block \
        --node-address "$_NODE_ADDRESS" \
        --block-identifier "$_BLOCK_HASH" \
        | jq '.result.block'
    )

# Set block by known height.
_BLOCK_BY_HIGHT=$(
    $CASPER_CLIENT get-block \
        --node-address "$_NODE_ADDRESS" \
        --block-identifier $_BLOCK_HEIGHT \
        | jq '.result.block'
    )

# Render.
echo $_BLOCK_BY_HIGHT | jq
