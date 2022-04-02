import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS: str = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# A known deploy hash.
_DEPLOY_HASH: bytes = bytes.fromhex("72b903c076584af013fa9c0634135033cef0c83084a891f864f784280a6ec4e3")


def main():
    """Retrieves on-chain deploy information.
    
    """
    # Set client.
    client = pycspr.NodeClient(pycspr.NodeConnection(host=_NODE_ADDRESS))

    # Set deploy by known hash.
    deploy_info = client.get_deploy(_DEPLOY_HASH)
    
    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {_NODE_ADDRESS}")
    print("-----------------------------------------------------------------------------------------------------")
    print(f"Deploy information = {json.dumps(deploy_info, indent=4)}")
    print("-----------------------------------------------------------------------------------------------------")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {_NODE_ADDRESS} :: {err}")
