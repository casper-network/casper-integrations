# await-events

## Overview

Casper nodes expose and endpoint for SSE ([Server-Sent Events](https://en.wikipedia.org/wiki/Server-sent_events)). A client can connect to one of the channels and wait for events to flow from the node.

Channels available are:
* `main`. Nodes send events of type `BlockAdded`, `DeployProcessed`, `Fault` and `Step`.
* `sigs`. Nodes send events of type `FinalitySignature`.
* `deploys`. Nodes send events of type `DeployAccepted`.

### Example with `curl`
```
curl -sN http://3.136.227.9:9999/events/main?start_from=0
```
The `start_from` query parameter indicates the event id the server starts sending data from. Use `start_from=0` to ask the server to send previous events (but not from genesis).
