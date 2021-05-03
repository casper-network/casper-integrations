# -----------------------------------------------------------
# Retrieve era information by either the latest or a known block.
# -----------------------------------------------------------

# NOTE: $CASPER_CLIENT = path to compiled casper-client binary.

# A known casper test-net node address.
_NODE_ADDRESS="http://3.136.227.9:7777/rpc"

# A known switch block hash.
_SWITCH_BLOCK_HASH="12284e9e6b1c440ee91d2803850a7b7ba5e4c029c6f4abeb8aa1eb743608ab73"

# A known switch block height.
_SWITCH_BLOCK_HEIGHT=505

# Set era information at block.
_ERA_INFO=$("$CASPER_CLIENT" get-era-info-by-switch-block --node-address "$_NODE_ADDRESS")

# Set era information at a known switch block hash.
_ERA_INFO=$("$CASPER_CLIENT" get-era-info-by-switch-block --node-address "$_NODE_ADDRESS" --block-identifier "$_SWITCH_BLOCK_HASH")

# Set era information at a known switch block height.
_ERA_INFO=$("$CASPER_CLIENT" get-era-info-by-switch-block --node-address "$_NODE_ADDRESS" --block-identifier "$_SWITCH_BLOCK_HEIGHT")

# Render.
echo "$_ERA_INFO" | jq '.result'
