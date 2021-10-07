using System;
using System.Threading;
using System.Threading.Tasks;
using NetCasperSDK;
using NetCasperSDK.JsonRpc;

namespace CasperIntegrations
{
    public class GetDeploy
    {
        public static async Task Main(string[] args)
        {
            string nodeAddress = "http://3.136.227.9:7777/rpc";
            string deployHash = "6c4048f8ebd40a160e9df47e73680eda8ae8430309a9566655bb357a5967276b";
            
            try
            {
                var casperSdk = new NetCasperClient(nodeAddress);
                var tokenSource = new CancellationTokenSource(TimeSpan.FromSeconds(120));
                // wait for execution_results up to 2 mins 
                var rpcResponse = await casperSdk.GetDeploy(deployHash, tokenSource.Token);
                Console.WriteLine(rpcResponse.Result.GetRawText());
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