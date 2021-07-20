import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS: str = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")


def main():
    """Retrieves node peer set.
    
    """
    # Set client.
    client = pycspr.NodeClient(pycspr.NodeConnectionInfo(host=_NODE_ADDRESS))

    # Get node peers.
    peers: list = client.queries.get_node_peers()
    
    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {_NODE_ADDRESS}")
    print("-----------------------------------------------------------------------------------------------------")
    for peer in peers:
        print(f"{json.dumps(peer, indent=4)}")
    print("-----------------------------------------------------------------------------------------------------")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {_NODE_ADDRESS} :: {err}")
