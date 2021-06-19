const { CasperServiceByJsonRPC } = require("casper-js-sdk");

const client = new CasperServiceByJsonRPC("http://3.136.227.9:7777/rpc");

const _BLOCK_HASH = "c7148e1e2e115d8fba357e04be2073d721847c982dc70d5c36b5f6d3cf66331c"

client.getStateRootHash(
  _BLOCK_HASH
).then(result => {
  console.log('by block-hash ', result);
});

client.getStateRootHash(
).then(result => {
  console.log('by latest', result);
});
