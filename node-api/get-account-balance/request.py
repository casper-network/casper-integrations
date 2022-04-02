import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS: str = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# A known account public key.
_ACCOUNT_KEY: bytes = bytes.fromhex("01cb99ab80325d73552c7c0b8d10d8cb2d19116b1f233431751fe82f9c25db51c1")

# A known block hash.
_BLOCK_HASH: bytes = bytes.fromhex("c7148e1e2e115d8fba357e04be2073d721847c982dc70d5c36b5f6d3cf66331c")

# A known state of the linear block chain at which to query.
_STATE_ROOT_HASH: bytes = bytes.fromhex("33e257bc70f7094d030a18f8aede3d58d8e202fb946810ce3292625fe853b636")


def main():
    """Retrieves on-chain account balance.
    
    """
    # Set client.
    client = pycspr.NodeClient(pycspr.NodeConnection(host=_NODE_ADDRESS))

    # Set purse.
    purse_id = client.get_account_main_purse_uref(_ACCOUNT_KEY, _BLOCK_HASH)

    # Set balance.
    balance_motes = client.get_account_balance(purse_id, _STATE_ROOT_HASH)

    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {_NODE_ADDRESS} @ {_STATE_ROOT_HASH.hex()}")
    print("-----------------------------------------------------------------------------------------------------")
    print(f"A/C key = {_ACCOUNT_KEY.hex()}")
    print(f"A/C main purse id = {purse_id}")
    print(f"A/C main purse balance (motes) = {balance_motes}")
    print("-----------------------------------------------------------------------------------------------------")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {_NODE_ADDRESS} :: {err}")