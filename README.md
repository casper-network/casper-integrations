casper-integrations
===============

Various technical assets in support of CSPR node integrations.


What is casper-integrations ?
--------------------------------------

- JSON-RPC, REST & SSE node api documentation & example code;

- typical integration workflow sample code;

- links to technical articles and the such like;

- a set of use case end to end solutions;


Why casper-integrations ?
--------------------------------------

There is a significant requirement to streamline CSPR network integrations by developers, exchanges, wallets, validators ...etc.  It's goal is to streamline client side experience of interacting with a casper node.


Who uses casper-integrations ?
--------------------------------------

Software engineers.  Validators.  Testers.


How to run Javascript examples ?
--------------------------------------

1.  Setup:

```
cd YOUR_WORKING_DIRECTORY/casper-integrations
npm install
```

2.  Import environment variables:

```
source YOUR_WORKING_DIRECTORY/env.sh
```

NOTE - if you wish to override them then simply make a copy of the env.sh file, and then edit and import the copy instead.

3.  Run node-api example:

```
node YOUR_WORKING_DIRECTORY/casper-integrations/node-api/<example-name>/request.js
```

4.  Run erc20 example:

```
node YOUR_WORKING_DIRECTORY/casper-integrations/contracts/erc20/<script-name>.js
```

How to run C# examples with NetCasperSDK ?
------------------------------------------

The `node-api` folder contains different examples for communicating with a Casper node. Most of the examples run against a node in the testnet. 

For the examples with a transfer deploy you will need a secret key. The examples use the faucet account in a local node. Learn to install a local node [here](https://docs.casperlabs.io/en/latest/dapp-dev-guide/setup-nctl.html).

1.  Setup:

Install .NET 5.0 or higher. 

2.  Run `node-api` example:

Go to one of the examples directory, and run:

```
dotnet run
```

If the default casper node is not available, edit the `request.cs` file and replace the url with another's node address.
