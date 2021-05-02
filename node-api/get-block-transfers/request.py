import json
import os

import pycspr



# A known block hash.
_BLOCK_HASH = "c7148e1e2e115d8fba357e04be2073d721847c982dc70d5c36b5f6d3cf66331c"

# A known block height.
_BLOCK_HEIGHT = 20652

# An adddress associated with a casper test-net node.
_NODE_ADDRESS = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# Initialise pycspr.
pycspr.initialise(
    pycspr.NodeConnectionInfo(host=_NODE_ADDRESS, port_rest=8888, port_rpc=7777, port_sse=9999)
)


def main():
    """Retrieves transfers by block.
    
    """
    # Set block by known hash.
    block_transers_1 = pycspr.get_block_transfers(_BLOCK_HASH)

    # Set block by known height.
    block_transers_2 = pycspr.get_block_transfers(_BLOCK_HEIGHT)

    # Verify block information equivalence.
    assert block_transers_1 == block_transers_2
    
    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {pycspr.CONNECTION}")
    print("-----------------------------------------------------------------------------------------------------")
    print(f"Block transfers = {json.dumps(block_transers_1, indent=4)}")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {pycspr.CONNECTION} :: {err}")
