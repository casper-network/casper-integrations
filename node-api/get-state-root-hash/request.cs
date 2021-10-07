using System;
using System.Threading.Tasks;
using NetCasperSDK;
using NetCasperSDK.JsonRpc;

namespace CasperIntegrations
{
    public class GetStateRootHash
    {
        public static async Task Main(string[] args)
        {
            string nodeAddress = "http://3.136.227.9:7777/rpc";
            string blockHash = "c7148e1e2e115d8fba357e04be2073d721847c982dc70d5c36b5f6d3cf66331c";
            int blockHeight = 20652;
            
            try
            {
                var casperSdk = new NetCasperClient(nodeAddress);
                
                // Retrieve by latest block.
                var stateRootHash = await casperSdk.GetStateRootHash();
                Console.WriteLine(stateRootHash);
                
                // Retrieve by block hash.
                stateRootHash = await casperSdk.GetStateRootHash(blockHash);
                Console.WriteLine(stateRootHash);
                
                // Retrieve by block height.
                stateRootHash = await casperSdk.GetStateRootHash(blockHeight);
                Console.WriteLine(stateRootHash);
                
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