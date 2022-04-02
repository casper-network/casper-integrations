import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS: str = os.getenv("CASPER_NODE_ADDRESS", "109.238.11.77")

# A known block hash.
_BLOCK_HASH: bytes = bytes.fromhex("9481c3fd1876a6183a48c96f963eb3a53569092fb0ff9bbc1293dea967b46061")

# A known block height.
_BLOCK_HEIGHT: int = 621958



def main():
    """Retrieves information scoped to the present era.
    
    """
    # Set client.
    client = pycspr.NodeClient(pycspr.NodeConnection(host=_NODE_ADDRESS))

    # Set era by known hash.
    era_info_1: dict = client.get_era_info(_BLOCK_HASH)

    # Set era by known height.
    era_info_2: dict = client.get_era_info(_BLOCK_HEIGHT)

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
