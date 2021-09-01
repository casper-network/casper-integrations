Javascript erc20 demo
===============

Pre-Requisites 
--------------------------------------

0.  It is assumed that an [NCTL](https://github.com/casper-network/casper-node/tree/master/utils/nctl) network is up & running in your local environment.

1.  The following must be available: 

- node >= v12.18.2
- npm  >= v7.21.1
- yarn >= v1.22.11

2.  To install the above on a fresh Linux Debian box:

```
# Install node + npm
sudo apt update
sudo apt install nodejs npm

# Update node + npm to latest
npm cache clean -f
npm install -g n
n stable
npm install npm -g

# Install yarn
npm install -g yarn
```

Setup
--------------------------------------

Clone the casper-integrations repo into your local working directory & initialise.

```
cd YOUR_WORKING_DIRECTORY
git clone https://github.com/casper-network/casper-integrations.git
cd casper-integrations
yarn init
```

Demo Workflow
--------------------------------------

To run the full workflow you can run `yarn commands` from the casper-integrations root folder.  The full  workflow is documented [here](workflow.md).
