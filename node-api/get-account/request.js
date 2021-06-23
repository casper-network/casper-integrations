const { CLPublicKey, CasperServiceByJsonRPC } = require("casper-js-sdk");

// A known account public key.
const _ACCOUNT_KEY = "01cb99ab80325d73552c7c0b8d10d8cb2d19116b1f233431751fe82f9c25db51c1"

// A known state of the linear block chain at which to query.
const _STATE_ROOT_HASH = "33e257bc70f7094d030a18f8aede3d58d8e202fb946810ce3292625fe853b636"

const client = new CasperServiceByJsonRPC("http://3.136.227.9:7777/rpc");

client.getBlockState(
  _STATE_ROOT_HASH,
  CLPublicKey.fromHex(_ACCOUNT_KEY).toAccountHashStr(),
  []
).then(result => {
  console.log(result);
});
