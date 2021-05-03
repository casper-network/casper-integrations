# get-auction-info

## Overview

The Casper network is crypto-economically secured via a **Proof of Stake** mechanism underpinned by a system contract called **the auction**.  The auction process allows node operators to submit **bids** for inclusion in the network's validator set.  Winning bids gain the right to run a validator node.

## JSON-RPC

The JSON-RPC API exposes the **state_get_auction_info** endpoint.  It returns details regarding bids and current/future validators.
