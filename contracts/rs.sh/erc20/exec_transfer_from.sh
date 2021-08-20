#!/usr/bin/env bash

#######################################
# Transfers ERC-20 tokens from user 1 to other test user accounts.
# Arguments:
#   Amount of ERC-20 token to transfer.
#######################################

# ----------------------------------------------------------------
# CONSTANTS
# ----------------------------------------------------------------

# Set path to casper rust client.
_CASPER_CLIENT="$NCTL/assets/net-1/bin/casper-client"

# Set deploy parameters - assumes NCTL network.
_DEPLOY_CHAIN_NAME=casper-net-1
_DEPLOY_GAS_PAYMENT=10000000000000
_DEPLOY_GAS_PRICE=10
_DEPLOY_NODE_ADDRESS="http://localhost:11101/rpc"
_DEPLOY_TTL="1day"

# ----------------------------------------------------------------
# FUNCTIONS
# ----------------------------------------------------------------

function main()
{
    local AMOUNT=${1}
    local CONTRACT_OWNER_ACCOUNT_KEY
    local USER_ACCOUNT_KEY
    local USER_ACCOUNT_HASH
    local USER_SECRET_KEY

    # Set contract owner account key - i.e. faucet account.
    CONTRACT_OWNER_ACCOUNT_KEY=$(cat "$NCTL/assets/net-1/faucet/public_key_hex")

    # Set contract owner account hash.
    CONTRACT_OWNER_ACCOUNT_HASH=$(_get_account_hash "$CONTRACT_OWNER_ACCOUNT_KEY")

    # Set contract hash (hits node api).
    CONTRACT_HASH=$(_get_contract_hash "$CONTRACT_OWNER_ACCOUNT_KEY")

    # Enumerate set of users.
    for USER_ID in $(seq 1 10)
    do
        # Set user account key. 
        USER_SECRET_KEY="$NCTL/assets/net-1/users/user-$USER_ID/secret_key.pem"

        # Set user account key. 
        USER_ACCOUNT_KEY=$(cat "$NCTL/assets/net-1/users/user-$USER_ID/public_key_hex")

        # Set user account hash. 
        USER_ACCOUNT_HASH=$(_get_account_hash "$USER_ACCOUNT_KEY")

        # Dispatch deploy (hits node api). 
        DEPLOY_HASH=$(
            $_CASPER_CLIENT put-deploy \
                --chain-name "$_DEPLOY_CHAIN_NAME" \
                --gas-price "$_DEPLOY_GAS_PRICE" \
                --node-address "$_DEPLOY_NODE_ADDRESS" \
                --payment-amount "$_DEPLOY_GAS_PAYMENT" \
                --secret-key "$USER_SECRET_KEY" \
                --ttl "$_DEPLOY_TTL" \
                --session-hash "$CONTRACT_HASH" \
                --session-entry-point "transfer_from" \
                --session-arg "amount:U256='$AMOUNT'" \
                --session-arg "owner:account_hash='account-hash-$CONTRACT_OWNER_ACCOUNT_HASH'" \
                --session-arg "recipient:account_hash='account-hash-$USER_ACCOUNT_HASH'" \
                | jq '.result.deploy_hash' \
                | sed -e 's/^"//' -e 's/"$//'
            )
        log "transferring tokens by user $USER_ID deploy hash = $DEPLOY_HASH"
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

function _get_contract_hash()
{
    local ACCOUNT_KEY=${1}

    $CASPER_CLIENT query-global-state \
        --node-address "$_DEPLOY_NODE_ADDRESS" \
        --state-root-hash "$(get_state_root_hash)" \
        --key "$ACCOUNT_KEY" \
        | jq '.result.stored_value.Account.named_keys[] | select(.name == "ERC20") | .key' \
        | sed -e 's/^"//' -e 's/"$//'
}

# ----------------------------------------------------------------
# ENTRY POINT
# ----------------------------------------------------------------

unset AMOUNT

for ARGUMENT in "$@"
do
    KEY=$(echo "$ARGUMENT" | cut -f1 -d=)
    VALUE=$(echo "$ARGUMENT" | cut -f2 -d=)
    case "$KEY" in
        amount) AMOUNT=${VALUE} ;;
        *)
    esac
done

main "${AMOUNT:-100000}"
