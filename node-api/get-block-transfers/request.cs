using System;
using System.Threading.Tasks;
using NetCasperSDK;
using NetCasperSDK.JsonRpc;

namespace CasperIntegrations
{
    public class GetBlockTransfers
    {
        public static async Task Main(string[] args)
        {
            string nodeAddress = "http://3.136.227.9:7777/rpc";
            string blockHash = "c7148e1e2e115d8fba357e04be2073d721847c982dc70d5c36b5f6d3cf66331c";
            int blockHeight = 20652;
            
            try
            {
                var casperSdk = new NetCasperClient(nodeAddress);
                
                //Get latest block
                var rpcResponse = await casperSdk.GetBlockTransfers();
                Console.WriteLine(rpcResponse.Result.GetRawText());
                
                //Get block by hash
                rpcResponse = await casperSdk.GetBlockTransfers(blockHash);
                Console.WriteLine(rpcResponse.Result.GetRawText());
                
                //Get block by height
                rpcResponse = await casperSdk.GetBlockTransfers(blockHeight);
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