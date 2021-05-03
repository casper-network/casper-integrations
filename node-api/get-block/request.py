import json
import os

import pycspr



# A known block hash.
_BLOCK_HASH = "c7148e1e2e115d8fba357e04be2073d721847c982dc70d5c36b5f6d3cf66331c"

# A known block height.
_BLOCK_HEIGHT = 20652

# A known casper test-net node address.
_NODE_ADDRESS = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# Initialise pycspr.
pycspr.initialise(
    pycspr.NodeConnectionInfo(host=_NODE_ADDRESS, port_rest=8888, port_rpc=7777, port_sse=9999)
)


def main():
    """Retrieves on-chain block information.
    
    """
    # Set block by known hash.
    block_info_1 = pycspr.get_block(_BLOCK_HASH)

    # Set block by known height.
    block_info_2 = pycspr.get_block(_BLOCK_HEIGHT)

    # Verify block information equivalence.
    assert block_info_1 == block_info_2
    
    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {pycspr.CONNECTION}")
    print("-----------------------------------------------------------------------------------------------------")
    print(f"Block information = {json.dumps(block_info_1, indent=4)}")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {pycspr.CONNECTION} :: {err}")
