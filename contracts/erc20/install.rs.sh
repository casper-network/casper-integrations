#!/usr/bin/env bash

# Set deploy parameters - assumes NCTL network.
_DEPLOY_CHAIN_NAME=casper-net-1
_DEPLOY_GAS_PAYMENT=10000000000000
_DEPLOY_GAS_PRICE=10
_DEPLOY_NODE_ADDRESS="http://localhost:11101/rpc"
_DEPLOY_TTL="1day"

#######################################
# Installs ERC-20 token contract under network faucet account.
# Globals:
#   CASPER_CLIENT: path to compiled casper-client binary.
# Arguments:
#   Path to compiled https://github.com/casper-ecosystem/erc20.
#   Path to secret key to be used to install contract.
#   Name of ERC-20 token being created.
#   Symbol associated with ERC-20 token.
#   Total supply of ERC-20 token.
#######################################
function _main()
{
    local PATH_TO_CONTRACT=${1}
    local PATH_TO_SECRET_KEY=${2}
    local TOKEN_NAME=${3}
    local TOKEN_SYMBOL=${4}
    local TOKEN_SUPPLY=${5}
    local TOKEN_DECIMALS=${6}

    if [ ! -f "$PATH_TO_CONTRACT" ]; then
        echo "ERROR: Invalid erc20.wasm file path."
        return
    fi
    if [ ! -f "$PATH_TO_SECRET_KEY" ]; then
        echo "ERROR: Invalid secret key file path.  "
        return
    fi

    local DEPLOY_HASH=$(
        $CASPER_CLIENT put-deploy \
            --chain-name "$_DEPLOY_CHAIN_NAME" \
            --gas-price "$_DEPLOY_GAS_PRICE" \
            --node-address "$_DEPLOY_NODE_ADDRESS" \
            --payment-amount "$_DEPLOY_GAS_PAYMENT" \
            --ttl "$_DEPLOY_TTL" \
            --secret-key "$PATH_TO_SECRET_KEY" \
            --session-path "$PATH_TO_CONTRACT" \
            --session-arg "token_decimals:U8='$TOKEN_DECIMALS'" \
            --session-arg "token_name:string='$TOKEN_NAME'" \
            --session-arg "token_symbol:string='$TOKEN_SYMBOL'" \
            --session-arg "token_total_supply:U256='$TOKEN_SUPPLY'" \
            | jq '.result.deploy_hash' \
            | sed -e 's/^"//' -e 's/"$//'
        )

    log "installed contract -> ERC-20"
    log "... deploy chain = $_DEPLOY_CHAIN_NAME"
    log "... deploy dispatch node = $_DEPLOY_NODE_ADDRESS"
    log "... deploy gas payment = $_DEPLOY_GAS_PAYMENT"
    log "... deploy gas price = $_DEPLOY_GAS_PRICE"
    log "contract constructor args:"
    log "... token symbol = $TOKEN_SYMBOL"
    log "... token name = $TOKEN_NAME"
    log "... token supply = $TOKEN_SUPPLY"
    log "... token decimals = $TOKEN_DECIMALS"
    log "contract installation details:"
    log "... path = $PATH_TO_CONTRACT"
    log "... deploy hash = $DEPLOY_HASH"
}

# ----------------------------------------------------------------
# ENTRY POINT
# ----------------------------------------------------------------

unset PATH_TO_CONTRACT
unset PATH_TO_SECRET_KEY
unset TOKEN_DECIMALS
unset TOKEN_NAME
unset TOKEN_SUPPLY
unset TOKEN_SYMBOL

for ARGUMENT in "$@"
do
    KEY=$(echo "$ARGUMENT" | cut -f1 -d=)
    VALUE=$(echo "$ARGUMENT" | cut -f2 -d=)
    case "$KEY" in
        contract) PATH_TO_CONTRACT=${VALUE} ;;
        key) PATH_TO_SECRET_KEY=${VALUE} ;;
        decimals) TOKEN_DECIMALS=${VALUE} ;;
        name) TOKEN_NAME=${VALUE} ;;
        supply) TOKEN_SUPPLY=${VALUE} ;;
        symbol) TOKEN_SYMBOL=${VALUE} ;;
        *)
    esac
done

_main "${PATH_TO_CONTRACT:-"$NCTL/assets/net-1/bin/eco/erc20.wasm"}" \
      "${PATH_TO_SECRET_KEY:-"$NCTL/assets/net-1/faucet/secret_key.pem"}" \
      "${TOKEN_NAME:-"Acme Token"}" \
      "${TOKEN_SYMBOL:-"ACME"}" \
      "${TOKEN_SUPPLY:-1000000000000000000000000000000000}" \
      "${TOKEN_DECIMALS:-11}"
