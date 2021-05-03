# -----------------------------------------------------------
# Retrieve account balance by purse.
# -----------------------------------------------------------

# NOTE: $CASPER_CLIENT = path to compiled casper-client binary.

# An adddress associated with a casper test-net node.
_NODE_ADDRESS="http://3.136.227.9:7777/rpc"

# A known deploy hash.
_DEPLOY_HASH="6c4048f8ebd40a160e9df47e73680eda8ae8430309a9566655bb357a5967276b"

# Set deploy information.
_DEPLOY=$(
    $CASPER_CLIENT get-deploy \
        --node-address "$_NODE_ADDRESS" \
        "$_DEPLOY_HASH" \
        | jq '.result.deploy'
    )

# Render.
echo $_DEPLOY | jq
