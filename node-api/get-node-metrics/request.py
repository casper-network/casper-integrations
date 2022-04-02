import json
import os

import pycspr



# A known casper test-net node address.
_NODE_ADDRESS: str = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")


def main():
    """Retrieves node metrics.
    
    """
    # Set client.
    client = pycspr.NodeClient(pycspr.NodeConnection(host=_NODE_ADDRESS))

    # Get node metrics.
    metrics: list = client.get_node_metrics()
    
    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {_NODE_ADDRESS}")
    print("-----------------------------------------------------------------------------------------------------")
    for line in metrics:
        print(f"{line}")
    print("-----------------------------------------------------------------------------------------------------")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {_NODE_ADDRESS} :: {err}")
