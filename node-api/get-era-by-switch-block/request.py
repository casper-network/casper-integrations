import json
import os

import pycspr



# A known block hash.
_BLOCK_HASH = "12284e9e6b1c440ee91d2803850a7b7ba5e4c029c6f4abeb8aa1eb743608ab73"

# A known block height.
_BLOCK_HEIGHT = 505

# An adddress associated with a casper test-net node.
_NODE_ADDRESS = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# Initialise pycspr.
pycspr.initialise(
    pycspr.NodeConnectionInfo(host=_NODE_ADDRESS, port_rest=8888, port_rpc=7777, port_sse=9999)
)


def main():
    """Retrieves information scoped to the present era.
    
    """
    # Set era by known hash.
    era_info_1 = pycspr.get_era_info(_BLOCK_HASH)

    # Set era by known height.
    era_info_2 = pycspr.get_era_info(_BLOCK_HEIGHT)

    # Verify era information equivalence.
    assert era_info_1 == era_info_2
    
    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {pycspr.CONNECTION}")
    print("-----------------------------------------------------------------------------------------------------")
    print(f"Era information = {json.dumps(era_info_1, indent=4)}")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {pycspr.CONNECTION} :: {err}")
