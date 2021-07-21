import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS: str = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# A known block hash.
_BLOCK_HASH: bytes = bytes.fromhex("c7148e1e2e115d8fba357e04be2073d721847c982dc70d5c36b5f6d3cf66331c")

# A known block height.
_BLOCK_HEIGHT: int = 20652


def main():
    """Retrieve node state root hash.
    
    """
    # Set client.
    client = pycspr.NodeClient(pycspr.NodeConnectionInfo(host=_NODE_ADDRESS))

    # Set state root hash - latest.
    state_root_hash_1: bytes = client.queries.get_state_root_hash()

    # Set state root hash - by known block hash.
    state_root_hash_2: bytes = client.queries.get_state_root_hash(_BLOCK_HASH)

    # Set state root hash - by known block height.
    state_root_hash_3: bytes = client.queries.get_state_root_hash(_BLOCK_HEIGHT)

    # Verify.
    assert state_root_hash_1 != state_root_hash_2
    assert state_root_hash_2 == state_root_hash_3

    print("-----------------------------------------------------------------------------------------------------")
    print(f"STATE ROOT HASH @ NODE {_NODE_ADDRESS} = {state_root_hash_1.hex()}")
    print("-----------------------------------------------------------------------------------------------------")

if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {_NODE_ADDRESS} :: {err}")
