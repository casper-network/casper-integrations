const { CasperServiceByJsonRPC } = require("casper-js-sdk");

// A known state of the linear block chain at which to query.
const _STATE_ROOT_HASH = "33e257bc70f7094d030a18f8aede3d58d8e202fb946810ce3292625fe853b636"

// A known uref of a purse.
const _PURSE_UREF = "uref-b3a323e529dc59f3a1042ea89e60a66ecd8fc9ee0991398d7760e24e72b2f49d-007";

const client = new CasperServiceByJsonRPC("http://3.136.227.9:7777/rpc");

client.getAccountBalance(
  _STATE_ROOT_HASH,
  _PURSE_UREF
).then(result => {
  console.log(result.toString());
});
