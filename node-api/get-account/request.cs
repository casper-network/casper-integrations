using System;
using System.Threading.Tasks;
using NetCasperSDK;
using NetCasperSDK.JsonRpc;

namespace CasperIntegrations
{
    public class GetAccount
    {
        public static async Task Main(string[] args)
        {
            string account = "account-hash-21e8cee83ced9ff174357dc5d9b797f259994354993f01e18db49cda2a7700b3";
            string nodeAddress = "http://3.136.227.9:7777/rpc";

            try
            {
                var casperSdk = new NetCasperClient(nodeAddress);
                var rpcResponse = await casperSdk.GetAccountInfo(account);
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