const { CasperServiceByJsonRPC } = require("casper-js-sdk");

// A known deploy hash in base16.
const _DEPLOY_HASH = "6c4048f8ebd40a160e9df47e73680eda8ae8430309a9566655bb357a5967276b"

const client = new CasperServiceByJsonRPC("http://3.136.227.9:7777/rpc");

client.getDeployInfo(
  _DEPLOY_HASH
).then(result => {
  console.log(result);
});

