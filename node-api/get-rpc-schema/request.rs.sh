# -----------------------------------------------------------
# Displays a node's JSON-RPC schema.
# -----------------------------------------------------------

# NOTE: $CASPER_CLIENT = path to compiled casper-client binary.

# A known casper test-net node address.
_NODE_ADDRESS="http://3.136.227.9:7777/rpc"

# Render JSON-RPC schema pulled from node.
_RPC_SCHEMA=$($CASPER_CLIENT list-rpcs --node-address "$_NODE_ADDRESS")

echo "$_RPC_SCHEMA" | jq '.'
