using System;
using System.Threading.Tasks;
using NetCasperSDK;
using NetCasperSDK.JsonRpc;

namespace CasperIntegrations
{
    public class GetAccountBalance
    {
        public static async Task Main(string[] args)
        {
            string purse = "uref-b3a323e529dc59f3a1042ea89e60a66ecd8fc9ee0991398d7760e24e72b2f49d-007";
            string nodeAddress = "http://3.136.227.9:7777/rpc";

            try
            {
                var casperSdk = new NetCasperClient(nodeAddress);
                var rpcResponse = await casperSdk.GetAccountBalance(purse);
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