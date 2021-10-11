using System;
using System.Threading.Tasks;
using NetCasperSDK;
using NetCasperSDK.JsonRpc;

namespace CasperIntegrations
{
    public class GetEraBySwitchBlock
    {
        public static async Task Main(string[] args)
        {
            string nodeAddress = "http://3.136.227.9:7777/rpc";
            string blockHash = "12284e9e6b1c440ee91d2803850a7b7ba5e4c029c6f4abeb8aa1eb743608ab73";
            int blockHeight = 505;
            try
            {
                var casperSdk = new NetCasperClient(nodeAddress);
                
                // Retrieve era information of latest block.
                var rpcResponse = await casperSdk.GetEraInfoBySwitchBlock();
                Console.WriteLine(rpcResponse.Result.GetRawText());
                
                // Retrieve era information by block hash.
                rpcResponse = await casperSdk.GetEraInfoBySwitchBlock(blockHash);
                Console.WriteLine(rpcResponse.Result.GetRawText());
                
                // Retrieve era information by block height.
                rpcResponse = await casperSdk.GetEraInfoBySwitchBlock(blockHeight);
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