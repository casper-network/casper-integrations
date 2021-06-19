const { CasperServiceByJsonRPC } = require("casper-js-sdk");

// A known state of the linear block chain at which to query.
const _STATE_ROOT_HASH = "33e257bc70f7094d030a18f8aede3d58d8e202fb946810ce3292625fe853b636"

const client = new CasperServiceByJsonRPC("http://3.136.227.9:7777/rpc");

client.getValidatorsInfo().then(result => {
  console.log(result);
});

