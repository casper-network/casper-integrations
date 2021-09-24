import argparse
import os
import pathlib
import random
import typing

import pycspr
from pycspr.types import CLTypeKey
from pycspr.types import Deploy
from pycspr.types import DeployParameters
from pycspr.types import ModuleBytes
from pycspr.types import PrivateKey

import utils_constants as constants



# CLI argument parser.
_ARGS = argparse.ArgumentParser("Installs ERC-20 token contract.")

# CLI argument: number of decimal places within ERC-20 token to be minted.
_ARGS.add_argument(
    "--decimals",
    default=11,
    dest="token_decimals",
    help="Number of decimal places within ERC-20 token to be minted.",
    type=int,
    )

# CLI argument: name of ERC-20 token to be minted.
_ARGS.add_argument(
    "--name",
    default="Acme Token",
    dest="token_name",
    help="Name of ERC-20 token to be minted.",
    type=str,
    )

# CLI argument: Total number of ERC-20 tokens to be issued.
_ARGS.add_argument(
    "--supply",
    default=1e15,
    dest="token_total_supply",
    help="Total number of ERC-20 tokens to be issued.",
    type=int,
    )

# CLI argument: symbol of ERC-20 token to be minted.
_ARGS.add_argument(
    "--symbol",
    default="ACME",
    dest="token_symbol",
    help="Symbol of ERC-20 token to be minted.",
    type=str,
    )


def _main(args: argparse.Namespace):
    """Main entry point.

    :param args: Parsed command line arguments.

    """
    # Set DApp operator key.
    operator = _get_operator_key(args)

    # Set deploy.
    deploy: Deploy = _get_deploy(args, operator)

    # Set deploy approval.
    deploy.approve(operator)

    # Dispatch deploy to a node.
    client = _get_client(args)
    client.deploys.send(deploy)

    print("-------------------------------------------------------------------------------------------------------")
    print(f"Deploy dispatched to node @ [{constants.DEPLOY_NODE_HOST}]: {deploy.hash.hex()}")
    print("-------------------------------------------------------------------------------------------------------")


def _get_client(args: argparse.Namespace) -> pycspr.NodeClient:
    """Returns a pycspr client instance.

    """
    return pycspr.NodeClient(pycspr.NodeConnectionInfo(
        host=constants.DEPLOY_NODE_HOST,
        port_rpc=constants.DEPLOY_NODE_PORT_RPC,
    ))


def _get_operator_key(args: argparse.Namespace) -> PrivateKey:
    """Returns DApp operator's private key.

    """
    return pycspr.parse_private_key(
        constants.PATH_TO_CONTRACT_KEYS / "secret_key.pem",
        pycspr.KeyAlgorithm.ED25519,
        )


def _get_deploy(args: argparse.Namespace, operator: PrivateKey) -> Deploy:
    """Returns deploy to be dispatched.

    """
    # Set standard deploy parameters.
    params: DeployParameters = \
        pycspr.create_deploy_parameters(
            account=operator,
            chain_name=constants.DEPLOY_CHAIN_NAME
            )

    # Set payment logic.
    payment: ModuleBytes = \
        pycspr.create_standard_payment(constants.DEPLOY_GAS_PAYMENT)

    # Set session logic.
    session: ModuleBytes = ModuleBytes(
        module_bytes=pycspr.read_wasm(constants.PATH_TO_CONTRACT_ERC_20),
        args = [
            pycspr.create_deploy_argument(
                "token_decimals",
                args.token_decimals,
                pycspr.create_cl_type_of_simple(CLTypeKey.U8)
                ),
            pycspr.create_deploy_argument(
                "token_name",
                args.token_name,
                pycspr.create_cl_type_of_simple(CLTypeKey.STRING)
                ),
            pycspr.create_deploy_argument(
                "token_symbol",
                args.token_symbol,
                pycspr.create_cl_type_of_simple(CLTypeKey.STRING)
                ),
            pycspr.create_deploy_argument(
                "token_total_supply",
                args.token_total_supply,
                pycspr.create_cl_type_of_simple(CLTypeKey.U256)
                ),
        ]
    )

    return pycspr.create_deploy(params, payment, session)


# Entry point.
if __name__ == '__main__':
    _main(_ARGS.parse_args())
