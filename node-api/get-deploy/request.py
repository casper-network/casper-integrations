import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# Initialise pycspr.
pycspr.initialise(
    pycspr.NodeConnectionInfo(host=_NODE_ADDRESS, port_rest=8888, port_rpc=7777, port_sse=9999)
)

# A known deploy hash.
_DEPLOY_HASH = "6c4048f8ebd40a160e9df47e73680eda8ae8430309a9566655bb357a5967276b"


def main():
    """Retrieves on-chain deploy information.
    
    """
    # Set deploy by known hash.
    deploy_info = pycspr.get_deploy(_DEPLOY_HASH)
    
    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {pycspr.CONNECTION}")
    print("-----------------------------------------------------------------------------------------------------")
    print(f"Deploy information = {json.dumps(deploy_info, indent=4)}")
    print("-----------------------------------------------------------------------------------------------------")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {pycspr.CONNECTION} :: {err}")
