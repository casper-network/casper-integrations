import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS: str = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# A known account public key.
_ACCOUNT_KEY: bytes = bytes.fromhex("01cb99ab80325d73552c7c0b8d10d8cb2d19116b1f233431751fe82f9c25db51c1")

# Account hash mapped from account key.
_ACCOUNT_HASH: bytes = pycspr.get_account_hash(_ACCOUNT_KEY)

# A known block hash.
_BLOCK_HASH: bytes = bytes.fromhex("c7148e1e2e115d8fba357e04be2073d721847c982dc70d5c36b5f6d3cf66331c")

def main():
    """Retrieves on-chain account information.
    
    """
    # Set client.
    client = pycspr.NodeClient(pycspr.NodeConnection(host=_NODE_ADDRESS))

    # Set account information by account key.
    account_info: dict = client.get_account_info(_ACCOUNT_KEY, _BLOCK_HASH)   

    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {_NODE_ADDRESS} @ {_BLOCK_HASH.hex()}")
    print("-----------------------------------------------------------------------------------------------------")
    print(f"A/C key = {_ACCOUNT_KEY.hex()}")
    print(f"A/C hash = {_ACCOUNT_HASH.hex()}")
    print(f"A/C on-chain info = {json.dumps(account_info, indent=4)}") 
    print("-----------------------------------------------------------------------------------------------------")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {_NODE_ADDRESS} :: {err}")
