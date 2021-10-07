using System;
using System.Threading.Tasks;
using NetCasperSDK;
using NetCasperSDK.JsonRpc;

namespace CasperIntegrations
{
    public class GetNodeMetrics
    {
        public static async Task Main(string[] args)
        {
            string nodeAddress = "http://3.136.227.9:8888/metrics";

            try
            {
                var metrics = await NetCasperClient.GetNodeMetrics(nodeAddress);
                Console.WriteLine(metrics);
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