using System;
using System.Threading.Tasks;
using NetCasperSDK;
using NetCasperSDK.JsonRpc;

namespace CasperIntegrations
{
    public class GetBlock
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
                var rpcResponse = await casperSdk.GetBlock();
                Console.WriteLine(rpcResponse.Result.GetRawText());
                
                //Get block by hash
                rpcResponse = await casperSdk.GetBlock(blockHash);
                Console.WriteLine(rpcResponse.Result.GetRawText());
                
                //Get block by height
                rpcResponse = await casperSdk.GetBlock(blockHeight);
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