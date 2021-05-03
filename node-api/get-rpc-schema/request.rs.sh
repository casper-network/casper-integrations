# -----------------------------------------------------------
# Displays a node's JSON-RPC schema.
# -----------------------------------------------------------

# NOTE: $CASPER_CLIENT = path to compiled casper-client binary.

# An adddress associated with a casper test-net node.
_NODE_ADDRESS="http://3.136.227.9:7777/rpc"

# Render JSON-RPC schema pulled from node.
$CASPER_CLIENT list-rpcs \
    --node-address "$_NODE_ADDRESS" \
    | jq '.'
