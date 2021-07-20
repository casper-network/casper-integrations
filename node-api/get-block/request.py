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
    """Retrieves on-chain block information.
    
    """
    # Set client.
    client = pycspr.NodeClient(pycspr.NodeConnectionInfo(host=_NODE_ADDRESS))

    # Set block - latest.
    block_1: dict = client.queries.get_block(_BLOCK_HASH)
    
    # Set block - by known hash.
    block_2: dict = client.queries.get_block(_BLOCK_HASH)

    # Set block - by known height.
    block_3: dict = client.queries.get_block(_BLOCK_HEIGHT)

    # Verify block information equivalence.
    assert block_2 == block_3
    
    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {_NODE_ADDRESS}")
    print("-----------------------------------------------------------------------------------------------------")
    print(f"Block information = {json.dumps(block_1, indent=4)}")
    print("-----------------------------------------------------------------------------------------------------")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {_NODE_ADDRESS} :: {err}")
