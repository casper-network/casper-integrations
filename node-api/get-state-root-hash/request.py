import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# Initialise pycspr.
pycspr.initialise(
    pycspr.NodeConnectionInfo(host=_NODE_ADDRESS, port_rest=8888, port_rpc=7777, port_sse=9999)
)

# A known block hash.
_BLOCK_HASH = "c7148e1e2e115d8fba357e04be2073d721847c982dc70d5c36b5f6d3cf66331c"

# A known block height.
_BLOCK_HEIGHT = 20652


def main():
    """Retrieve node state root hash.
    
    """
    # Set state root hash - latest.
    state_root_hash_1 = pycspr.get_state_root_hash()

    # Set state root hash - by known block hash.
    state_root_hash_2 = pycspr.get_state_root_hash(_BLOCK_HASH)

    # Set state root hash - by known block height.
    state_root_hash_3 = pycspr.get_state_root_hash(_BLOCK_HEIGHT)

    # Verify block information equivalence.
    assert state_root_hash_2 == state_root_hash_3

    print("-----------------------------------------------------------------------------------------------------")
    print(f"STATE ROOT HASH @ NODE {pycspr.CONNECTION} = {state_root_hash_1}")
    print("-----------------------------------------------------------------------------------------------------")

if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {pycspr.CONNECTION} :: {err}")
