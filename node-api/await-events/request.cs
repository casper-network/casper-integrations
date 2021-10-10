using System;
using System.Text.Json;
using System.Threading.Tasks;
using NetCasperSDK;
using NetCasperSDK.SSE;
using NetCasperSDK.Types;

namespace CasperIntegrations
{
    public class AwaitEvents
    {
        private static string localNetHost = "207.154.217.88";
        private static int localNetPort = 18101;

        // Listen to deploys channel starting from id 16415
        //
        public static void ListenDeployAcceptedEvents()
        {
            // instatiate sse client with ip address and port for casper node
            //
            var sse = new ServerEventsClient(localNetHost, localNetPort);

            // add a callback to process deploy accepted events. 
            //
            sse.AddEventCallback(EventType.DeployAccepted, "deploy-events",
                (evt, id, payload) =>
                {
                    var deployJson = JsonDocument.Parse(payload).RootElement.GetProperty("DeployAccepted");
                    var hash = deployJson.GetProperty("hash").GetString();
                    var timestamp = deployJson.GetProperty("header").GetProperty("timestamp").ToString();
                    Console.WriteLine($"{evt} - {id} - {hash} - {timestamp}");
                },
                startFrom: 16415);

            sse.StartListening();

            Console.WriteLine("Press Enter to stop listening.");
            Console.ReadLine();
            Console.WriteLine("Terminating...");

            sse.StopListening().Wait();

            Console.WriteLine("Terminated");
        }

        // Deploy a transfer and wait for the corresponding DeployProcessed event
        // Check exec-account-transfer example for info on transfers
        //
        public static async Task WaitForDeployProcessed()
        {
            // send a transfer from fauce deploy to the local network
            //
            var casperSdk = new NetCasperClient("http://207.154.217.88:11101/rpc");
            var tgtPK = PublicKey.FromPem("/tmp/tgtaccount_pk.pem");
            var faucetKey = KeyPair.FromPem("/tmp/faucetact_sk.pem");
            var deploy = DeployTemplates.StandardTransfer(
                faucetKey,
                tgtPK,
                25000000000,
                1200,
                "casper-net-1");
            deploy.Sign(faucetKey);

            var response = await casperSdk.PutDeploy(deploy);
            var deployHash = response.Result.GetProperty("deploy_hash").GetString();

            // add a callback to process deploy processed events. 
            //
            var sse = new ServerEventsClient(localNetHost, localNetPort);
            sse.AddEventCallback(EventType.DeployProcessed, "wait-for-transfer-result",
                (evt, id, payload) =>
                {
                    if (payload.Contains(@$"""deploy_hash"":""{deployHash}"""))
                    {
                        var deployJson = JsonDocument.Parse(payload).RootElement.GetProperty("DeployProcessed");
                        Console.WriteLine(JsonSerializer.Serialize(deployJson,
                            new JsonSerializerOptions {WriteIndented = true}));
                        sse.StopListening();
                    }
                });

            Console.WriteLine("Waiting for event with deploy hash: " + deployHash);

            sse.StartListening();
            sse.Wait();
        }

        // Listen to the main channel and wait for n block events
        //
        public static void WaitForNBlocksAdded(int n)
        {
            int pendingBlocks = n;

            // add a callback to process block added events. 
            //
            var sse = new ServerEventsClient(localNetHost, localNetPort);
            sse.AddEventCallback(EventType.BlockAdded, "wait-for-blocks",
                (evt, id, payload) =>
                {
                    Console.WriteLine($"{evt} received - id:{id} - {--pendingBlocks} remaining");
                    if (pendingBlocks <= 0) sse.StopListening();
                });

            Console.WriteLine($"Listening main channel. Waiting for {pendingBlocks} blocks");

            sse.StartListening();
            sse.Wait();
        }

        // Listen to the main channel and wait for n eras events
        //
        public static void WaitForNEras(int n)
        {
            int pendingEras = n;

            // add a callback to process block added events.
            // when an era ends block.header.era_end field has values
            //
            var sse = new ServerEventsClient(localNetHost, localNetPort);
            sse.AddEventCallback(EventType.BlockAdded, "wait-for-blocks",
                (evt, id, payload) =>
                {
                    var blockJson = JsonDocument.Parse(payload).RootElement.GetProperty("BlockAdded");
                    var eraId = blockJson.GetProperty("block").GetProperty("header").GetProperty("era_id").GetInt32();
                    var eraEndJson = blockJson.GetProperty("block").GetProperty("header").GetProperty("era_end");

                    if (eraEndJson.ValueKind != JsonValueKind.Null)
                        if (--pendingEras <= 0)
                            sse.StopListening();

                    Console.WriteLine($"{evt} received - id:{id} - eraId:{eraId} - {pendingEras} eras remaining");
                });

            Console.WriteLine($"Listening main channel. Waiting for {pendingEras} eras");

            sse.StartListening();
            sse.Wait();
        }

        // Listen to the main channel and wait block with height given
        //
        public static void WaitUntilBlockHeight(int blockHeight)
        {
            // add a callback to process block added events. 
            //
            var sse = new ServerEventsClient(localNetHost, localNetPort);
            sse.AddEventCallback(EventType.BlockAdded, "wait-for-blocks",
                (evt, id, payload) =>
                {
                    var blockJson = JsonDocument.Parse(payload).RootElement.GetProperty("BlockAdded");
                    var height = blockJson.GetProperty("block").GetProperty("header").GetProperty("height").GetInt32();

                    if (height >= blockHeight)
                        sse.StopListening();

                    Console.WriteLine($"{evt} received - id:{id} - blockHeight:{height}");
                });

            Console.WriteLine($"Listening main channel. Waiting for block with height {blockHeight}");

            sse.StartListening();
            sse.Wait();
        }

        // Listen to the main channel and wait for era with id given
        //
        public static void WaitUntilEraId(int eraId)
        {
            // add a callback to process block added events.
            // when an era ends block.header.era_end field has values
            //
            var sse = new ServerEventsClient(localNetHost, localNetPort);
            sse.AddEventCallback(EventType.BlockAdded, "wait-for-blocks",
                (evt, id, payload) =>
                {
                    var blockJson = JsonDocument.Parse(payload).RootElement.GetProperty("BlockAdded");
                    var curEraId = blockJson.GetProperty("block").GetProperty("header").GetProperty("era_id")
                        .GetInt32();
                    var eraEndJson = blockJson.GetProperty("block").GetProperty("header").GetProperty("era_end");

                    Console.WriteLine($"{evt} received - id:{id} - eraId:{curEraId}");

                    if (eraEndJson.ValueKind != JsonValueKind.Null && curEraId >= eraId)
                    {
                        Console.WriteLine(JsonSerializer.Serialize(eraEndJson,
                            new JsonSerializerOptions {WriteIndented = true}));
                        sse.StopListening(); // given era completed, stop.
                    }
                });

            Console.WriteLine($"Listening main channel. Waiting for completion of era with id {eraId}");

            sse.StartListening();
            sse.Wait();
        }

        public static async Task Main(string[] args)
        {
            if(args.Length==0)
                Console.WriteLine("Usage: dotnet run <await action> [n]");
            
            if (args[0] == "DeployAccepted")
                ListenDeployAcceptedEvents();

            if (args[0] == "DeployProcessed")
                await WaitForDeployProcessed();

            if (args[0] == "NBlocks")
                WaitForNBlocksAdded(int.Parse(args[1]));

            if (args[0] == "NEras")
                WaitForNEras(int.Parse(args[1]));

            if (args[0] == "BlockHeight")
                WaitUntilBlockHeight(int.Parse(args[1]));

            if (args[0] == "EraId")
                WaitUntilEraId(int.Parse(args[1]));
        }
    }
}