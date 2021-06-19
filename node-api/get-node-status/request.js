const { CasperServiceByJsonRPC } = require("casper-js-sdk");

const client = new CasperServiceByJsonRPC("http://3.136.227.9:7777/rpc");

client.getStatus().then(result => {
  console.log(result);
});

