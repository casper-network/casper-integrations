# -----------------------------------------------------------
# Retrieve account balance by purse.
# -----------------------------------------------------------

# NOTE: $CASPER_CLIENT = path to compiled casper-client binary.

# An adddress associated with a casper test-net node.
_NODE_ADDRESS="http://3.136.227.9:7777/rpc"

# Render current state of auction contract.
$CASPER_CLIENT get-auction-info \
    --node-address "$_NODE_ADDRESS" \
    | jq '.result'
