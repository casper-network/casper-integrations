#!/usr/bin/env bash

#######################################
# Renders ERC-20 token contract approvals.
#######################################

# ----------------------------------------------------------------
# CONSTANTS
# ----------------------------------------------------------------

# Set path to casper rust client.
_CASPER_CLIENT="$NCTL/assets/net-1/bin/casper-client"

# Set deploy parameters - assumes NCTL network.
_DEPLOY_NODE_ADDRESS="http://localhost:11101/rpc"

# ----------------------------------------------------------------
# FUNCTIONS
# ----------------------------------------------------------------

function main()
{
    local CONTRACT_OWNER_ACCOUNT_KEY
    local CONTRACT_OWNER_ACCOUNT_HASH
    local CONTRACT_HASH
    local TOKEN_SYMBOL
    local USER_ID
    local USER_ACCOUNT_KEY
    local USER_ACCOUNT_HASH
    local USER_ALLOWANCE_KEY
    local USER_ALLOWANCE

    # Set contract owner account key - i.e. faucet account.
    CONTRACT_OWNER_ACCOUNT_KEY=$(cat "$NCTL/assets/net-1/faucet/public_key_hex")

    # Set contract owner account hash.
    CONTRACT_OWNER_ACCOUNT_HASH=$(_get_account_hash "$CONTRACT_OWNER_ACCOUNT_KEY")

    # Set contract hash (hits node api).
    CONTRACT_HASH=$(_get_contract_hash "$CONTRACT_OWNER_ACCOUNT_KEY")

    # Set token symbol (hits node api).
    TOKEN_SYMBOL=$(_get_contract_key_value "$CONTRACT_HASH" "symbol")

    log "ERC-20 $TOKEN_SYMBOL contract:"
    log "... contract hash = $CONTRACT_HASH"
    log "... contract to user account approvals:"

    # Render user account balances.
    for USER_ID in $(seq 1 10)
    do
        # Set user account key. 
        USER_ACCOUNT_KEY=$(cat "$NCTL/assets/net-1/users/user-$USER_ID/public_key_hex")

        # Set user account hash. 
        USER_ACCOUNT_HASH=$(_get_account_hash "$USER_ACCOUNT_KEY")

        # Set faucet <-> user allowance state query key.
        USER_ALLOWANCE_KEY="allowances_$CONTRACT_OWNER_ACCOUNT_HASH"_"$USER_ACCOUNT_HASH"

        # Set faucet <-> user allowance (hits node api).
        USER_ALLOWANCE=$(_get_contract_key_value "$CONTRACT_HASH" "$USER_ALLOWANCE_KEY")        

        log "... ... user $USER_ID = $USER_ALLOWANCE"
    done
}

function _get_account_hash()
{
    local ACCOUNT_KEY=${1}
    local ACCOUNT_PBK=${ACCOUNT_KEY:2}

    local SCRIPT=(
        "import hashlib;"
        "as_bytes=bytes('ed25519', 'utf-8') + bytearray(1) + bytes.fromhex('$ACCOUNT_PBK');"
        "h=hashlib.blake2b(digest_size=32);"
        "h.update(as_bytes);"
        "print(h.digest().hex());"
     )

    python3 -c "${SCRIPT[*]}"
}

function _get_contract_hash ()
{
    local ACCOUNT_KEY=${1}

    $_CASPER_CLIENT query-global-state \
        --node-address "$_DEPLOY_NODE_ADDRESS" \
        --state-root-hash "$(_get_state_root_hash)" \
        --key "$ACCOUNT_KEY" \
        | jq '.result.stored_value.Account.named_keys[] | select(.name == "ERC20") | .key' \
        | sed -e 's/^"//' -e 's/"$//'
}

function _get_contract_key_value ()
{
    local QUERY_KEY=${1}
    local QUERY_PATH=${2}

    $_CASPER_CLIENT query-global-state \
        --node-address "$_DEPLOY_NODE_ADDRESS" \
        --state-root-hash "$(_get_state_root_hash)" \
        --key "$QUERY_KEY" \
        --query-path "$QUERY_PATH" \
        | jq '.result.stored_value.CLValue.parsed' \
        | sed -e 's/^"//' -e 's/"$//'
}

function _get_state_root_hash()
{
    $_CASPER_CLIENT get-state-root-hash \
        --node-address "$_DEPLOY_NODE_ADDRESS" \
        --block-identifier "" \
        | jq '.result.state_root_hash' \
        | sed -e 's/^"//' -e 's/"$//'
}

# ----------------------------------------------------------------
# ENTRY POINT
# ----------------------------------------------------------------

main
