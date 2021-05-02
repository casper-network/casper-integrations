import json
import os

import pycspr



# An adddress associated with a casper test-net node.
_NODE_ADDRESS = os.getenv("CASPER_NODE_ADDRESS", "3.136.227.9")

# Initialise pycspr.
pycspr.initialise(
    pycspr.NodeConnectionInfo(host=_NODE_ADDRESS, port_rest=8888, port_rpc=7777, port_sse=9999)
)


def main():
    """Retrieves node status information.
    
    """
    status = pycspr.get_node_status()
    
    print("-----------------------------------------------------------------------------------------------------")
    print(f"QUERIED TEST-NET NODE {pycspr.CONNECTION}")
    print("-----------------------------------------------------------------------------------------------------")
    print(f"{json.dumps(status, indent=4)}")

if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {pycspr.CONNECTION} :: {err}")
