using System;
using System.IO;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using NetCasperSDK;
using NetCasperSDK.JsonRpc;
using NetCasperSDK.Types;

namespace CasperIntegrations
{
    public class ExecAccountTransfer
    {
        public static async Task Main(string[] args)
        {
            // this sample works with a local network for which the faucet account is available
            // learn to set up a local network here: https://docs.casperlabs.io/en/latest/dapp-dev-guide/setup-nctl.html
            //
            string nodeAddress = "http://207.154.217.88:11101/rpc";

            try
            {
                // create an instance of the NetCasperClient that logs requests/outputs in stdout
                //
                var loggingHandler = new RpcLoggingHandler(new HttpClientHandler())
                {
                    LoggerStream = new StreamWriter(Console.OpenStandardOutput())
                };
                var casperSdk = new NetCasperClient(nodeAddress, loggingHandler);
                
                // retrieve faucet secret key and target public key from PEM files
                //
                var tgtPK = PublicKey.FromPem("/tmp/tgtaccount_pk.pem");
                var faucetKey = KeyPair.FromPem("/tmp/faucetact_sk.pem");

                // prepare a transfer deploy using the StandardTransfer template.
                //
                var deploy = DeployTemplates.StandardTransfer(
                    faucetKey,
                    tgtPK,
                    25000000000,
                    1200,
                    "casper-net-1");

                // sign the deploy and send it to the network
                // use the origin account secret key for signing. here the faucet secret key
                //
                deploy.Sign(faucetKey);

                var response = await casperSdk.PutDeploy(deploy);

                // extract the deploy hash and use it to wait (up to 2mins) for the execution results
                //
                var deployHash = response.Result.GetProperty("deploy_hash").GetString();
                
                var tokenSource = new CancellationTokenSource(TimeSpan.FromSeconds(120));
                await casperSdk.GetDeploy(deployHash, tokenSource.Token);
            }
            catch (RpcClientException e)
            {
                Console.WriteLine("ERROR:\n" + e.RpcError.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}