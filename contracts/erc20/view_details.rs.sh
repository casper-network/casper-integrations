#!/usr/bin/env bash

# ----------------------------------------------------------------
# CONSTANTS
# ----------------------------------------------------------------

# Set deploy parameters - assumes NCTL network.
_DEPLOY_CHAIN_NAME=casper-net-1
_DEPLOY_GAS_PAYMENT=10000000000000
_DEPLOY_GAS_PRICE=10
_DEPLOY_NODE_ADDRESS="http://localhost:11101/rpc"
_DEPLOY_TTL="1day"

# ----------------------------------------------------------------
# FUNCTIONS
# ----------------------------------------------------------------

function _main()
{
    local ACCOUNT_KEY=${1}

    local CONTRACT_HASH=$(_get_contract_hash "$ACCOUNT_KEY")
    local TOKEN_NAME=$(_get_contract_key_value "$CONTRACT_HASH" "name")
    local TOKEN_SYMBOL=$(_get_contract_key_value "$CONTRACT_HASH" "symbol")
    local TOKEN_SUPPLY=$(_get_contract_key_value "$CONTRACT_HASH" "total_supply")
    local TOKEN_DECIMALS=$(_get_contract_key_value "$CONTRACT_HASH" "decimals")

    log "Contract -> ERC-20"
    log "... account key = $ACCOUNT_KEY"
    log "... name = ERC20"
    log "... hash = $CONTRACT_HASH"
    log "Token details:"
    log "... name = $TOKEN_NAME"
    log "... symbol = $TOKEN_SYMBOL"
    log "... supply = $TOKEN_SUPPLY"
    log "... decimals = $TOKEN_DECIMALS"
}

function _get_state_root_hash()
{
    $CASPER_CLIENT get-state-root-hash \
        --node-address "$_DEPLOY_NODE_ADDRESS" \
        --block-identifier "" \
        | jq '.result.state_root_hash' \
        | sed -e 's/^"//' -e 's/"$//'
}

function _get_contract_hash ()
{
    local ACCOUNT_KEY=${1}

    $CASPER_CLIENT query-state \
        --node-address "$_DEPLOY_NODE_ADDRESS" \
        --state-root-hash "$(get_state_root_hash)" \
        --key "$ACCOUNT_KEY" \
        | jq '.result.stored_value.Account.named_keys[] | select(.name == "ERC20") | .key' \
        | sed -e 's/^"//' -e 's/"$//'
}

function _get_contract_key_value ()
{
    local QUERY_KEY=${1}
    local QUERY_PATH=${2}

    $(get_path_to_client) query-state \
        --node-address "$_DEPLOY_NODE_ADDRESS" \
        --state-root-hash "$(get_state_root_hash)" \
        --key "$QUERY_KEY" \
        --query-path "$QUERY_PATH" \
        | jq '.result.stored_value.CLValue.parsed' \
        | sed -e 's/^"//' -e 's/"$//'
}

# ----------------------------------------------------------------
# ENTRY POINT
# ----------------------------------------------------------------

unset ACCOUNT_KEY

for ARGUMENT in "$@"
do
    KEY=$(echo "$ARGUMENT" | cut -f1 -d=)
    VALUE=$(echo "$ARGUMENT" | cut -f2 -d=)
    case "$KEY" in
        key) ACCOUNT_KEY=${VALUE} ;;
        *)
    esac
done

_main "${ACCOUNT_KEY:-$(cat "$NCTL/assets/net-1/faucet/public_key_hex")}"
