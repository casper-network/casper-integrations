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

How to run Java examples ?
--------------------------------------

1.  Pre-Requisites:
 - Min JDK 1.8 : Please ensure at a minimum JDK 1.8 is installed and configured. JAVA_HOME environment variable should be pointing to the JDK 1.8 (or greater) installation.
 - Casper Java SDK Fat Jar: Clone the [Casper Java SDK Repository](https://github.com/casper-network/casper-java-sdk.git) and build the fat jar

    ```shell
    cd casper-java-sdk
    mvnw clean package
    ```
NOTE - The fat jar includes Casper Java SDK as well as all the required dependencies. After successful execution of the above command, it can be found in the `target` directory by the name of `casper-java-sdk-<ver>-jar-with-dependencies.jar`.

2.  Import environment variables:

```
source YOUR_WORKING_DIRECTORY/env.sh
```
NOTE - If you wish to override them then simply make a copy of the env.sh file, and then edit and import the copy instead. The two main properties that impact java execution are `CSPR_JAVA_FAT_JAR` (which is set to current directory by default) and `RUN_JAVA` (which encapsulates java command along with the required classpath)

3.  Run node-api example:

```
$RUN_JAVA YOUR_WORKING_DIRECTORY/casper-integrations/node-api/<example-name>/request.java
```