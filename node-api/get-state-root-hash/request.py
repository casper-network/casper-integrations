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
    """Retrieve node state root hash.
    
    """
    # Set state root hash.
    state_root_hash = pycspr.get_state_root_hash()

    print(f"STATE ROOT HASH @ NODE {pycspr.CONNECTION} = {state_root_hash}")


if __name__ == "__main__":
    try:
        main()
    except Exception as err:
        print(f"API ERROR @ NODE {pycspr.CONNECTION} :: {err}")
