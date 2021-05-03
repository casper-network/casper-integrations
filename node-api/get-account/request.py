import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# Initialise pycspr.
pycspr.initialise(
    pycspr.NodeConnectionInfo(host=_NODE_ADDRESS, port_rest=8888, port_rpc=7777, port_sse=9999)
)

# A known account public key.
_ACCOUNT_KEY = "01cb99ab80325d73552c7c0b8d10d8cb2d19116b1f233431751fe82f9c25db51c1"

# A known state of the linear block chain at which to query.
_STATE_ROOT_HASH = "33e257bc70f7094d030a18f8aede3d58d8e202fb946810ce3292625fe853b636"


def main():
    """Retrieves on-chain account information.
    
    """
    # Verify mapping of account key -> account hash.
    assert _ACCOUNT_HASH == pycspr.get_account_hash(_ACCOUNT_KEY)

    # Set account information by account key.
    account_info = pycspr.get_account_info(_ACCOUNT_KEY, _STATE_ROOT_HASH)   

    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {pycspr.CONNECTION} @ {_STATE_ROOT_HASH}")
    print("-----------------------------------------------------------------------------------------------------")
    print(f"A/C key = {_ACCOUNT_KEY}")
    print(f"A/C on-chain info = {json.dumps(account_info, indent=4)}") 
    print("-----------------------------------------------------------------------------------------------------")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {pycspr.CONNECTION} :: {err}")
