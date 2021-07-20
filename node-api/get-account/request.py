import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS: str = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# A known account public key.
_ACCOUNT_KEY: bytes = bytes.fromhex("01cb99ab80325d73552c7c0b8d10d8cb2d19116b1f233431751fe82f9c25db51c1")

# Account hash mapped from account key.
_ACCOUNT_HASH: bytes = pycspr.get_account_hash(_ACCOUNT_KEY)

# A known state of the linear block chain at which to query.
_STATE_ROOT_HASH: bytes = bytes.fromhex("33e257bc70f7094d030a18f8aede3d58d8e202fb946810ce3292625fe853b636")


def main():
    """Retrieves on-chain account information.
    
    """
    # Set client.
    client = pycspr.NodeClient(pycspr.NodeConnectionInfo(host=_NODE_ADDRESS))

    # Set account information by account key.
    account_info: dict = client.queries.get_account_info(_ACCOUNT_HASH, _STATE_ROOT_HASH)   

    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {_NODE_ADDRESS} @ {_STATE_ROOT_HASH.hex()}")
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
