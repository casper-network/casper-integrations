import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")


def main():
    """Retrieves on-chain auction information.
    
    """
    # Set client.
    client = pycspr.NodeClient(pycspr.NodeConnectionInfo(host=_NODE_ADDRESS))

    # Set auction info scoped by current era.
    auction_info: dict = client.queries.get_auction_info()

    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {_NODE_ADDRESS}")
    print("-----------------------------------------------------------------------------------------------------")
    print(f"Auction information = {json.dumps(auction_info, indent=4)}")
    print("-----------------------------------------------------------------------------------------------------")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {_NODE_ADDRESS} :: {err}")