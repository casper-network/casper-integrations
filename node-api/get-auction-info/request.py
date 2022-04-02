import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# A known block hash.
_BLOCK_HASH: bytes = bytes.fromhex("c7148e1e2e115d8fba357e04be2073d721847c982dc70d5c36b5f6d3cf66331c")

# A known block height.
_BLOCK_HEIGHT: int = 228359


def main():
    """Retrieves on-chain auction information.
    
    """
    # Set client.
    client: pycspr.NodeClient = pycspr.NodeClient(pycspr.NodeConnection(host=_NODE_ADDRESS))

    # Set auction info scoped by current era.
    # auction_info_1: dict = client.get_auction_info()

    # Set auction info scoped by known hash.
    # auction_info_2: dict = client.get_auction_info(_BLOCK_HASH)

    # Set auction info scoped by known height.
    auction_info_3: dict = client.get_auction_info(_BLOCK_HEIGHT)

    # Verify.
    # assert auction_info_1 != auction_info_2
    # assert auction_info_2 == auction_info_3

    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {_NODE_ADDRESS}")
    print("-----------------------------------------------------------------------------------------------------")
    print(f"Auction information = {json.dumps(auction_info_3, indent=4)}")
    print("-----------------------------------------------------------------------------------------------------")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {_NODE_ADDRESS} :: {err}")