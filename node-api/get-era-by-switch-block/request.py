import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS: str = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# A known block hash.
_BLOCK_HASH: bytes = bytes.fromhex("12284e9e6b1c440ee91d2803850a7b7ba5e4c029c6f4abeb8aa1eb743608ab73")

# A known block height.
_BLOCK_HEIGHT: int = 505



def main():
    """Retrieves information scoped to the present era.
    
    """
    # Set client.
    client = pycspr.NodeClient(pycspr.NodeConnectionInfo(host=_NODE_ADDRESS))

    # Set era by known hash.
    era_info_1: dict = client.queries.get_era_info(_BLOCK_HASH)

    # Set era by known height.
    era_info_2: dict = client.queries.get_era_info(_BLOCK_HEIGHT)

    # Verify era information equivalence.
    assert era_info_1 == era_info_2
    
    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {_NODE_ADDRESS}")
    print("-----------------------------------------------------------------------------------------------------")
    print(f"Era information = {json.dumps(era_info_1, indent=4)}")
    print("-----------------------------------------------------------------------------------------------------")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {_NODE_ADDRESS} :: {err}")
