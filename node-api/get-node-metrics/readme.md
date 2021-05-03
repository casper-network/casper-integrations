# get-node-metrics

## Overview

Each node in the network can expose operational metrics of interest, e.g. the number of currently pending deploys.  The metrics can be ingested by telemetry services.

## REST API

The REST API exposes the **metrics** endpoint.

## NOTES

- The REST API returns a simple text dump of the values of all metrics.
